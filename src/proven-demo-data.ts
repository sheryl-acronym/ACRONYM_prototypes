import { PreCallBriefData } from './types';

export const provenDemoData: PreCallBriefData = {
  breadcrumb: ['Meetings', 'PROVEN <> Flex'],
  meeting_type: {
    label: 'PROVEN Skincare',
    color: 'bg-green-400',
  },
  title: 'PROVEN <> Flex',
  join_button_label: 'Join & Start',
  metadata: {
    company: {
      name: 'PROVEN Skincare',
      logo_url: '/proven.png',
    },
    customer_profile: 'Mid-Market E-Commerce Growth Brands',
    date_time: 'April 2, 2025, 5:00 - 6:00 PM ET',
    our_team: [
      {
        name: 'Jacob Francis',
        role: 'Account Executive',
        avatar_color: 'bg-emerald-600',
      },
    ],
    their_team: [
      {
        name: 'Russell Harris',
        role: 'Technical Founder/Decision Maker',
        avatar_color: 'bg-blue-500',
      },
    ],
  },
  brief: {
    meeting_objectives: {
      description: 'First meeting with PROVEN Skincare - referral via Skio.',
      objectives: [
        'Qualify for HSA/FSA eligibility based on skincare/wellness product mix',
        'Validate technical compatibility with their e-commerce stack',
        'Establish value prop tied to AOV lift and profitability goals',
      ],
      what_we_need_to_learn: [
        'HSA/FSA familiarity and current capabilities',
        'Technical stack and platform compatibility',
        'Business model and revenue mix (subscription vs. one-time)',
        'Volume and financial qualification',
      ],
    },
    who_youre_talking_to: {
      company: {
        name: 'PROVEN Skincare',
        icon_color: 'bg-blue-500',
        bullets: [
          'AI-powered personalized care manufacturer, >$35M run rate',
          'What they need: Strategies to increase Average Order Value (AOV) and conversion rates',
          'Timeline: Strategic pivot to profitability drives urgency for high-margin revenue',
        ],
      },
      attendees: [
        {
          name: 'Russell Harris',
          role: 'Technical Founder/Decision Maker',
          avatar_color: 'bg-blue-500',
          bio: [
            "Leads product/tech; previously VP Product at Harry's and Carvana",
            'Scaled businesses from $0 to $100M+; experienced with AI lifecycles',
          ],
          approach: 'Engage on API-first architecture and impact on unit economics',
          linkedin_url: 'linkedin.com/handle',
        },
      ],
    },
  },
  gameplan: {
    placeholder: 'Gameplan content will appear here.',
  },
};
