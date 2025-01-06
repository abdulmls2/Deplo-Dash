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
  process.env.VITE_SUPABASE_ANON_KEY|| ''
);

// Function to get chatbot name from domain settings
async function getChatbotName(domainId: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('domain_settings')
      .select('chatbot_name')
      .eq('domain_id', domainId)
      .single();

    if (error) throw error;
    return data?.chatbot_name || 'AI Assistant';
  } catch (error) {
    console.error('Error fetching chatbot name:', error);
    return 'AI Assistant';
  }
}

// System prompt will be generated dynamically
const getSystemPrompt = async (domainId: string) => {
  const chatbotName = await getChatbotName(domainId);
  return `You are a helpful customer support assistant, your name is "${chatbotName}". Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;
};

// Enable CORS middleware
const cors = async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle preflight requests
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

    // Return a friendly message for GET requests
    if (req.method === 'GET') {
      return res.status(200).json({ 
        message: 'Chat API endpoint is working. Please use POST method to send messages.',
        status: 'online' 
      });
    }

    if (req.method !== 'POST') {
      console.log('Method not allowed:', req.method);
      return res.status(405).json({ error: 'Method not allowed. Only POST requests are accepted for chat messages.' });
    }

    console.log('API Request received:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      rawBody: JSON.stringify(req.body),
      env: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    });

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

    const { message } = req.body;

    // Validate request body
    if (!message) {
      console.error('Missing message in request body');
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!req.body.domainId) {
      console.error('Missing domainId in request body');
      return res.status(400).json({ error: 'Domain ID is required' });
    }

    console.log('Making OpenAI API request with message:', message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: await getSystemPrompt(req.body.domainId) },
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
