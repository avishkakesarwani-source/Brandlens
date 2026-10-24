export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'ONLINE',
    service: 'BrandLens Pre-Publishing Backend Engine (Vercel Serverless)',
    version: '2.0.0-enterprise',
    team: 'NovaTech',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      mode: 'MongoDB Atlas / Resilient Serverless Store',
      status: 'ACTIVE'
    },
    timestamp: new Date().toISOString()
  });
}
