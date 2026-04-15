// Settings mock data — all types and initial state for the settings prototype

export interface pipeline_option {
  id: string;
  name: string;
}

export interface hubspot_settings {
  connected: boolean;
  connected_by_name: string;
  connected_date: string;
  synced_pipeline_ids: string[];
}

export interface org_slack_settings {
  connected: boolean;
  workspace_name: string;
  connected_date: string;
}

export type call_recorder_provider = 'fathom' | 'fireflies' | 'gong' | 'grain' | 'granola';

export interface ignore_list_entry {
  id: string;
  pattern: string;
  match_type: 'exact' | 'domain' | 'contains';
  note?: string;
}

export interface call_recorder_settings {
  selected_provider: call_recorder_provider;
  ignore_list: ignore_list_entry[];
}

export interface crm_sync_field {
  field_id: string;
  field_label: string;
  crm_field_name: string;
  enabled: boolean;
}

export interface post_call_workflows_settings {
  summary_sync: {
    enabled: boolean;
    crm_sync_enabled: boolean;
    crm_field: string;
  };
  qualification_framework: {
    framework: 'medpicc' | 'bant' | 'spiced' | 'custom';
    crm_fields: crm_sync_field[];
  };
  next_steps: {
    crm_sync_enabled: boolean;
    crm_field: string;
  };
  close_confidence: {
    crm_sync_enabled: boolean;
    crm_field: string;
  };
}

export type workflow_trigger_type = 'post_call' | 'weekly' | 'daily';

export interface org_workflow_instance {
  id: string;
  name: string;
  trigger_type: workflow_trigger_type;
  trigger_label: string;
  destination_channel: string;
  enabled: boolean;
  is_default?: boolean;
}

export interface google_calendar_settings {
  connected: boolean;
  connected_email: string;
  ignore_mode: 'blocklist' | 'allowlist';
  ignore_list: ignore_list_entry[];
}

export interface my_notification_settings {
  pre_call_brief_enabled: boolean;
  daily_briefing_enabled: boolean;
  daily_wrap_up_enabled: boolean;
}

export interface my_integration_connection {
  connected: boolean;
  connected_email?: string;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

export const HUBSPOT_PIPELINE_OPTIONS: pipeline_option[] = [
  { id: 'pl-001', name: 'Sales Pipeline' },
  { id: 'pl-002', name: 'Enterprise Pipeline' },
  { id: 'pl-003', name: 'Self-Serve Pipeline' },
];

export const initialHubSpotSettings: hubspot_settings = {
  connected: true,
  connected_by_name: 'Alex Chen',
  connected_date: 'Jan 15, 2026',
  synced_pipeline_ids: ['pl-001', 'pl-002'],
};

export const initialOrgSlackSettings: org_slack_settings = {
  connected: true,
  workspace_name: 'Flex',
  connected_date: 'Jan 15, 2026',
};

export const CALL_RECORDER_OPTIONS: {
  id: call_recorder_provider;
  label: string;
  description: string;
  logo_url: string | null;
  coming_soon: boolean;
}[] = [
  {
    id: 'fathom',
    label: 'Fathom',
    description: 'AI meeting recorder that captures and summarizes your calls.',
    logo_url: null,
    coming_soon: false,
  },
  {
    id: 'fireflies',
    label: 'Fireflies',
    description: 'Automatically record, transcribe, and search across meetings.',
    logo_url: null,
    coming_soon: false,
  },
  {
    id: 'gong',
    label: 'Gong',
    description: 'Revenue intelligence platform with call recording and analytics.',
    logo_url: null,
    coming_soon: false,
  },
  {
    id: 'grain',
    label: 'Grain',
    description: 'Record, clip, and share key moments from your meetings.',
    logo_url: null,
    coming_soon: false,
  },
  {
    id: 'granola',
    label: 'Granola',
    description: 'AI notepad for people in back-to-back meetings.',
    logo_url: null,
    coming_soon: true,
  },
];

export const initialCallRecorderSettings: call_recorder_settings = {
  selected_provider: 'fathom',
  ignore_list: [
    {
      id: 'il-001',
      pattern: 'internal@flex.com',
      match_type: 'exact',
      note: 'Internal team calls',
    },
  ],
};

export const MEDPICC_FIELDS: crm_sync_field[] = [
  { field_id: 'metrics', field_label: 'Metrics', crm_field_name: 'acronym_metrics', enabled: true },
  { field_id: 'economic_buyer', field_label: 'Economic Buyer', crm_field_name: 'acronym_economic_buyer', enabled: true },
  { field_id: 'decision_criteria', field_label: 'Decision Criteria', crm_field_name: 'acronym_decision_criteria', enabled: true },
  { field_id: 'decision_process', field_label: 'Decision Process', crm_field_name: 'acronym_decision_process', enabled: false },
  { field_id: 'paper_process', field_label: 'Paper Process', crm_field_name: 'acronym_paper_process', enabled: false },
  { field_id: 'identify_pain', field_label: 'Identify Pain', crm_field_name: 'acronym_identify_pain', enabled: true },
  { field_id: 'champion', field_label: 'Champion', crm_field_name: 'acronym_champion', enabled: true },
  { field_id: 'competition', field_label: 'Competition', crm_field_name: 'acronym_competition', enabled: false },
  { field_id: 'compelling_event', field_label: 'Compelling Event', crm_field_name: 'acronym_compelling_event', enabled: false },
];

export const initialPostCallWorkflows: post_call_workflows_settings = {
  summary_sync: {
    enabled: true,
    crm_sync_enabled: true,
    crm_field: 'hs_meeting_body',
  },
  qualification_framework: {
    framework: 'medpicc',
    crm_fields: MEDPICC_FIELDS.map((f) => ({ ...f })),
  },
  next_steps: {
    crm_sync_enabled: true,
    crm_field: 'hs_next_steps',
  },
  close_confidence: {
    crm_sync_enabled: false,
    crm_field: 'acronym_close_confidence',
  },
};

export const SLACK_CHANNELS = [
  { id: 'C001', name: 'sales' },
  { id: 'C002', name: 'leadership' },
  { id: 'C003', name: 'general' },
  { id: 'C004', name: 'deals' },
  { id: 'C005', name: 'announcements' },
  { id: 'C006', name: 'cs-team' },
];

export const initialOrgWorkflows: org_workflow_instance[] = [
  {
    id: 'wf-001',
    name: 'Post-call summary',
    trigger_type: 'post_call',
    trigger_label: 'After every call',
    destination_channel: '#sales',
    enabled: true,
    is_default: true,
  },
  {
    id: 'wf-002',
    name: 'Weekly pipeline digest',
    trigger_type: 'weekly',
    trigger_label: 'Monday',
    destination_channel: '',
    enabled: false,
    is_default: true,
  },
];

export const initialGoogleCalendarSettings: google_calendar_settings = {
  connected: true,
  connected_email: 'alex@flex.com',
  ignore_mode: 'blocklist',
  ignore_list: [
    {
      id: 'gcal-il-001',
      pattern: '@flex.com',
      match_type: 'domain',
      note: 'Ignore all internal meetings',
    },
  ],
};

export const initialMyIntegrations: Record<string, my_integration_connection> = {
  slack: { connected: true, connected_email: 'alex@flex.com' },
  google_calendar: { connected: true, connected_email: 'alex@flex.com' },
  gmail: { connected: false },
  google_drive: { connected: false },
  acronym_recorder: { connected: false },
};

export const initialMyNotifications: my_notification_settings = {
  pre_call_brief_enabled: true,
  daily_briefing_enabled: false,
  daily_wrap_up_enabled: false,
};
