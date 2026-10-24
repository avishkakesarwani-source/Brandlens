import React, { useState } from 'react';
import type { ContentFlag } from '../types';
import { RefreshCw, Copy, Check, Wand2, Sparkles, Upload, FileText, CheckCircle2, Shield, X } from 'lucide-react';
import { parseUploadedFile } from '../utils/fileParser';
import { maskSensitiveData } from '../utils/security';

interface ContentEditorProps {
  draftText: string;
  flags: ContentFlag[];
  selectedFlagId: string | null;
  onSelectFlag: (flagId: string) => void;
  onChangeText: (newText: string) => void;
  onReanalyze: () => void;
  onAutoFixAll: () => void;
  isAnalyzing: boolean;
  activeBrandName: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  draftText,
  flags,
  selectedFlagId,
  onSelectFlag,
  onChangeText,
  onReanalyze,
  onAutoFixAll,
  isAnalyzing,
  activeBrandName
}) => {
  const [copied, setCopied] = useState(false);
  const [isRawEdit, setIsRawEdit] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isParsingFile, setIsParsingFile] = useState(false);
  const [piiAlert, setPiiAlert] = useState<{ message: string; count: number } | null>(null);

  const pendingFlags = flags.filter(f => f.status === 'pending');

  const handleMaskPii = () => {
    const result = maskSensitiveData(draftText);
    if (result.maskedCount > 0) {
      onChangeText(result.cleanedText);
      setPiiAlert({
        message: `Protected ${result.maskedCount} sensitive item(s) (${result.detectedTypes.join(', ')}). Redacted before processing.`,
        count: result.maskedCount
      });
      onReanalyze();
    } else {
      setPiiAlert({
        message: 'No private data or secret keys detected. Content is safe & clear.',
        count: 0
      });
    }
    setTimeout(() => setPiiAlert(null), 4500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    try {
      const parsed = await parseUploadedFile(file);
      setUploadedFileName(parsed.fileName);
      onChangeText(parsed.text);
      onReanalyze();
    } catch (err: any) {
      alert(err.message || "Failed to extract file text");
    } finally {
      setIsParsingFile(false);
    }
  };

  /**
   * Helper to render highlighted text with clickable spans
   */
  const renderHighlightedContent = () => {
    if (!flags || flags.length === 0) {
      return <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-100 leading-relaxed font-sans">{draftText}</div>;
    }

    if (pendingFlags.length === 0) {
      return (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Zero Claim Violations · Ready for Publishing</span>
          </div>
          <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-100 leading-relaxed font-sans text-base">
            {draftText}
          </div>
        </div>
      );
    }

    const segments: React.ReactNode[] = [];
    let lastIndex = 0;

    pendingFlags.forEach((flag) => {
      const matchIndex = draftText.indexOf(flag.matchedText, lastIndex);
      if (matchIndex === -1) return;

      if (matchIndex > lastIndex) {
        segments.push(
          <span key={`text-${lastIndex}`}>
            {draftText.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      const isSelected = selectedFlagId === flag.id;
      const highlightClass = 
        flag.claimStatus === 'goes_against_facts' 
          ? 'bg-rose-200/90 dark:bg-rose-900/70 text-rose-950 dark:text-rose-100 border-b-2 border-rose-500 hover:bg-rose-300 dark:hover:bg-rose-800' 
          : flag.claimStatus === 'no_proof_found'
          ? 'bg-amber-200/90 dark:bg-amber-900/70 text-amber-950 dark:text-amber-100 border-b-2 border-amber-500 hover:bg-amber-300 dark:hover:bg-amber-800'
          : 'bg-blue-200/90 dark:bg-blue-900/70 text-blue-950 dark:text-blue-100 border-b-2 border-blue-500 hover:bg-blue-300 dark:hover:bg-blue-800';

      segments.push(
        <mark
          key={`flag-${flag.id}`}
          onClick={() => onSelectFlag(flag.id)}
          className={`cursor-pointer px-1.5 py-0.5 rounded transition-all font-medium ${highlightClass} ${
            isSelected ? 'ring-2 ring-teal-600 dark:ring-teal-400 shadow-md font-semibold scale-105 inline-block' : ''
          }`}
          title={`${flag.policySection}: ${flag.ruleTitle}`}
        >
          {flag.matchedText}
        </mark>
      );

      lastIndex = matchIndex + flag.matchedText.length;
    });

    if (lastIndex < draftText.length) {
      segments.push(
        <span key={`text-${lastIndex}`}>
          {draftText.substring(lastIndex)}
        </span>
      );
    }

    return (
      <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-100 leading-relaxed font-sans text-base">
        {segments}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden relative transition-colors">
      
      {/* Laser Scanning Beam Animation Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden bg-slate-900/5 dark:bg-black/40 backdrop-blur-[1px]">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-[0_0_15px_#0d9488] animate-bounce" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-2xl border border-teal-500/50">
            <Sparkles className="w-4 h-4 text-teal-400 animate-spin" />
            <span>Scanning against {activeBrandName} Brand Kit...</span>
          </div>
        </div>
      )}

      {/* Editor Header */}
      <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-600 dark:text-slate-300">
            Draft Workspace
          </span>
          {uploadedFileName && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center gap-1 font-mono">
              <FileText className="w-3 h-3" /> {uploadedFileName}
            </span>
          )}
          <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {draftText.length} chars · {draftText.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        <div className="flex items-center space-x-2">
          
          {/* File Upload Button (Slide 8: Check text and Word/PDF files) */}
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors">
            <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{isParsingFile ? "Reading..." : "Upload Doc/PDF"}</span>
            <input 
              type="file" 
              accept=".txt,.docx,.pdf" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>

          {/* ⚡ Magic Auto-Fix All Button */}
          {pendingFlags.length > 0 && (
            <button
              onClick={onAutoFixAll}
              className="text-xs font-bold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-3 py-1.5 rounded-lg shadow-sm shadow-teal-500/20 flex items-center gap-1.5 transition-all transform hover:scale-[1.02] active:scale-95 animate-pulse"
              title="Apply all approved AI rewrites simultaneously"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>⚡ Auto-Fix All ({pendingFlags.length})</span>
            </button>
          )}

          {/* Slide 8: Privacy Redaction Shield */}
          <button
            onClick={handleMaskPii}
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Slide 8 Privacy Guard: Redact phone numbers, emails, API keys & credit cards before processing"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Mask PII</span>
            <span className="sm:hidden">PII</span>
          </button>

          <button
            onClick={() => setIsRawEdit(!isRawEdit)}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            {isRawEdit ? "Highlights" : "Edit Raw"}
          </button>

          <button
            onClick={handleCopy}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium flex items-center gap-1 transition-colors"
            title="Copy text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={onReanalyze}
            disabled={isAnalyzing}
            className="text-xs bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? "Scanning..." : "Re-Scan"}</span>
          </button>
        </div>
      </div>

      {/* PII Protection Notification Banner */}
      {piiAlert && (
        <div className={`px-5 py-2.5 border-b text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top-1 ${
          piiAlert.count > 0 
            ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200' 
            : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
        }`}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{piiAlert.message}</span>
          </div>
          <button 
            onClick={() => setPiiAlert(null)}
            className="p-1 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="p-6 flex-1 overflow-y-auto min-h-[380px] bg-white dark:bg-slate-900 transition-colors">
        {isRawEdit ? (
          <textarea
            value={draftText}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Paste your marketing draft, social ad copy, or upload a Word/PDF document..."
            className="w-full h-full min-h-[350px] p-2 text-base font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 leading-relaxed focus:outline-none resize-none border border-teal-200/40 dark:border-teal-700/40 rounded-xl"
          />
        ) : (
          <div>{renderHighlightedContent()}</div>
        )}
      </div>

      {/* Visual Helper Legend */}
      <div className="px-5 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-600 dark:text-slate-300">3-Tier Verification (Slide 8):</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm"></span> Goes Against Facts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm"></span> No Proof Found
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-sm"></span> Tone & Voice
          </span>
        </div>
        <div className="text-[11px] text-slate-400 dark:text-slate-400 italic">
          Click any highlight to view rule citation, rewrite & discussion notes
        </div>
      </div>

    </div>
  );
};
