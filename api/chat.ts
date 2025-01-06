// Vercel Serverless Function for OpenAI Chat API
import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const SYSTEM_PROMPT = `You are a helpful customer support assistant, your name is "". Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

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
      debug: req.body.debug || 'no debug info',
      env: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    });

    if (req.method !== 'POST') {
      console.error('Method not allowed:', {
        method: req.method,
        allowedMethod: 'POST'
      });
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('Configuration error: OpenAI API key is not set');
      return res.status(500).json({ 
        error: 'OpenAI API key is not configured',
        env: process.env.NODE_ENV === 'development' ? {
          hasApiKey: !!process.env.OPENAI_API_KEY,
          nodeEnv: process.env.NODE_ENV
        } : undefined
      });
    }

    const { message, chatbotName, debug } = req.body;

    console.error('Request validation:', {
      timestamp: new Date().toISOString(),
      receivedBody: {
        message: message || 'missing',
        chatbotName: chatbotName || 'missing',
        debug: debug || 'no debug info'
      },
      bodyKeys: Object.keys(req.body),
      rawBody: req.body
    });

    // Validate request body
    if (!message) {
      console.error('Validation failed: Missing message', {
        bodyKeys: Object.keys(req.body),
        receivedMessage: message
      });
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!chatbotName) {
      console.error('Validation failed: Missing chatbot name', {
        bodyKeys: Object.keys(req.body),
        receivedChatbotName: chatbotName,
        fullBody: req.body,
        debug: debug || 'no debug info'
      });
      return res.status(400).json({ error: 'Chatbot name is required' });
    }

    console.log('Preparing OpenAI request:', {
      timestamp: new Date().toISOString(),
      message,
      chatbotName,
      debug
    });

    const systemPrompt = `You are a helpful customer support assistant, your name is "${chatbotName}". Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
