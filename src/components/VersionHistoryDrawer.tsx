import React from 'react';
import { X, History, RotateCcw, UserCheck } from 'lucide-react';
import type { ContentVersion } from '../types';

interface VersionHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  versions: ContentVersion[];
  onRestoreVersion: (version: ContentVersion) => void;
}

export const VersionHistoryDrawer: React.FC<VersionHistoryDrawerProps> = ({
  isOpen,
  onClose,
  versions,
  onRestoreVersion
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-teal-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Version History & Human Audit Log</h3>
              <p className="text-[11px] text-slate-500">Slide 7 & 8: Every edit and approval is tracked</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {versions.map((ver, idx) => (
            <div key={idx} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:border-l-transparent">
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                ver.status === 'approved' 
                  ? 'border-emerald-500' 
                  : ver.status === 'changes_requested'
                  ? 'border-rose-500'
                  : 'border-teal-500'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  ver.status === 'approved' ? 'bg-emerald-500' : 'bg-teal-500'
                }`} />
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 font-mono">
                    v{ver.versionNumber.toFixed(1)} · {ver.changeNote}
                  </span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                    ver.status === 'approved' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : ver.status === 'changes_requested'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {ver.status}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>{ver.author} ({ver.role})</span>
                  <span>·</span>
                  <span>{ver.timestamp}</span>
                </div>

                <p className="text-xs text-slate-700 font-mono bg-white p-2 rounded border border-slate-200/80 max-h-20 overflow-y-auto text-[11px]">
                  {ver.content}
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      onRestoreVersion(ver);
                      onClose();
                    }}
                    className="text-[11px] text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" /> Restore this version
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="text-xs px-3 py-1.5 bg-slate-800 text-white rounded-lg">
            Close Timeline
          </button>
        </div>

      </div>
    </div>
  );
};
