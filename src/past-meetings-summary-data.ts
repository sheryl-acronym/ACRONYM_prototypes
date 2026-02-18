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
  meeting_summary: `Conducted an internal technical deep dive into the integration architecture. The session covered critical mechanics including background product syncing, API key configuration, and the handling of custom fees. Clarified that the integration is primarily used by SMBs, with limited mid-market adoption. A significant portion of the discussion focused on technical limitations and error handling.`,
  key_discussion_points: [
    'Core integration stability confirmed',
    'Critical gaps identified in subscription support',
    'Error handling limitations discussed',
    'Technical requirements clarified for market expansion',
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
