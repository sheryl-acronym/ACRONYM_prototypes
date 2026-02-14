export interface CustomerProfile {
  id: string;
  category: 'Ideal' | 'Secondary' | 'Emerging';
  name: string;
  description: string;
  example_companies: string[];
}

export const customerProfilesData: CustomerProfile[] = [
  {
    id: 'cp-001',
    category: 'Secondary',
    name: 'Enterprise Multi-Channel Advanced Operations',
    description: 'Large enterprise organizations with complex multi-channel operations (retail stores, e-commerce, mobile) seeking HSA/FSA solutions primarily for their e-commerce channels',
    example_companies: ['better being co.', 'arbonne', 'bauerfeind usa'],
  },
  {
    id: 'cp-002',
    category: 'Secondary',
    name: 'Health Tech Growth-Stage Partnership-Ready',
    description: 'Growth-stage health and wellness technology companies with app-based or subscription business models, seeking HSA/FSA payment capabilities to reduce platform fees and expand payment options',
    example_companies: ['allermi', 'brainhq from posit science', 'cal ai'],
  },
  {
    id: 'cp-003',
    category: 'Ideal',
    name: 'Mid-Market E-Commerce Growth Brands',
    description: 'Growth-stage direct-to-consumer and e-commerce companies with sophisticated online operations, seeking HSA/FSA solutions after seeing competitive or partner success, focused on digital conversion and customer acquisition',
    example_companies: ['elemind technologies, inc.', 'basic research', 'chilipad by sleepme'],
  },
  {
    id: 'cp-004',
    category: 'Secondary',
    name: 'Mid-Market Multi-Channel Operators',
    description: 'Established companies with both physical retail locations and e-commerce operations, seeking HSA/FSA payment solutions across channels to serve customers wherever they shop',
    example_companies: ['balanced body', 'bathhouse', 'bells of steel'],
  },
  {
    id: 'cp-005',
    category: 'Secondary',
    name: 'SMB DTC Health/Wellness Fast-Movers',
    description: 'Small to medium direct-to-consumer health and wellness businesses with fast decision cycles, seasonal urgency around FSA spending, and resource constraints requiring simple implementation',
    example_companies: ['adaptive sound technologies, inc.', 'adco medical suppliers', 'aletha health'],
  },
];
