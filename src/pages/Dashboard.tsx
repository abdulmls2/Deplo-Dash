import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Calendar, RefreshCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StatsCard from '../components/dashboard/StatsCard';
import PlanUsage from '../components/dashboard/PlanUsage';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useDomain } from '../context/DomainContext';

export default function Dashboard() {
  const { currentDomain } = useDomain();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayConversations, setTodayConversations] = useState(0);
  const [ratings, setRatings] = useState({ good: 0, ok: 0, bad: 0 });
  const [liveConversations, setLiveConversations] = useState(0);
  const [botConversations, setBotConversations] = useState(0);
  const [averageBotConversationTime, setAverageBotConversationTime] = useState('0 minutes');
  const [averageLiveAgentConversationTime, setAverageLiveAgentConversationTime] = useState('0 minutes');

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchData(selectedDate);
  }, [currentDomain]);

  async function fetchData(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    await fetchTodayConversations(startOfDay, endOfDay);
    await fetchRatings(startOfDay, endOfDay);
    await fetchLiveConversations(startOfDay, endOfDay);
    await fetchBotConversations(startOfDay, endOfDay);
    await fetchAverageBotConversationTime(startOfDay, endOfDay);
    await fetchAverageLiveAgentConversationTime(startOfDay, endOfDay);
  }

  async function fetchTodayConversations(startOfDay: Date, endOfDay: Date) {
    const { count, error } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .in('status', ['active', 'archived'])
      .eq('domain_id', currentDomain?.id);

    if (!error && count !== null) {
      setTodayConversations(count);
    }
  }

  async function fetchRatings(startOfDay: Date, endOfDay: Date) {
    const { data, error } = await supabase
      .from('conversations')
      .select('rating')
      .not('rating', 'is', null)
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .in('status', ['active', 'archived'])
      .eq('domain_id', currentDomain?.id);

    if (!error && data) {
      const ratingCounts = {
        good: data.filter(conv => conv.rating === 'good').length,
        ok: data.filter(conv => conv.rating === 'ok').length,
        bad: data.filter(conv => conv.rating === 'bad').length
      };
      setRatings(ratingCounts);
    }
  }

  async function fetchLiveConversations(startOfDay: Date, endOfDay: Date) {
    const { count, error } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('live_mode', true)
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .eq('domain_id', currentDomain?.id);

    if (!error && count !== null) {
      setLiveConversations(count);
    }
  }

  async function fetchBotConversations(startOfDay: Date, endOfDay: Date) {
    const { count, error } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('live_mode', false)
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .eq('domain_id', currentDomain?.id);

    if (!error && count !== null) {
      setBotConversations(count);
    }
  }

  async function fetchAverageBotConversationTime(startOfDay: Date, endOfDay: Date) {
    const { data, error } = await supabase
      .from('conversations')
      .select('created_at, last_message_at')
      .eq('live_mode', false)
      .eq('status', 'archived')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .eq('domain_id', currentDomain?.id);

    if (!error && data) {
      const totalDuration = data.reduce((acc, conv) => {
        const createdAt = new Date(conv.created_at);
        const lastMessageAt = new Date(conv.last_message_at);
        const duration = (lastMessageAt.getTime() - createdAt.getTime()) / 1000;
        return acc + duration;
      }, 0);

      const averageDuration = data.length > 0 ? totalDuration / data.length : 0;

      const minutes = Math.floor(averageDuration / 60);
      const seconds = Math.round(averageDuration % 60);

      const timeString = `${minutes} minute${minutes !== 1 ? 's' : ''}` + 
                         (seconds > 0 ? ` and ${seconds} second${seconds !== 1 ? 's' : ''}` : '');

      setAverageBotConversationTime(timeString);
    }
  }

  async function fetchAverageLiveAgentConversationTime(startOfDay: Date, endOfDay: Date) {
    const { data, error } = await supabase
      .from('conversations')
      .select('created_at, last_message_at')
      .eq('live_mode', true)
      .eq('status', 'archived')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .eq('domain_id', currentDomain?.id);

    if (!error && data) {
      const totalDuration = data.reduce((acc, conv) => {
        const createdAt = new Date(conv.created_at);
        const lastMessageAt = new Date(conv.last_message_at);
        const duration = (lastMessageAt.getTime() - createdAt.getTime()) / 1000;
        return acc + duration;
      }, 0);

      const averageDuration = data.length > 0 ? totalDuration / data.length : 0;

      const minutes = Math.floor(averageDuration / 60);
      const seconds = Math.round(averageDuration % 60);

      const timeString = `${minutes} minute${minutes !== 1 ? 's' : ''}` + 
                         (seconds > 0 ? ` and ${seconds} second${seconds !== 1 ? 's' : ''}` : '');

      setAverageLiveAgentConversationTime(timeString);
    }
  }

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center mt-1">
          <button 
            onClick={() => fetchData(selectedDate)}
            className="mr-2 p-2 rounded bg-white text-black border border-gray-300 hover:bg-gray-100"
            title="Refresh Data"
          >
            <RefreshCcw className="h-4 w-4 text-gray-500" />
          </button>
          <button 
            onClick={handleToday} 
            className={`mr-2 px-4 py-2 rounded ${
              // Check if selected date is today
              selectedDate.toDateString() === new Date().toDateString() 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Today
          </button>
          <button 
            onClick={handleYesterday} 
            className={`px-4 py-2 rounded ${
              // Check if selected date is yesterday
              selectedDate.toDateString() === (() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return yesterday.toDateString();
              })()
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
            }`}
          >
            Yesterday
          </button>
          <input 
            type="date" 
            value={selectedDate.toISOString().split('T')[0]}
            onChange={handleDateChange} 
            className="ml-2 border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          A detailed overview of your metrics, usage, customers and more
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Today's Conversations" 
          value={todayConversations.toString()} 
          Icon={Users}
        />
        <StatsCard 
          title="Good Ratings" 
          value={ratings.good.toString()}
          Icon={Users}
          className="bg-green-50"
        />
        <StatsCard 
          title="OK Ratings" 
          value={ratings.ok.toString()}
          Icon={Users}
          className="bg-yellow-50"
        />
        <StatsCard 
          title="Bad Ratings" 
          value={ratings.bad.toString()}
          Icon={Users}
          className="bg-red-50"
        />
        <StatsCard 
          title="Live Conversations"
          value={liveConversations.toString()}
          Icon={Users}
        />
        <StatsCard 
          title="AI Agent Conversations" 
          value={botConversations.toString()} 
          Icon={Users}
        />
        <StatsCard 
          title="AI Agent Average Conversation Time" 
          value={averageBotConversationTime} 
          Icon={Users}
        />
        <StatsCard 
          title="Live Agent Average Conversation Time" 
          value={averageLiveAgentConversationTime} 
          Icon={Users}
        />
        {/* 
        <StatsCard 
          title="Appointments" 
          value="0" 
          Icon={Calendar}
        />
        <StatsCard 
          title="Total Sales" 
          value="$0" 
          Icon={DollarSign}
        />
        */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanUsage />
        <RecentTransactions />
      </div>
    </div>
  );
}