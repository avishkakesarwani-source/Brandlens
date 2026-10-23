import React from 'react';
import { X, Eye, FileText, Share2, Layers, CheckCircle } from 'lucide-react';

interface Round3ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Round3Modal: React.FC<Round3ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-slate-900">Advanced Capabilities & Product Roadmap</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                  Next Milestones
                </span>
              </div>
              <p className="text-xs text-slate-500">Upcoming architectural additions scaling BrandLens to enterprise grade</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Improvement 1 */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 hover:border-indigo-200 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-indigo-600 text-white mt-0.5">
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    1. Multimodal Visual & Asset Compliance Engine (Computer Vision + WCAG)
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    Multimodal AI
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Extends BrandLens beyond text to check marketing banners, social image posts, and PDF flyers. Uses Gemini Multimodal / OpenCV to extract dominant color palettes, verify minimum contrast ratios (solving the 83.9% WebAIM contrast failure rate from Slide 3), check logo exclusion/clear-space boundaries, and auto-generate WCAG 2.1 AA compliant Alt-Text.
                </p>
              </div>
            </div>
          </div>

          {/* Improvement 2 */}
          <div className="p-4 rounded-xl border border-teal-100 bg-teal-50/30 hover:border-teal-200 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-teal-700 text-white mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    2. Autonomous Brand Kit Synthesizer (RAG & Document Ingestion)
                  </h4>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    RAG + Vector DB
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Eliminates manual rule configuration by allowing enterprise brands to upload their raw 50+ page PDF brand manuals, packaging guidelines, and legal disclaimer sheets. Automatically parses, chunks, and structures them into actionable Rule IDs, Do's/Don'ts, and Verified Facts tables using embeddings and vector search.
                </p>
              </div>
            </div>
          </div>

          {/* Improvement 3 */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 hover:border-amber-200 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-amber-600 text-white mt-0.5">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">
                    3. Headless Pre-Publishing Gateway & Slack/Figma Integrations
                  </h4>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Enterprise Workflow
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Brings BrandLens directly into creator tools via a Figma plugin, Chrome Extension for CMS (WordPress/Contentful), and a pre-commit GitHub Action for technical documentation. Includes a native Slack bot that alerts Brand Managers when high-risk claims are submitted, allowing 1-click approvals without leaving Slack.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Callout */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-2 text-xs text-slate-600">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>These three additions turn BrandLens into an automated, multi-channel compliance infrastructure for growing marketing teams.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            Close Roadmap
          </button>
        </div>

      </div>
    </div>
  );
};
