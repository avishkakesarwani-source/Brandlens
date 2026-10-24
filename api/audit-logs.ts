export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { brandName, approver, sha256Hash, complianceScore } = req.body || {};
    const cert = {
      certificateId: `CERT-${Date.now().toString().slice(-6)}-${brandName?.slice(0, 3).toUpperCase() || 'PUB'}`,
      brandName: brandName || 'EcoGlow Organics',
      approvedBy: approver || 'Brand Manager',
      complianceScore: complianceScore || 100,
      sha256Hash: sha256Hash || '0x...',
      approvedAt: new Date().toISOString(),
      status: 'CERTIFIED_VERIFIED'
    };
    return res.status(201).json({ success: true, certificate: cert });
  }

  // GET
  return res.status(200).json({
    success: true,
    logs: [
      {
        certificateId: 'CERT-2026-ECO-9941',
        brandName: 'EcoGlow Organics',
        approvedBy: 'Brand Manager',
        complianceScore: 100,
        sha256Hash: '0x3f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
        approvedAt: '2026-10-24T18:30:00.000Z',
        status: 'CERTIFIED_VERIFIED'
      }
    ]
  });
}
