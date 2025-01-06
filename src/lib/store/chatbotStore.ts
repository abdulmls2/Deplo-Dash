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
    try {
      // Always send as user message with null user_id to indicate it's from the widget
      console.log('Sending user message from widget:', content);
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

      // Get conversation data and domain settings
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select('domain_id, live_mode')
        .eq('id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      if (!conversationData.domain_id) {
        console.error('No domain_id found in conversation:', conversationData);
        throw new Error('No domain_id found in conversation');
      }

      console.log('Conversation data:', {
        conversationId,
        domainId: conversationData.domain_id,
        liveMode: conversationData.live_mode
      });

      const { data: domainSettings, error: settingsError } = await supabase
        .from('domain_settings')
        .select('chatbot_name')
        .eq('domain_id', conversationData.domain_id)
        .single();

      if (settingsError) {
        console.error('Error fetching domain settings:', {
          error: settingsError,
          domainId: conversationData.domain_id
        });
        throw settingsError;
      }

      if (!domainSettings || !domainSettings.chatbot_name) {
        console.error('No chatbot name found in domain settings:', {
          domainId: conversationData.domain_id,
          domainSettings
        });
        throw new Error('Chatbot name not configured for this domain');
      }

      console.log('Domain settings:', {
        domainId: conversationData.domain_id,
        chatbotName: domainSettings.chatbot_name
      });

      // Only generate OpenAI response if live mode is disabled
      if (!conversationData.live_mode) {
        console.log('Live mode disabled, generating OpenAI response with:', {
          content,
          conversationId,
          domainId: conversationData.domain_id,
          chatbotName: domainSettings.chatbot_name
        });
        try {
          if (!domainSettings?.chatbot_name) {
            console.error('Chatbot name is missing from domain settings:', {
              domainId: conversationData.domain_id,
              domainSettings
            });
            throw new Error('Chatbot name not configured');
          }

          const botResponse = await generateBotResponse(
            content, 
            conversationId, 
            conversationData.domain_id, 
            domainSettings.chatbot_name
          );
          console.log('Got OpenAI response:', botResponse);
          
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
