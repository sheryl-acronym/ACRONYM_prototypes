import React from 'react';
import {
  PreCallBriefData,
  MeetingMetadata,
  MeetingObjectives,
  WhoYoureTalkingTo,
  ContactCardData,
} from '@/types';
import {
  Building2,
  Calendar,
  FileText,
  MoreHorizontal,
  Upload,
  Users,
  Plus,
  X,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  BadgeHelp,
  ShieldMinus,
  Box,
  Users2,
  CalendarClock,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DealPill } from '@/components/DealPill';
import { CompanyPill } from '@/components/CompanyPill';
import { CustomerProfilePill } from '@/components/CustomerProfilePill';
import { PersonaPill } from '@/components/PersonaPill';
import { StagePill } from '@/components/StagePill';
import { ContactPill } from '@/components/ContactPill';
import { UnifiedContactCard } from '@/components/UnifiedContactCard';

interface PreCallBriefProps {
  data: PreCallBriefData;
  hideTopBar?: boolean;
  onVersionChange?: (version: 'call-1' | 'call-2' | 'no-brief') => void;
  currentVersion?: 'call-1' | 'call-2' | 'no-brief';
}

const TopBar: React.FC<{ breadcrumb: string[]; onVersionChange?: (version: 'call-1' | 'call-2' | 'no-brief') => void; currentVersion?: 'call-1' | 'call-2' | 'no-brief' }> = ({ breadcrumb, onVersionChange, currentVersion = 'call-1' }) => (
  <div className="flex items-center justify-between">
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i === breadcrumb.length - 1 ? (
                <BreadcrumbPage>{crumb}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="#">{crumb}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
    <div className="flex items-center gap-2">
      {onVersionChange && (
        <Select value={currentVersion} onValueChange={(v) => onVersionChange(v as 'call-1' | 'call-2' | 'no-brief')}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="call-1">Call 1</SelectItem>
            <SelectItem value="call-2">Call 2</SelectItem>
            <SelectItem value="no-brief">No Brief</SelectItem>
          </SelectContent>
        </Select>
      )}
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Upload className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const MeetingHeader: React.FC<{
  meetingType: { label: string; color: string };
  title: string;
  companyDealId?: string;
}> = ({ title }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Button variant="outline" size="sm" className="gap-2">
        <ArrowUpRight className="h-4 w-4" />
        Pop out
      </Button>
    </div>
  </div>
);

const getMeddicStatusIcon = (status: 'complete' | 'partial' | 'missing') => {
  switch (status) {
    case 'complete':
      return <div className="w-2 h-2 rounded-full bg-green-500" />;
    case 'partial':
      return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
    case 'missing':
      return <div className="w-2 h-2 rounded-full bg-slate-300" />;
  }
};

const MetadataRows: React.FC<{ metadata: MeetingMetadata }> = ({ metadata }) => (
  <div className="space-y-0">
    {/* Deal */}
    {metadata.deal_name && (
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <Box className="h-4 w-4" />
          Deal
        </span>
        <div className="text-left">
          <DealPill deal={metadata.deal_name} momentum="Strong" />
        </div>
      </div>
    )}

    {/* Company */}
    <div className="flex items-center py-1.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Company
      </span>
      <div className="text-left">
        <CompanyPill
          company_name={metadata.company.name}
          company_logo_url={metadata.company.logo_url}
        />
      </div>
    </div>

    {/* Customer profile */}
    {metadata.customer_profile && (
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Customer profile
        </span>
        <div className="text-left">
          <CustomerProfilePill profile={metadata.customer_profile} />
        </div>
      </div>
    )}

    {/* Date and time */}
    <div className="flex items-center py-1.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Date and time
      </span>
      <span className="text-sm text-foreground">{metadata.date_time}</span>
    </div>

    {/* Team */}
    {(metadata.team && metadata.team.length > 0) && (
      <div className="flex items-start py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2 mt-0.5">
          <Users2 className="h-4 w-4" />
          Team
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {metadata.team.map((p, i) => (
            <ContactPill
              key={i}
              name={p.name}
              avatarColor={p.avatar_color}
              isTeamMember={true}
            />
          ))}
        </div>
      </div>
    )}

    {/* Participants */}
    {(metadata.their_team && metadata.their_team.length > 0) && (
      <div className="flex items-start py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2 mt-0.5">
          <Users className="h-4 w-4" />
          Participants
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {metadata.their_team.map((p, i) => (
            <ContactPill
              key={i}
              name={p.name}
              showIconOnly={true}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);


const objectiveReasonings: Record<number, string> = {
  0: 'Most founders don\'t think of HSA/FSA as a growth lever. Understanding their baseline knowledge helps us calibrate education vs. acceleration.',
  1: 'PROVEN runs on Shopify Plus with custom AI. Technical compatibility determines implementation timeline and viability — blockers are dealbreakers.',
  2: 'Subscription businesses have different HSA/FSA rules than one-time purchases. Revenue mix shapes deal size and qualification percentages.',
  3: 'Transaction volume determines pricing tier and validates whether the deal meets our minimum thresholds for profitability.',
};

const anticipatedObjectionReasonings: Record<number, string> = {
  0: 'Russell\'s background at Carvana and Harry\'s means he\'s familiar with payment stack complexity. Integration concerns are legitimate — need to emphasize API-first architecture and implementation support.',
  1: 'PROVEN is pivoting to profitability. Pricing objections will center on ROI — Russell will want to see margin lift that justifies our fees vs. Shopify Payments.',
  2: 'Yuliia (QA/Tech PM) will push back on "Hidden SKU" robustness. Need to validate testing protocols and edge case handling for their product catalog scale.',
};

const discoveryQuestionMEDDIC: Record<number, string | undefined> = {
  0: undefined,
  1: 'Metrics',
  2: 'Metrics',
  3: undefined,
  4: 'Budget',
};

const discoveryQuestionReasonings: Record<number, string> = {
  0: 'Russell has technical authority at PROVEN. Understanding their current payment stack (Shopify Payments) is critical to position our API-first advantages.',
  1: 'AOV and volume drive ROI model credibility. Higher AOV magnifies HSA/FSA lift impact — essential to justify pricing vs. current processor.',
  2: 'HSA/FSA eligibility varies by category. Knowing product mix % helps assess deal size and sets realistic expectations on conversion lift.',
  3: 'PROVEN\'s brand premium demands seamless UX. Understanding their compliance workflows ensures our checkout meets their regulatory and operational standards.',
  4: 'Russell is ROI-focused. Timeline and budget signals urgency and whether this is a strategic priority or exploratory conversation.',
};

const call2DiscoveryQuestionReasonings: Record<number, string> = {
  0: 'Subscription mix impacts implementation complexity and integration scope. High subscription percentage determines integration approach with Stripe billing.',
  1: 'Critical for Yuliia\'s QA validation. SKU count directly impacts "Hidden SKU" handling testing and catalog review timeline for HSA/FSA eligibility.',
  2: 'Gauge product familiarity and demo readiness. Determines how much education vs. advanced feature discussion is needed in this call.',
  3: 'Timeline and go-live urgency aligns with profitability pivot strategy. Understanding implementation readiness helps scope this deal\'s momentum and dependencies.',
};

const anticipatedQuestionReasonings: Record<number, string> = {
  0: 'Founders moving fast typically want to know we can keep pace with their timeline. Speed often becomes a deal-maker or breaker.',
  1: 'Companies handling sensitive health data typically ask about security upfront. It\'s table stakes for compliance-sensitive verticals.',
  2: 'Most growth-stage companies worry about implementation burden. They want to know if we\'ll handle the heavy lifting or if it falls on them.',
  3: 'Scaling founders usually want proof we\'ve succeeded with similar companies. They\'re risk-averse when it comes to integration bets.',
  4: 'Technical founders obsessed with profitability typically want to understand how pricing scales. They need to see it stays favorable as volume grows.',
};

const meddacColors: Record<string, { bg: string; text: string }> = {
  'Metrics': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'Economic Buyer': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'Decision Process': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'Champion': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'Identified Pain': { bg: 'bg-slate-100', text: 'text-slate-700' },
  'Budget': { bg: 'bg-slate-100', text: 'text-slate-700' },
};

const getMEDDICStyles = (meddic: string) => {
  return meddacColors[meddic] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
};

interface BulletItem {
  text: string;
  isAI: boolean;
  completed?: boolean;
}

interface MeetingObjectivesSectionState {
  objectives: BulletItem[];
  learnItems: BulletItem[];
  setObjectives: (items: BulletItem[]) => void;
  setLearnItems: (items: BulletItem[]) => void;
  addObjective: () => void;
  addLearnItem: () => void;
}

const useMeetingObjectivesState = (data: MeetingObjectives): MeetingObjectivesSectionState => {
  const [objectives, setObjectives] = React.useState<BulletItem[]>(
    data.objectives.map((t) => ({ text: t, isAI: true }))
  );
  const [learnItems, setLearnItems] = React.useState<BulletItem[]>(
    data.what_we_need_to_learn.map((t) => ({ text: t, isAI: true }))
  );

  React.useEffect(() => {
    setObjectives(data.objectives.map((t) => ({ text: t, isAI: true })));
    setLearnItems(data.what_we_need_to_learn.map((t) => ({ text: t, isAI: true })));
  }, [data]);

  const addObjective = () => {
    setObjectives([...objectives, { text: '', isAI: false }]);
  };

  const addLearnItem = () => {
    setLearnItems([...learnItems, { text: '', isAI: false }]);
  };

  return { objectives, learnItems, setObjectives, setLearnItems, addObjective, addLearnItem };
};

const MeetingObjectivesSection: React.FC<{ data: MeetingObjectives; state: MeetingObjectivesSectionState; currentVersion?: 'call-1' | 'call-2' | 'no-brief' }> = ({ state, currentVersion = 'call-1' }) => {
  const { objectives, setObjectives, addObjective } = state;

  // Call 2 specific objectives
  const call2Objectives = [
    'Technical validation: Confirm "Hidden SKU" handling meets Yuliia\'s QA standards',
    'Success criteria: Specific margin hurdle rate required for approval',
    'Brand alignment: Ensure checkout flow meets Theresa\'s premium standards',
    'Timeline: Implementation target date or urgency drivers beyond "immediate interest"',
  ];

  // Use Call 2 objectives if in Call 2 mode, otherwise use existing objectives
  const displayedObjectives = currentVersion === 'call-2' && call2Objectives.length > 0
    ? call2Objectives.map(t => ({ text: t, isAI: true, completed: false }))
    : objectives;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">Meeting Objectives</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={addObjective}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Objectives Grid */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {displayedObjectives.map((obj, i) => (
          <div
            key={i}
            className="group/objective rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-md transition-all hover:bg-slate-50"
          >
            <div className="flex gap-3 items-start">
              <Checkbox
                checked={obj.completed || false}
                onCheckedChange={(checked) => {
                  const updated = [...objectives];
                  updated[i] = { ...updated[i], completed: checked as boolean };
                  setObjectives(updated);
                }}
                className="mt-0.5 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                {obj.text === '' ? (
                  <Input
                    autoFocus
                    value={obj.text}
                    onChange={(e) => {
                      const updated = [...objectives];
                      updated[i] = { ...updated[i], text: e.target.value };
                      setObjectives(updated);
                    }}
                    onBlur={() => {
                      // Keep the card even if empty
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Keep focus or move to next
                      }
                      if (e.key === 'Escape') {
                        setObjectives(objectives.filter((_, idx) => idx !== i));
                      }
                    }}
                    placeholder="Add objective..."
                    className="h-auto py-0 px-0 text-sm font-medium text-foreground border-transparent bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                ) : (
                  <span
                    className={`text-sm font-medium block ${
                      obj.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                    }`}
                  >
                    {obj.text}
                  </span>
                )}
              </div>
              {obj.text !== '' && (
                <span className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover/objective:opacity-100 transition-opacity">
                  {obj.isAI && objectiveReasonings[i] ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-0.5 rounded hover:bg-amber-50 text-muted-foreground hover:text-amber-500 transition-colors">
                          <Sparkles className="h-3.5 w-3.5" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="w-72 p-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                          <span className="text-xs font-semibold text-foreground">AI Reasoning</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{objectiveReasonings[i]}</p>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                  {(
                    <button
                      onClick={() => setObjectives(objectives.filter((_, idx) => idx !== i))}
                      className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WhoYoureTalkingToSection: React.FC<{ data: WhoYoureTalkingTo; currentVersion?: 'call-1' | 'call-2' | 'no-brief' }> = ({ data, currentVersion = 'call-1' }) => {
  // Call 2 specific quick intel bullets about what was learned in Call 1
  const call2QuickIntel = [
    'Validated $15M ARR and 95% product eligibility in Call 1',
    'Russell champions internally; self-advocate moving forward',
    'Need to prove unit economics and margin hurdle rates',
    'Yuliia (QA) and Theresa (Brand) are key stakeholders for approval',
  ];

  // Call 2 additional participants
  const call2AdditionalParticipants = [
    {
      name: 'Yuliia Kovalenko',
      avatar_color: 'bg-green-500',
      role: 'QA Lead',
      buyer_persona: 'Technical QA Manager',
      linkedin_url: 'linkedin.com/in/yuliia-kovalenko',
      bio: [
        'Leads QA processes and product validation',
        'Critical evaluator of "Hidden SKU" handling and technical implementation',
        'Requirement: Must validate compliance and system integration before approval',
      ],
      email: undefined as string | undefined,
      avatar_url: undefined,
    },
    {
      name: 'Theresa Morrison',
      avatar_color: 'bg-pink-500',
      role: 'VP Brand & Marketing',
      buyer_persona: 'Brand Strategy Executive',
      linkedin_url: 'linkedin.com/in/theresa-morrison',
      bio: [
        'Oversees brand integrity and premium positioning',
        'Concerned with checkout flow alignment and customer experience',
        'Requirement: Checkout experience must meet premium brand standards',
      ],
      email: undefined as string | undefined,
      avatar_url: undefined,
    },
  ];

  const displayedIntel = currentVersion === 'call-2' ? call2QuickIntel : data.company.company_research || [];
  const displayedAttendees = currentVersion === 'call-2'
    ? [...data.attendees, ...call2AdditionalParticipants]
    : data.attendees;

  return (
    <div className="py-4">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-4">
        Who you're meeting with
      </h2>

      {/* Company info */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {data.company.logo_url && (
              <img
                src={data.company.logo_url}
                alt={data.company.name}
                className="h-10 w-auto object-contain flex-shrink-0 max-w-[60px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">{data.company.name}</h3>
              {data.company.domain && (
                <a
                  href={`https://${data.company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground underline decoration-dotted decoration-1 underline-offset-2 transition-colors inline-block"
                >
                  {data.company.domain}
                </a>
              )}
            </div>
          </div>
          {data.company.company_profile_url && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2.5 flex-shrink-0"
              asChild
            >
              <a href={data.company.company_profile_url}>View profile</a>
            </Button>
          )}
        </div>
      </div>

      {/* Customer profile */}
      {data.company.customer_profile && (
        <div className="mb-4">
          <CustomerProfilePill profile={data.company.customer_profile} />
        </div>
      )}

      {/* Deal summary */}
      {data.company.deal_summary && (
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          {data.company.deal_summary}
        </p>
      )}

      {/* Company research / Quick Intel */}
      {displayedIntel.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-1 text-sm text-slate-700">
            {displayedIntel.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-400 flex-shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Participants */}
      <h3 className="text-sm font-semibold text-foreground mb-3">People in this meeting</h3>
      <div className="space-y-2">
        {displayedAttendees.map((attendee, i) => {
          // Convert attendee to ContactCardData format for UnifiedContactCard
          const contactCardData: ContactCardData = {
            name: attendee.name,
            avatar_color: attendee.avatar_color,
            email: attendee.email,
            job_title: attendee.role,
            persona: attendee.buyer_persona,
            linkedin_url: attendee.linkedin_url,
            bio: attendee.bio,
          };

          return (
            <UnifiedContactCard
              key={i}
              contact={contactCardData}
              variant="compact"
            />
          );
        })}
      </div>
    </div>
  );
};

const NoBriefContent: React.FC = () => (
  <div className="flex flex-col items-center justify-center flex-1 py-16 px-4 border border-dashed border-slate-200 rounded-lg my-4">
    <CalendarClock className="h-6 w-6 text-foreground mb-3" />
    <h2 className="text-xl font-semibold text-foreground mb-2">Upcoming meeting</h2>
    <p className="text-sm text-muted-foreground mb-6">This meeting is scheduled to occur in about 2 hours.</p>
    <div className="flex gap-3">
      <Button variant="outline" size="sm">
        Ignore
      </Button>
      <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
        <Sparkles className="h-4 w-4" />
        Generate Brief
      </Button>
    </div>
  </div>
);

export const PreCallBrief: React.FC<PreCallBriefProps> = ({ data, hideTopBar = false, onVersionChange, currentVersion = 'call-1' }) => {
  const objectivesState = useMeetingObjectivesState(data.brief.meeting_objectives);

  // Call 2 additional participants for metadata
  const call2AdditionalParticipants = [
    { name: 'Yuliia Kovalenko', avatar_color: 'green-500' },
    { name: 'Theresa Morrison', avatar_color: 'pink-500' },
  ];

  // Modify metadata for Call 2 to include additional participants
  const displayedMetadata = currentVersion === 'call-2'
    ? {
        ...data.metadata,
        their_team: [...(data.metadata.their_team || []), ...call2AdditionalParticipants],
      }
    : data.metadata;

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {!hideTopBar && (
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="pl-8 pr-8 py-3">
            <TopBar breadcrumb={data.breadcrumb} onVersionChange={onVersionChange} currentVersion={currentVersion} />
          </div>
        </div>
      )}
      <div className="w-full max-w-[700px] mx-auto px-8 py-4 flex-1 overflow-y-auto">
      <MeetingHeader
        meetingType={data.meeting_type}
        title={data.title}
        companyDealId={data.deal_id}
      />
      <MetadataRows metadata={displayedMetadata} />
      <Separator className="my-4" />
      {currentVersion === 'no-brief' ? (
        <NoBriefContent />
      ) : (
      <Tabs defaultValue="brief" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="brief">Brief</TabsTrigger>
          <TabsTrigger value="playbook" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Playbook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="brief" className="py-4">
          {/* Meeting Context */}
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">Meeting Context</h2>
          <p className="text-sm text-slate-700 mb-6">
            {currentVersion === 'call-2'
              ? 'Follow-up "Demo & Pricing Review" with PROVEN Skincare and introduction to new stakeholders. Last call validated $15M ARR and 95% product eligibility; strong momentum with Russell acting as self-champion but need to prove unit economics.'
              : data.meeting_type.label
            }
          </p>

          <MeetingObjectivesSection key={JSON.stringify(data.brief.meeting_objectives)} data={data.brief.meeting_objectives} state={objectivesState} currentVersion={currentVersion} />
          <Separator className="my-2" />
          <WhoYoureTalkingToSection key={JSON.stringify(data.brief.who_youre_talking_to)} data={data.brief.who_youre_talking_to} currentVersion={currentVersion} />
        </TabsContent>

        <TabsContent value="playbook" className="py-4">
          {(data.brief.suggested_discovery_questions?.length || 0) > 0 || (data.gameplan.anticipated_questions?.length || 0) > 0 || (data.gameplan.anticipated_objections?.length || 0) > 0 ? (
            <>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Sparkles className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span>Tuned for</span>
                  </div>
                  <StagePill stage="Discovery & Qualification" />
                </div>
                <div className="flex flex-col gap-2 text-xs text-slate-600">
                  <div className="flex items-center flex-wrap gap-1.5">
                    {data.metadata.customer_profile && (
                      <>
                        <span>with</span>
                        <CustomerProfilePill profile={data.metadata.customer_profile} />
                      </>
                    )}
                  </div>
                  {data.brief.who_youre_talking_to?.attendees?.[0]?.buyer_persona && (
                    <div className="flex items-center gap-1.5">
                      <span>talking to</span>
                      <PersonaPill persona={data.brief.who_youre_talking_to.attendees[0].buyer_persona} />
                    </div>
                  )}
                  {data.metadata.meddic_completion && (
                    <div className="flex items-center gap-1.5 relative group">
                      <span>MEDDIC status:</span>
                      <span className="font-medium underline decoration-dotted decoration-1 underline-offset-2 cursor-help hover:text-slate-700">
                        {data.metadata.meddic_completion.complete}/{data.metadata.meddic_completion.complete + data.metadata.meddic_completion.partial + data.metadata.meddic_completion.missing} complete
                      </span>
                      {/* Hidden by default, visible on hover */}
                      <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden w-80">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead className="bg-slate-50">
                                <tr>
                                  <th className="text-left px-3 py-2 font-medium text-foreground w-4"></th>
                                  <th className="text-left px-3 py-2 font-medium text-foreground w-24">Component</th>
                                  <th className="text-left px-3 py-2 font-medium text-foreground">Information</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {data.metadata.meddic_detail?.map((item, i) => (
                                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 py-2 text-center">{getMeddicStatusIcon(item.status)}</td>
                                    <td className="px-3 py-2 text-foreground font-medium">{item.name}</td>
                                    <td className="px-3 py-2 text-foreground/80">{item.information}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            {/* Suggested Discovery Questions */}
            {(data.brief.suggested_discovery_questions?.length || 0) > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground/90">Suggested discovery questions</h3>
            <div className="grid grid-cols-1 gap-2">
              {(() => {
                const questionsToDisplay = currentVersion === 'call-2'
                  ? [
                      'What\'s your revenue mix between subscription and one-time purchases?',
                      'How many SKUs/products do you have?',
                      'Have you seen our solution before or had a chance to look at it?',
                      'What\'s your timeline for implementation and going live?',
                    ]
                  : data.brief.suggested_discovery_questions || [];

                return questionsToDisplay.map((q, i) => {
                  const meddic = currentVersion === 'call-2' ? undefined : discoveryQuestionMEDDIC[i];
                  const styles = meddic ? getMEDDICStyles(meddic) : null;
                  const reasoning = currentVersion === 'call-2' ? call2DiscoveryQuestionReasonings[i] : discoveryQuestionReasonings[i];
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-slate-300 hover:shadow-md transition-all hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-3">
                        <BadgeHelp className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 flex-1">{q}</span>
                        {meddic && styles && (
                          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${styles.bg} ${styles.text}`}>
                            {meddic}
                          </div>
                        )}
                      </div>
                      {reasoning && (
                        <p className="text-xs text-muted-foreground ml-7">{reasoning}</p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {/* Anticipated Questions */}
        {(data.gameplan.anticipated_questions?.length || 0) > 0 && (
          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-semibold text-foreground/90">Anticipated questions</h3>
            <div className="grid grid-cols-1 gap-2">
              {(() => {
                const questionsToDisplay = currentVersion === 'call-2'
                  ? [
                      { text: 'How long does implementation take from signing to going live?', isAI: true, reasoning: 'Timeline is critical for Theresa\'s brand launch planning. PROVEN wants to understand go-live speed and how it aligns with their profitability pivot schedule.' },
                      { text: 'What level of technical development is required to integrate with your platform?', isAI: true, reasoning: 'Yuliia needs to understand integration scope and effort. Understanding whether we require custom development vs. native integration affects her technical roadmap and resource planning.' },
                      { text: 'What support and documentation resources are available to us?', isAI: true, reasoning: 'Implementation team and stakeholders want to know what support during launch. QA validation and brand alignment testing may require direct engineering support.' },
                      { text: 'What products are eligible for HSA/FSA, and how is eligibility determined?', isAI: true, reasoning: 'Critical for "Hidden SKU" validation. Yuliia needs to understand how our eligibility review process works and whether it meets her QA standards for product categorization.' },
                      { text: 'How does the payment processing fee work with mixed carts?', isAI: true, reasoning: 'Direct ROI calculation for Russell. Understanding fee structure on mixed carts (eligible + ineligible items) is essential for margin lift modeling.' },
                    ]
                  : data.gameplan.anticipated_questions || [];

                return questionsToDisplay.map((q, i) => (
                  <div
                    key={i}
                    className="group/question flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-slate-300 hover:shadow-md transition-all hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <BadgeHelp className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80 flex-1">{q.text}</span>
                      {q.isAI && ((currentVersion === 'call-2' && q.reasoning) || (currentVersion !== 'call-2' && anticipatedQuestionReasonings[i])) && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="p-0.5 rounded hover:bg-blue-50 text-muted-foreground hover:text-blue-500 transition-colors flex-shrink-0 opacity-0 group-hover/question:opacity-100">
                              <Sparkles className="h-3.5 w-3.5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent side="right" align="start" className="w-72 p-3">
                            <div className="flex items-center gap-1.5 mb-2">
                              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                              <span className="text-xs font-semibold text-foreground">Why we think they'll ask</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{currentVersion === 'call-2' ? q.reasoning : anticipatedQuestionReasonings[i]}</p>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    {q.isAI && ((currentVersion === 'call-2' && q.reasoning) || (currentVersion !== 'call-2' && anticipatedQuestionReasonings[i])) && (
                      <p className="text-xs text-muted-foreground ml-7">{currentVersion === 'call-2' ? q.reasoning : anticipatedQuestionReasonings[i]}</p>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Anticipated Objections */}
        {(data.gameplan.anticipated_objections?.length || 0) > 0 && (
          <div className="space-y-2 mt-6">
            <h3 className="text-sm font-semibold text-foreground/90">Anticipated objections</h3>
            <div className="grid grid-cols-1 gap-2">
              {(() => {
                const objectionsToDisplay = currentVersion === 'call-2'
                  ? [
                      { text: 'Product Eligibility and Classification Uncertainty', isAI: true, reasoning: 'Yuliia will push back on how we handle "Hidden SKU" classification. She needs assurance our process is rigorous enough for audit and compliance.' },
                      { text: 'Pricing: Transaction Fee and Margin Concerns', isAI: true, reasoning: 'Russell will challenge whether the 5% + $0.30 fee on HSA/FSA volume justifies the margin impact. Need to model unit economics against the AOV lift potential.' },
                      { text: 'Technical Integration & Payment Flow Mechanics', isAI: true, reasoning: 'Yuliia will want technical deep-dive on integration complexity, error handling, and refund flows. Theresa may have concerns about checkout UX impact on conversion.' },
                    ]
                  : data.gameplan.anticipated_objections || [];

                return objectionsToDisplay.map((obj, i) => (
                  <div
                    key={i}
                    className="group/objection flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-3 hover:border-slate-300 hover:shadow-md transition-all hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldMinus className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80 flex-1">{obj.text}</span>
                      {obj.isAI && ((currentVersion === 'call-2' && obj.reasoning) || (currentVersion !== 'call-2' && anticipatedObjectionReasonings[i])) && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="p-0.5 rounded hover:bg-amber-50 text-muted-foreground hover:text-amber-500 transition-colors flex-shrink-0 opacity-0 group-hover/objection:opacity-100">
                              <Sparkles className="h-3.5 w-3.5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent side="right" align="start" className="w-72 p-3">
                            <div className="flex items-center gap-1.5 mb-2">
                              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                              <span className="text-xs font-semibold text-foreground">Why this matters</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{currentVersion === 'call-2' ? obj.reasoning : anticipatedObjectionReasonings[i]}</p>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    {obj.isAI && ((currentVersion === 'call-2' && obj.reasoning) || (currentVersion !== 'call-2' && anticipatedObjectionReasonings[i])) && (
                      <p className="text-xs text-muted-foreground ml-7">{currentVersion === 'call-2' ? obj.reasoning : anticipatedObjectionReasonings[i]}</p>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
            )}
            </>
          ) : null}
        </TabsContent>
      </Tabs>
      )}
      </div>
    </div>
  );
};

export default PreCallBrief;
