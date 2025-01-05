import { supabase } from './supabase';

// Function to generate bot response using the API endpoint
export const generateBotResponse = async (message: string, conversationId: string): Promise<string> => {
  try {
    // First fetch the conversation to get domain_id
    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('domain_id')
      .eq('id', conversationId)
      .single();

    if (conversationError) {
      console.error('[Server] Error fetching conversation:', conversationError);
      throw conversationError;
    }

    if (!conversationData || !conversationData.domain_id) {
      console.error('[Server] No domain_id found for conversation:', conversationId);
      throw new Error('No domain_id found for conversation');
    }

    console.log('[Server] Found domain_id:', conversationData.domain_id);

    // Then fetch the domain settings using the domain_id
    const { data: domainSettings, error: domainError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', conversationData.domain_id)
      .single();

    console.log('[Server] Domain settings fetch result:', {
      hasSettings: !!domainSettings,
      hasPrompt: !!domainSettings?.prompt,
      error: !!domainError,
      domain_id: conversationData.domain_id
    });

    if (domainError) {
      console.error('[Server] Error fetching domain settings:', domainError);
      throw domainError;
    }

    if (!domainSettings || !domainSettings.prompt) {
      console.warn('[Server] No prompt found for domain:', conversationData.domain_id);
    } else {
      console.log('[Server] Found domain prompt for domain:', conversationData.domain_id);
    }

    const API_URL = 'https://deplo-dash.vercel.app/api/chat';
    
    const requestBody = {
      message,
      conversationId,
      systemPrompt: domainSettings?.prompt
    };
    
    console.log('[Server] Sending request to API with systemPrompt:', !!requestBody.systemPrompt);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('[Server] API Response Error:', {
        status: response.status,
        statusText: response.statusText
      });
      const errorText = await response.text();
      console.error('[Server] Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Server] Received API response');
    return data.response || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('[Server] Error generating response:', error);
    throw error;
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
