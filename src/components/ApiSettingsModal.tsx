import React, { useState } from 'react';
import { X, Sparkles, Key, Check, Info } from 'lucide-react';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveKey,
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-base text-slate-900">AI Intelligence Settings</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-start space-x-2">
            <Info className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Latency Judge Sandbox:</strong> BrandLens includes an embedded grounded engine. Entering a Google Gemini API key is completely optional; if provided, it enables live dynamic LLM verification!
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Google Gemini API Key (Optional)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="AIzaSy..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Keys are stored securely in browser memory only and never sent to any third-party server.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={() => {
              setKeyInput('');
              onSaveKey('');
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium"
          >
            Clear Key
          </button>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="text-xs font-medium px-3 py-1.5 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-semibold px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-1.5"
            >
              {saved && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{saved ? "Saved" : "Save Settings"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
