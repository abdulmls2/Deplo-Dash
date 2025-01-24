// Vercel Serverless Function for OpenAI Chat API
import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Add conversation history map
const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();

const DEFAULT_PROMPT = `You are a helpful customer support assistant. Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.

If the user requests to speak with a live agent, human, or real person (examples: "live chat", "can I speak to a human", "I want to talk to a real person", "connect me to an agent", etc.), respond with exactly this message:

"[LIVE_CHAT_REQUESTED]I'll connect you with a live agent. Please wait a moment while I transfer your chat."`;

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

    const { message, chatbotName, customPrompt, conversationId } = req.body;

    // Validate request body
    if (!message) {
      console.error('Missing message in request body');
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Making OpenAI API request with message:', message);
    if (customPrompt) {
      console.log('Using custom prompt from domain settings');
    } else {
      console.log('Using default prompt');
    }

    // Get or initialize conversation history
    if (!conversationHistory.has(conversationId)) {
      conversationHistory.set(conversationId, [
        { 
          role: "system", 
          content: customPrompt 
            ? `${customPrompt}\n\nIf the user requests to speak with a live agent, human, or real person (examples: "can I speak to a human", "I want to talk to a real person", "connect me to an agent", etc.), respond with exactly this message:\n\n"[LIVE_CHAT_REQUESTED]I'll connect you with a live agent. Please wait a moment while I transfer your chat."\n\nHere is some additional context to help you answer questions:\n\nTraining Data:\n${trainingData?.join('\n') || 'No training data'}`
            : DEFAULT_PROMPT 
        }
      ]);
    }

    // Get current history and add user message
    const history = conversationHistory.get(conversationId)!;
    history.push({ role: "user", content: message });

    // Limit history to last 10 messages to prevent token limit issues
    const recentHistory = history.slice(-10);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: recentHistory,
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    console.log('OpenAI API response:', response);
    
    // Add assistant response to history
    history.push({ role: "assistant", content: response });
    
    // Check if response contains live chat request
    const isLiveChatRequested = response.includes('[LIVE_CHAT_REQUESTED]');
    const cleanResponse = response.replace('[LIVE_CHAT_REQUESTED]', '');
    
    return res.status(200).json({ 
      response: cleanResponse,
      isLiveChatRequested 
    });
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
