
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Sparkles, 
  Factory, 
  TrendingUp, 
  Settings, 
  Plus, 
  ChevronRight,
  Download,
  Search,
  MessageSquare,
  Package,
  Cpu
} from 'lucide-react';
import { AppView, Design, TechPack, BrandAsset } from './types';
import Dashboard from './components/Dashboard';
import IdeationStudio from './components/IdeationStudio';
import ProductionEngine from './components/ProductionEngine';
import TrendDashboard from './components/TrendDashboard';
import Sidebar from './components/Sidebar';
import BrandDNAManager from './components/BrandDNAManager';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [designs, setDesigns] = useState<Design[]>([]);
  const [activeDesign, setActiveDesign] = useState<Design | null>(null);
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([
    { id: '1', name: 'Primary Black', value: '#0a0a0a', type: 'color' },
    { id: '2', name: 'Oversized Fit', value: 'Drop shoulders, elongated sleeves', type: 'fit' }
  ]);

  const addDesign = (design: Design) => {
    setDesigns(prev => [design, ...prev]);
    setActiveDesign(design);
    setCurrentView('ideation');
  };

  const updateDesign = (updated: Design) => {
    setDesigns(prev => prev.map(d => d.id === updated.id ? updated : d));
    setActiveDesign(updated);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold font-outfit tracking-tight">PACKED</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('ideation')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              New Design
            </button>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-400">JD</span>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <Dashboard 
              designs={designs} 
              onSelectDesign={(d) => { setActiveDesign(d); setCurrentView('production'); }}
            />
          )}
          
          {currentView === 'ideation' && (
            <IdeationStudio 
              activeDesign={activeDesign} 
              onSave={addDesign}
              onUpdate={updateDesign}
              brandAssets={brandAssets}
            />
          )}

          {currentView === 'production' && activeDesign && (
            <ProductionEngine 
              design={activeDesign} 
              onUpdate={updateDesign}
            />
          )}

          {currentView === 'trends' && <TrendDashboard />}
        </div>
      </main>

      {/* Brand DNA Sidebar (Optional/Right) */}
      <BrandDNAManager 
        assets={brandAssets} 
        onUpdate={setBrandAssets}
      />
    </div>
  );
};

export default App;
