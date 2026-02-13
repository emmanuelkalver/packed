
import React, { useState } from 'react';
import { Sparkles, Save, Trash2, Edit3, Wand2, Loader2, Maximize2, RefreshCw } from 'lucide-react';
import { Design, BrandAsset } from '../types';
import { generateDesign, editDesign } from '../services/geminiService';

interface IdeationStudioProps {
  activeDesign: Design | null;
  onSave: (design: Design) => void;
  onUpdate: (design: Design) => void;
  brandAssets: BrandAsset[];
}

const IdeationStudio: React.FC<IdeationStudioProps> = ({ activeDesign, onSave, onUpdate, brandAssets }) => {
  const [prompt, setPrompt] = useState(activeDesign?.prompt || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const brandContext = brandAssets.map(a => `${a.name}: ${a.value}`).join(', ');
      const imageUrl = await generateDesign(prompt, brandContext);
      
      const newDesign: Design = {
        id: Date.now().toString(),
        imageUrl,
        prompt,
        createdAt: Date.now(),
      };
      
      onSave(newDesign);
    } catch (error) {
      console.error(error);
      alert('Failed to generate design');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = async () => {
    if (!activeDesign || !editPrompt) return;
    setIsGenerating(true);
    try {
      const imageUrl = await editDesign(activeDesign.imageUrl, editPrompt);
      onUpdate({
        ...activeDesign,
        imageUrl,
        prompt: `${activeDesign.prompt} (${editPrompt})`
      });
      setEditPrompt('');
      setEditMode(false);
    } catch (error) {
      console.error(error);
      alert('Failed to update design');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Design Canvas */}
      <div className="flex-1 p-8 bg-black flex flex-col items-center justify-center relative">
        {activeDesign ? (
          <div className="max-w-md w-full relative group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src={activeDesign.imageUrl} 
              alt="Design" 
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-indigo-500/10"
            />
            {isGenerating && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl z-20">
                <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
                <p className="text-lg font-bold animate-pulse">Refining Design...</p>
              </div>
            )}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white rounded-lg border border-white/10 transition-all">
                <Maximize2 size={18} />
              </button>
              <button className="p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white rounded-lg border border-white/10 transition-all">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles size={40} className="text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold font-outfit">Dream Your Design</h2>
            <p className="text-gray-500">Describe your vision in the studio input below to begin the production cycle.</p>
          </div>
        )}
      </div>

      {/* Studio Controls */}
      <div className="w-full lg:w-96 border-l border-white/5 bg-[#0f0f0f] flex flex-col">
        <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Wand2 size={12} />
              Design Architect
            </h3>
            
            {!editMode ? (
              <>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Cyberpunk denim jacket with copper hardware and oversized hood..."
                  className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-indigo-500 outline-none transition-all resize-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                  Generate Design
                </button>
              </>
            ) : (
              <>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                  <p className="text-[10px] uppercase font-bold text-indigo-400 mb-1">Editing Mode</p>
                  <p className="text-xs text-gray-400">Describe visual changes to refine the existing garment.</p>
                </div>
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="e.g. Change the zipper to buttons, make sleeves shorter..."
                  className="w-full h-32 bg-white/[0.03] border border-indigo-500/20 rounded-xl p-4 text-sm focus:border-indigo-500 outline-none transition-all resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(false)}
                    className="flex-1 py-3 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    disabled={isGenerating || !editPrompt}
                    className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Apply Edits
                  </button>
                </div>
              </>
            )}
          </div>

          {activeDesign && !editMode && (
            <div className="pt-6 border-t border-white/5">
              <button 
                onClick={() => setEditMode(true)}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Edit3 size={18} />
                Smart Refinement
              </button>
            </div>
          )}

          <div className="space-y-4">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Brand Memory Tags</h3>
             <div className="flex flex-wrap gap-2">
                {brandAssets.map(asset => (
                  <span key={asset.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400">
                    {asset.name}
                  </span>
                ))}
             </div>
          </div>
        </div>

        <div className="p-6 bg-black/40 border-t border-white/5">
          <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">Powered by Gemini Visual Engine 2.5</p>
        </div>
      </div>
    </div>
  );
};

export default IdeationStudio;
