import { PreCallBriefData } from './types';

const createBasicBrief = (
  title: string,
  company: string,
  dealId: string
): PreCallBriefData => ({
  breadcrumb: ['Meetings', title],
  meeting_type: {
    label: `Meeting with ${company}`,
    color: 'bg-blue-400',
  },
  title,
  join_button_label: 'Join & Start',
  deal_id: dealId,
  metadata: {
    company: {
      name: company,
    },
    customer_profile: 'Mid-Market E-Commerce Growth Brands',
    date_time: 'TBD',
    our_team: [],
    their_team: [],
  },
  brief: {
    meeting_objectives: {
      description: `Upcoming meeting with ${company}`,
      objectives: [
        'Understand business priorities and challenges',
        'Validate fit and alignment',
        'Explore partnership opportunities',
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
        bullets: [
          'Growth-stage company with scalability needs',
          'Looking for solutions to support business expansion',
          'Strategic priorities focused on operational efficiency',
        ],
      },
      attendees: [],
    },
    suggested_discovery_questions: [
      'What are your top business priorities for the next 12 months?',
      'What challenges are you currently facing?',
      'How do you currently handle this process?',
      'What would success look like for your business?',
      'What is your timeline for making a decision?',
    ],
  },
  gameplan: {
    placeholder: 'Gameplan will be populated during the meeting',
    meeting_objective: `Understand ${company}'s needs and explore partnership opportunities`,
    agenda: [],
    sections: [],
    anticipated_questions: [],
    anticipated_objections: [],
  },
});

export const upcomingMeetingsBriefData: Record<string, PreCallBriefData> = {
  'um-001': createBasicBrief('PROVEN <> Flex', 'PROVEN Skincare', 'deal-005'),
  'um-002': createBasicBrief('Glossier <> Flex Follow-up', 'Glossier', 'deal-006'),
  'um-003': createBasicBrief('Hims & Hers Quarterly Review', 'Hims & Hers', 'deal-007'),
  'um-004': createBasicBrief('Peloton Demo Walkthrough', 'Peloton', 'deal-008'),
  'um-005': createBasicBrief('Oura Integration Planning', 'Oura', 'deal-009'),
  'um-006': createBasicBrief('Warby Parker Proposal Review', 'Warby Parker', 'deal-010'),
  'um-007': createBasicBrief('Allbirds Contract Negotiation', 'Allbirds', 'deal-011'),
  'um-008': createBasicBrief('Cal AI Weekly Sync', 'Cal AI', 'deal-012'),
  'um-009': createBasicBrief('Bombas <> Flex Closing Call', 'Bombas', 'deal-013'),
};
