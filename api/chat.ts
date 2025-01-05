// api/chat.ts
import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Initialize Supabase client
console.log('Initializing Supabase client with URL:', process.env.VITE_SUPABASE_URL ? 'URL exists' : 'URL missing');
console.log('Supabase anon key status:', process.env.VITE_SUPABASE_ANON_KEY ? 'Key exists' : 'Key missing');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

// Default system prompt as fallback
const DEFAULT_SYSTEM_PROMPT = `You are a helpful customer support assistant. Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

// Function to get custom prompt for a domain
async function getCustomPrompt(conversationId: string): Promise<string> {
  try {
    console.log('Fetching custom prompt for conversationId:', conversationId);
    
    // First, get the domain_id from the conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('domain_id')
      .eq('id', conversationId)
      .single();

    console.log('Conversation query result:', { conversationData, conversationError });

    if (conversationError) {
      console.error('Error fetching conversation:', conversationError);
      throw conversationError;
    }

    if (!conversationData?.domain_id) {
      console.log('No domain_id found for conversation, using default prompt');
      return DEFAULT_SYSTEM_PROMPT;
    }

    console.log('Found domain_id:', conversationData.domain_id);

    // Then, get the custom prompt from domain_settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', conversationData.domain_id)
      .single();

    console.log('Domain settings query result:', { settingsData, settingsError });

    if (settingsError) {
      console.error('Error fetching domain settings:', settingsError);
      throw settingsError;
    }

    if (!settingsData?.prompt) {
      console.log('No custom prompt found in domain_settings, using default prompt');
      return DEFAULT_SYSTEM_PROMPT;
    }

    console.log('Using custom prompt from domain_settings:', settingsData.prompt);
    return settingsData.prompt;
  } catch (error) {
    console.error('Error fetching custom prompt:', error);
    return DEFAULT_SYSTEM_PROMPT;
  }
}

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

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not set');
      return res.status(500).json({ 
        error: 'OpenAI API key is not configured'
      });
    }

    const { message, conversationId } = req.body;

    // Validate request body
    if (!message || !conversationId) {
      return res.status(400).json({ error: 'Message and conversationId are required' });
    }

    // Get custom prompt for the domain
    const systemPrompt = await getCustomPrompt(conversationId);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    return res.status(200).json({ response });
  } catch (error: any) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}