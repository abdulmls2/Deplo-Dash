// Vercel Serverless Function for OpenAI Chat API
import { OpenAI } from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../src/lib/supabase';

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
    // Handle CORS first
    if (await cors(req, res)) return;

    console.log('API Request received:', {
      method: req.method,
      body: req.body,
    });

    const { message, conversationId } = req.body;

    // Get domain_id from conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('domain_id')
      .eq('id', conversationId)
      .single();

    console.log('Conversation data:', {
      conversationId,
      conversationData,
      error: conversationError
    });

    if (conversationError) {
      console.error('Conversation error:', conversationError);
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Get prompt from domain_settings
    const { data: domainSettings, error: settingsError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', conversationData.domain_id)
      .single();

    console.log('Domain settings:', {
      domainId: conversationData.domain_id,
      settings: domainSettings,
      error: settingsError
    });

    if (settingsError) {
      console.error('Settings error:', settingsError);
      return res.status(404).json({ error: 'Domain settings not found' });
    }

    console.log('Using prompt:', domainSettings.prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: domainSettings.prompt },
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    console.log('OpenAI response:', response);
    
    return res.status(200).json({ response });
  } catch (error: any) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
