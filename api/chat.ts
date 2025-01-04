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

// Default system prompt as fallback
const DEFAULT_SYSTEM_PROMPT = `You are a helpful customer support assistant. Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

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
        nodeEnv: process.env.NODE_ENV
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

    const { message, conversationId } = req.body;

    // Validate request body
    if (!message || !conversationId) {
      console.error('Missing required fields in request body');
      return res.status(400).json({ error: 'Message and conversationId are required' });
    }

    // Fetch domain_id from conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('domain_id')
      .eq('id', conversationId)
      .single();

    if (conversationError) {
      console.error('Error fetching conversation:', conversationError);
      throw conversationError;
    }

    // Fetch custom prompt from domain_settings
    const { data: domainSettings, error: settingsError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', conversationData.domain_id)
      .single();

    if (settingsError) {
      console.error('Error fetching domain settings:', settingsError);
      throw settingsError;
    }

    const systemPrompt = domainSettings?.prompt || DEFAULT_SYSTEM_PROMPT;
    console.log('Using system prompt:', systemPrompt);

    console.log('Making OpenAI API request with message:', message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: systemPrompt },
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
