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
    description: '',
    typically_found_in: '',
  },
  {
    id: 'bp-002',
    category: 'Secondary',
    name: 'Marketing/Growth Leader',
    description: '',
    typically_found_in: '',
  },
  {
    id: 'bp-003',
    category: 'Secondary',
    name: 'Operations/Implementation Manager',
    description: '',
    typically_found_in: '',
  },
  {
    id: 'bp-004',
    category: 'Emerging',
    name: 'Technical Founder/Decision Maker',
    description: '',
    typically_found_in: '',
  },
  {
    id: 'bp-005',
    category: 'Primary',
    name: 'Technical Implementation Lead',
    description: '',
    typically_found_in: '',
  },
];
