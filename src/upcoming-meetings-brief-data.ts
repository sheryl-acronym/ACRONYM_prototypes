import { PreCallBriefData } from './types';

const createBasicBrief = (
  title: string,
  company: string,
  dealId: string,
  dealName?: string,
  dateTime?: string,
  ourTeam?: { name: string; avatar_color?: string }[],
  theirTeam?: { name: string; avatar_color?: string }[],
  meetingDescription?: string
): PreCallBriefData => ({
  breadcrumb: ['Meetings', title],
  meeting_type: {
    label: meetingDescription || `Meeting with ${company}`,
    color: 'bg-blue-400',
  },
  title,
  join_button_label: 'Join & Start',
  deal_id: dealId,
  metadata: {
    deal_name: dealName,
    company: {
      name: company,
    },
    customer_profile: 'Mid-Market E-Commerce Growth Brands',
    date_time: dateTime || 'TBD',
    our_team: ourTeam || [],
    their_team: theirTeam || [],
    team: ourTeam || [],
  },
  brief: {
    meeting_objectives: {
      description: `Upcoming meeting with ${company}`,
      objectives: [
        'Assess HSA/FSA familiarity and determine their current capabilities',
        'Validate technical stack and platform compatibility with our integration',
        'Understand their business model and revenue mix (subscription vs. one-time)',
        'Qualify their volume and financial metrics against our thresholds',
      ],
      what_we_need_to_learn: [
        'Current business priorities',
        'Technical requirements',
        'Budget and decision timeline',
        'Key stakeholders and buying process',
      ],
    },
    who_youre_talking_to: {
      company: {
        name: company,
        icon_color: 'bg-blue-500',
        logo_url: `/${company.toLowerCase().replace(/\s+/g, '-')}.png`,
        domain: `${company.toLowerCase().replace(/\s+/g, '')}.com`,
        customer_profile: 'Mid-Market E-Commerce Growth Brands',
        deal_summary: `${company} is a growth-stage company looking to expand their current business model. They have immediate interest in strategic solutions that can unlock new revenue streams and improve operational efficiency.`,
        company_research: [
          'Growth-stage company with scalability needs',
          'Looking for solutions to support business expansion',
          'Strategic priorities focused on operational efficiency',
        ],
        company_profile_url: `/company/${company.toLowerCase().replace(/\s+/g, '-')}`,
        bullets: [
          'Growth-stage company with scalability needs',
          'Looking for solutions to support business expansion',
          'Strategic priorities focused on operational efficiency',
        ],
      },
      attendees: [
        {
          name: 'Russell Harris',
          avatar_color: 'bg-blue-500',
          buyer_persona: 'Technical Founder/Decision Maker',
        },
      ],
    },
    suggested_discovery_questions: [
      'What is your current checkout platform and payment processor?',
      'What is your average order value and annual transaction volume?',
      'What percentage of your customer base would qualify for HSA/FSA?',
      'How do you currently manage compliance and payment workflows?',
      'What is your timeline and budget for implementing new payment solutions?',
    ],
  },
  gameplan: {
    placeholder: 'Gameplan will be populated during the meeting',
    meeting_objective: `Understand ${company}'s needs and explore partnership opportunities`,
    agenda: [],
    sections: [],
    anticipated_questions: [
      { text: 'What is the implementation timeline and how long will it take to go live?', isAI: true },
      { text: 'How does your solution handle data security and compliance requirements?', isAI: true },
      { text: 'What support and training will be provided during and after implementation?', isAI: true },
      { text: 'Can you provide references from similar companies in our industry?', isAI: true },
      { text: 'How does pricing scale as our business grows?', isAI: true },
    ],
    anticipated_objections: [
      { text: 'Concerns about integration complexity and timeline', isAI: true },
      { text: 'Questions about pricing and ROI justification', isAI: true },
      { text: 'Need to validate technical compatibility with existing systems', isAI: true },
    ],
  },
});

export const upcomingMeetingsBriefData: Record<string, PreCallBriefData> = {
  'um-001': (() => {
    const base = createBasicBrief(
      'PROVEN <> Flex',
      'PROVEN Skincare',
      'deal-005',
      'Deal with proven.com',
      'Feb 16, 5:00 - 6:00 PM (1 hour)',
      [
        { name: 'Jacob Francis', avatar_color: 'blue-500' },
        { name: 'Sarah Chen', avatar_color: 'purple-500' },
      ],
      [
        { name: 'Russell Harris', avatar_color: 'amber-500' },
      ],
      'This is the first meeting with PROVEN Skincare — a referral via Skio. Russell champions internally but we need to prove unit economics.'
    );
    // Override company info with PROVEN-specific details
    return {
      ...base,
      brief: {
        ...base.brief,
        who_youre_talking_to: {
          ...base.brief.who_youre_talking_to,
          company: {
            ...base.brief.who_youre_talking_to.company,
            deal_summary: 'PROVEN is a $35M+ AI-powered skincare company pivoting to profitability. They\'re stuck at current AOV and need high-margin revenue — HSA/FSA could unlock 15-20% uplift. Russell\'s championing internally, but unit economics has to work with their margin structure.',
            company_research: [
              'AI-powered personalized care manufacturer, >$35M run rate',
              'What they need: Strategies to increase Average Order Value (AOV) and conversion rates',
              'Timeline: Strategic pivot to profitability drives urgency for high-margin revenue',
            ],
            company_profile_url: '/company/proven-skincare',
          },
          attendees: [
            {
              name: 'Russell Harris',
              avatar_color: 'bg-blue-500',
              role: 'Head of Product/Tech',
              buyer_persona: 'Technical Founder/Decision Maker',
              linkedin_url: 'linkedin.com/in/russell-harris',
              bio: [
                "Leads product/tech; previously VP Product at Harry's and Carvana",
                'Scaled businesses from $0 to $100M+; experienced with AI lifecycles',
                'Approach: Engage on API-first architecture and impact on unit economics',
              ],
            },
          ],
        },
      },
    };
  })(),
  'um-002': createBasicBrief(
    'Glossier <> Flex Follow-up',
    'Glossier',
    'deal-006',
    'Glossier HSA/FSA',
    'Feb 17, 2:00 - 3:00 PM (1 hour)',
    [
      { name: 'David Barratt', avatar_color: 'blue-500' },
      { name: 'Emily Rodriguez', avatar_color: 'cyan-500' },
    ],
    [{ name: 'Jessica Liu', avatar_color: 'orange-500' }]
  ),
  'um-003': createBasicBrief(
    'Hims & Hers Quarterly Review',
    'Hims & Hers',
    'deal-007',
    'Hims & Hers Enterprise',
    'Feb 18, 10:00 - 11:30 AM (1.5 hours)',
    [
      { name: 'Chris Langbort', avatar_color: 'indigo-500' },
      { name: 'Marcus Johnson', avatar_color: 'red-500' },
    ],
    [
      { name: 'Kevin Park', avatar_color: 'green-500' },
      { name: 'Amanda White', avatar_color: 'pink-500' },
    ]
  ),
  'um-004': createBasicBrief(
    'Peloton Demo Walkthrough',
    'Peloton',
    'deal-008',
    'Peloton Platform Integration',
    'Feb 19, 3:00 - 4:00 PM (1 hour)',
    [{ name: 'Jacob Francis', avatar_color: 'blue-500' }],
    [{ name: 'Alex Martinez', avatar_color: 'amber-500' }]
  ),
  'um-005': createBasicBrief(
    'Oura Integration Planning',
    'Oura',
    'deal-009',
    'Oura Health API',
    'Feb 20, 11:00 AM - 12:00 PM (1 hour)',
    [
      { name: 'Sarah Chen', avatar_color: 'purple-500' },
      { name: 'David Barratt', avatar_color: 'blue-500' },
    ],
    [{ name: 'Nina Patel', avatar_color: 'green-500' }]
  ),
  'um-006': createBasicBrief(
    'Warby Parker Proposal Review',
    'Warby Parker',
    'deal-010',
    'Warby Parker Expansion',
    'Feb 21, 1:00 - 2:00 PM (1 hour)',
    [
      { name: 'Chris Langbort', avatar_color: 'indigo-500' },
      { name: 'Emily Rodriguez', avatar_color: 'cyan-500' },
    ],
    [{ name: 'Robert Chen', avatar_color: 'orange-500' }]
  ),
  'um-007': createBasicBrief(
    'Allbirds Contract Negotiation',
    'Allbirds',
    'deal-011',
    'Allbirds Partnership',
    'Feb 23, 9:00 - 10:00 AM (1 hour)',
    [
      { name: 'Jacob Francis', avatar_color: 'blue-500' },
      { name: 'Marcus Johnson', avatar_color: 'red-500' },
    ],
    [
      { name: 'Sophie Turner', avatar_color: 'pink-500' },
      { name: 'James Wilson', avatar_color: 'indigo-500' },
    ]
  ),
  'um-008': createBasicBrief(
    'Cal AI Weekly Sync',
    'Cal AI',
    'deal-012',
    'Cal AI HSA Integration',
    'Feb 24, 4:00 - 4:30 PM (30 minutes)',
    [{ name: 'Sarah Chen', avatar_color: 'purple-500' }],
    [{ name: 'Eugene Kim', avatar_color: 'blue-500' }]
  ),
  'um-009': createBasicBrief(
    'Bombas <> Flex Closing Call',
    'Bombas',
    'deal-013',
    'Bombas Platform Deal',
    'Feb 25, 2:00 - 3:00 PM (1 hour)',
    [
      { name: 'David Barratt', avatar_color: 'blue-500' },
      { name: 'Emily Rodriguez', avatar_color: 'cyan-500' },
    ],
    [
      { name: 'Laura Gonzalez', avatar_color: 'amber-500' },
      { name: 'Michael Brown', avatar_color: 'green-500' },
    ]
  ),
};
