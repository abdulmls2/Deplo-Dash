import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';
import { generateBotResponse } from '../openai';

type Message = Database['public']['Tables']['messages']['Row'];

interface ChatbotStore {
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, conversationId: string) => Promise<void>;
}

export const useChatbotStore = create<ChatbotStore>((set, get) => ({
  isLoading: false,
  error: null,

  sendMessage: async (content: string, conversationId: string) => {
    set({ isLoading: true, error: null });
    console.log('DEBUG: Starting sendMessage with latest code');
    try {
      // Get the conversation's domain_id first
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('domain_id')
        .eq('id', conversationId)
        .single();

      if (convError) {
        console.error('Error fetching conversation:', convError);
      }

      let chatbotName = 'Chatbot';
      if (conversation?.domain_id) {
        console.log('Found domain_id:', conversation.domain_id);
        // Then get the domain settings
        const { data: domainSettings, error: settingsError } = await supabase
          .from('domain_settings')
          .select('chatbot_name')
          .eq('domain_id', conversation.domain_id)
          .single();

        if (settingsError) {
          console.error('Error fetching domain settings:', settingsError);
        } else if (!domainSettings) {
          console.log('No domain settings found for domain_id:', conversation.domain_id);
        } else {
          chatbotName = domainSettings.chatbot_name || 'Chatbot';
          console.log('Successfully loaded chatbot name:', chatbotName);
        }
      } else {
        console.log('No domain_id found for conversation:', conversationId);
      }

      // Always send as user message with null user_id to indicate it's from the widget
      console.log(`Sending user message from ${chatbotName} widget:`, content);
      const messageData = {
        conversation_id: conversationId,
        content,
        sender_type: 'user',
        user_id: null
      };

      const { error: messageError } = await supabase
        .from('messages')
        .insert(messageData);

      if (messageError) throw messageError;

      // Check if live mode is enabled
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select('live_mode')
        .eq('id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      // Only generate OpenAI response if live mode is disabled
      if (!conversationData.live_mode) {
        console.log(`Live mode disabled for ${chatbotName}, generating OpenAI response`);
        try {
          const botResponse = await generateBotResponse(content, conversationId);
          console.log(`Got OpenAI response for ${chatbotName}:`, botResponse);
          
          // Send bot response
          const botMessageData = {
            conversation_id: conversationId,
            content: botResponse,
            sender_type: 'bot',
            user_id: null
          };

          const { error: botError } = await supabase
            .from('messages')
            .insert(botMessageData);

          if (botError) throw botError;
        } catch (error) {
          console.error('Error generating bot response:', error);
          toast.error('Failed to generate bot response');
        }
      } else {
        console.log('Live mode enabled, skipping OpenAI response');
      }

      // Update conversation last_message_at
      const { error: updateError } = await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (updateError) throw updateError;
    } catch (error: any) {
      console.error('Error sending message:', error);
      set({ error: error.message });
      toast.error('Failed to send message');
    } finally {
      set({ isLoading: false });
    }
  },
}));
