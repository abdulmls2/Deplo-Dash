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
      console.error('Error fetching conversation:', conversationError);
      throw conversationError;
    }

    if (!conversationData || !conversationData.domain_id) {
      console.error('No domain_id found for conversation:', conversationId);
      throw new Error('No domain_id found for conversation');
    }

    console.log('Found domain_id:', conversationData.domain_id);

    // Then fetch the domain settings using the domain_id
    const { data: domainSettings, error: domainError } = await supabase
      .from('domain_settings')
      .select('prompt')
      .eq('domain_id', conversationData.domain_id)
      .single();

    console.log('Domain settings fetch result:', { domainSettings, domainError });

    if (domainError) {
      console.error('Error fetching domain settings:', domainError);
      throw domainError;
    }

    if (!domainSettings || !domainSettings.prompt) {
      console.warn('No prompt found for domain:', conversationData.domain_id);
    } else {
      console.log('Found domain prompt:', domainSettings.prompt);
    }

    const API_URL = 'https://deplo-dash.vercel.app/api/chat';
    
    const requestBody = {
      message,
      conversationId,
      systemPrompt: domainSettings?.prompt
    };
    
    console.log('Sending request to API with body:', requestBody);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
