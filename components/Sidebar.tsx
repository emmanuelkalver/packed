
import React from 'react';
import { LayoutGrid, Sparkles, Factory, TrendingUp, Settings } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const items = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Workspace' },
    { id: 'ideation', icon: Sparkles, label: 'Studio' },
    { id: 'production', icon: Factory, label: 'Factory' },
    { id: 'trends', icon: TrendingUp, label: 'Trends' },
  ];

  return (
    <aside className="w-20 lg:w-64 border-r border-white/5 flex flex-col items-center lg:items-start p-4 gap-6 bg-black/40">
      <div className="flex-1 w-full space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as AppView)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-white/10 text-white border border-white/10' 
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-300 transition-all">
        <Settings size={20} />
        <span className="hidden lg:block font-medium text-sm">Settings</span>
      </button>
    </aside>
  );
};

export default Sidebar;
