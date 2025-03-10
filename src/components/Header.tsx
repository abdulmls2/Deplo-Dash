import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DomainSelector from './DomainSelector';
import { useAuthStore } from '../store/authStore';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut, profile } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm flex items-center px-4 justify-between">
      <div className="flex items-center flex-1 justify-between">
        <DomainSelector />
        <div className="flex-1" />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none group"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white group-hover:ring-gray-100 transition-all duration-200"
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{profile?.username || 'User'}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}