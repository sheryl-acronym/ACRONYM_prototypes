export interface Participant {
  name: string;
  email?: string;
  avatar_color?: string;
  role?: string;
  buyer_persona?: string;
  bio?: string[];
  approach?: string;
  linkedin_url?: string;
  tags?: string[];
}

export interface Company {
  name: string;
  icon_color?: string;
  logo_url?: string;
  domain?: string;
  customer_profile?: string;
  deal_summary?: string;
  company_research?: string[];
  company_profile_url?: string;
  bullets: string[];
}

export interface MeetingObjectives {
  description: string;
  objectives: string[];
  what_we_need_to_learn: string[];
}

export interface WhoYoureTalkingTo {
  company: Company;
  attendees: Participant[];
}

export interface BriefData {
  meeting_objectives: MeetingObjectives;
  who_youre_talking_to: WhoYoureTalkingTo;
  suggested_discovery_questions?: string[];
}

export interface GamePlanQuestion {
  text: string;
  reasoning?: string;
  isAI?: boolean;
}

export interface GamePlanSection {
  title: string;
  questions: GamePlanQuestion[];
}

export interface GameplanData {
  placeholder?: string;
  meeting_objective?: string;
  agenda?: GamePlanQuestion[];
  sections?: GamePlanSection[];
  anticipated_questions?: GamePlanQuestion[];
  anticipated_objections?: GamePlanQuestion[];
}

export interface MeetingMetadata {
  deal_name?: string;
  company: {
    name: string;
    icon_color?: string;
    logo_url?: string;
  };
  customer_profile?: string;
  date_time: string;
  our_team: Participant[];
  their_team: Participant[];
  team?: Participant[]; // Our team members
  meddic_completion?: {
    complete: number;
    partial: number;
    missing: number;
    gaps?: string[];
  };
  meddic_detail?: {
    name: string;
    status: 'complete' | 'partial' | 'missing';
    information: string;
  }[];
}

export interface PreCallBriefData {
  breadcrumb: string[];
  meeting_type: {
    label: string;
    color: string;
  };
  title: string;
  join_button_label: string;
  metadata: MeetingMetadata;
  brief: BriefData;
  gameplan: GameplanData;
  deal_id?: string;
}

export interface PastMeeting {
  id: string;
  deal_name: string;
  momentum: Momentum;
  name: string;
  status?: string;
  start_time: string;
  duration: string;
  company_name: string;
  company_icon_color: string;
  company_logo_url?: string;
  attendees: { name: string; email?: string; role?: string; contact_role?: 'buyer' | 'seller'; linkedin_url?: string; persona?: string; tags?: string[] }[];
}

export type DealStage =
  | 'First meeting scheduled'
  | 'Discovery & Qualification'
  | 'Demo'
  | 'Proposal / Negotiation'
  | 'Closed Won'
  | 'Closed Lost';

export type Momentum = 'Strong' | 'Stalled' | 'At risk' | 'Closed' | 'Active';

export type DealStatus = 'in_progress' | 'won' | 'lost';

export interface Deal {
  id: string;
  stage_name: DealStage;
  name: string;
  icon_color: string;
  momentum: Momentum;
  status: DealStatus;
  last_meeting: string | null;
  next_meeting: string | null;
  owner_name: string;
  company_name: string;
  company_icon_color: string;
  company_logo_url?: string;
  meddic_completion?: {
    complete: number;
    partial: number;
    missing: number;
    gaps?: string[];
  };
}

export interface Verbatim {
  quote: string;
  timestamp: string;
  speaker?: string;
}

export interface ReasoningWithVerbatims {
  text: string;
  verbatims?: Verbatim[];
}

export interface NextStep {
  text: string;
  due_date: string;
  assignee: string;
  completed: boolean;
  reasoning?: ReasoningWithVerbatims;
}

export interface KeyStakeholder {
  name: string;
  avatar_color?: string;
  email?: string;
  job_title?: string;
  buyer_persona?: string;
  linkedin_url?: string;
  role_in_buying_process?: string;
  tags?: string[];
  role_and_engagement?: string;
  authority?: string;
  key_concerns?: string;
  communication_style?: string;
  personal_markers?: string;
  risk?: {
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
  };
}

export interface ContactCardData {
  // Core
  name: string;
  avatar_color?: string;
  avatar_url?: string;

  // Contact info
  email?: string;
  job_title?: string;
  role?: string;
  title?: string;
  persona?: string;
  linkedin_url?: string;

  // Classification
  tags?: string[];
  role_in_buying_process?: string;

  // Risk (optional)
  risk?: {
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
  };

  // Detailed metadata (for expandable sections in 'full' variant)
  role_and_engagement?: string;
  authority?: string;
  key_concerns?: string;
  communication_style?: string;
  personal_markers?: string;
  bio?: string[];
}

export interface Meeting {
  id: string;
  name: string;
  start_time: string;
  duration: string;
  attendees: { name: string }[];
  status?: 'scheduled' | 'completed' | 'cancelled';
  momentum?: Momentum;
}

export interface DealDetailData {
  name: string;
  icon_color: string;
  stage_name: DealStage;
  momentum: Momentum;
  status: DealStatus;
  last_meeting: string | null;
  next_meeting: string | null;
  owner_name: string;
  company_name: string;
  company_icon_color: string;
  company_logo_url?: string;
  customer_profile?: string;
  overview: {
    momentum_summary: string;
    last_meeting: {
      title: string;
      bullets: string[];
    };
    positive_signals: {
      label: string;
      description: string;
    }[];
    risk_factors: {
      label: string;
      description: string;
    }[];
    next_steps: NextStep[];
    ace_predicted_close_confidence?: 'Low' | 'Medium' | 'High';
  };
  opportunity_summary: {
    headline: string;
    what_they_want: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
    how_we_help: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
    why_now: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
    budget_and_roi: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
  };
  intel?: {
    sections: {
      title: string;
      items: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
    }[];
  };
  meddic?: {
    components: {
      name: string;
      status: 'complete' | 'partial' | 'missing';
      information: string;
      details?: (string | { text: string; reasoning?: ReasoningWithVerbatims })[];
    }[];
  };
  key_stakeholders: KeyStakeholder[];
  meetings?: Meeting[];
}

export interface PostCallSummaryData {
  breadcrumb: string[];
  meeting_type: {
    label: string;
    color: string;
  };
  title: string;
  momentum: {
    status: Momentum;
    description: string;
  };
  metadata: {
    company: {
      name: string;
      icon_color?: string;
      logo_url?: string;
    };
    date_time: string;
    duration: string;
    our_team: Participant[];
    their_team: Participant[];
  };
  meeting_summary: string;
  key_discussion_points?: string[];
  next_steps?: {
    text: string;
    due_date: string;
    assignee: string;
  }[];
  our_next_steps?: {
    text: string;
    assignee: string;
  }[];
  their_next_steps?: {
    text: string;
    assignee: string;
  }[];
  what_we_learned?: {
    title: string;
    items: string[];
  }[];
  positive_signals?: Array<{
    title: string;
    description: string;
    evidence?: string;
    quote?: string;
  }>;
  risk_factors?: Array<{
    title: string;
    description: string;
    evidence?: string;
    quote?: string;
  }>;
  meddic?: {
    components: {
      name: string;
      status: 'complete' | 'partial' | 'missing';
      information: string;
      details?: string[];
    }[];
  };
  transcript?: {
    entries: Array<{
      speaker: string;
      text: string;
      timestamp: string;
      role?: 'buyer' | 'seller';
    }>;
  };
}

export type NotificationDestination = 'dm' | 'channel';

export interface NotificationConfig {
  enabled: boolean;
  destination: NotificationDestination;
  slack_channel_id?: string;
  slack_channel_name?: string;
}

export interface TimedNotificationConfig extends NotificationConfig {
  timing: string; // e.g., "15m", "1h", "1d", "9am"
  timing_unit?: 'minutes' | 'hours' | 'days' | 'time_of_day';
  timing_value?: number;
}

export interface SlackNotificationSettings {
  pre_call_brief: TimedNotificationConfig;
  post_call_summary: NotificationConfig;
  daily_digest: TimedNotificationConfig;
  weekly_digest: TimedNotificationConfig;
}
