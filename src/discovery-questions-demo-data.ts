export interface DiscoveryQuestion {
  id: string;
  category: 'Current State' | 'Baseline Assessment' | 'Founder-Led to First Sales Team Transition' | 'Sales Leader-Driven Scaling';
  question: string;
  why_asking: string;
  typically_relevant_for: string[];
  related_signal_ids?: string[];
}

export const discoveryQuestionsData: DiscoveryQuestion[] = [
  {
    id: 'dq-001',
    category: 'Baseline Assessment',
    question: 'How did you hear about us?',
    why_asking: 'Understand lead source and attribution to assess deal quality, identify referral patterns, and understand internal buying triggers and urgency drivers',
    typically_relevant_for: ['Enterprise Multi-Channel Advanced Operations', 'Health Tech Growth-Stage Partnership-Ready', 'Mid-Market E-Commerce Growth Brands', 'Mid-Market Multi-Channel Operators', 'SMB DTC Health/Wellness Fast-Movers'],
    related_signal_ids: ['signal-dq-001', 'signal-dq-002'],
  },
  {
    id: 'dq-002',
    category: 'Current State',
    question: 'What checkout or e-commerce platform do you use?',
    why_asking: 'Understanding the prospect\'s technical infrastructure determines integration feasibility, effort, and approach. Payment/checkout platforms dictate whether we can use native integrations (Shopify, WooCommerce), require API work (custom checkouts), or face compatibility blockers. This directly impacts sales cycle length, implementation complexity, and whether the deal is technically viable.',
    typically_relevant_for: ['Enterprise Multi-Channel Advanced Operations', 'Health Tech Growth-Stage Partnership-Ready', 'Mid-Market E-Commerce Growth Brands', 'Mid-Market Multi-Channel Operators', 'SMB DTC Health/Wellness Fast-Movers'],
    related_signal_ids: ['signal-dq-001', 'signal-dq-003'],
  },
  {
    id: 'dq-003',
    category: 'Current State',
    question: 'What\'s your average order value?',
    why_asking: 'Understand transaction size to calculate fee impact, position split cart functionality for high-value orders, and assess revenue potential per transaction',
    typically_relevant_for: ['SMB DTC Health/Wellness Fast-Movers', 'Mid-Market Multi-Channel Operators', 'Mid-Market E-Commerce Growth Brands', 'Health Tech Growth-Stage Partnership-Ready', 'Enterprise Multi-Channel Advanced Operations'],
  },
  {
    id: 'dq-004',
    category: 'Current State',
    question: 'What\'s your annual revenue/sales volume?',
    why_asking: 'This helps qualify deal size, estimate transaction volume potential, and prioritize resources. Annual revenue contextualizes the customer\'s scale, forecasts partnership value based on consumption, and determines if the prospect has sufficient volume to justify implementation investment. While Flex pricing is consumption-based (per transaction + letter fees), understanding revenue helps assess fit and opportunity size.',
    typically_relevant_for: ['SMB DTC Health/Wellness Fast-Movers', 'Mid-Market Multi-Channel Operators', 'Mid-Market E-Commerce Growth Brands', 'Health Tech Growth-Stage Partnership-Ready', 'Enterprise Multi-Channel Advanced Operations'],
  },
  {
    id: 'dq-005',
    category: 'Current State',
    question: 'Do you have a US entity?',
    why_asking: 'This qualifies whether the prospect can work with Flex. A US entity and US bank account are required to receive payouts through Flex\'s Stripe Connect integration. International companies without a US presence cannot use Flex\'s services.',
    typically_relevant_for: ['SMB DTC Health/Wellness Fast-Movers', 'Mid-Market Multi-Channel Operators', 'Mid-Market E-Commerce Growth Brands', 'Health Tech Growth-Stage Partnership-Ready', 'Enterprise Multi-Channel Advanced Operations'],
  },
  {
    id: 'dq-006',
    category: 'Current State',
    question: 'What\'s your revenue mix between subscription and one-time purchases?',
    why_asking: 'This helps understand technical complexity and business model fit. Flex supports both one-time and subscription purchases, but subscriptions require off-session payment setup and integration with Stripe billing. High subscription mix indicates more technical implementation work, though most Flex merchants are subscription-heavy (93% of Flex volume is annual subscriptions). This helps scope integration effort and timeline.',
    typically_relevant_for: ['Enterprise Multi-Channel Advanced Operations', 'Health Tech Growth-Stage Partnership-Ready', 'Mid-Market E-Commerce Growth Brands', 'Mid-Market Multi-Channel Operators', 'SMB DTC Health/Wellness Fast-Movers'],
  },
  {
    id: 'dq-007',
    category: 'Baseline Assessment',
    question: 'Have you seen our solution before or had a chance to look at it?',
    why_asking: 'This helps gauge prospect knowledge level and determine how much education is needed versus moving to deeper discovery. It allows tailoring the conversation appropriately - whether to start with product education, skip to differentiation, or dive into fit assessment. It also reveals buying intent and research effort, which are qualification signals.',
    typically_relevant_for: ['Enterprise Multi-Channel Advanced Operations', 'Health Tech Growth-Stage Partnership-Ready', 'Mid-Market E-Commerce Growth Brands', 'Mid-Market Multi-Channel Operators', 'SMB DTC Health/Wellness Fast-Movers'],
  },
  {
    id: 'dq-008',
    category: 'Current State',
    question: 'How many SKUs/products do you have?',
    why_asking: 'SKU count scopes implementation work, particularly for HSA/FSA eligibility review where each product must be evaluated. Catalog size directly impacts integration complexity, timeline, pricing tier, and resource allocation.',
    typically_relevant_for: ['Enterprise Multi-Channel Advanced Operations', 'Health Tech Growth-Stage Partnership-Ready', 'SMB DTC Health/Wellness Fast-Movers', 'Mid-Market E-Commerce Growth Brands', 'Mid-Market Multi-Channel Operators'],
  },
  {
    id: 'dq-009',
    category: 'Baseline Assessment',
    question: 'How familiar are you with HSA and FSA accounts?',
    why_asking: 'This calibrates education level and avoids wasting time explaining concepts the prospect already understands or going over their head. It\'s a critical discovery efficiency question - understanding whether to provide a 101 explanation, skip to advanced topics, or meet somewhere in between. The response shapes how the rest of the conversation unfolds and ensures information is delivered at the right level.',
    typically_relevant_for: ['SMB DTC Health/Wellness Fast-Movers', 'Mid-Market Multi-Channel Operators', 'Mid-Market E-Commerce Growth Brands', 'Health Tech Growth-Stage Partnership-Ready', 'Enterprise Multi-Channel Advanced Operations'],
  },
];
