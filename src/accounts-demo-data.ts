export type AccountHealth = 'Healthy' | 'Monitor' | 'At Risk';

export interface Account {
  id: string;

  // Company link
  company_id: string;
  company_name: string;
  company_logo_url?: string;
  company_icon_color: string;

  // Deal history — all closed-won deals (initial + past renewals)
  deal_ids: string[];

  // Active renewal or expansion deal in progress (if any)
  active_deal?: {
    id: string;
    name: string;
    stage_name: string;
  } | null;

  // CS-specific fields
  success_criteria: string[];
  health_status: AccountHealth;
  csm_owner: string;
  renewal_date: string | null;
  arr: number | null;          // Annual Recurring Revenue (USD)
  contract_value: number | null;

  // Activity
  last_meeting: string | null;
  next_meeting: string | null;

  // Flexible catch-all
  metadata: Record<string, unknown>;
}

export const accountsData: Account[] = [
  {
    id: 'acc-001',
    company_id: 'comp-rothys',
    company_name: "Rothy's",
    company_icon_color: 'bg-emerald-600',
    deal_ids: ['deal-015'],
    active_deal: null,
    success_criteria: [
      'Reduce checkout abandonment by 15%',
      'Launch loyalty program integration by Q2 2026',
      'Achieve 99.9% payment uptime SLA',
    ],
    health_status: 'Healthy',
    csm_owner: 'Jordan Lee',
    renewal_date: '2027-03-15',
    arr: 240000,
    contract_value: 240000,
    last_meeting: '2026-02-18',
    next_meeting: '2026-03-19',
    metadata: {
      onboarding_date: '2025-04-01',
      industry: 'Sustainable footwear',
      notes: 'Strong engagement. Champion actively promoting internally.',
    },
  },
  {
    id: 'acc-002',
    company_id: 'comp-drizly',
    company_name: 'Drizly',
    company_icon_color: 'bg-blue-500',
    deal_ids: ['prior-deal-001', 'deal-024'],
    active_deal: {
      id: 'renewal-deal-002',
      name: 'Drizly — Renewal FY26',
      stage_name: 'Proposal / Negotiation',
    },
    success_criteria: [
      'Enable age-verified payment flows across 30 states',
      'Increase mobile conversion rate by 20%',
      'Automate multi-state tax remittance',
    ],
    health_status: 'Monitor',
    csm_owner: 'Sarah Kim',
    renewal_date: '2026-05-10',
    arr: 180000,
    contract_value: 180000,
    last_meeting: '2026-02-05',
    next_meeting: '2026-03-12',
    metadata: {
      onboarding_date: '2024-10-15',
      industry: 'On-demand alcohol delivery',
      notes: 'Renewal in negotiation. Budget conversations ongoing with new VP Finance.',
    },
  },
  {
    id: 'acc-003',
    company_id: 'comp-everlane',
    company_name: 'Everlane',
    company_icon_color: 'bg-stone-700',
    deal_ids: ['deal-035'],
    active_deal: null,
    success_criteria: [
      'Unified checkout across DTC and wholesale channels',
      'Launch international payments in 8 new markets',
      'Build B2B wholesale payments portal',
    ],
    health_status: 'Healthy',
    csm_owner: 'Jordan Lee',
    renewal_date: '2027-01-20',
    arr: 360000,
    contract_value: 360000,
    last_meeting: '2026-02-25',
    next_meeting: null,
    metadata: {
      onboarding_date: '2025-02-01',
      industry: 'Ethical apparel',
      notes: 'Expansion conversation started. Interested in adding warehouse payments module.',
    },
  },
  {
    id: 'acc-004',
    company_id: 'comp-allbirds',
    company_name: 'Allbirds',
    company_icon_color: 'bg-lime-600',
    deal_ids: ['prior-deal-002'],
    active_deal: {
      id: 'renewal-deal-004',
      name: 'Allbirds — Renewal + Expansion',
      stage_name: 'Discovery & Qualification',
    },
    success_criteria: [
      'Reduce returns processing time by 40%',
      'Enable subscription billing for membership tier',
      'Integrate carbon offset tracking into payment receipts',
    ],
    health_status: 'At Risk',
    csm_owner: 'Marcus Chan',
    renewal_date: '2026-04-01',
    arr: 120000,
    contract_value: 120000,
    last_meeting: '2026-01-14',
    next_meeting: '2026-03-11',
    metadata: {
      onboarding_date: '2024-07-01',
      industry: 'Sustainable footwear',
      notes: 'Executive sponsor changed. New CTO has not engaged yet. Renewal at risk if we don\'t reestablish exec relationship before June.',
    },
  },
  {
    id: 'acc-005',
    company_id: 'comp-glossier',
    company_name: 'Glossier',
    company_icon_color: 'bg-pink-400',
    deal_ids: ['prior-deal-003'],
    active_deal: null,
    success_criteria: [
      'Achieve 98%+ checkout success rate on mobile',
      'Automate influencer and affiliate payouts',
      'Support international expansion into 5 EU markets',
    ],
    health_status: 'Healthy',
    csm_owner: 'Sarah Kim',
    renewal_date: '2027-04-01',
    arr: 480000,
    contract_value: 480000,
    last_meeting: '2026-02-28',
    next_meeting: '2026-03-28',
    metadata: {
      onboarding_date: '2025-05-01',
      industry: 'DTC beauty',
      notes: 'Flagship account. Strong NPS. Likely to expand into EU module at renewal.',
    },
  },
  {
    id: 'acc-006',
    company_id: 'comp-bombas',
    company_name: 'Bombas',
    company_icon_color: 'bg-orange-500',
    deal_ids: ['prior-deal-004'],
    active_deal: null,
    success_criteria: [
      'Real-time donation tracking tied to each transaction',
      'Reconcile payments across 4 retail + DTC channels',
      'Produce quarterly social impact payment reports',
    ],
    health_status: 'Monitor',
    csm_owner: 'Marcus Chan',
    renewal_date: '2026-06-05',
    arr: 96000,
    contract_value: 96000,
    last_meeting: '2026-02-01',
    next_meeting: null,
    metadata: {
      onboarding_date: '2024-12-01',
      industry: 'Apparel / social impact',
      notes: 'Impact reporting feature delayed on our end. Team frustrated. Need to set a delivery date by end of Q1.',
    },
  },
  {
    id: 'acc-007',
    company_id: 'comp-warby',
    company_name: 'Warby Parker',
    company_icon_color: 'bg-sky-700',
    deal_ids: ['prior-deal-005'],
    active_deal: {
      id: 'expansion-deal-007',
      name: 'Warby Parker — HSA/FSA Module',
      stage_name: 'Demo',
    },
    success_criteria: [
      'Unify in-store and online payment data in single dashboard',
      'Enable HSA/FSA card acceptance at all touchpoints',
      'Automate try-at-home billing and deposit holds',
    ],
    health_status: 'Healthy',
    csm_owner: 'Jordan Lee',
    renewal_date: '2027-02-28',
    arr: 300000,
    contract_value: 300000,
    last_meeting: '2026-02-22',
    next_meeting: '2026-03-22',
    metadata: {
      onboarding_date: '2025-03-15',
      industry: 'Eyewear retail',
      notes: 'Active expansion opportunity in HSA/FSA module. Strong champion in CFO office.',
    },
  },
];
