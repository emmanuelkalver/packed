
import React from 'react';
import { BrandAsset } from '../types';
import { Fingerprint, Plus, Trash2, Cpu } from 'lucide-react';

interface BrandDNAManagerProps {
  assets: BrandAsset[];
  onUpdate: (assets: BrandAsset[]) => void;
}

const BrandDNAManager: React.FC<BrandDNAManagerProps> = ({ assets, onUpdate }) => {
  return (
    <aside className="hidden xl:flex w-80 border-l border-white/5 bg-black/40 flex-col overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-1">
          <Fingerprint size={20} className="text-indigo-400" />
          <h2 className="text-lg font-bold font-outfit">Brand DNA</h2>
        </div>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Consistency Memory Engine</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Core Assets</h3>
             <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
               <Plus size={14} />
             </button>
          </div>
          <div className="space-y-3">
            {assets.map(asset => (
              <div key={asset.id} className="p-3 bg-white/[0.03] border border-white/5 rounded-xl group relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-indigo-400 font-bold uppercase mb-0.5">{asset.type}</p>
                    <p className="text-xs font-bold">{asset.name}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{asset.value}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-indigo-400" />
            <h4 className="text-xs font-bold text-white">Agentic Logic</h4>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Every design generated is automatically adjusted to match your brand's specific "DNA Tags". This ensures that even experimental prompts maintain your signature look.
          </p>
        </section>
      </div>

      <div className="p-6 bg-black border-t border-white/5">
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-bold text-gray-500 uppercase">Synchronized across 4 devices</span>
        </div>
      </div>
    </aside>
  );
};

export default BrandDNAManager;
