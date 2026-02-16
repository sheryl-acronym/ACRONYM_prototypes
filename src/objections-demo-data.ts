export interface Objection {
  id: string;
  category: 'Fit and Capability' | 'Authority' | 'Alternatives' | 'Risk and Trust' | 'Budget and Value';
  objection: string;
  description: string;
  typically_raised_by: string[];
}

export const objectionsData: Objection[] = [
  {
    id: 'obj-001',
    category: 'Fit and Capability',
    objection: 'Product Eligibility and Classification Uncertainty',
    description: 'Merchants are uncertain which of their products qualify for HSA/FSA eligibility and anxious about the complexity of the classification and compliance process.',
    typically_raised_by: ['Operations/Implementation Manager', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'obj-002',
    category: 'Authority',
    objection: 'Complex Internal Approval Process',
    description: 'The prospect faces multi-step organizational approval involving legal review, IT/security vetting, finance sign-off, and executive review before any vendor implementation can proceed.',
    typically_raised_by: ['Operations/Implementation Manager', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'obj-003',
    category: 'Fit and Capability',
    objection: 'Technical Integration & Payment Flow Mechanics',
    description: 'Prospects are deeply concerned about understanding the technical mechanics of how Flex integrates with their payment processing, handling errors, refunds, and complex transaction flows.',
    typically_raised_by: ['Technical Founder/Decision Maker', 'Technical Implementation Lead'],
  },
  {
    id: 'obj-004',
    category: 'Alternatives',
    objection: 'Competitive Validation and Differentiation',
    description: 'Prospects are comparing multiple vendors (TrueMed, Sidecar, or considering in-house solutions). They hear conflicting positioning and struggle to understand why Flex is the better choice.',
    typically_raised_by: ['Finance/Operations Executive', 'Technical Founder/Decision Maker'],
  },
  {
    id: 'obj-005',
    category: 'Risk and Trust',
    objection: 'Letter of Medical Necessity Confusion',
    description: 'Prospects are confused and anxious about how the letter of medical necessity process works, what it means for their business liability, and whether customers will abandon checkout because of it.',
    typically_raised_by: [],
  },
  {
    id: 'obj-006',
    category: 'Budget and Value',
    objection: 'Pricing: Transaction Fee and Margin Concerns',
    description: 'Prospects are concerned about how Flex\'s transaction fees (typically 4-5% + $0.30) and letter costs ($10) will impact their margins and whether the revenue upside justifies the cost.',
    typically_raised_by: [],
  },
  {
    id: 'obj-007',
    category: 'Fit and Capability',
    objection: 'Eligibility and Compliance Verification Process',
    description: 'The prospect is uncertain about whether their specific products/services will qualify for HSA/FSA eligibility and wants clarity on the verification and approval process.',
    typically_raised_by: [],
  },
  {
    id: 'obj-008',
    category: 'Fit and Capability',
    objection: 'Platform and Integration Compatibility',
    description: 'Prospects are uncertain whether Flex can technically integrate with their specific e-commerce platform, payment processor, or custom checkout environment.',
    typically_raised_by: [],
  },
  {
    id: 'obj-009',
    category: 'Fit and Capability',
    objection: 'Implementation Complexity and Customer Friction',
    description: 'The prospect is concerned that implementing HSA/FSA payments will introduce significant operational complexity, customer support burden, or friction in the checkout experience.',
    typically_raised_by: [],
  },
  {
    id: 'obj-010',
    category: 'Fit and Capability',
    objection: 'Implementation Complexity and Integration Effort',
    description: 'Prospects are concerned about the technical complexity, timeline, and internal resource commitment required to implement Flex\'s HSA/FSA payment solution.',
    typically_raised_by: [],
  },
];
