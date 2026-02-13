
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, MapPin, Globe, Loader2, Search } from 'lucide-react';
import { getTrends } from '../services/geminiService';

const TrendDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const text = await getTrends();
        setData(text);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const colorData = [
    { name: 'Cyber Blue', value: 85, color: '#3b82f6' },
    { name: 'Copper Rust', value: 65, color: '#b45309' },
    { name: 'Matte Onyx', value: 92, color: '#18181b' },
    { name: 'Hyper Lime', value: 45, color: '#84cc16' },
  ];

  const trendHistory = [
    { month: 'Jan', volume: 400 },
    { month: 'Feb', volume: 300 },
    { month: 'Mar', volume: 500 },
    { month: 'Apr', volume: 800 },
    { month: 'May', volume: 600 },
    { month: 'Jun', volume: 900 },
  ];

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="text-xl font-bold font-outfit">Scanning Global Fashion Trends...</p>
        <p className="text-gray-500 text-sm max-w-xs">Aggregating social media, runway, and retail data for real-time forecasting.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-outfit">Trend Forecast Intelligence</h2>
          <p className="text-gray-500">Real-time market movement for 2025/26 collections.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
           <Globe size={18} />
           <span className="text-xs font-bold uppercase tracking-wider">Global Search Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-outfit flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-400" />
              Volume Momentum
            </h3>
            <span className="text-xs text-gray-500">Search Interest Over Time</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="month" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line type="monotone" dataKey="volume" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl space-y-6">
           <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-outfit flex items-center gap-2">
              <MapPin size={20} className="text-emerald-400" />
              Emerging Palettes
            </h3>
            <span className="text-xs text-gray-500">Dominance in Runway Analytics</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={colorData} layout="vertical">
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} width={100} />
                 <Tooltip cursor={{ fill: 'transparent' }} />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                   {colorData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-3xl">
        <h3 className="text-xl font-bold font-outfit mb-4">AI Analysis Summary</h3>
        <div className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
          {data}
        </div>
      </div>
    </div>
  );
};

export default TrendDashboard;
