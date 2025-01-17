import React, { useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ChatbotSettingsProps {
  chatbotName: string;
  setChatbotName: (name: string) => void;
  greetingMessage: string;
  setGreetingMessage: (message: string) => void;
  color: string;
  setColor: (color: string) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
  headerTextColor: string;
  setHeaderTextColor: (color: string) => void;
  showHeaderColorPicker: boolean;
  setShowHeaderColorPicker: (show: boolean) => void;
  colorPickerRef: React.RefObject<HTMLDivElement>;
  headerColorPickerRef: React.RefObject<HTMLDivElement>;
  agentMessageColor: string;
  setAgentMessageColor: (color: string) => void;
  showAgentMessageColorPicker: boolean;
  setShowAgentMessageColorPicker: (show: boolean) => void;
  userMessageColor: string;
  setUserMessageColor: (color: string) => void;
  showUserMessageColorPicker: boolean;
  setShowUserMessageColorPicker: (show: boolean) => void;
  agentMessageColorPickerRef: React.RefObject<HTMLDivElement>;
  userMessageColorPickerRef: React.RefObject<HTMLDivElement>;
  agentMessageTextColor: string;
  setAgentMessageTextColor: (color: string) => void;
  showAgentMessageTextColorPicker: boolean;
  setShowAgentMessageTextColorPicker: (show: boolean) => void;
  userMessageTextColor: string;
  setUserMessageTextColor: (color: string) => void;
  showUserMessageTextColorPicker: boolean;
  setShowUserMessageTextColorPicker: (show: boolean) => void;
  agentMessageTextColorPickerRef: React.RefObject<HTMLDivElement>;
  userMessageTextColorPickerRef: React.RefObject<HTMLDivElement>;
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
  domainId: string;
}

export default function ChatbotSettings({
  chatbotName,
  setChatbotName,
  greetingMessage,
  setGreetingMessage,
  color,
  setColor,
  showColorPicker,
  setShowColorPicker,
  headerTextColor,
  setHeaderTextColor,
  showHeaderColorPicker,
  setShowHeaderColorPicker,
  colorPickerRef,
  headerColorPickerRef,
  agentMessageColor,
  setAgentMessageColor,
  showAgentMessageColorPicker,
  setShowAgentMessageColorPicker,
  userMessageColor,
  setUserMessageColor,
  showUserMessageColorPicker,
  setShowUserMessageColorPicker,
  agentMessageColorPickerRef,
  userMessageColorPickerRef,
  agentMessageTextColor,
  setAgentMessageTextColor,
  showAgentMessageTextColorPicker,
  setShowAgentMessageTextColorPicker,
  userMessageTextColor,
  setUserMessageTextColor,
  showUserMessageTextColorPicker,
  setShowUserMessageTextColorPicker,
  agentMessageTextColorPickerRef,
  userMessageTextColorPickerRef,
  logoUrl,
  setLogoUrl,
  domainId
}: ChatbotSettingsProps) {
  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${domainId}-logo-${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('chatbot-logos')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('chatbot-logos')
        .getPublicUrl(fileName);

      // Update domain settings with new logo URL
      const { error: updateError } = await supabase
        .from('domain_settings')
        .update({ logo_url: publicUrl })
        .eq('domain_id', domainId);

      if (updateError) throw updateError;

      setLogoUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Chatbot Logo</h3>
        <div className="max-w-md">
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt="Chatbot Logo" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <button
                  onClick={() => setLogoUrl(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                🤖
              </div>
            )}
            <div className="flex-1">
              <label className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-sm text-gray-600">
                Upload a square image (recommended size: 400x400px, max 5MB)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Name */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Chatbot Name</h3>
        <div className="max-w-md">
          <input
            type="text"
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter chatbot name"
          />
          <p className="mt-2 text-sm text-gray-600">
            This name will be displayed to your website visitors
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Welcome Message</h3>
        <div className="max-w-md">
          <textarea
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            placeholder="Enter the greeting message"
          />
          <p className="mt-2 text-sm text-gray-600">
            This message will be shown when a visitor first opens the chat. You can use emojis! 😊
          </p>
        </div>
      </div>

      {/* Chatbot Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Chatbot Color</h3>
        <div className="relative" ref={colorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter color code (e.g., #FF6B00)"
            />
          </div>
          {showColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
      </div>

      {/* Header Text Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Header Text Color</h3>
        <div className="relative" ref={headerColorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowHeaderColorPicker(!showHeaderColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: headerTextColor }}
            />
            <input
              type="text"
              value={headerTextColor}
              onChange={(e) => setHeaderTextColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter header text color code (e.g., #000000)"
            />
          </div>
          {showHeaderColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={headerTextColor} onChange={setHeaderTextColor} />
            </div>
          )}
        </div>
      </div>

      {/* Agent Message Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Agent Message Color</h3>
        <div className="relative" ref={agentMessageColorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowAgentMessageColorPicker(!showAgentMessageColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: agentMessageColor }}
            />
            <input
              type="text"
              value={agentMessageColor}
              onChange={(e) => setAgentMessageColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter agent message color code (e.g., #E5E7EB)"
            />
          </div>
          {showAgentMessageColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={agentMessageColor} onChange={setAgentMessageColor} />
            </div>
          )}
        </div>
      </div>

      {/* User Message Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">User Message Color</h3>
        <div className="relative" ref={userMessageColorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowUserMessageColorPicker(!showUserMessageColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: userMessageColor }}
            />
            <input
              type="text"
              value={userMessageColor}
              onChange={(e) => setUserMessageColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter user message color code (e.g., #FFF1E7)"
            />
          </div>
          {showUserMessageColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={userMessageColor} onChange={setUserMessageColor} />
            </div>
          )}
        </div>
      </div>

      {/* Agent Message Text Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Agent Message Text Color</h3>
        <div className="relative" ref={agentMessageTextColorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowAgentMessageTextColorPicker(!showAgentMessageTextColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: agentMessageTextColor }}
            />
            <input
              type="text"
              value={agentMessageTextColor}
              onChange={(e) => setAgentMessageTextColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter agent message text color code (e.g., #000000)"
            />
          </div>
          {showAgentMessageTextColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={agentMessageTextColor} onChange={setAgentMessageTextColor} />
            </div>
          )}
        </div>
      </div>

      {/* User Message Text Color */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">User Message Text Color</h3>
        <div className="relative" ref={userMessageTextColorPickerRef}>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowUserMessageTextColorPicker(!showUserMessageTextColorPicker)}
              className="w-10 h-10 rounded-lg border shadow-sm"
              style={{ backgroundColor: userMessageTextColor }}
            />
            <input
              type="text"
              value={userMessageTextColor}
              onChange={(e) => setUserMessageTextColor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter user message text color code (e.g., #000000)"
            />
          </div>
          {showUserMessageTextColorPicker && (
            <div className="absolute z-10">
              <HexColorPicker color={userMessageTextColor} onChange={setUserMessageTextColor} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}