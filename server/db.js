/**
 * BrandLens Database Connection Manager
 * Team NovaTech — TechCircuit Round 2
 * Backend Lead: Avishka Kesarwani
 * 
 * Supports:
 * 1. MongoDB Atlas (Cloud) / Local MongoDB via Mongoose
 * 2. Automatic fallback to Resilient Embedded In-Memory Store if MONGODB_URI is absent
 */

import mongoose from 'mongoose';

let isConnected = false;
let dbMode = 'Embedded In-Memory Store';

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log('[BrandLens DB] No MONGODB_URI detected in environment.');
    console.log('[BrandLens DB] Running in Resilient Embedded In-Memory Store mode (Zero-setup & 100% crash-safe).');
    dbMode = 'Embedded In-Memory Store';
    isConnected = false;
    return false;
  }

  try {
    console.log('[BrandLens DB] Connecting to MongoDB Cluster...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000 // Fast failover to prevent blocking server start
    });
    isConnected = true;
    dbMode = `MongoDB Atlas (${conn.connection.host})`;
    console.log(`[BrandLens DB] Successfully connected to ${dbMode}`);
    return true;
  } catch (err) {
    console.warn(`[BrandLens DB] MongoDB connection failed: ${err.message}`);
    console.warn('[BrandLens DB] Falling back automatically to Resilient In-Memory Store.');
    isConnected = false;
    dbMode = 'Embedded In-Memory Store (Fallback)';
    return false;
  }
}

export function getDBStatus() {
  return {
    isConnected,
    mode: dbMode,
    timestamp: new Date().toISOString()
  };
}
