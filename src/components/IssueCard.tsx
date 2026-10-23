import React, { useState } from 'react';
import { 
  Check, 
  Edit3, 
  CornerDownRight, 
  Info,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import type { ContentFlag } from '../types';

interface IssueCardProps {
  flag: ContentFlag;
  isSelected: boolean;
  onSelect: () => void;
  onAcceptRewrite: (flagId: string, rewrite: string) => void;
  onRejectFlag: (flagId: string) => void;
  onCustomEdit: (flagId: string, customText: string) => void;
  onResetFlag: (flagId: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  flag,
  isSelected,
  onSelect,
  onAcceptRewrite,
  onRejectFlag,
  onCustomEdit,
  onResetFlag
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState(flag.suggestedRewrite);

  const isResolved = flag.status !== 'pending';

  const getBadgeStyle = () => {
    if (flag.flagType === 'contradicted') {
      return 'bg-rose-100 text-rose-800 border-rose-300';
    }
    if (flag.flagType === 'unverified') {
      return 'bg-amber-100 text-amber-800 border-amber-300';
    }
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const getTypeLabel = () => {
    switch (flag.flagType) {
      case 'contradicted': return 'Contradicts Brand Truth';
      case 'unverified': return 'Claim With No Proof';
      case 'tone_voice': return 'Voice & Tone Misalignment';
      case 'accessibility': return 'Accessibility Issue';
      default: return 'Compliance Flag';
    }
  };

  return (
    <div 
      onClick={onSelect}
      className={`rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected 
          ? 'ring-2 ring-teal-600 border-teal-500 shadow-md bg-white' 
          : isResolved
          ? 'border-slate-200 bg-slate-50/70 opacity-80'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Header bar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            {getTypeLabel()} · {flag.severity}
          </span>
          {flag.detectionSource === 'gemini_grounded' && (
            <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-mono">
              AI Grounded
            </span>
          )}
        </div>

        {/* Status chip if resolved */}
        {isResolved && (
          <span className={`text-xs font-medium flex items-center gap-1 ${
            flag.status === 'accepted' || flag.status === 'custom_edited' 
              ? 'text-emerald-700' 
              : 'text-slate-500 line-through'
          }`}>
            {flag.status === 'accepted' && <><CheckCircle2 className="w-3.5 h-3.5" /> Resolved</>}
            {flag.status === 'custom_edited' && <><Edit3 className="w-3.5 h-3.5" /> Custom Fixed</>}
            {flag.status === 'rejected' && 'Dismissed'}
          </span>
        )}
      </div>

      {/* Body content */}
      <div className="p-4 space-y-3">
        {/* Highlighted text snippet */}
        <div>
          <div className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider mb-1">
            Flagged Excerpt
          </div>
          <div className="text-sm font-medium text-rose-900 bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200 inline-block font-mono">
            "{flag.matchedText}"
          </div>
        </div>

        {/* Rule citation */}
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-1 font-semibold text-slate-900 mb-0.5">
            <Info className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span>Rule Broken: {flag.policySection}</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed mt-1">
            {flag.explanation}
          </p>
        </div>

        {/* Suggested Rewrite */}
        {!isResolved && (
          <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200/80">
            <div className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider flex items-center gap-1 mb-1.5">
              <CornerDownRight className="w-3.5 h-3.5 text-emerald-600" />
              Suggested Compliant Rewrite
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(false);
                    }}
                    className="text-xs px-2 py-1 text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCustomEdit(flag.id, customText);
                      setIsEditing(false);
                    }}
                    className="text-xs px-2.5 py-1 bg-emerald-700 text-white rounded font-medium hover:bg-emerald-800"
                  >
                    Save & Apply
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs font-medium text-emerald-950 leading-relaxed italic">
                "{flag.suggestedRewrite}"
              </p>
            )}
          </div>
        )}

        {/* If already resolved, display the replacement */}
        {isResolved && (
          <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-800">Action Taken: </span>
            {flag.status === 'accepted' && `Applied suggested fix: "${flag.suggestedRewrite}"`}
            {flag.status === 'custom_edited' && `Applied custom edit: "${flag.customRewrite || customText}"`}
            {flag.status === 'rejected' && 'Creator marked as false flag / approved exception'}
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        {!isResolved ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRejectFlag(flag.id);
              }}
              className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded hover:bg-slate-200/60 font-medium transition-colors"
            >
              Dismiss Flag
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="text-xs text-slate-600 hover:text-slate-800 px-2.5 py-1 rounded border border-slate-200 hover:bg-white font-medium flex items-center gap-1 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAcceptRewrite(flag.id, flag.suggestedRewrite);
                }}
                className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept Rewrite</span>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResetFlag(flag.id);
              }}
              className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo Decision</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
