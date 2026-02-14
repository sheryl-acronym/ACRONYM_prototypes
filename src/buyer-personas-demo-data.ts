export interface BuyerPersona {
  id: string;
  category: 'Primary' | 'Secondary' | 'Emerging';
  name: string;
  description: string;
  typically_found_in: string;
}

export const buyerPersonasData: BuyerPersona[] = [
  {
    id: 'bp-001',
    category: 'Primary',
    name: 'Finance/Operations Executive',
    description: 'Senior finance and operations executives who oversee multiple functional areas and view solutions as strategic enablers. They\'re focused on ROI, financial modeling, and aligning vendor relationships with broader company strategy and growth plans. Typically involved in larger deals or when financial impact is significant.',
    typically_found_in: '',
  },
  {
    id: 'bp-002',
    category: 'Secondary',
    name: 'Marketing/Growth Leader',
    description: 'Growth-focused marketing leaders who evaluate solutions based on customer acquisition potential, conversion optimization, and competitive differentiation. They champion initiatives that drive revenue and often have budget authority for customer-facing tools. Strong advocates when they see clear marketing value.',
    typically_found_in: '',
  },
  {
    id: 'bp-003',
    category: 'Secondary',
    name: 'Operations/Implementation Manager',
    description: 'Mid-level operators who manage day-to-day implementation and coordinate cross-functional execution. They focus on operational excellence, vendor management, and ensuring solutions work smoothly across teams. Often the primary point of contact throughout implementation.',
    typically_found_in: '',
  },
  {
    id: 'bp-004',
    category: 'Emerging',
    name: 'Technical Founder/Decision Maker',
    description: 'Technical founders who combine deep product/engineering expertise with business decision-making authority. They evaluate solutions through both technical feasibility and revenue impact lenses, making them uniquely positioned to drive rapid implementation decisions.',
    typically_found_in: '',
  },
  {
    id: 'bp-005',
    category: 'Primary',
    name: 'Technical Implementation Lead',
    description: 'Engineering and product leaders who evaluate technical architecture, integration complexity, and system reliability. They have significant influence over implementation decisions and can become blockers if technical concerns aren\'t adequately addressed. Focus heavily on API design, error handling, and maintenance requirements.',
    typically_found_in: '',
  },
];
