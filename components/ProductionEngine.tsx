
import React, { useState } from 'react';
import { Design, TechPack } from '../types';
import { generateTechPack } from '../services/geminiService';
import { FileText, Factory, Loader2, Download, Table, ClipboardList, PenTool } from 'lucide-react';

interface ProductionEngineProps {
  design: Design;
  onUpdate: (design: Design) => void;
}

const ProductionEngine: React.FC<ProductionEngineProps> = ({ design, onUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTechPack = async () => {
    setIsGenerating(true);
    try {
      const techPack = await generateTechPack(design.imageUrl, design.prompt);
      onUpdate({ ...design, techPack });
    } catch (error) {
      console.error(error);
      alert('Failed to generate Tech Pack');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Visual Reference */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden sticky top-8">
            <img src={design.imageUrl} alt="Reference" className="w-full object-cover" />
            <div className="p-4 border-t border-white/10">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Reference ID</h4>
              <p className="text-sm font-mono">{design.id}</p>
            </div>
          </div>
        </div>

        {/* Technical Data */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold font-outfit">Production Specs</h2>
            {!design.techPack ? (
              <button 
                onClick={handleGenerateTechPack}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
                Generate Tech Pack
              </button>
            ) : (
              <button className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-sm flex items-center gap-2 transition-all">
                <Download size={18} />
                Download PDF
              </button>
            )}
          </div>

          {!design.techPack && !isGenerating ? (
            <div className="h-96 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-gray-600 bg-white/[0.02]">
              <Factory size={48} className="mb-4 opacity-20" />
              <p className="text-lg">No specifications generated</p>
              <p className="text-sm">Click the button above to analyze the garment for production.</p>
            </div>
          ) : isGenerating ? (
            <div className="h-96 flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Loader2 size={40} className="animate-spin text-indigo-500" />
              <div className="text-center">
                <p className="text-lg font-bold">AI Engine Analyzing Silhouette...</p>
                <p className="text-sm text-gray-500">Identifying fabrics, construction methods, and sizing tolerances.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in duration-700">
              {/* BOM Section */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Table size={20} className="text-indigo-400" />
                  <h3 className="text-xl font-bold font-outfit">Bill of Materials (BOM)</h3>
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-bold">
                      <tr>
                        <th className="px-4 py-3">Component</th>
                        <th className="px-4 py-3">Suggested Material</th>
                        <th className="px-4 py-3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {design.techPack?.bom.map((item, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-medium">{item.component}</td>
                          <td className="px-4 py-3 text-gray-400">{item.material}</td>
                          <td className="px-4 py-3 text-xs text-gray-500 italic">{item.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Measurement Charts */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList size={20} className="text-purple-400" />
                  <h3 className="text-xl font-bold font-outfit">Measurement Charts</h3>
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden">
                   <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-bold">
                      <tr>
                        <th className="px-4 py-3">Point of Measure</th>
                        <th className="px-4 py-3">S</th>
                        <th className="px-4 py-3">M</th>
                        <th className="px-4 py-3">L</th>
                        <th className="px-4 py-3">XL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {design.techPack?.measurements.map((m, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-medium">{m.point}</td>
                          <td className="px-4 py-3 text-gray-300">{m.sizes.S}</td>
                          <td className="px-4 py-3 text-gray-300">{m.sizes.M}</td>
                          <td className="px-4 py-3 text-gray-300">{m.sizes.L}</td>
                          <td className="px-4 py-3 text-gray-300">{m.sizes.XL}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Construction Notes */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <PenTool size={20} className="text-emerald-400" />
                  <h3 className="text-xl font-bold font-outfit">Construction Notes</h3>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/10 rounded-xl space-y-3">
                  {design.techPack?.constructionNotes.map((note, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                      <p className="text-sm text-gray-400 leading-relaxed">{note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionEngine;
