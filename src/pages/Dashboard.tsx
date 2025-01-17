import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StatsCard from '../components/dashboard/StatsCard';
import PlanUsage from '../components/dashboard/PlanUsage';
import RecentTransactions from '../components/dashboard/RecentTransactions';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayConversations, setTodayConversations] = useState(0);
  const [ratings, setRatings] = useState({ good: 0, ok: 0, bad: 0 });
  const [liveConversations, setLiveConversations] = useState(0);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  async function fetchData(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    await fetchTodayConversations(startOfDay, endOfDay);
    await fetchRatings(startOfDay, endOfDay);
    await fetchLiveConversations(startOfDay, endOfDay);
  }

  async function fetchTodayConversations(startOfDay: Date, endOfDay: Date) {
    const { count, error } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .in('status', ['active', 'archived']);

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
      .in('status', ['active', 'archived']);

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
      .lte('created_at', endOfDay.toISOString());

    if (!error && count !== null) {
      setLiveConversations(count);
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
          title="Pipeline Value" 
          value="$125" 
          Icon={DollarSign}
        />
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanUsage />
        <RecentTransactions />
      </div>
    </div>
  );
}