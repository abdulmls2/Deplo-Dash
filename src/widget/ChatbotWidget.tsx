import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, X, Archive, MessageSquare, MessageSquarePlus, ChevronLeft, RefreshCw, ThumbsDown, Minus, ThumbsUp, UserRound, Hourglass } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { useConversationStore } from '../lib/store/conversationStore';
import { useChatbotStore } from '../lib/store/chatbotStore';

const SESSION_KEY = 'chatbot_session_id';
const CONVERSATION_EXPIRY_DAYS = 180; // 6 months default expiry

// Add layout constants at the top of the file
const LAYOUT_CONFIG = {
  chatWidth: '380px',
  chatHeight: '380px',
  verticalPosition: 'bottom' as const,
  verticalOffset: '15px',
  toggleButtonSize: '48px',
};

interface ChatbotConfig {
  chatbotName: string;
  greetingMessage: string;
  color: string;
  headerTextColor: string;
  agentMessageColor: string;
  userMessageColor: string;
  agentMessageTextColor: string;
  userMessageTextColor: string;
  logoUrl: string | null;
  // Layout settings
  chatWidth: string;
  chatHeight: string;
  verticalPosition: 'top' | 'bottom';
  verticalOffset: string;
  toggleButtonSize: string;
}

interface Message {
  id: string;
  content: string;
  sender_type: 'user' | 'bot';
  created_at: string;
}

interface Conversation {
  id: string;
  created_at: string;
  status: 'active' | 'archived';
  last_message_at: string;
  rating?: 'bad' | 'ok' | 'good';
  live_mode: boolean;
}

// Bot Icon Component
const BotIcon = ({ size = 'md', config }: { size?: 'sm' | 'md', config: ChatbotConfig }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  
  return config.logoUrl ? (
    <img 
      src={config.logoUrl} 
      alt={config.chatbotName}
      className={`${dimensions} rounded-full object-cover flex-shrink-0`}
    />
  ) : (
    <div className={`${dimensions} rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center`}>
      <span className={size === 'sm' ? 'text-base' : 'text-lg'}>🤖</span>
    </div>
  );
};

// Add this new component near the top of the file
const TypingIndicator = ({ config }: { config: ChatbotConfig }) => (
  <div className="flex gap-2">
    <BotIcon size="sm" config={config} />
    <div className="p-3 rounded-lg" style={{ backgroundColor: '#E5E7EB' }}>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
);

// SVG Icon Component
const ChatIcon = () => (
  <svg
    fill="#ffffff"
    height="14px" // Set to match button size
    width="14px"  // Set to match button size
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 60 60"
    xmlSpace="preserve"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689 c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01 c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z"></path>
    </g>
  </svg>
);

// Get the config from the window object
const getInitialConfig = (): ChatbotConfig => {
  const windowConfig = (window as any).CHATBOT_CONFIG || {};
  return {
    chatbotName: windowConfig.chatbotName || 'Chatbot',
    greetingMessage: windowConfig.greetingMessage || 'Hello! How can I help you today?',
    color: windowConfig.color || '#FF6B00',
    headerTextColor: windowConfig.headerTextColor || '#000000',
    agentMessageColor: windowConfig.agentMessageColor || '#E5E7EB',
    userMessageColor: windowConfig.userMessageColor || '#FFF1E7',
    agentMessageTextColor: windowConfig.agentMessageTextColor || '#000000',
    userMessageTextColor: windowConfig.userMessageTextColor || '#000000',
    logoUrl: windowConfig.logoUrl || null,
    ...LAYOUT_CONFIG
  };
};

export default function ChatbotWidget({ domainId }: { domainId: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [view, setView] = useState<'history' | 'chat'>('history');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedMessageIds] = useState(new Set<string>());
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isArchived, setIsArchived] = useState(false);
  const notificationSound = useRef<HTMLAudioElement | null>(null);
  const { sendMessage: chatbotSendMessage } = useChatbotStore();
  const [isRequestingLiveChat, setIsRequestingLiveChat] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileMessage, setShowMobileMessage] = useState(true);

  // Replace the existing config state with the new initialization
  const [config, setConfig] = useState<ChatbotConfig>(getInitialConfig());

  // Modify the fetchConfig useEffect to only update if values are different
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await supabase
          .from('domain_settings')
          .select('*')
          .eq('domain_id', domainId)
          .single();

        if (data) {
          setConfig(prevConfig => ({
            ...prevConfig,
            chatbotName: data.chatbot_name || prevConfig.chatbotName,
            greetingMessage: data.greeting_message || prevConfig.greetingMessage,
            color: data.primary_color || prevConfig.color,
            headerTextColor: data.header_text_color || prevConfig.headerTextColor,
            agentMessageColor: data.agent_message_color || prevConfig.agentMessageColor,
            userMessageColor: data.user_message_color || prevConfig.userMessageColor,
            agentMessageTextColor: data.agent_message_text_color || prevConfig.agentMessageTextColor,
            userMessageTextColor: data.user_message_text_color || prevConfig.userMessageTextColor,
            logoUrl: data.logo_url || prevConfig.logoUrl,
          }));
        }
      } catch (error) {
        console.error('Error fetching chatbot config:', error);
      }
    };

    if (domainId) {
      fetchConfig();
    }
  }, [domainId]);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileView = () => window.matchMedia('(max-width: 640px)').matches;

  // Add this helper function at the top of the components
  const isMessageDuplicate = (newMsg: Message, existingMessages: Message[]) => {
    return existingMessages.some(msg => 
      // Check for exact ID match
      msg.id === newMsg.id ||
      // Check for temp ID being replaced by real ID
      (msg.id.startsWith('temp-') && msg.content === newMsg.content && msg.sender_type === newMsg.sender_type) ||
      // Check for exact content match within a small time window (2 seconds)
      (msg.content === newMsg.content && 
       msg.sender_type === newMsg.sender_type && 
       Math.abs(new Date(msg.created_at).getTime() - new Date(newMsg.created_at).getTime()) < 2000)
    );
  };

  // Subscribe to new conversations
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel('new-conversations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newConversation = payload.new as Conversation;
            setConversations(prevConversations => [newConversation, ...prevConversations]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel('conversations-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            // Update the conversation in the list
            setConversations(prevConversations => 
              prevConversations.map(conv => 
                conv.id === payload.new.id ? { ...conv, ...payload.new } : conv
              )
            );

            // If this is the current conversation, update archived status
            if (payload.new.id === conversationId) {
              setIsArchived(payload.new.status === 'archived');
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sessionId, conversationId]);

  useEffect(() => {
    if (isExpanded && (messages.length > 0 || isArchived)) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded, isArchived]);

  // Load conversation history
  const loadConversationHistory = async () => {
    if (!sessionId) return;
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('session_id', sessionId)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversation history:', error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      loadConversationHistory();
    }
  }, [sessionId]);

  const handleStartNewConversation = async () => {
    if (conversations.filter(conv => conv.status === 'active').length >= 5) {
        return;
    }
    setMessages([]);
    setConversationId(null);
    setIsArchived(false);
    setConversationRating(null);  // Reset conversation rating
    setIsRequestingLiveChat(false); // Reset live chat request state
    setView('chat');
  };

  const handleBackToHistory = () => {
    setView('history');
    setMessages([]);
    setConversationId(null);
    setIsArchived(false);
    loadConversationHistory(); // Refresh conversation history when going back to history view
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    try {
      setConversationId(conversation.id);
      setIsArchived(conversation.status === 'archived');
      setConversationRating(null);
      setIsRequestingLiveChat(false); // Reset live chat request state
      
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (messages) {
        setMessages(messages);
        processedMessageIds.clear();
        messages.forEach(msg => processedMessageIds.add(msg.id));
      }
      
      if (conversation.status === 'archived') {
        setConversationRating(conversation.rating || null);
      }
      
      setView('chat');
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  // Subscribe to conversation status changes
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`conversation-status:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
          filter: `id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.new.status === 'archived') {
            setIsArchived(true);
            playNotificationSound();
          } else {
            setIsArchived(false);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [conversationId]);

  // Initialize notification sound
  useEffect(() => {
    notificationSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
  }, []);

  const playNotificationSound = () => {
    if (notificationSound.current) {
      notificationSound.current.currentTime = 0; // Reset sound to start
      notificationSound.current.play().catch(error => {
        console.log('Error playing notification:', error);
      });
    }
  };

  // Add real-time subscription for messages
  useEffect(() => {
    if (!conversationId) {
      console.log('No conversation ID yet, skipping subscription');
      return;
    }

    console.log('Setting up subscription for conversation:', conversationId);

    const channel = supabase.channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('Received real-time event:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new as Message;
            console.log('New message:', newMessage);

            setMessages(prevMessages => {
              // Use the enhanced duplicate detection
              if (isMessageDuplicate(newMessage, prevMessages)) {
                console.log('Message already exists, skipping');
                return prevMessages;
              }

              // If this is a real message replacing a temp message, remove the temp message
              const updatedMessages = prevMessages.filter(msg => 
                !(msg.id.startsWith('temp-') && 
                  msg.content === newMessage.content && 
                  msg.sender_type === newMessage.sender_type)
              );

              // Add message ID to processed set
              processedMessageIds.add(newMessage.id);

              // Play sound for all bot messages, regardless of widget state
              if (newMessage.sender_type === 'bot') {
                playNotificationSound();
              }

              console.log('Adding new message to state');
              return [...updatedMessages, newMessage];
            });
          }
        }
      );

    channel.subscribe((status) => {
      console.log('Subscription status:', status);
    });

    return () => {
      console.log('Cleaning up subscription for conversation:', conversationId);
      channel.unsubscribe();
    };
  }, [conversationId, isExpanded]);

  useEffect(() => {
    // Initialize session and load existing conversation
    const initializeSession = async () => {
      let currentSessionId = localStorage.getItem(SESSION_KEY);
      
      if (!currentSessionId) {
        // Use the global crypto object
        currentSessionId = window.crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, currentSessionId);
      }
      
      setSessionId(currentSessionId);
      await loadExistingConversation(currentSessionId);
    };

    initializeSession();
  }, []);

  const loadExistingConversation = async (currentSessionId: string) => {
    try {
      // First check if there are any conversations
      const { data: conversations, error: fetchError } = await supabase
        .from('conversations')
        .select('*')
        .eq('session_id', currentSessionId)
        .eq('status', 'active')
        .order('last_message_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;
      
      // If no conversations found, return early
      if (!conversations || conversations.length === 0) {
        console.log('No active conversations found for this session');
        return;
      }

      const conversation = conversations[0];

      // Check if conversation has expired
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() - CONVERSATION_EXPIRY_DAYS);
      
      if (new Date(conversation.last_message_at) < expiryDate) {
        // Conversation has expired, archive it
        await supabase
          .from('conversations')
          .update({ status: 'archived' })
          .eq('id', conversation.id);
        return;
      }

      setConversationId(conversation.id);

      // Load existing messages
      const { data: existingMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (existingMessages) {
        const uniqueMessages = existingMessages.filter(msg => {
          if (processedMessageIds.has(msg.id)) {
            return false;
          }
          processedMessageIds.add(msg.id);
          return true;
        });
        setMessages(uniqueMessages);
      }
    } catch (error) {
      // Only log actual errors, not "no results" cases
      if (error instanceof Error && !error.message.includes('no rows returned')) {
        console.error('Error loading existing conversation:', error);
        setError('Failed to load conversation history');
      }
    }
  };

  const createConversation = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If no user, create anonymous session
      if (!user) {
        await supabase.auth.signInAnonymously();
        const { data: { user: anonUser } } = await supabase.auth.getUser();
        if (!anonUser) throw new Error('Failed to create anonymous session');
        
        const { data, error } = await supabase
          .from('conversations')
          .insert({
            domain_id: domainId,
            user_id: anonUser.id,
            session_id: sessionId,
            last_message_at: new Date().toISOString(),
            status: 'active'
          })
          .select()
          .single();

        if (error) throw error;
        return data.id;
      }

      // If user exists, proceed with user.id
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          domain_id: domainId,
          user_id: user.id,
          session_id: sessionId,
          last_message_at: new Date().toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  };

  const sendMessage = async (content: string) => {
    try {
        setIsLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            await supabase.auth.signInAnonymously();
        }
        
        // Create a new conversation if one doesn't exist
        const currentConversationId = conversationId || await createConversation();
        if (!conversationId) {
            setConversationId(currentConversationId);
        }

        // Create a temporary message object for immediate display
        const tempMessage: Message = {
            id: `temp-${Date.now()}`,
            content: content,
            sender_type: 'user',
            created_at: new Date().toISOString(),
        };

        // Add to messages and trigger scroll
        setMessages(prevMessages => {
            if (isMessageDuplicate(tempMessage, prevMessages)) {
                return prevMessages;
            }
            // Force scroll after state update using setTimeout
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return [...prevMessages, tempMessage];
        });

        // Send message through chatbot store which will handle OpenAI integration
        await chatbotSendMessage(content, currentConversationId);

        setMessage(''); // Clear the input field to show placeholder
    } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    await sendMessage(message.trim());
  };

  const buttonStyle = {
    backgroundColor: config.color,
  };

  // Add this function near your other handler functions
  const handleRefreshChat = async () => {
    if (conversationId) {
      try {
        // Clear current messages
        setMessages([]);
        processedMessageIds.clear();
        
        // Reload messages for current conversation
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (messages) {
          setMessages(messages);
          messages.forEach(msg => processedMessageIds.add(msg.id));
        }
      } catch (error) {
        console.error('Error refreshing chat:', error);
        setError('Failed to refresh chat');
      }
    }
  };

  const [conversationRating, setConversationRating] = useState<'bad' | 'ok' | 'good' | null>(null);

  const handleRateConversation = async (rating: 'bad' | 'ok' | 'good') => {
    if (!conversationId) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .update({ rating })
        .eq('id', conversationId);

      if (error) throw error;

      setConversationRating(rating);
      
      // Optimistically update the local state
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversationId ? { ...conv, rating } : conv
        )
      );
    } catch (error) {
      console.error('Error rating conversation:', error);
    }
  };

  const handleRequestLiveChat = async () => {
    if (!conversationId) return;
    
    try {
      // Update conversation with live chat request
      const { error } = await supabase
        .from('conversations')
        .update({ 
          requested_live_at: new Date().toISOString()
        })
        .eq('id', conversationId);

      if (error) throw error;

      setIsRequestingLiveChat(true);
      
      // Add system message about live chat request
      const systemMessage: Message = {
        id: `temp-${Date.now()}`,
        content: "I'll connect you with a live agent. Please wait a moment while I transfer your chat.",
        sender_type: 'bot',
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, systemMessage]);

    } catch (error) {
      console.error('Error requesting live chat:', error);
      setError('Failed to request live chat. Please try again.');
    }
  };

  return (
    <div className={`fixed ${config.verticalPosition}-0 right-6 flex flex-col items-end z-[9999]`} 
      style={{ [config.verticalPosition]: config.verticalOffset }}>
      {isExpanded && (
        <div className={`${isMobileView() ? 'fixed inset-0 w-full h-full flex flex-col' : 'mb-4 bg-white rounded-lg shadow-xl overflow-hidden'}`}
          style={{ 
            width: isMobileView() ? '100%' : config.chatWidth
          }}>
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3" style={{ backgroundColor: config.color }}>
            <div className="relative flex-shrink-0">
              <BotIcon config={config} />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={buttonStyle}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium" style={{ color: config.headerTextColor }}>{config.chatbotName}</h3>
            </div>
            {view === 'chat' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackToHistory}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm"
                  style={{ color: config.headerTextColor }}
                  title="Chat history"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRefreshChat}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm"
                  style={{ color: config.headerTextColor }}
                  title="Refresh chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm"
                  style={{ color: config.headerTextColor }}
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm"
                  style={{ color: config.headerTextColor }}
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className={`overflow-y-auto p-4 bg-white relative ${isMobileView() ? 'flex-1' : ''}`} 
            style={{ 
              height: isMobileView() ? 'auto' : (view === 'history' ? 'calc(' + config.chatHeight + ' + 107px)' : config.chatHeight)
            }}>
            {view === 'history' ? (
              <div className="space-y-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-900">Conversation History</h3>
                  <div className="flex flex-col items-end gap-1">
                    <button
                      onClick={handleStartNewConversation}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                      style={{ backgroundColor: config.color, color: config.headerTextColor }}
                      disabled={conversations.filter(conv => conv.status === 'active').length >= 5}
                      title={!isMobileView() && conversations.filter(conv => conv.status === 'active').length >= 5 ? 'You can only have 5 active conversations at a time.' : ''}
                    >
                      <MessageSquarePlus className="h-4 w-4" />
                      Start New Chat
                    </button>
                    {isMobileView() && conversations.filter(conv => conv.status === 'active').length >= 5 && showMobileMessage && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>Maximum 5 active conversations allowed</span>
                        <button 
                          onClick={() => setShowMobileMessage(false)}
                          className="p-1 hover:text-gray-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className="w-full text-left p-4 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {format(new Date(conv.created_at), 'PPP')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        conv.status === 'archived' 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {conv.status === 'archived' ? 'Archived' : 'Active'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Last message: {format(new Date(conv.last_message_at), 'p')}
                    </p>
                  </button>
                ))}
                {conversations.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="mb-4">No previous conversations found</p>
                  </div>
                )}
              </div>
            ) : (
            <div className="space-y-4">
              {/* Welcome Message */}
              {/* Always show greeting message in chat view */}
              {view === 'chat' && (
                <div className="flex gap-2">
                  <BotIcon size="sm" config={config} />
                  <div className="p-3 rounded-lg max-w-[80%]" style={{ backgroundColor: config.agentMessageColor }}>
                    <p className="text-sm" style={{ color: config.agentMessageTextColor }}>{config.greetingMessage}</p>
                    <span className="text-xs mt-1 block opacity-75" style={{ color: config.agentMessageTextColor }}>
                      {format(new Date(), 'h:mm a')}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender_type === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.sender_type === 'bot' && <BotIcon size="sm" config={config} />}
                  <div 
                    className="p-3 rounded-lg max-w-[80%]"
                    style={{ 
                      backgroundColor: msg.sender_type === 'user' ? config.userMessageColor : config.agentMessageColor
                    }}
                  >
                    <p className="text-sm" style={{ 
                      color: msg.sender_type === 'user' ? config.userMessageTextColor : config.agentMessageTextColor 
                    }}>
                      {msg.content}
                    </p>
                    <span className="text-xs mt-1 block opacity-75" style={{ 
                      color: msg.sender_type === 'user' ? config.userMessageTextColor : config.agentMessageTextColor 
                    }}>
                      {format(new Date(msg.created_at), 'h:mm a')}
                    </span>
                  </div>
                  {msg.sender_type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center">
                      👤
                    </div>
                  )}
                </div>
              ))}
              {isLoading && !isArchived && !conversations.find(c => c.id === conversationId)?.live_mode && (
                <TypingIndicator config={config} />
              )}
              {isArchived && (
                <div className="flex flex-col items-center gap-3 my-4">
                  <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2 text-gray-600">
                    <Archive className="h-4 w-4" />
                    <span className="text-sm">This conversation has been archived</span>
                  </div>
                  
                  {!conversationRating && (
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-gray-600">How was this conversation?</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRateConversation('bad')}
                          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>Bad</span>
                        </button>
                        <button
                          onClick={() => handleRateConversation('ok')}
                          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                          <span>OK</span>
                        </button>
                        <button
                          onClick={() => handleRateConversation('good')}
                          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Good</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {conversationRating && (
                    <div className="flex flex-col items-center gap-2 text-center">
                      <span className="text-sm text-gray-600">You rated this conversation:</span>
                      <span className={`font-medium ${
                        conversationRating === 'bad' ? 'text-red-600' :
                        conversationRating === 'ok' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {conversationRating === 'bad' ? 'Bad 👎' : 
                         conversationRating === 'ok' ? 'OK 😐' : 
                         'Good 👍'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            )}
          </div>

          {/* Input Area */}
          {view === 'chat' && <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={isLoading ? '' : message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ '--tw-ring-color': config.color } as React.CSSProperties}
                  disabled={isLoading || isArchived} />
              </div>
              <button 
                type="submit"
                disabled={!message.trim() || isLoading || isArchived}
                className="p-2 rounded-full text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                style={buttonStyle}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center mt-2">
              <a 
                href="https://dashboard.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Powered by Dashboard.ai
              </a>
            </div>
          </form>}
        </div>
      )}

      {/* Toggle Button */}
      <button
        className="rounded-full text-white flex items-center justify-center shadow-lg"
        style={{ 
          backgroundColor: config.color,
          width: config.toggleButtonSize,
          height: config.toggleButtonSize
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <span style={{ fontSize: '24px' }}>×</span> // Close icon as text
        ) : (
          <ChatIcon /> // Use the custom chat icon here
        )}
      </button>
    </div>
  );
}