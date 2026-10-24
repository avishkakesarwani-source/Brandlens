import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Copy, Check, RotateCcw } from 'lucide-react';
import type { ApprovalRecord, UserRole } from '../types';
import { triggerCelebration, playFeedbackSound } from '../utils/effects';
import { computeSha256 } from '../utils/security';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalContent: string;
  resolvedCount: number;
  soundEnabled: boolean;
  onRecordDecision?: (record: ApprovalRecord) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  finalContent,
  resolvedCount,
  soundEnabled,
  onRecordDecision
}) => {
  const [approverName, setApproverName] = useState('Ayushi Mishra');
  const [approverRole, setApproverRole] = useState<UserRole>('Brand Manager');
  const [managerNotes, setManagerNotes] = useState('');
  const [approvalRecord, setApprovalRecord] = useState<ApprovalRecord | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSignOff = async (status: 'approved' | 'changes_requested') => {
    const realSha256 = await computeSha256(finalContent);
    const record: ApprovalRecord = {
      id: `APPR-${Math.floor(100000 + Math.random() * 900000)}`,
      version: 1.2,
      approvedBy: approverName,
      userRole: approverRole,
      timestamp: new Date().toLocaleString(),
      finalContent,
      resolvedFlagsCount: resolvedCount,
      auditHash: realSha256,
      status,
      managerFeedback: managerNotes
    };
    setApprovalRecord(record);
    if (onRecordDecision) {
      onRecordDecision(record);
    }
    
    if (status === 'approved') {
      triggerCelebration();
      if (soundEnabled) {
        playFeedbackSound('success');
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-lg text-slate-900">
              {approvalRecord 
                ? (approvalRecord.status === 'approved' ? 'Approved Publication Certificate' : 'Changes Sent Back to Creator') 
                : 'Manager Sign-Off Decision Gateway (Slide 7)'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!approvalRecord ? (
            <>
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 leading-relaxed">
                <strong>Slide 7 Human Decision Protocol:</strong> The AI only suggests; a person makes the final decision. As the Manager or Legal Reviewer, you can officially <strong>Approve & Save</strong> or <strong>Request Changes</strong> back to the creator.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Approver Name
                  </label>
                  <input
                    type="text"
                    value={approverName}
                    onChange={(e) => setApproverName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Decision Role
                  </label>
                  <select
                    value={approverRole}
                    onChange={(e) => setApproverRole(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Brand Manager">Brand Manager</option>
                    <option value="Reviewer">Legal / Compliance Reviewer</option>
                    <option value="Creator">Content Lead</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Reviewer Notes / Feedback (Optional)
                </label>
                <textarea
                  value={managerNotes}
                  onChange={(e) => setManagerNotes(e.target.value)}
                  placeholder="e.g. Ensure social card uses 85% ocean plastic disclaimer on the lower banner."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preview Content
                </label>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {finalContent}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  approvalRecord.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {approvalRecord.status === 'approved' ? <CheckCircle className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  {approvalRecord.status === 'approved' ? 'Content Officially Approved & Sealed' : 'Changes Requested: Sent Back to Creator'}
                </h4>
                <p className="text-xs text-slate-500">
                  {approvalRecord.status === 'approved' 
                    ? 'Immutable cryptographic audit record generated for publication' 
                    : 'Draft marked for creator revisions per Slide 7 workflow'}
                </p>
              </div>

              {/* Certificate Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Decision Status:</span>
                  <span className={`font-bold uppercase ${approvalRecord.status === 'approved' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {approvalRecord.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Audit ID:</span>
                  <span className="font-mono font-bold text-slate-800">{approvalRecord.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Decided By:</span>
                  <span className="font-semibold text-slate-800">{approvalRecord.approvedBy} ({approvalRecord.userRole})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="font-mono text-slate-700">{approvalRecord.timestamp}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Audit Hash:</span>
                  <span className="font-mono text-[11px] text-teal-800 bg-teal-50 px-1 rounded">{approvalRecord.auditHash}</span>
                </div>
              </div>

              {/* Copy final clean text */}
              {approvalRecord.status === 'approved' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Ready-to-Publish Text
                  </label>
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-900 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                    {finalContent}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          {!approvalRecord ? (
            <>
              <button
                onClick={onClose}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              
              <div className="flex items-center space-x-2">
                {/* Slide 7: Changes requested: back to the creator */}
                <button
                  onClick={() => handleSignOff('changes_requested')}
                  className="text-xs font-bold px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Request Changes</span>
                </button>

                {/* Slide 7: Approved version saved */}
                <button
                  onClick={() => handleSignOff('approved')}
                  className="text-xs font-bold px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Issue Certificate</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {approvalRecord.status === 'approved' ? (
                <button
                  onClick={handleCopy}
                  className="text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-white text-slate-700 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Published Copy"}</span>
                </button>
              ) : <div />}

              <button
                onClick={onClose}
                className="text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Close
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
