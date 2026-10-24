export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const BRAND_KITS = {
    ecoglow: {
      brandName: 'EcoGlow Organics',
      industry: 'Clean Skincare & Cosmetics',
      certifiedFacts: [
        'Contains 72% certified organic ingredients (Ecocert SAS 2024)',
        '94% user-reported hydration improvement over 14 days in dermatological trial (Trial #EG-2024-08)',
        '100% PCR recyclable aluminum packaging with FSC-certified carton',
        'Leaping Bunny certified cruelty-free (License #CR-8821)'
      ]
    },
    finedge: {
      brandName: 'FinEdge Capital',
      industry: 'Regulated Wealth & Investment Tech',
      certifiedFacts: [
        'Member SIPC & FINRA regulated (CRD #40921)',
        'Bank deposits FDIC insured up to $2,500,000 via program banks',
        'Historical 10-year annualized balanced portfolio return: 8.4%'
      ]
    }
  };

  return res.status(200).json({
    success: true,
    brandKits: BRAND_KITS
  });
}
