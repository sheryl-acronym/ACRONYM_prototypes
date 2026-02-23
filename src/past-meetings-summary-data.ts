import { PostCallSummaryData } from './types';

const createBasicSummary = (
  title: string,
  company: string,
  momentum: 'Strong' | 'Active' | 'Stalled' | 'At risk' | 'Closed'
): PostCallSummaryData => ({
  breadcrumb: ['Meetings', 'Past', title],
  meeting_type: {
    label: `Meeting with ${company}`,
    color: 'bg-blue-400',
  },
  title,
  momentum: {
    status: momentum,
    description: `Internal technical review confirmed stability of core integration while identifying critical gaps.`,
  },
  metadata: {
    company: {
      name: company,
    },
    date_time: 'Feb 17, 11:09 - 11:36 AM (27 minutes)',
    duration: '27 minutes',
    our_team: [],
    their_team: [],
  },
  meeting_summary: `Conducted an internal technical deep dive into the integration architecture. The session covered critical mechanics including background product syncing, API key configuration, and the handling of custom fees. Clarified that the integration is primarily used by SMBs, with limited mid-market adoption. A significant portion of the discussion focused on technical limitations and error handling.

We reviewed the current implementation roadmap and identified several key areas for improvement. The team confirmed that core stability is solid, but subscription management features need enhancement to better serve mid-market customers. Budget constraints were discussed, and we established a phased approach to rolling out new capabilities over the next two quarters.

Next steps include scheduling a follow-up technical review with the product team and preparing a detailed proposal for the subscription support enhancements. The team expressed confidence in the partnership and are committed to supporting our growth objectives.`,
  key_discussion_points: [
    'Core integration stability confirmed',
    'Subscription management needs enhancement for mid-market',
    'API rate limiting could impact high-volume customers',
    'Team expressed strong commitment to partnership',
    'Implementation timeline needs clarification with stakeholders',
  ],
  next_steps: [
    {
      text: 'Schedule follow-up technical review',
      due_date: '2026-02-24',
      assignee: 'David Barratt',
    },
    {
      text: 'Prepare proposal for subscription support enhancement',
      due_date: '2026-02-28',
      assignee: 'Chris Langbort',
    },
  ],
  our_next_steps: [
    {
      text: 'Schedule follow-up technical review with product team',
      assignee: 'David Barratt',
    },
    {
      text: 'Prepare detailed proposal for subscription support enhancements',
      assignee: 'Chris Langbort',
    },
    {
      text: 'Gather customer feedback on API rate limiting concerns',
      assignee: 'Sarah Chen',
    },
  ],
  their_next_steps: [
    {
      text: 'Review and approve subscription support roadmap',
      assignee: 'Eugene Kim',
    },
    {
      text: 'Schedule implementation timeline review',
      assignee: 'Benny Cole',
    },
  ],
  what_we_learned: [
    {
      title: 'Decision Process:',
      items: [
        'Technical review is a critical gating factor',
        'Committee approval required at C-level',
        'Budget allocated for Q2 implementation',
      ],
    },
    {
      title: 'Decision Criteria:',
      items: [
        'API rate limiting must support 10k req/min',
        'Subscription management critical for mid-market adoption',
        'Custom fee implementation required',
        'Sentry integration for error tracking',
      ],
    },
    {
      title: 'Competitive Landscape:',
      items: [
        'Main competitor recently launched similar feature',
        'Gap analysis shows we have 2-month advantage',
      ],
    },
  ],
  positive_signals: [
    {
      title: 'Data Transparency',
      description: 'Russell provided sensitive financial metrics (ARR and split AOV) immediately upon request to speed up the sales cycle',
      evidence: 'Shared detailed financial models without hesitation',
      quote: 'I think this year, Proven will probably do around $15 million in ARR [00:09:12]',
    },
    {
      title: 'Enthusiastic Validation',
      description: 'Russell reacted strongly to the value proposition once eligibility was confirmed',
      evidence: 'Immediate positive response to key finding',
      quote: 'If I can use my HSA or FSA to buy these products, like, hell yeah, right? [00:07:41]',
    },
    {
      title: 'Solution Fit',
      description: 'The "95% eligibility" assessment removed the primary product blocker',
      evidence: 'Clear identification of critical success factor',
      quote: 'Honestly, what I needed to hear was that 95% of our products would be eligible [00:06:56]',
    },
    {
      title: 'Efficient Progression',
      description: 'Russell proactively requested the next meeting to review the demo and close out pricing',
      evidence: 'Self-initiated timeline acceleration',
      quote: 'Can we schedule maybe just like another 15 minutes next week... give me a quick look at the checkout process [00:06:44]',
    },
  ],
  risk_factors: [
    {
      title: 'Budget Constraints',
      description: 'No confirmed budget allocation beyond current operational spend',
      evidence: 'Needs to present to finance committee for approval',
      quote: 'I need to take this back to the team and get some numbers modeled [00:15:23]',
    },
    {
      title: 'Implementation Complexity',
      description: 'Technical integration timeline unclear and dependent on internal resource availability',
      evidence: 'Multiple teams require sign-off before commitment',
    },
    {
      title: 'Competitive Pressure',
      description: 'Main competitor potentially launching similar capability within 2-3 months',
      evidence: 'Market window for differentiation is narrowing',
    },
  ],
  transcript: {
    entries: [
      {
        speaker: 'David Barratt',
        text: 'Thanks for joining the call today. I wanted to dive deep into the integration architecture and make sure we have all the technical details aligned.',
        timestamp: '00:00',
      },
      {
        speaker: 'Eugene Kim',
        text: 'Absolutely. We\'ve been using the integration for a few months now and overall it\'s been solid. But we did identify some areas where we\'d like to see improvements.',
        timestamp: '00:18',
      },
      {
        speaker: 'David Barratt',
        text: 'Great. Can you walk me through the current setup and the main pain points you\'ve encountered?',
        timestamp: '00:35',
      },
      {
        speaker: 'Benny Cole',
        text: 'Sure. The background product syncing works well for our SMB customers. But as we expand to mid-market, we\'re hitting some limitations with API rate limits.',
        timestamp: '00:52',
      },
      {
        speaker: 'David Barratt',
        text: 'That makes sense. Do you have specific numbers on the rate limiting issues?',
        timestamp: '01:15',
      },
      {
        speaker: 'Eugene Kim',
        text: 'We\'re seeing impacts when customers try to sync more than 10,000 requests per minute. For mid-market customers, that\'s becoming a real blocker.',
        timestamp: '01:28',
      },
      {
        speaker: 'David Barratt',
        text: 'I understand. We\'ve already identified this as a priority for Q2. Let me walk through our proposed roadmap.',
        timestamp: '02:10',
      },
      {
        speaker: 'Benny Cole',
        text: 'That would be really helpful. I\'ll need to take this back to our finance and technical teams for approval.',
        timestamp: '02:35',
      },
      {
        speaker: 'David Barratt',
        text: 'Of course. We can provide detailed technical specifications and a phased implementation timeline to help with your internal review.',
        timestamp: '02:48',
      },
      {
        speaker: 'Eugene Kim',
        text: 'Perfect. I\'m confident in this partnership and excited to move forward together.',
        timestamp: '03:20',
      },
    ],
  },
  meddic: {
    components: [
      {
        name: 'Metric',
        status: 'complete',
        information: '$1.25M monthly revenue, 10k orders, 60% subscription-based',
        details: [
          'Current processing costs are 2.5% across payment methods',
          'Looking for 6.38x ROI on new feature implementation',
          'Break-even at 50% AOV uplift across 15% of transactions',
        ],
      },
      {
        name: 'Economic Buyer',
        status: 'complete',
        information: 'Russell Harris, VP of Revenue Operations',
        details: [
          'Budget holder for Q2 technology initiatives',
          'Has final sign-off on partnerships exceeding $50k',
          'Personally modeling ROI before Tuesday review',
        ],
      },
      {
        name: 'Decision Criteria',
        status: 'partial',
        information: 'Technical viability + pricing + experience + internal alignment',
        details: [
          'Subscription support is the critical blocker',
          'Marketing messaging must match actual experience',
          'ROI must offset margin erosion from transaction fees',
          'Still needs clarification on timeline and implementation',
        ],
      },
      {
        name: 'Decision Process',
        status: 'partial',
        information: 'Technical review → Finance modeling → C-level committee approval',
        details: [
          'Russell taking proposal to internal team Tuesday',
          'Theresa (Brand) reviewing customer experience implications',
          'Yuliia (Tech) gates on integration complexity',
        ],
      },
      {
        name: 'Identify Pain',
        status: 'complete',
        information: 'Revenue stagnation with current payment methods, customer acquisition costs rising',
        details: [
          'HSA/FSA customers represent untapped TAM',
          'Current checkout experience is friction point',
          'Competitive gap if they launch subscription support first',
        ],
      },
      {
        name: 'Champion',
        status: 'complete',
        information: 'Russell Harris is actively building business case internally',
        details: [
          'Requesting raw spreadsheet to model with actual numbers',
          'Connecting with technical and brand teams directly',
          'Committed to clear timeline (decision by Tuesday)',
        ],
      },
    ],
  },
});

export const pastMeetingsSummaryData: Record<string, PostCallSummaryData> = {
  'pm-001': createBasicSummary('Eugene Kim and Benny Cole', 'Cal AI', 'Strong'),
  'pm-002': createBasicSummary('Cal AI HSA/FSA', 'Cal AI', 'Strong'),
  'pm-003': createBasicSummary('WW <> Flex', 'WW', 'Active'),
  'pm-004': createBasicSummary('Glossier <> Flex', 'Glossier', 'Strong'),
  'pm-005': createBasicSummary('Hims & Hers Demo', 'Hims & Hers', 'Active'),
  'pm-006': createBasicSummary('Slack Integration Discussion', 'Slack', 'Stalled'),
  'pm-007': createBasicSummary('Warby Parker Proposal', 'Warby Parker', 'Strong'),
  'pm-008': createBasicSummary('Notion Integration Planning', 'Notion', 'Active'),
  'pm-009': createBasicSummary('WooCommerce sync', 'WooCommerce', 'Active'),
};
