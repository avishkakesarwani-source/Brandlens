/**
 * BrandLens BrandKit Mongoose Model
 * Team NovaTech — TechCircuit Round 2
 */

import mongoose from 'mongoose';

const BrandKitSchema = new mongoose.Schema({
  brandKey: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  brandName: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true
  },
  certifiedFacts: [{
    type: String,
    trim: true
  }],
  bannedBuzzwords: [{
    type: String,
    trim: true
  }],
  primaryColor: {
    type: String,
    default: '#0d9488'
  },
  secondaryColor: {
    type: String,
    default: '#1e293b'
  },
  targetAudience: {
    type: String,
    default: 'General Consumers'
  }
}, {
  timestamps: true
});

export const BrandKit = mongoose.models.BrandKit || mongoose.model('BrandKit', BrandKitSchema);
