import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StatsCard from '../components/dashboard/StatsCard';
import PlanUsage from '../components/dashboard/PlanUsage';
import RecentTransactions from '../components/dashboard/RecentTransactions';

export default function Dashboard() {
  const [todayConversations, setTodayConversations] = useState(0);
  const [ratings, setRatings] = useState({ good: 0, ok: 0, bad: 0 });
  const [liveConversations, setLiveConversations] = useState(0);

  useEffect(() => {
    async function fetchTodayConversations() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count, error } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())
        .in('status', ['active', 'archived']);

      if (!error && count !== null) {
        setTodayConversations(count);
      }
    }

    async function fetchRatings() {
      const { data, error } = await supabase
        .from('conversations')
        .select('rating')
        .not('rating', 'is', null)
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

    async function fetchLiveConversations() {
      const { count, error } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('live_mode', true);

      if (!error && count !== null) {
        setLiveConversations(count);
      }
    }

    fetchTodayConversations();
    fetchRatings();
    fetchLiveConversations();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
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