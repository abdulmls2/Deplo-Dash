// Vercel Serverless Function for OpenAI Chat API
import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

// Enable CORS middleware
const cors = async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Handle CORS
    if (await cors(req, res)) return;

    console.log('API Request received:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      env: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
        hasSupabaseKey: !!process.env.VITE_SUPABASE_ANON_KEY
      }
    });

    if (req.method !== 'POST') {
      console.log('Method not allowed:', req.method);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not set');
      return res.status(500).json({ 
        error: 'OpenAI API key is not configured',
        env: process.env.NODE_ENV === 'development' ? {
          hasApiKey: !!process.env.OPENAI_API_KEY,
          nodeEnv: process.env.NODE_ENV
        } : undefined
      });
    }

    const { message, domainId } = req.body;
    console.log('Extracted from request body:', { message, domainId }); // Debug log

    // Validate request body
    if (!message) {
      console.error('Missing message in request body');
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!domainId) {
      console.error('Missing domainId in request body');
      return res.status(400).json({ error: 'Domain ID is required' });
    }

    // Fetch system prompt from domain_settings
    const { data: domainSettings, error: domainError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', domainId)
      .single();

    if (domainError) {
      console.error('Error fetching domain settings:', domainError);
      return res.status(500).json({ error: 'Failed to fetch domain settings' });
    }

    if (!domainSettings?.prompt) {
      console.error('No prompt found for domain:', domainId);
      return res.status(400).json({ error: 'No prompt configured for this domain' });
    }

    console.log('Making OpenAI API request with message:', message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: domainSettings.prompt },
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    console.log('OpenAI API response:', response);
    
    return res.status(200).json({ response });
  } catch (error: any) {
    console.error('Error in API handler:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      env: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    });
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        env: {
          hasApiKey: !!process.env.OPENAI_API_KEY,
          nodeEnv: process.env.NODE_ENV
        }
      } : undefined
    });
  }
}
