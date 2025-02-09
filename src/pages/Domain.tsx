import React, { useState, useEffect, useRef } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useDomain } from '../context/DomainContext';
import { supabase } from '../lib/supabase';
import type { FAQ } from '../types/faq';
import ChatbotPreview from '../components/ChatbotPreview';
import DomainHeader from '../components/domain/DomainHeader';
import IntegrationCode from '../components/domain/IntegrationCode';
import ChatbotSettings from '../components/domain/ChatbotSettings';
import FAQSection from '../components/domain/FAQSection';

interface DomainSettings {
  chatbot_name: string;
  greeting_message: string;
  color: string;
  header_text_color: string;
  primary_color: string;
  agent_message_color: string;
  user_message_color: string;
  agent_message_text_color: string;
  user_message_text_color: string;
  logo_url: string | null;
}

export default function Domain() {
  const { currentDomain, updateDomainName } = useDomain();
  const [chatbotName, setChatbotName] = useState('Friendly Assistant');
  const [color, setColor] = useState('#FF6B00');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState('👋 Hi there! How can I help you today?');
  const [domainName, setDomainName] = useState(currentDomain?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const [qaList, setQaList] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [headerTextColor, setHeaderTextColor] = useState('#000000');
  const [showHeaderColorPicker, setShowHeaderColorPicker] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FF6B00');
  const [agentMessageColor, setAgentMessageColor] = useState('#E5E7EB');
  const [showAgentMessageColorPicker, setShowAgentMessageColorPicker] = useState(false);
  const [userMessageColor, setUserMessageColor] = useState('#FFF1E7');
  const [showUserMessageColorPicker, setShowUserMessageColorPicker] = useState(false);
  const [agentMessageTextColor, setAgentMessageTextColor] = useState('#000000');
  const [showAgentMessageTextColorPicker, setShowAgentMessageTextColorPicker] = useState(false);
  const [userMessageTextColor, setUserMessageTextColor] = useState('#000000');
  const [showUserMessageTextColorPicker, setShowUserMessageTextColorPicker] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const headerColorPickerRef = useRef<HTMLDivElement>(null);
  const agentMessageColorPickerRef = useRef<HTMLDivElement>(null);
  const userMessageColorPickerRef = useRef<HTMLDivElement>(null);
  const agentMessageTextColorPickerRef = useRef<HTMLDivElement>(null);
  const userMessageTextColorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDomainName(currentDomain?.name || '');
  }, [currentDomain?.name]);

  useEffect(() => {
    const fetchFAQs = async () => {
      if (!currentDomain?.id) return;

      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('domain_id', currentDomain.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setQaList(data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        toast.error('Failed to load FAQs');
      }
    };

    fetchFAQs();
  }, [currentDomain?.id]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!currentDomain?.id) return;

      try {
        const { data, error } = await supabase
          .from('domain_settings')
          .select('*')
          .eq('domain_id', currentDomain.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          const settings = data as DomainSettings;
          setChatbotName(settings.chatbot_name || 'Friendly Assistant');
          setGreetingMessage(settings.greeting_message || '👋 Hi there! How can I help you today?');
          setColor(settings.primary_color || '#FF6B00');
          setHeaderTextColor(settings.header_text_color || '#000000');
          setPrimaryColor(settings.primary_color || '#FF6B00');
          setAgentMessageColor(settings.agent_message_color || '#E5E7EB');
          setUserMessageColor(settings.user_message_color || '#FFF1E7');
          setAgentMessageTextColor(settings.agent_message_text_color || '#000000');
          setUserMessageTextColor(settings.user_message_text_color || '#000000');
          setLogoUrl(settings.logo_url);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      }
    };

    fetchSettings();
  }, [currentDomain?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (headerColorPickerRef.current && !headerColorPickerRef.current.contains(event.target as Node)) {
        setShowHeaderColorPicker(false);
      }
      if (agentMessageColorPickerRef.current && !agentMessageColorPickerRef.current.contains(event.target as Node)) {
        setShowAgentMessageColorPicker(false);
      }
      if (userMessageColorPickerRef.current && !userMessageColorPickerRef.current.contains(event.target as Node)) {
        setShowUserMessageColorPicker(false);
      }
      if (agentMessageTextColorPickerRef.current && !agentMessageTextColorPickerRef.current.contains(event.target as Node)) {
        setShowAgentMessageTextColorPicker(false);
      }
      if (userMessageTextColorPickerRef.current && !userMessageTextColorPickerRef.current.contains(event.target as Node)) {
        setShowUserMessageTextColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const integrationCode = `
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<link href="https://deplo-dash.vercel.app/widget/style.css" rel="stylesheet">
<script>
  window.CHATBOT_CONFIG = {
    domainId: "${currentDomain?.id || ''}",
    color: "${color}"
  };
</script>
<script src="https://deplo-dash.vercel.app/widget/chatbot-widget.umd.js"></script>
`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(integrationCode);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleDomainSave = () => {
    if (!domainName.trim()) {
      toast.error('Domain name cannot be empty');
      return;
    }
    
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domainName)) {
      toast.error('Please enter a valid domain name');
      return;
    }

    updateDomainName(domainName);
    setIsEditing(false);
    toast.success('Domain name updated successfully');
  };

  const handleAddQA = async () => {
    if (!newQuestion.trim() || !newAnswer.trim() || !currentDomain?.id) {
      toast.error('Both question and answer are required');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('faqs')
        .insert({
          question: newQuestion.trim(),
          answer: newAnswer.trim(),
          domain_id: currentDomain.id
        })
        .select()
        .single();

      if (error) throw error;

      setQaList([...qaList, data]);
      setNewQuestion('');
      setNewAnswer('');
      toast.success('FAQ added successfully');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast.error('Failed to add FAQ');
    }
  };

  const handleDeleteQA = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setQaList(qaList.filter(qa => qa.id !== id));
      toast.success('FAQ deleted successfully');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  const handleSaveAll = async () => {
    if (!currentDomain?.id) {
      toast.error('No domain selected');
      return;
    }

    if (!domainName.trim()) {
      toast.error('Domain name cannot be empty');
      return;
    }
    
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domainName)) {
      toast.error('Please enter a valid domain name');
      return;
    }

    try {
      const { error: settingsError } = await supabase
        .from('domain_settings')
        .upsert({
          domain_id: currentDomain.id,
          chatbot_name: chatbotName,
          greeting_message: greetingMessage,
          primary_color: color,
          header_text_color: headerTextColor,
          agent_message_color: agentMessageColor,
          user_message_color: userMessageColor,
          agent_message_text_color: agentMessageTextColor,
          user_message_text_color: userMessageTextColor,
          logo_url: logoUrl
        }, {
          onConflict: 'domain_id',
          ignoreDuplicates: false
        });

      if (settingsError) throw settingsError;

      updateDomainName(domainName);
      setIsEditing(false);
      toast.success('All changes saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save changes');
    }
  };

  const handleSaveSettings = async () => {
    if (!currentDomain?.id) return;

    try {
      const { error } = await supabase
        .from('domain_settings')
        .upsert({
          domain_id: currentDomain.id,
          chatbot_name: chatbotName,
          greeting_message: greetingMessage,
          primary_color: color,
          header_text_color: headerTextColor,
          agent_message_color: agentMessageColor,
          user_message_color: userMessageColor,
          agent_message_text_color: agentMessageTextColor,
          user_message_text_color: userMessageTextColor,
          logo_url: logoUrl
        });

      if (error) throw error;

      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Domain Settings</h1>
        <p className="text-gray-600">
          Configure and manage settings for your domain
        </p>
      </div>

      <div className="space-y-8">
        {/* Domain Settings Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Domain Settings</h2>
          <div className="bg-white rounded-lg shadow">
            <DomainHeader
              isEditing={isEditing}
              domainName={domainName}
              setDomainName={setDomainName}
              handleDomainSave={handleDomainSave}
              setIsEditing={setIsEditing}
              currentDomain={currentDomain}
            />
            <IntegrationCode
              integrationCode={integrationCode}
              copied={copied}
              handleCopyCode={handleCopyCode}
            />
          </div>
        </section>

        {/* Chatbot Settings Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Chatbot Settings</h2>
          <ChatbotSettings
            chatbotName={chatbotName}
            setChatbotName={setChatbotName}
            greetingMessage={greetingMessage}
            setGreetingMessage={setGreetingMessage}
            color={color}
            setColor={setColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            headerTextColor={headerTextColor}
            setHeaderTextColor={setHeaderTextColor}
            showHeaderColorPicker={showHeaderColorPicker}
            setShowHeaderColorPicker={setShowHeaderColorPicker}
            colorPickerRef={colorPickerRef}
            headerColorPickerRef={headerColorPickerRef}
            agentMessageColor={agentMessageColor}
            setAgentMessageColor={setAgentMessageColor}
            showAgentMessageColorPicker={showAgentMessageColorPicker}
            setShowAgentMessageColorPicker={setShowAgentMessageColorPicker}
            userMessageColor={userMessageColor}
            setUserMessageColor={setUserMessageColor}
            showUserMessageColorPicker={showUserMessageColorPicker}
            setShowUserMessageColorPicker={setShowUserMessageColorPicker}
            agentMessageColorPickerRef={agentMessageColorPickerRef}
            userMessageColorPickerRef={userMessageColorPickerRef}
            agentMessageTextColor={agentMessageTextColor}
            setAgentMessageTextColor={setAgentMessageTextColor}
            showAgentMessageTextColorPicker={showAgentMessageTextColorPicker}
            setShowAgentMessageTextColorPicker={setShowAgentMessageTextColorPicker}
            userMessageTextColor={userMessageTextColor}
            setUserMessageTextColor={setUserMessageTextColor}
            showUserMessageTextColorPicker={showUserMessageTextColorPicker}
            setShowUserMessageTextColorPicker={setShowUserMessageTextColorPicker}
            agentMessageTextColorPickerRef={agentMessageTextColorPickerRef}
            userMessageTextColorPickerRef={userMessageTextColorPickerRef}
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            domainId={currentDomain?.id || ''}
          />
        </section>

        {/* Help Desk Section - Temporarily Hidden
        <section>
          <h2 className="text-xl font-semibold mb-4">Help Desk</h2>
          <FAQSection
            qaList={qaList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            newAnswer={newAnswer}
            setNewAnswer={setNewAnswer}
            handleAddQA={handleAddQA}
            handleDeleteQA={handleDeleteQA}
          />
        </section>
        */}

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSaveAll}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Chatbot Preview */}
      <ChatbotPreview
        chatbotName={chatbotName}
        greetingMessage={greetingMessage}
        color={color}
        domainName={domainName}
        headerTextColor={headerTextColor}
        agentMessageColor={agentMessageColor}
        userMessageColor={userMessageColor}
        agentMessageTextColor={agentMessageTextColor}
        userMessageTextColor={userMessageTextColor}
      />
    </div>
  );
}