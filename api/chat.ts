import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

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
      console.error('Missing message or conversationId in request body');
      return res.status(400).json({ error: 'Message and conversationId are required' });
    }

    console.log('Received conversationId (messageId):', conversationId);

    // Step 1: Fetch conversation_id from the messages table
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .select('conversation_id')
      .eq('id', conversationId)
      .single();

    if (messageError || !messageData) {
      console.error('Error fetching message:', messageError);
      return res.status(404).json({ error: 'Message not found' });
    }

    const conversation_id = messageData.conversation_id;

    console.log('Fetched conversation_id:', conversation_id);

    // Step 2: Fetch domain_id from the conversations table
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .select('domain_id')
      .eq('id', conversation_id)
      .single();

    if (conversationError || !conversation) {
      console.error('Error fetching conversation:', conversationError);
      return res.status(404).json({ error: 'Conversation not found' });
    }

    let domainId = conversation.domain_id;

    // If domain_id is null, use a default chatbot_name
    let chatbotName = 'Friendly Assistant'; // Default name

    if (domainId) {
      // Step 3: Fetch chatbot_name from domain_settings table
      const { data: domainSettings, error: domainSettingsError } = await supabase
        .from('domain_settings')
        .select('chatbot_name')
        .eq('domain_id', domainId)
        .single();

      if (domainSettings && domainSettings.chatbot_name) {
        chatbotName = domainSettings.chatbot_name;
      } else {
        console.warn('Failed to fetch chatbot_name, using default.');
      }
    } else {
      console.warn('Conversation does not have a domain_id, using default chatbot name.');
    }

    // Construct SYSTEM_PROMPT with chatbot_name
    const SYSTEM_PROMPT = `You are a helpful customer support assistant, your name is "${chatbotName}". Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

    console.log('Making OpenAI API request with message:', message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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