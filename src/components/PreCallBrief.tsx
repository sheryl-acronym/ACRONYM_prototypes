import React from 'react';
import {
  PreCallBriefData,
  MeetingMetadata,
  MeetingObjectives,
  WhoYoureTalkingTo,
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
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DealPill } from '@/components/DealPill';

interface PreCallBriefProps {
  data: PreCallBriefData;
  hideTopBar?: boolean;
  onVersionChange?: (version: 'call-1' | 'call-2') => void;
  currentVersion?: 'call-1' | 'call-2';
}

const EditableText: React.FC<{
  value: string;
  className?: string;
  onChange?: (value: string) => void;
}> = ({ value, className, onChange }) => {
  const [editing, setEditing] = React.useState(false);
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  const handleBlur = () => {
    setEditing(false);
    onChange?.(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange?.(text);
    }
    if (e.key === 'Escape') {
      setText(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <Input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`h-auto py-1 px-2 text-sm border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 ${className || ''}`}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text rounded px-1 -mx-1 py-0.5 hover:bg-muted/50 transition-colors ${className || ''}`}
    >
      {text}
    </span>
  );
};

const EditableBullet: React.FC<{
  value: string;
  icon?: React.ReactNode | 'bullet';
  onChange?: (value: string) => void;
  onDelete?: () => void;
  onSparkle?: () => void;
  reasoning?: string;
  readOnly?: boolean;
  autoEdit?: boolean;
}> = ({ value, icon, onChange, onDelete, onSparkle, reasoning, readOnly = false, autoEdit = false }) => {
  const [editing, setEditing] = React.useState(autoEdit);
  const [text, setText] = React.useState(value);

  const handleBlur = () => {
    setEditing(false);
    onChange?.(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange?.(text);
    }
    if (e.key === 'Escape') {
      setText(value);
      setEditing(false);
    }
  };

  const bulletNode = icon === 'bullet'
    ? <span className="text-slate-400 leading-none select-none">&bull;</span>
    : icon;

  return (
    <li className="group/bullet flex items-start gap-2 text-sm text-foreground/80">
      <span className="flex-shrink-0 mt-0.5">{bulletNode}</span>
      {editing && !readOnly ? (
        <Input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="flex-1 h-auto py-0.5 px-2 text-sm border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      ) : (
        <span
          onClick={readOnly ? undefined : () => setEditing(true)}
          className={`flex-1 rounded px-1 -mx-1 py-0.5 ${readOnly ? '' : 'cursor-text hover:bg-muted/50'} transition-colors`}
        >
          {text}
        </span>
      )}
      {!editing && (onSparkle || reasoning || onDelete) && (
        <span className="flex items-center gap-0.5 flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
          {reasoning ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="mt-0.5 p-0.5 rounded hover:bg-amber-50 text-muted-foreground hover:text-amber-500 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-72 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-xs font-semibold text-foreground">AI Reasoning</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{reasoning}</p>
              </PopoverContent>
            </Popover>
          ) : onSparkle ? (
            <button
              onClick={onSparkle}
              className="mt-0.5 p-0.5 rounded hover:bg-amber-50 text-muted-foreground hover:text-amber-500 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-0.5 p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </span>
      )}
    </li>
  );
};

const TopBar: React.FC<{ breadcrumb: string[]; onVersionChange?: (version: 'call-1' | 'call-2') => void; currentVersion?: 'call-1' | 'call-2' }> = ({ breadcrumb, onVersionChange, currentVersion = 'call-1' }) => (
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
        <Select value={currentVersion} onValueChange={(v) => onVersionChange(v as 'call-1' | 'call-2')}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="call-1">Call 1</SelectItem>
            <SelectItem value="call-2">Call 2</SelectItem>
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
}> = ({ meetingType, title, companyDealId }) => (
  <div className="mb-6">
    <div className="flex items-center gap-1.5 mb-3">
      <span className={`w-2.5 h-2.5 rounded-full ${meetingType.color}`} />
      <span className="text-sm text-muted-foreground">
        {companyDealId ? (
          <a
            href={`/deals/${companyDealId}`}
            className="text-muted-foreground hover:text-foreground border-b border-dotted border-muted-foreground hover:border-foreground transition-colors"
          >
            {meetingType.label}
          </a>
        ) : (
          meetingType.label
        )}
      </span>
    </div>
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <Button variant="outline" size="sm" className="gap-2">
        <ArrowUpRight className="h-4 w-4" />
        Pop out
      </Button>
    </div>
  </div>
);

const MetadataRows: React.FC<{ metadata: MeetingMetadata }> = ({ metadata }) => (
  <div className="space-y-0">
    {/* Deal */}
    {metadata.deal_name && (
      <div className="flex items-center py-2.5">
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
    <div className="flex items-center py-2.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Company
      </span>
      <div className="flex items-center gap-2 text-sm text-foreground">
        {metadata.company.logo_url ? (
          <img src={metadata.company.logo_url} alt={metadata.company.name} className="h-5 w-5 rounded object-contain" />
        ) : (
          <span className={`w-5 h-5 rounded ${metadata.company.icon_color || 'bg-gray-300'}`} />
        )}
        {metadata.company.name}
      </div>
    </div>

    {/* Customer profile */}
    {metadata.customer_profile && (
      <div className="flex items-center py-2.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Customer profile
        </span>
        <Badge variant="outline" className="rounded-md font-normal text-sm px-3 py-1">
          {metadata.customer_profile}
        </Badge>
      </div>
    )}

    {/* Date and time */}
    <div className="flex items-center py-2.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Date and time
      </span>
      <span className="text-sm text-foreground">{metadata.date_time}</span>
    </div>

    {/* Participants */}
    <div className="flex items-start py-2.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2 mt-0.5">
        <Users className="h-4 w-4" />
        Participants
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        {[...metadata.our_team, ...metadata.their_team].map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 rounded-md border bg-transparent pl-1 pr-3 py-0.5 text-sm text-foreground"
          >
            <span className={`h-5 w-5 rounded-full flex-shrink-0 ${p.avatar_color || 'bg-gray-300'}`} />
            {p.email || p.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const objectiveReasonings: Record<number, string> = {
  0: 'PROVEN sells personalized skincare — products that may qualify as health/wellness items under HSA/FSA guidelines. Confirming eligibility early avoids wasted cycles.',
  1: 'PROVEN runs on Shopify Plus with custom AI. Flex\'s API-first integration needs to work with their stack — technical blockers would be a dealbreaker.',
  2: 'PROVEN is pivoting to profitability. Tying HSA/FSA to higher AOV and margin speaks directly to their strategic priority.',
};

const learnReasonings: Record<number, string> = {
  0: 'Understanding their baseline knowledge of HSA/FSA helps calibrate the pitch — are we educating or accelerating?',
  1: 'Need to confirm Shopify Plus version and any custom middleware that could affect integration timeline.',
  2: 'Subscription vs. one-time mix affects HSA/FSA eligibility rules and potential revenue impact calculation.',
  3: 'Transaction volume determines tier pricing and validates whether the deal meets minimum thresholds.',
};

interface BulletItem {
  text: string;
  isAI: boolean;
}

const MeetingObjectivesSection: React.FC<{ data: MeetingObjectives }> = ({ data }) => {
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

  return (
    <div className="py-4">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-4">
        Meeting Objectives
      </h2>
      <div className="text-sm text-foreground mb-4">
        <EditableText value={data.description} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground">Objectives</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={addObjective}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <ul className="space-y-1 mb-5">
        {objectives.map((obj, i) => (
          <EditableBullet
            key={i}
            value={obj.text}
            icon="bullet"
            onChange={(val) => {
              const updated = [...objectives];
              updated[i] = { ...updated[i], text: val };
              setObjectives(updated);
            }}
            onDelete={() => setObjectives(objectives.filter((_, idx) => idx !== i))}
            reasoning={obj.isAI ? objectiveReasonings[i] : undefined}
            autoEdit={obj.text === ''}
          />
        ))}
      </ul>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground">What we need to learn</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={addLearnItem}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <ul className="space-y-1">
        {learnItems.map((item, i) => (
          <EditableBullet
            key={i}
            value={item.text}
            icon="bullet"
            onChange={(val) => {
              const updated = [...learnItems];
              updated[i] = { ...updated[i], text: val };
              setLearnItems(updated);
            }}
            onDelete={() => setLearnItems(learnItems.filter((_, idx) => idx !== i))}
            reasoning={item.isAI ? learnReasonings[i] : undefined}
            autoEdit={item.text === ''}
          />
        ))}
      </ul>
    </div>
  );
};

const companyBulletReasonings: Record<number, string> = {
  0: 'Sourced from Crunchbase and recent earnings coverage — confirms PROVEN operates at scale with AI-driven personalization.',
  1: 'Pulled from the Skio referral notes and PROVEN\'s investor deck — AOV and conversion are their top growth levers.',
  2: 'Based on CEO interview in Modern Retail — profitability pivot signals urgency and budget availability.',
};

const attendeeBioReasonings: Record<string, Record<number, string>> = {
  'Russell Harris': {
    0: 'Sourced from LinkedIn — his product leadership at Harry\'s and Carvana shows he understands DTC at scale.',
    1: 'Based on his Crunchbase profile and podcast appearances — he\'s built and scaled multiple businesses through key growth phases.',
  },
};

const WhoYoureTalkingToSection: React.FC<{ data: WhoYoureTalkingTo }> = ({ data }) => (
  <div className="py-4">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-4">
      Who you're talking to
    </h2>

    {/* Company info */}
    <h3 className="text-sm font-semibold text-foreground mb-2">{data.company.name}</h3>
    <ul className="space-y-1 mb-6">
      {data.company.bullets.map((b, i) => (
        <EditableBullet
          key={i}
          value={b}
          icon="bullet"
          readOnly
          reasoning={companyBulletReasonings[i]}
        />
      ))}
    </ul>

    {/* Attendees */}
    <h3 className="text-sm font-semibold text-foreground mb-3">Attendees</h3>
    <div className="space-y-3">
      {data.attendees.map((attendee, i) => (
        <div key={i} className="rounded-lg border bg-card p-4">
          {/* Header row: avatar, name, role, LinkedIn */}
          <div className="flex items-start gap-3 mb-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white text-sm font-semibold flex-shrink-0 ${attendee.avatar_color || 'bg-gray-400'}`}>
              {attendee.name.split(' ').map(n => n[0]).join('')}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold text-foreground">{attendee.name}</span>
                {attendee.linkedin_url && (
                  <a
                    href={`https://${attendee.linkedin_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
              {attendee.role && (
                <span className="text-sm text-muted-foreground">{attendee.role}</span>
              )}
            </div>
          </div>

          {/* Content section with fields */}
          <div className="space-y-3">
            {attendee.buyer_persona && (
              <div className="flex gap-8">
                <span className="text-sm font-semibold text-foreground w-32 flex-shrink-0">Buyer Persona</span>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-muted/30 w-fit">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{attendee.buyer_persona}</span>
                </div>
              </div>
            )}

            {attendee.bio && attendee.bio.length > 0 && (
              <div className="flex gap-8">
                <span className="text-sm font-semibold text-foreground w-32 flex-shrink-0">Notes</span>
                <ul className="space-y-1 flex-1">
                  {attendee.bio.map((b, j) => (
                    <EditableBullet
                      key={j}
                      value={b}
                      icon="bullet"
                      readOnly
                      reasoning={attendeeBioReasonings[attendee.name]?.[j]}
                    />
                  ))}
                </ul>
              </div>
            )}

            {attendee.approach && (
              <div className="flex gap-8">
                <span className="text-sm font-semibold text-foreground w-32 flex-shrink-0">Approach</span>
                <p className="text-sm text-foreground/80 flex-1">{attendee.approach}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PreCallBrief: React.FC<PreCallBriefProps> = ({ data, hideTopBar = false, onVersionChange, currentVersion }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {!hideTopBar && (
        <div className="sticky top-0 z-20 bg-white border-b border-slate-200 flex-shrink-0">
          <div className="pl-8 pr-8 py-3">
            <TopBar breadcrumb={data.breadcrumb} onVersionChange={onVersionChange} currentVersion={currentVersion} />
          </div>
        </div>
      )}
      <div className="w-full max-w-[1040px] mx-auto px-8 py-4 flex-1 overflow-y-auto">
      <MeetingHeader
        meetingType={data.meeting_type}
        title={data.title}
        companyDealId={data.deal_id}
      />
      <MetadataRows metadata={data.metadata} />
      <Separator className="my-4" />
      <div className="py-4">
        <MeetingObjectivesSection key={JSON.stringify(data.brief.meeting_objectives)} data={data.brief.meeting_objectives} />
        <WhoYoureTalkingToSection key={JSON.stringify(data.brief.who_youre_talking_to)} data={data.brief.who_youre_talking_to} />

        {/* Suggested Discovery Questions */}
        {data.brief.suggested_discovery_questions && data.brief.suggested_discovery_questions.length > 0 && (
          <div className="py-6 space-y-3 mt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-foreground">Suggested discovery questions</h3>
            <ul className="space-y-2 pl-5">
              {data.brief.suggested_discovery_questions.map((q, i) => (
                <li key={i} className="list-disc text-sm text-foreground/80">{q}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Anticipated Questions */}
        <div className="py-6 space-y-6 mt-6 border-t border-slate-200">
          {data.gameplan.anticipated_questions && data.gameplan.anticipated_questions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Anticipated questions
              </h3>
              <ul className="space-y-2">
                {data.gameplan.anticipated_questions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <BadgeHelp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{q.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Anticipated Objections */}
          {data.gameplan.anticipated_objections && data.gameplan.anticipated_objections.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Anticipated objections
              </h3>
              <ul className="space-y-2">
                {data.gameplan.anticipated_objections.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ShieldMinus className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{q.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PreCallBrief;
