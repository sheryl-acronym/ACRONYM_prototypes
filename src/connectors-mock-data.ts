export type ConnectorStatus = 'connected' | 'disconnected' | 'configured' | 'error';

export interface Connector {
  id: string;
  name: string;
  description: string;
  icon: string;
  icon_color: string;
  logo_url?: string;
  status: ConnectorStatus;
  badge?: string;
}

export const connectorsMockData: Connector[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Connect your Google Calendar to enable ACRONYM to read your upcoming calendar events, identify meetings with external attendees, and generate meeting briefs and context.',
    icon: '📅',
    icon_color: '#EA4335',
    logo_url: '/googlecalendar.webp',
    status: 'connected',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages to channels or DM, read channel information, join channels when mentioned, and respond to mentions.',
    icon: '💬',
    icon_color: '#36C5F0',
    logo_url: '/slack.png',
    status: 'connected',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail account to enable ACRONYM to read your recent emails, identify emails associated with deals, and draft and send follow-up emails on your behalf.',
    icon: '📧',
    icon_color: '#EA4335',
    logo_url: '/gmail.webp',
    status: 'disconnected',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Connect your Google Drive to enable ACRONYM to use files from your Google Drive, extract context from your files, and use that information into your workflows.',
    icon: '📁',
    icon_color: '#4285F4',
    logo_url: '/google_drive.png',
    status: 'disconnected',
  },
  {
    id: 'fathom',
    name: 'Fathom',
    description: 'Connect your Fathom account to enable automatic meeting analysis, insights, transcripts, and action items.',
    icon: '🎙️',
    icon_color: '#4F46E5',
    logo_url: 'https://www.fathom.video/favicon.png',
    status: 'connected',
  },
  {
    id: 'fireflies',
    name: 'Fireflies',
    description: 'Connect your Fireflies account to import meeting transcripts, action items, and summaries as artifacts.',
    icon: '🔥',
    icon_color: '#FF6B35',
    logo_url: 'https://www.fireflies.ai/favicon.ico',
    status: 'disconnected',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Connect your HubSpot company and deal data to provide relevant customer context and deal intelligence during sales calls.',
    icon: '🎯',
    icon_color: '#FF7A59',
    logo_url: 'https://www.hubspot.com/favicon.ico',
    status: 'connected',
  },
];
