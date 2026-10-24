import React, { useState } from 'react';
import { 
  Check, 
  Edit3, 
  CornerDownRight, 
  Info,
  CheckCircle2,
  RotateCcw,
  MessageSquare,
  Send,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
import type { ContentFlag, UserRole } from '../types';

interface IssueCardProps {
  flag: ContentFlag;
  isSelected: boolean;
  currentUserRole: UserRole;
  onSelect: () => void;
  onAcceptRewrite: (flagId: string, rewrite: string) => void;
  onRejectFlag: (flagId: string) => void;
  onCustomEdit: (flagId: string, customText: string) => void;
  onResetFlag: (flagId: string) => void;
  onAddComment: (flagId: string, commentText: string) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  flag,
  isSelected,
  currentUserRole,
  onSelect,
  onAcceptRewrite,
  onRejectFlag,
  onCustomEdit,
  onResetFlag,
  onAddComment
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [customText, setCustomText] = useState(flag.suggestedRewrite);

  const isResolved = flag.status !== 'pending';

  // Slide 8: Mark each claim: proven, no proof found, or goes against facts
  const renderClaimStatusBadge = () => {
    switch (flag.claimStatus) {
      case 'proven':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Proven Fact
          </span>
        );
      case 'goes_against_facts':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            Goes Against Facts
          </span>
        );
      case 'no_proof_found':
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            No Proof Found
          </span>
        );
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(flag.id, newComment.trim());
    setNewComment('');
  };

  return (
    <div 
      onClick={onSelect}
      className={`rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected 
          ? 'ring-2 ring-teal-600 dark:ring-teal-400 border-teal-500 shadow-md bg-white dark:bg-slate-850' 
          : isResolved
          ? 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 opacity-80'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
      }`}
    >
      {/* Header bar */}
      <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-800/60">
        <div className="flex items-center space-x-2">
          {renderClaimStatusBadge()}
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
            {flag.severity} Severity
          </span>
        </div>

        {/* Status chip if resolved */}
        {isResolved && (
          <span className={`text-xs font-semibold flex items-center gap-1 ${
            flag.status === 'accepted' || flag.status === 'custom_edited' 
              ? 'text-emerald-700 dark:text-emerald-400' 
              : 'text-slate-500 dark:text-slate-400 line-through'
          }`}>
            {flag.status === 'accepted' && <><CheckCircle2 className="w-3.5 h-3.5" /> Replaced</>}
            {flag.status === 'custom_edited' && <><Edit3 className="w-3.5 h-3.5" /> Custom Edit</>}
            {flag.status === 'rejected' && 'Overruled'}
          </span>
        )}
      </div>

      {/* Body content */}
      <div className="p-4 space-y-3">
        {/* Flagged quote */}
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 tracking-wider mb-1">
            Flagged Excerpt in Draft
          </div>
          <div className="text-sm font-semibold text-rose-900 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900 inline-block font-mono">
            "{flag.matchedText}"
          </div>
        </div>

        {/* Rule citation */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white mb-0.5">
            <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
            <span>Rule Broken: {flag.policySection} — {flag.ruleTitle}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mt-1">
            {flag.explanation}
          </p>
        </div>

        {/* Suggested Rewrite */}
        {!isResolved && (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1 mb-1">
              <CornerDownRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Suggested Compliant Rewrite
            </div>

            {isEditing ? (
              <div className="space-y-2 mt-2">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
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
              <p className="text-xs font-semibold text-emerald-950 dark:text-emerald-200 leading-relaxed italic">
                "{flag.suggestedRewrite}"
              </p>
            )}
          </div>
        )}

        {/* If already resolved, display the replacement */}
        {isResolved && (
          <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-800 dark:text-slate-100">Resolution: </span>
            {flag.status === 'accepted' && `Applied suggested fix: "${flag.suggestedRewrite}"`}
            {flag.status === 'custom_edited' && `Applied custom edit: "${flag.customRewrite || customText}"`}
            {flag.status === 'rejected' && 'Creator marked as false flag / approved exception'}
          </div>
        )}

        {/* Slide 8: Comments thread */}
        {showComments && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">Team Comments & Rationale ({flag.comments.length})</span>
            <div className="space-y-1.5 max-h-28 overflow-y-auto">
              {flag.comments.length > 0 ? (
                flag.comments.map((c) => (
                  <div key={c.id} className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">
                      <span>{c.author} ({c.role})</span>
                      <span>{c.timestamp}</span>
                    </div>
                    <p className="text-xs">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">No notes added yet.</p>
              )}
            </div>

            <form onSubmit={handleSendComment} className="flex gap-1.5 pt-1">
              <input
                type="text"
                placeholder={`Leave note as ${currentUserRole}...`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="text-xs p-1.5 rounded border border-slate-200 dark:border-slate-700 flex-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="px-2 py-1 bg-teal-700 dark:bg-teal-600 text-white rounded text-xs flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Action footer */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        
        {/* Toggle Comments Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowComments(!showComments)}
          }
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 flex items-center gap-1 font-medium transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Notes ({flag.comments.length})</span>
        </button>

        {!isResolved ? (
          <div className="flex items-center space-x-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRejectFlag(flag.id);
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 px-2 py-1 rounded font-medium transition-colors"
            >
              Overrule
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium flex items-center gap-1 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAcceptRewrite(flag.id, flag.suggestedRewrite);
              }}
              className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept Fix</span>
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onResetFlag(flag.id);
            }}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
        )}
      </div>
    </div>
  );
};
