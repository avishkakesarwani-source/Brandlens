/**
 * BrandLens AuditLog Mongoose Model
 * Team NovaTech — TechCircuit Round 2
 */

import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  approvedBy: {
    type: String,
    required: true,
    default: 'Brand Manager'
  },
  role: {
    type: String,
    enum: ['Creator', 'Brand Manager', 'Reviewer'],
    default: 'Brand Manager'
  },
  complianceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  sha256Hash: {
    type: String,
    required: true,
    match: /^0x[a-fA-F0-9]{64}$/
  },
  draftText: {
    type: String,
    default: ''
  },
  hashIntegrityVerified: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['CERTIFIED_VERIFIED', 'INTEGRITY_MISMATCH', 'PENDING_REVIEW'],
    default: 'CERTIFIED_VERIFIED'
  },
  approvedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
