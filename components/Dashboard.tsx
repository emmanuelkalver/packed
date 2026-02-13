
import React from 'react';
import { Design } from '../types';
import { ChevronRight, Plus, FolderOpen } from 'lucide-react';

interface DashboardProps {
  designs: Design[];
  onSelectDesign: (design: Design) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ designs, onSelectDesign }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-outfit">Project Workspace</h2>
            <p className="text-gray-500 mt-1">Manage your active designs and production cycles.</p>
          </div>
        </div>

        {designs.length === 0 ? (
          <div className="h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-gray-600 bg-white/[0.02]">
            <FolderOpen size={48} className="mb-4 opacity-20" />
            <p className="text-lg">No active designs yet</p>
            <p className="text-sm">Start by creating something in the Studio</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {designs.map((design) => (
              <div 
                key={design.id}
                onClick={() => onSelectDesign(design)}
                className="group cursor-pointer bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all hover:translate-y-[-4px]"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={design.imageUrl} alt={design.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="w-full py-2 bg-white text-black font-bold text-xs rounded-lg flex items-center justify-center gap-1 uppercase tracking-wider">
                      Open Production <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium line-clamp-1">{design.prompt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{new Date(design.createdAt).toLocaleDateString()}</span>
                    {design.techPack && (
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20 uppercase">Ready</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-indigo-900/40 to-black border border-white/5 rounded-2xl">
          <h3 className="text-lg font-bold mb-2">Ideation Studio</h3>
          <p className="text-sm text-gray-400 mb-4">Transform text prompts into manufacturing-ready visuals.</p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-3/4"></div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-900/40 to-black border border-white/5 rounded-2xl">
          <h3 className="text-lg font-bold mb-2">Production Queue</h3>
          <p className="text-sm text-gray-400 mb-4">Tracking 0 active factory orders and shipments.</p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-1/4"></div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-emerald-900/40 to-black border border-white/5 rounded-2xl">
          <h3 className="text-lg font-bold mb-2">Trend Insights</h3>
          <p className="text-sm text-gray-400 mb-4">Latest scraped insights for Autumn/Winter 2025.</p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
