export interface Participant {
  name: string;
  email?: string;
  avatar_color?: string;
  role?: string;
  bio?: string[];
  approach?: string;
  linkedin_url?: string;
}

export interface Company {
  name: string;
  icon_color?: string;
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
}

export interface GameplanData {
  placeholder: string;
}

export interface MeetingMetadata {
  company: {
    name: string;
    icon_color?: string;
    logo_url?: string;
  };
  customer_profile?: string;
  date_time: string;
  our_team: Participant[];
  their_team: Participant[];
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
  attendees: { name: string }[];
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
}

export interface Verbatim {
  quote: string;
  timestamp?: string;
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
  buyer_persona?: string;
  role_in_buying_process?: string;
  tags?: string[];
  role_and_engagement?: string;
  authority?: string;
  key_concerns?: string;
  risk?: {
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
  };
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
}
