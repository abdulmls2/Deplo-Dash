import React, { useRef } from 'react';
import { HexColorPicker } from 'react-colorful';

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
  userMessageTextColorPickerRef
}: ChatbotSettingsProps) {
  return (
    <div className="space-y-6">
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