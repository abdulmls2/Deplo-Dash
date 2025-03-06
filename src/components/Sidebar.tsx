import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Puzzle,
  Settings,
  Calendar,
  Mail,
  Globe,
  UserCog,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Database
} from 'lucide-react';

interface MenuItem {
  icon: any;
  label: string;
  id: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const iconComponents = {
  dashboard: LayoutDashboard,
  conversations: MessageSquare,
  integrations: Puzzle,
  settings: Settings,
  calendar: Calendar,
  email: Mail,
  'admin-users': UserCog,
  leads: Users,
  domain: Globe,
  'agent-data': Database,
};

const defaultMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: MessageSquare, label: 'Conversations', id: 'conversations' },
  { icon: Database, label: 'Agent Data', id: 'agent-data' },
  { icon: Puzzle, label: 'Integrations', id: 'integrations' },
  { icon: Settings, label: 'Settings', id: 'settings' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
  { icon: Mail, label: 'Email Marketing', id: 'email' },
  { icon: Users, label: 'Leads', id: 'leads' },
  { icon: UserCog, label: 'Admin Users', id: 'admin-users' },
  { icon: Globe, label: 'Domain', id: 'domain' },
];

export default function Sidebar({ isOpen, toggleSidebar, currentPage, onPageChange }: SidebarProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    // Initialize from localStorage or use default
    const savedOrder = localStorage.getItem('sidebarOrder');
    if (savedOrder) {
      try {
        const savedIds = JSON.parse(savedOrder) as string[];
        const orderedItems = savedIds.map(id => {
          const defaultItem = defaultMenuItems.find(item => item.id === id);
          if (!defaultItem) return null;
          return {
            ...defaultItem,
            icon: iconComponents[id as keyof typeof iconComponents] || defaultItem.icon
          };
        }).filter((item): item is MenuItem => item !== null);
        if (orderedItems.length === defaultMenuItems.length) {
          return orderedItems;
        }
      } catch (error) {
        console.error('Error loading saved order:', error);
      }
    }
    return defaultMenuItems;
  });

  const handleDragStart = (index: number) => {
    // Removed drag-and-drop functionality
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    // Removed drag-and-drop functionality
  };

  const handleDragEnd = () => {
    // Removed drag-and-drop functionality
  };

  const resetOrder = () => {
    // Removed reset order functionality
  };

  return (
    <div 
      className={`bg-white h-screen shadow-lg transition-all duration-300 ${
        isOpen ? 'w-52' : 'w-20'
      } flex flex-col fixed left-0 top-0`}
    >
      <div className="flex items-center p-4 border-b">
        {isOpen && (
          <button 
            onClick={() => onPageChange('dashboard')}
            className="text-xl font-bold text-[#2563EB] hover:text-[#2563EB]/90"
          >
            dashboard.ai
          </button>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-100 ml-auto`}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 pt-4">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer
              ${!isOpen && 'justify-center'}
              ${currentPage === item.id ? 'bg-[#EFF6FF] text-[#2563EB]' : ''}`}
          >
            <button
              onClick={() => onPageChange(item.id)}
              className="flex items-center flex-1"
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
}