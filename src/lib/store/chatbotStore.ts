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
      // Get the conversation's domain_id and settings first
      const { data: conversation } = await supabase
        .from('conversations')
        .select('domain_id')
        .eq('id', conversationId)
        .single();

      // Get chatbot name from domain settings
      const { data: domainSettings } = await supabase
        .from('domain_settings')
        .select('chatbot_name, prompt')
        .eq('domain_id', conversation?.domain_id)
        .single();

      const chatbotName = domainSettings?.chatbot_name;
      const prompt = domainSettings?.prompt;
      
      if (!chatbotName) {
        console.error('No chatbot name found in domain settings, cannot proceed with OpenAI request');
        throw new Error('Chatbot configuration is incomplete');
      }

      // Get all training data content for the domain
      const { data: trainingData, error: trainingError } = await supabase
        .from('training_data')
        .select('content')
        .eq('domain_id', conversation?.domain_id);

      if (trainingError) {
        console.error('Error fetching training data:', trainingError.message);
      }

      // Fetch last 10 messages from the conversation
      const { data: messageHistory, error: historyError } = await supabase
        .from('messages')
        .select('content, sender_type')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (historyError) {
        console.error('Error fetching message history:', historyError.message);
      }

      // Convert messages to the format expected by OpenAI
      const formattedHistory = messageHistory
        ?.reverse()
        ?.map(msg => ({
          role: msg.sender_type as 'user' | 'bot',
          content: msg.content
        })) || [];

      const trainingContents = trainingData?.map(entry => entry.content) || [];

      // Always send as user message with null user_id to indicate it's from the widget
      console.log(`Sending user message from ${chatbotName}:`, {
        message: content,
        trainingData: trainingContents.length > 0 ? trainingContents : 'No training data',
        messageHistory: formattedHistory
      });

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
          const { response: botResponse, isLiveChatRequested } = await generateBotResponse(
            content, 
            conversationId, 
            prompt, 
            trainingContents,
            formattedHistory
          );
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

          // If live chat was requested through conversation, update the conversation
          if (isLiveChatRequested) {
            const { error: updateError } = await supabase
              .from('conversations')
              .update({ 
                requested_live_at: new Date().toISOString()
              })
              .eq('id', conversationId);

            if (updateError) throw updateError;
            set({ isLoading: false });
          }
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
