import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Copy, Check } from 'lucide-react';
import type { ApprovalRecord } from '../types';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalContent: string;
  resolvedCount: number;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  finalContent,
  resolvedCount,
}) => {
  const [approverName, setApproverName] = useState('Ayushi Mishra');
  const [approverRole, setApproverRole] = useState<'Brand Manager' | 'Legal Reviewer' | 'Content Lead'>('Brand Manager');
  const [approvalRecord, setApprovalRecord] = useState<ApprovalRecord | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSignOff = () => {
    const record: ApprovalRecord = {
      id: `APPR-${Math.floor(100000 + Math.random() * 900000)}`,
      version: 1.2,
      approvedBy: approverName,
      userRole: approverRole,
      timestamp: new Date().toLocaleString(),
      finalContent,
      resolvedFlagsCount: resolvedCount,
      auditHash: `SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
    };
    setApprovalRecord(record);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-lg text-slate-900">
              {approvalRecord ? 'Approved Publication Certificate' : 'Manager Sign-Off & Verification'}
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
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900">
                <strong>Human-in-the-Loop Protocol (Slide 7):</strong> All flagged unverified claims and tone discrepancies have been resolved. The final content is ready for authenticated sign-off by the Brand Manager or Legal Reviewer.
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Approving Manager Name
                </label>
                <input
                  type="text"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Review Role
                </label>
                <select
                  value={approverRole}
                  onChange={(e) => setApproverRole(e.target.value as any)}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Legal Reviewer">Legal Reviewer</option>
                  <option value="Content Lead">Content Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preview Final Clean Copy
                </label>
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {finalContent}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Content Officially Approved</h4>
                <p className="text-xs text-slate-500">Immutable audit record generated for CMS publication</p>
              </div>

              {/* Certificate Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificate ID:</span>
                  <span className="font-mono font-bold text-slate-800">{approvalRecord.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Signed By:</span>
                  <span className="font-semibold text-slate-800">{approvalRecord.approvedBy} ({approvalRecord.userRole})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="font-mono text-slate-700">{approvalRecord.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Flags Reconciled:</span>
                  <span className="font-semibold text-emerald-700">{approvalRecord.resolvedFlagsCount} issues resolved</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Digital Audit Hash:</span>
                  <span className="font-mono text-[11px] text-teal-800 bg-teal-50 px-1 rounded">{approvalRecord.auditHash}</span>
                </div>
              </div>

              {/* Copy final clean text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ready-to-Publish Text
                </label>
                <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs text-slate-900 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {finalContent}
                </div>
              </div>
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
              <button
                onClick={handleSignOff}
                className="text-xs font-bold px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign & Issue Approval Certificate</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className="text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-white text-slate-700 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Published Copy"}</span>
              </button>

              <button
                onClick={onClose}
                className="text-xs font-bold px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Done
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
