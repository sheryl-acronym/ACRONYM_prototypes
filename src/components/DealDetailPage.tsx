import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DealDetailData,
  Momentum,
  Verbatim,
  ReasoningWithVerbatims,
  Meeting,
} from '@/types';
import {
  Building2,
  Calendar,
  ChevronsRight,
  Maximize2,
  MoreHorizontal,
  Upload,
  User,
  SquareDot,
  Layers,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  IterationCw,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StagePill } from '@/components/StagePill';
import { MomentumPill } from '@/components/MomentumPill';
import { ContactPill } from '@/components/ContactPill';
import { ActionItem } from '@/components/ActionItem';
import { UnifiedContactCard } from '@/components/UnifiedContactCard';
import { MeetingCard } from '@/components/MeetingCard';

interface DealDetailPageProps {
  data: DealDetailData;
  onVersionChange?: (version: 'v1' | 'v2' | '1st-call' | 'post-call-1') => void;
  hideTopBar?: boolean;
  collapseMeddic?: boolean;
}

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const OVERLAY_BREAKPOINT = 1200;

function useIsNarrow(breakpoint: number) {
  const [isNarrow, setIsNarrow] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener('change', handler);
    setIsNarrow(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isNarrow;
}

// --- Transcript data & types ---


interface TranscriptLine {
  timestamp: string;
  speaker: string;
  text: string;
}

const demoTranscript: TranscriptLine[] = [
  { timestamp: '00:00:12', speaker: 'Jacob Francis', text: 'Thanks for joining, Russell. I know you brought Theresa and Yuliia along today — really glad to have the full team here.' },
  { timestamp: '00:00:28', speaker: 'Russell Harris', text: 'Yeah, we wanted to make sure we had eyes on this from the brand side and the technical side. Let\'s dig in.' },
  { timestamp: '00:01:05', speaker: 'Jacob Francis', text: 'So to recap where we left off — we confirmed that about 95% of your catalog, including the personalized formulas, qualifies for HSA/FSA eligibility.' },
  { timestamp: '00:01:32', speaker: 'Russell Harris', text: 'That\'s great. The personalized routines were the big question mark for us. How does the hidden SKU mapping actually work?' },
  { timestamp: '00:02:10', speaker: 'Jacob Francis', text: 'We use a "Family of Products" logic — so your hidden SKUs get mapped to a parent eligible category. The customer never sees the complexity.' },
  { timestamp: '00:02:45', speaker: 'Yuliia Pyrohova', text: 'That makes sense from our architecture standpoint. We can work with that.' },
  { timestamp: '00:03:15', speaker: 'Theresa Bischof', text: 'From a brand perspective, I love the idea of "Pay with HSA" as a conversion driver. But I want to understand the customer experience end to end.' },
  { timestamp: '00:04:02', speaker: 'Jacob Francis', text: 'Absolutely. For one-time purchases, it\'s seamless — the HSA/FSA card is processed at checkout, just like any other payment method.' },
  { timestamp: '00:04:30', speaker: 'Russell Harris', text: 'OK, but what about subscriptions? That\'s our bread and butter — over 60% of revenue comes through Skio subscriptions.' },
  { timestamp: '00:05:12', speaker: 'Jacob Francis', text: 'Right, so that\'s where it gets more complicated. Currently, we can\'t process HSA/FSA directly through Skio for recurring charges.' },
  { timestamp: '00:05:38', speaker: 'Russell Harris', text: 'Wait — so you\'re saying a subscriber can\'t just use their HSA card on autopilot?' },
  { timestamp: '00:05:52', speaker: 'Jacob Francis', text: 'Correct. The workaround is a post-purchase reimbursement flow — the customer pays normally and then submits for HSA/FSA reimbursement.' },
  { timestamp: '00:06:18', speaker: 'Russell Harris', text: 'That\'s a problem. That\'s a real problem. If we\'re marketing "Pay with HSA" and then the experience is "pay full price and submit a claim later"... I think that could be a complete killer for us.' },
  { timestamp: '00:06:45', speaker: 'Theresa Bischof', text: 'Yeah, I agree with Russell. The promise has to match the experience. Our customers expect frictionless.' },
  { timestamp: '00:07:20', speaker: 'Jacob Francis', text: 'I understand the concern. We\'re actively working on direct subscription processing, but I want to be transparent that it\'s not available today.' },
  { timestamp: '00:08:00', speaker: 'Russell Harris', text: 'OK let\'s set that aside for a moment and talk pricing. What does the enterprise package look like?' },
  { timestamp: '00:08:25', speaker: 'Jacob Francis', text: 'Enterprise terms are 4.5% plus $0.30 per transaction, plus $8 per Letter of Medical Necessity.' },
  { timestamp: '00:08:50', speaker: 'Russell Harris', text: 'That\'s not trivial. We\'re running about $1.25 million a month in revenue across roughly 10,000 orders. I need to model this out carefully.' },
  { timestamp: '00:09:15', speaker: 'Jacob Francis', text: 'Completely fair. I can share our ROI model — based on similar DTC brands, we typically see a 50% AOV uplift which translates to roughly 6.38x ROI.' },
  { timestamp: '00:09:45', speaker: 'Russell Harris', text: 'I\'d like to see that model. Actually, can you send me the raw spreadsheet? I want to do the math myself with our actual numbers.' },
  { timestamp: '00:10:05', speaker: 'Jacob Francis', text: 'Absolutely. I\'ll also include three case studies from similar conversion lift examples.' },
  { timestamp: '00:10:30', speaker: 'Theresa Bischof', text: 'Can you also send over some FAQ templates and marketing copy examples? I want to see how other brands position this.' },
  { timestamp: '00:10:55', speaker: 'Jacob Francis', text: 'For sure, I\'ll get those over to you by end of week.' },
  { timestamp: '00:11:20', speaker: 'Russell Harris', text: 'Here\'s my concern though — what if this just cannibalizes our existing sales? Like, people who would have bought anyway just switch to HSA payment. Then we\'re paying 4.5% plus the LMN fee for zero incremental revenue.' },
  { timestamp: '00:12:00', speaker: 'Jacob Francis', text: 'That\'s a fair concern. What we\'ve seen with other brands is that the HSA/FSA badge actually drives net-new traffic, not just payment method switching. But your model should account for both scenarios.' },
  { timestamp: '00:12:38', speaker: 'Russell Harris', text: 'Right. OK, I\'ll run the numbers. Let me take Tuesday to do an internal review with the team and we\'ll decide if the acquisition lift outweighs the subscription friction.' },
  { timestamp: '00:13:05', speaker: 'Jacob Francis', text: 'Sounds like a plan. I\'ll have the ROI model and case studies to you by Monday so you have them for Tuesday.' },
  { timestamp: '00:13:25', speaker: 'Russell Harris', text: 'Perfect. And look — I want to be straight with you. If we can\'t figure out the subscription piece, that might be a deal killer. But the one-time purchase side looks really compelling.' },
  { timestamp: '00:13:50', speaker: 'Theresa Bischof', text: 'Agreed. The brand angle is strong if the experience delivers on the promise.' },
  { timestamp: '00:14:10', speaker: 'Yuliia Pyrohova', text: 'From the tech side, the integration looks clean. No concerns there.' },
  { timestamp: '00:14:30', speaker: 'Jacob Francis', text: 'Great. I appreciate the candor, Russell. Let\'s reconnect after your Tuesday review.' },
];

const TranscriptPanelContext = React.createContext<{
  openTranscript: (highlightQuote: string) => void;
}>({
  openTranscript: () => {},
});

const TranscriptPanelContent: React.FC<{
  highlightQuote: string | null;
  onClose: () => void;
}> = ({ highlightQuote, onClose }) => {
  const highlightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (highlightRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [highlightQuote]);

  const isHighlighted = (line: TranscriptLine) => {
    if (!highlightQuote) return false;
    return line.text.includes(highlightQuote) || highlightQuote.includes(line.text);
  };

  return (
    <>
      {/* Panel toolbar */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
            title="Close panel"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title="Open full page"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Transcript header */}
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-base font-semibold text-foreground">Meeting Transcript</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Demo and pricing review — Jan 6, 2026</p>
      </div>
      {/* Transcript lines */}
      <div className="px-6 pb-6">
        <div className="space-y-4">
          {demoTranscript.map((line, i) => {
            const highlighted = isHighlighted(line);
            return (
              <div
                key={i}
                ref={highlighted ? highlightRef : undefined}
                className={`rounded-md px-3 py-2 transition-colors ${highlighted ? 'bg-amber-50 ring-1 ring-amber-200' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">{line.speaker}</span>
                  <span className="text-[10px] text-muted-foreground">{line.timestamp}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{line.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

interface ReasoningPopoverProps {
  reasoning: ReasoningWithVerbatims;
}

const ReasoningPopover: React.FC<ReasoningPopoverProps> = ({ reasoning }) => {
  const [feedback, setFeedback] = React.useState<'helpful' | 'not-helpful' | null>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="mt-0.5 p-0.5 rounded hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-gray-600" />
          <span className="text-xs font-semibold text-foreground">AI Reasoning</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{reasoning.text}</p>
        {reasoning.verbatims?.map((v, vi) => (
          <VerbatimCallout key={vi} verbatim={v} />
        ))}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200">
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
          <button
            onClick={() => setFeedback(feedback === 'helpful' ? null : 'helpful')}
            className={`p-1 rounded transition-colors ${
              feedback === 'helpful'
                ? 'bg-gray-200 text-foreground'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
            title="Helpful"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setFeedback(feedback === 'not-helpful' ? null : 'not-helpful')}
            className={`p-1 rounded transition-colors ${
              feedback === 'not-helpful'
                ? 'bg-gray-200 text-foreground'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
            title="Not helpful"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const VerbatimCallout: React.FC<{ verbatim: Verbatim }> = ({ verbatim }) => {
  const { openTranscript } = React.useContext(TranscriptPanelContext);

  return (
    <button
      onClick={() => openTranscript(verbatim.quote)}
      className="w-full text-left mt-2 border-l-2 border-gray-300 pl-3 py-1.5 hover:border-amber-400 hover:bg-amber-50/50 transition-colors rounded-r cursor-pointer group/verbatim"
    >
      <p className="text-xs text-foreground/70 leading-relaxed italic">{verbatim.quote}</p>
      <span className="text-[10px] text-muted-foreground mt-1 inline-block group-hover/verbatim:text-amber-600 transition-colors">
        {verbatim.speaker && `${verbatim.speaker} &middot; `}{verbatim.timestamp}
      </span>
    </button>
  );
};

const TopBar: React.FC<{ dealName: string; onVersionChange?: (version: 'v1' | 'v2' | '1st-call' | 'post-call-1') => void }> = ({ dealName, onVersionChange }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/deals');
                }}
              >
                Deals
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{dealName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1">
        {onVersionChange && (
          <Select defaultValue="v1" onValueChange={(v) => onVersionChange(v as 'v1' | 'v2' | '1st-call' | 'post-call-1')}>
            <SelectTrigger className="w-auto h-8 text-xs px-2.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">V1</SelectItem>
              <SelectItem value="v2">V2</SelectItem>
              <SelectItem value="1st-call">1st call scheduled</SelectItem>
              <SelectItem value="post-call-1">Post Call 1</SelectItem>
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
};

const DealHeader: React.FC<{
  dealName: string;
  dealIconColor: string;
}> = ({ dealName }) => (
  <div className="mb-6 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-foreground">{dealName}</h1>
    <Button
      variant="outline"
      size="sm"
      className="h-8 gap-2"
      onClick={() => {
        // This would open the deal in HubSpot using the deal ID
        // For now, we'll just create a placeholder URL
        window.open('https://app.hubspot.com', '_blank');
      }}
      title="View in HubSpot"
    >
      <img src="/hubspot.png" alt="HubSpot" className="h-4 w-4" />
      <span className="text-xs">View in HubSpot</span>
    </Button>
  </div>
);

const MetadataRows: React.FC<{ data: DealDetailData }> = ({ data }) => {
  return (
    <div className="space-y-0">
      {/* Deal stage */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Deal stage
        </span>
        <StagePill stage={data.stage_name} />
      </div>

      {/* Momentum */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <SquareDot className="h-4 w-4" />
          Momentum
        </span>
        <MomentumPill momentum={data.momentum} />
      </div>

      {/* Last meeting */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <IterationCw className="h-4 w-4" />
          Last meeting
        </span>
        {data.last_meeting ? (
          <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium text-foreground">{formatShortDate(data.last_meeting)}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">-</span>
        )}
      </div>

      {/* Next meeting */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Next meeting
        </span>
        {data.next_meeting ? (
          <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium text-foreground">{formatShortDate(data.next_meeting)}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No meeting scheduled</span>
        )}
      </div>

      {/* Owner */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <User className="h-4 w-4" />
          Owner
        </span>
        <ContactPill name={data.owner_name} />
      </div>

      {/* Company */}
      <div className="flex items-center py-1.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Company
        </span>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
            {data.company_logo_url ? (
              <>
                <img
                  src={data.company_logo_url}
                  alt={data.company_name}
                  className="h-4 w-4 rounded object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className={`w-4 h-4 rounded hidden ${data.company_icon_color || 'bg-gray-300'}`} />
              </>
            ) : (
              <span className={`w-4 h-4 rounded ${data.company_icon_color || 'bg-gray-300'}`} />
            )}
            <span className="text-sm font-medium text-foreground">{data.company_name}</span>
          </div>
          {data.customer_profile && (
            <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium text-foreground">{data.customer_profile}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CurrentStateSection: React.FC<{
  summary: string;
  momentum: Momentum;
  aceCloseConfidence?: 'Low' | 'Medium' | 'High';
}> = ({ summary, momentum, aceCloseConfidence }) => {
  const confidenceStyles = {
    Low: 'bg-red-100 text-red-900',
    Medium: 'bg-amber-100 text-amber-900',
    High: 'bg-green-100 text-green-900',
  };

  const confidenceDisplay = {
    Low: 'Low',
    Medium: 'Med',
    High: 'High',
  };

  return (
    <div className="py-4 space-y-4">
      <div className="rounded-lg border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">Momentum</h3>
          <MomentumPill momentum={momentum} />
        </div>
        <p className="text-sm text-foreground/80">{summary}</p>
        {aceCloseConfidence && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground">Predicted Close Confidence</span>
            <div className={`inline-flex items-center h-6 px-2.5 py-1 rounded-full font-normal text-xs ${confidenceStyles[aceCloseConfidence]}`}>
              {confidenceDisplay[aceCloseConfidence]}
            </div>
          </div>
        )}
        <div className="pt-3 mt-1 border-t border-gray-200 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/60 mt-3">Recommended next step</p>
          <p className="text-sm text-foreground/80">Validate ROI model with Russell's internal team to resolve margin impact concerns and unlock deal progression.</p>
        </div>
      </div>
    </div>
  );
};

const lastMeetingReasonings: Record<number, ReasoningWithVerbatims> = {
  0: {
    text: 'The subscription/HSA incompatibility is flagged as the single highest-impact risk. Russell used strong language ("deal killer") indicating this is not a minor concern but a potential blocker to the entire deal.',
    verbatims: [
      { quote: 'That\'s a problem. That\'s a real problem. If we\'re marketing "Pay with HSA" and then the experience is "pay full price and submit a claim later"... I think that could be a complete killer for us.', timestamp: '00:06:18', speaker: 'Russell Harris' },
    ],
  },
  1: {
    text: 'Pricing was presented transparently and Russell took ownership of modeling it internally — a positive sign that he\'s evaluating fit seriously rather than dismissing on cost alone.',
    verbatims: [
      { quote: 'I\'d like to see that model. Actually, can you send me the raw spreadsheet? I want to do the math myself with our actual numbers.', timestamp: '00:09:45', speaker: 'Russell Harris' },
    ],
  },
  2: {
    text: '95% catalog eligibility is a strong technical result. The "Hidden SKU" mapping via "Family of Products" logic resolves what could have been a complex integration challenge for personalized formulas.',
    verbatims: [
      { quote: 'That makes sense from our architecture standpoint. We can work with that.', timestamp: '00:02:45', speaker: 'Yuliia Pyrohova' },
    ],
  },
  3: {
    text: 'Russell committing to a specific timeline (Tuesday) for an internal review signals urgency and genuine intent to move forward. Vague "we\'ll get back to you" responses would be a weaker signal.',
    verbatims: [
      { quote: 'Let me take this back to the team. I want to run the numbers Tuesday and see if the acquisition lift math works for us.', timestamp: '00:29:38', speaker: 'Russell Harris' },
    ],
  },
};

const LastMeetingSection: React.FC<{
  title: string;
  bullets: string[];
}> = ({ title, bullets }) => (
  <div className="py-4">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Your last meeting
    </h2>
    <p className="text-sm text-foreground mb-3">{title}</p>
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${lastMeetingReasonings[i] ? 'hover:bg-gray-100/50' : ''}`}>
          <span className="text-gray-400 leading-none select-none mt-0.5">&bull;</span>
          <span className="flex-1">{b}</span>
          {lastMeetingReasonings[i] && (
            <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
              <ReasoningPopover reasoning={lastMeetingReasonings[i]} />
            </span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const positiveSignalReasonings: Record<number, ReasoningWithVerbatims> = {
  0: {
    text: 'Multi-stakeholder attendance (Brand + Tech) at the demo stage signals organizational buy-in beyond a single champion. This pattern correlates with higher close rates in enterprise deals.',
    verbatims: [
      { quote: 'Yeah, we wanted to make sure we had eyes on this from the brand side and the technical side. Let\'s dig in.', timestamp: '00:00:28', speaker: 'Russell Harris' },
    ],
  },
  1: {
    text: 'When a champion proactively requests raw data to build an internal business case, it indicates they are selling internally on your behalf — a strong leading indicator of deal progression.',
    verbatims: [
      { quote: 'I\'d like to see that model. Actually, can you send me the raw spreadsheet? I want to do the math myself with our actual numbers.', timestamp: '00:09:45', speaker: 'Russell Harris' },
    ],
  },
  2: {
    text: 'Resolving technical eligibility concerns early removes a common blocker. 95% coverage is well above the threshold needed for a viable implementation.',
    verbatims: [
      { quote: 'That makes sense from our architecture standpoint. We can work with that.', timestamp: '00:02:45', speaker: 'Yuliia Pyrohova' },
      { quote: 'From the tech side, the integration looks clean. No concerns there.', timestamp: '00:14:10', speaker: 'Yuliia Pyrohova' },
    ],
  },
  3: {
    text: 'Sharing granular financial metrics ($1.25M/mo, 10k orders) demonstrates trust and genuine intent to evaluate the partnership seriously.',
    verbatims: [
      { quote: 'We\'re running about $1.25 million a month in revenue across roughly 10,000 orders. I need to model this out carefully.', timestamp: '00:08:50', speaker: 'Russell Harris' },
    ],
  },
};

const PositiveSignalsSection: React.FC<{
  signals: { label: string; description: string }[];
}> = ({ signals }) => {
  const [items] = React.useState(signals);

  return (
    <div className="py-4">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
        Positive signals
      </h2>
      <ul className="space-y-2">
        {items.map((s, i) => (
          <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${positiveSignalReasonings[i] ? 'hover:bg-gray-100/50' : ''}`}>
            <span className="text-gray-400 leading-none select-none mt-0.5">&bull;</span>
            <span className="flex-1">
              <span className="font-semibold text-foreground">{s.label}</span>
              {' - '}
              {s.description}
            </span>
            {positiveSignalReasonings[i] && (
              <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
                <ReasoningPopover reasoning={positiveSignalReasonings[i]} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const riskFactorReasonings: Record<number, ReasoningWithVerbatims> = {
  0: {
    text: 'Russell explicitly used the phrase "deal killer" when discussing the subscription limitation. When a champion flags a specific blocker in strong language, it typically requires a direct resolution path before the deal can advance.',
    verbatims: [
      { quote: 'That\'s a problem. That\'s a real problem. If we\'re marketing "Pay with HSA" and then the experience is "pay full price and submit a claim later"... I think that could be a complete killer for us.', timestamp: '00:06:18', speaker: 'Russell Harris' },
      { quote: 'If we can\'t figure out the subscription piece, that might be a deal killer. But the one-time purchase side looks really compelling.', timestamp: '00:13:25', speaker: 'Russell Harris' },
    ],
  },
  1: {
    text: 'The gap between the marketing promise ("Pay with HSA") and the actual experience (post-purchase reimbursement) creates a trust risk. PROVEN\'s brand positioning centers on customer experience, making this friction especially problematic.',
    verbatims: [
      { quote: 'The promise has to match the experience. Our customers expect frictionless.', timestamp: '00:06:45', speaker: 'Theresa Bischof' },
    ],
  },
  2: {
    text: 'At 4.5% + $8 per LMN on top of existing payment processing costs, the total take rate may exceed 6-7%. For a business optimizing for profitability, this needs to be offset by measurable conversion lift.',
    verbatims: [
      { quote: 'We\'re running about $1.25 million a month in revenue across roughly 10,000 orders. I need to model this out carefully.', timestamp: '00:08:50', speaker: 'Russell Harris' },
    ],
  },
  3: {
    text: 'This is a common objection in HSA/FSA enablement deals. If existing customers simply shift payment method without incremental volume, the net effect is margin erosion rather than growth.',
    verbatims: [
      { quote: 'What if this just cannibalizes our existing sales? Like, people who would have bought anyway just switch to HSA payment. Then we\'re paying 4.5% plus the LMN fee for zero incremental revenue.', timestamp: '00:11:20', speaker: 'Russell Harris' },
    ],
  },
};

const RiskFactorsSection: React.FC<{
  risks: { label: string; description: string }[];
}> = ({ risks }) => {
  const [items] = React.useState(risks);

  return (
    <div className="py-4">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
        Risk factors
      </h2>
      <ul className="space-y-2">
        {items.map((r, i) => (
          <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${riskFactorReasonings[i] ? 'hover:bg-gray-100/50' : ''}`}>
            <span className="text-gray-400 leading-none select-none mt-0.5">&bull;</span>
            <span className="flex-1">
              <span className="font-semibold text-foreground">{r.label}</span>
              {' - '}
              {r.description}
            </span>
            {riskFactorReasonings[i] && (
              <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
                <ReasoningPopover reasoning={riskFactorReasonings[i]} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NextStepsSection: React.FC<{
  steps: { text: string; due_date: string; assignee: string; completed: boolean; reasoning?: ReasoningWithVerbatims }[];
}> = ({ steps }) => {
  const [items, setItems] = React.useState(steps);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setItems(updated);
  };

  const copyItem = (index: number) => {
    const updated = [...items];
    updated.splice(index + 1, 0, { ...items[index] });
    setItems(updated);
  };

  const deleteItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const ourSteps = items.filter((step) => step.assignee === 'Jacob Francis');
  const theirSteps = items.filter((step) => step.assignee !== 'Jacob Francis');

  const renderSteps = (stepsToRender: typeof items) => (
    <div className="space-y-2">
      {stepsToRender.map((step, i) => {
        const originalIndex = items.indexOf(step);
        return (
          <ActionItem
            key={i}
            text={step.text}
            assignee={step.assignee}
            completed={step.completed}
            onCompletedChange={(checked) => {
              const updated = [...items];
              updated[originalIndex] = { ...updated[originalIndex], completed: checked };
              setItems(updated);
            }}
            onCopy={() => copyItem(originalIndex)}
            onDelete={() => deleteItem(originalIndex)}
            isDraggable={true}
            isDragging={draggedIndex === originalIndex}
            onDragStart={() => setDraggedIndex(originalIndex)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedIndex !== null && draggedIndex !== originalIndex) {
                moveItem(draggedIndex, originalIndex);
                setDraggedIndex(null);
              }
            }}
          />
        );
      })}
    </div>
  );

  return (
    <div className="py-4 space-y-6">
      {ourSteps.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
            Our next steps
          </h2>
          {renderSteps(ourSteps)}
        </div>
      )}

      {theirSteps.length > 0 && (
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
            Their next steps
          </h2>
          {renderSteps(theirSteps)}
        </div>
      )}
    </div>
  );
};

const OpportunitySummaryBullet: React.FC<{
  item: string | { text: string; reasoning?: any };
}> = ({ item }) => {
  const text = typeof item === 'string' ? item : item.text;
  const reasoning = typeof item === 'string' ? undefined : item.reasoning;

  return (
    <li className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${reasoning ? 'hover:bg-gray-100/50' : ''}`}>
      <span className="text-gray-400 leading-none select-none mt-0.5">&bull;</span>
      <span className="flex-1">{text}</span>
      {reasoning && (
        <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
          <ReasoningPopover reasoning={reasoning} />
        </span>
      )}
    </li>
  );
};

const OpportunitySummarySection: React.FC<{
  data: DealDetailData['opportunity_summary'];
}> = ({ data }) => (
  <div className="py-4">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Opportunity Summary
    </h2>
    <p className="text-sm font-semibold text-foreground mb-4">
      {data.headline}
    </p>

    <div className="space-y-4">
      {data.what_they_want.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1.5">What they're likely looking for:</h3>
          <ul className="space-y-1">
            {data.what_they_want.map((item, i) => (
              <OpportunitySummaryBullet key={i} item={item} />
            ))}
          </ul>
        </div>
      )}

      {data.how_we_help.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1.5">How we can help them:</h3>
          <ul className="space-y-1">
            {data.how_we_help.map((item, i) => (
              <OpportunitySummaryBullet key={i} item={item} />
            ))}
          </ul>
        </div>
      )}

      {data.why_now.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1.5">Why now:</h3>
          <ul className="space-y-1">
            {data.why_now.map((item, i) => (
              <OpportunitySummaryBullet key={i} item={item} />
            ))}
          </ul>
        </div>
      )}

      {data.budget_and_roi.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1.5">Budget & ROI:</h3>
          <ul className="space-y-1">
            {data.budget_and_roi.map((item, i) => (
              <OpportunitySummaryBullet key={i} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const KeyStakeholdersSection: React.FC<{
  stakeholders: DealDetailData['key_stakeholders'];
}> = ({ stakeholders }) => (
  <div className="py-4">
    <div className="space-y-3">
      {stakeholders.map((s, i) => (
        <UnifiedContactCard
          key={i}
          contact={{
            name: s.name,
            avatar_color: s.avatar_color,
            job_title: s.job_title,
            persona: s.buyer_persona,
            role_in_buying_process: s.role_in_buying_process,
            tags: s.tags,
            risk: s.risk,
            role_and_engagement: s.role_and_engagement,
            authority: s.authority,
            key_concerns: s.key_concerns,
            communication_style: s.communication_style,
            personal_markers: s.personal_markers,
          }}
          variant="full"
          showRisk={true}
          expandableFields={true}
        />
      ))}
    </div>
  </div>
);

const IntelBullet: React.FC<{
  item: string | { text: string; reasoning?: ReasoningWithVerbatims };
}> = ({ item }) => {
  const text = typeof item === 'string' ? item : item.text;
  const reasoning = typeof item === 'string' ? undefined : item.reasoning;

  return (
    <li className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${reasoning ? 'hover:bg-gray-100/50' : ''}`}>
      <span className="text-gray-400 leading-none select-none mt-0.5">&bull;</span>
      <span className="flex-1">{text}</span>
      {reasoning && (
        <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
          <ReasoningPopover reasoning={reasoning} />
        </span>
      )}
    </li>
  );
};

const IntelSection: React.FC<{
  intel?: DealDetailData['intel'];
}> = ({ intel }) => {
  if (!intel) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Intel will be generated after your first meeting.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {intel.sections.map((section, i) => (
        <div key={i}>
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
            {section.title}
          </h2>
          <ul className="space-y-2">
            {section.items.map((item, j) => (
              <IntelBullet key={j} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const statusIcon = (status: 'complete' | 'partial' | 'missing'): string => {
  switch (status) {
    case 'complete':
      return '⬤';
    case 'partial':
      return '◐';
    case 'missing':
      return '⚪';
  }
};

const MeddicsSection: React.FC<{
  meddic?: DealDetailData['meddic'];
  collapsedByDefault?: boolean;
}> = ({ meddic, collapsedByDefault = false }) => {
  const [expandedIndices, setExpandedIndices] = React.useState<Set<number>>(
    () => collapsedByDefault ? new Set() : new Set(meddic?.components.map((_, i) => i) ?? [])
  );

  const toggleExpanded = (index: number) => {
    const newSet = new Set(expandedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedIndices(newSet);
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8">Status</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-48">Component</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Information Captured</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {meddic?.components.map((comp, i) => (
              <React.Fragment key={i}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleExpanded(i)}
                >
                  <td className="px-4 py-3 text-center">{statusIcon(comp.status)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{comp.name}</td>
                  <td className="px-4 py-3 text-foreground/80">{comp.information}</td>
                  <td className="px-4 py-3 text-right">
                    {comp.details && comp.details.length > 0 && (
                      <span className="text-muted-foreground/50 text-sm">
                        {expandedIndices.has(i) ? '‸' : '›'}
                      </span>
                    )}
                  </td>
                </tr>
                {expandedIndices.has(i) && comp.details && comp.details.length > 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-3">
                      <ul className="space-y-2">
                        {comp.details.map((item, j) => (
                          <IntelBullet key={j} item={item} />
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DealDetailPage: React.FC<DealDetailPageProps> = ({ data, onVersionChange, hideTopBar = false, collapseMeddic = false }) => {
  const [transcriptOpen, setTranscriptOpen] = React.useState(false);
  const [highlightQuote, setHighlightQuote] = React.useState<string | null>(null);
  const isNarrow = useIsNarrow(OVERLAY_BREAKPOINT);

  const openTranscript = React.useCallback((quote: string) => {
    setHighlightQuote(quote);
    setTranscriptOpen(true);
  }, []);

  const closeTranscript = React.useCallback(() => {
    setTranscriptOpen(false);
  }, []);

  const contextValue = React.useMemo(() => ({ openTranscript }), [openTranscript]);

  return (
    <TranscriptPanelContext.Provider value={contextValue}>
      <div className="flex flex-1 min-h-screen relative flex-col">
        {/* Full-width header - sticky */}
        {!hideTopBar && (
          <div className="sticky top-0 z-20 flex-shrink-0 h-[50px] flex items-center px-3 bg-white border-b border-gray-200">
            <div className="flex-1 flex items-center">
              <TopBar dealName={data.name} onVersionChange={onVersionChange} />
            </div>
          </div>
        )}
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 bg-white overflow-y-auto">
            <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
            <DealHeader dealName={data.name} dealIconColor={data.icon_color} />
            <MetadataRows data={data} />

            <Separator className="my-4" />

            <Tabs defaultValue="overview">
              <TabsList className="bg-transparent p-0 h-auto border-b border-gray-200 w-full justify-around rounded-none gap-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors px-4 pb-2.5 pt-2 text-sm font-medium"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="intel"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors px-4 pb-2.5 pt-2 text-sm font-medium"
                >
                  Intel
                </TabsTrigger>
                <TabsTrigger
                  value="meddic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors px-4 pb-2.5 pt-2 text-sm font-medium"
                >
                  MEDDIC
                </TabsTrigger>
                <TabsTrigger
                  value="stakeholders"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors px-4 pb-2.5 pt-2 text-sm font-medium"
                >
                  Stakeholders
                </TabsTrigger>
                <TabsTrigger
                  value="meetings"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors px-4 pb-2.5 pt-2 text-sm font-medium"
                >
                  Meetings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {data.overview.momentum_summary && (
                  <>
                    <CurrentStateSection summary={data.overview.momentum_summary} momentum={data.momentum} aceCloseConfidence={data.overview.ace_predicted_close_confidence} />
                    <Separator className="my-4" />
                  </>
                )}
                {data.overview.positive_signals.length > 0 && (
                  <>
                    <PositiveSignalsSection signals={data.overview.positive_signals} />
                    <Separator className="my-4" />
                  </>
                )}
                {data.overview.risk_factors.length > 0 && (
                  <>
                    <RiskFactorsSection risks={data.overview.risk_factors} />
                    <Separator className="my-4" />
                  </>
                )}
                {data.overview.last_meeting.title && (
                  <>
                    <LastMeetingSection
                      title={data.overview.last_meeting.title}
                      bullets={data.overview.last_meeting.bullets}
                    />
                  </>
                )}
                {data.overview.next_steps.length > 0 && (
                  <>
                    <NextStepsSection steps={data.overview.next_steps} />
                    <Separator className="my-4" />
                  </>
                )}

                <OpportunitySummarySection data={data.opportunity_summary} />

                <Separator className="my-4" />

                <div className="py-4">
                  <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                    Key Stakeholders
                  </h2>
                  <div className="space-y-3">
                    {data.key_stakeholders && data.key_stakeholders[0] && (
                      <UnifiedContactCard
                        contact={{
                          name: data.key_stakeholders[0].name,
                          avatar_color: data.key_stakeholders[0].avatar_color,
                          email: data.key_stakeholders[0].email,
                          job_title: data.key_stakeholders[0].job_title,
                          persona: data.key_stakeholders[0].buyer_persona,
                          linkedin_url: data.key_stakeholders[0].linkedin_url,
                          role_in_buying_process: data.key_stakeholders[0].role_in_buying_process,
                          tags: data.key_stakeholders[0].tags,
                          risk: data.key_stakeholders[0].risk,
                        }}
                        variant="compact"
                      />
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="intel">
                <IntelSection intel={data.intel} />
              </TabsContent>

              <TabsContent value="meddic">
                <MeddicsSection meddic={data.meddic} collapsedByDefault={collapseMeddic} />
              </TabsContent>

              <TabsContent value="stakeholders">
                <KeyStakeholdersSection stakeholders={data.key_stakeholders} />
              </TabsContent>

              <TabsContent value="meetings">
                <MeetingsSection meetings={data.meetings} />
              </TabsContent>
            </Tabs>
            </div>
          </div>

          {/* Transcript panel — inline mode (wide screens) */}
          {transcriptOpen && !isNarrow && (
            <div className="w-[620px] flex-shrink-0 border-l bg-white overflow-y-auto animate-in slide-in-from-right-4 duration-200">
              <TranscriptPanelContent highlightQuote={highlightQuote} onClose={closeTranscript} />
            </div>
          )}

        {/* Transcript panel — overlay mode (narrow screens) */}
        {transcriptOpen && isNarrow && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 animate-in fade-in duration-200"
              onClick={closeTranscript}
            />
            <div className="fixed top-0 right-0 z-50 h-full w-[620px] max-w-[90vw] bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-200">
              <TranscriptPanelContent highlightQuote={highlightQuote} onClose={closeTranscript} />
            </div>
          </>
        )}
        </div>

      </div>
    </TranscriptPanelContext.Provider>
  );
};

const MeetingsSection: React.FC<{ meetings?: Meeting[] }> = ({ meetings }) => {
  const formatDatePill = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate().toString();
    return `${month} ${day}`;
  };

  const formatTimeRange = (dateStr: string, duration: string): string => {
    const start = new Date(dateStr);
    const mins = parseInt(duration, 10);
    const end = new Date(start.getTime() + mins * 60_000);
    const fmt = (d: Date) =>
      d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const now = new Date();
  const upcomingMeetings = (meetings || []).filter(
    (m) => new Date(m.start_time) > now
  );
  const pastMeetings = (meetings || [])
    .filter((m) => new Date(m.start_time) <= now)
    .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

  return (
    <div className="pt-4 space-y-8">
      {/* Upcoming Meetings */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Upcoming Meetings</h3>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-3 max-w-2xl">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                date={formatDatePill(meeting.start_time)}
                title={meeting.name}
                variant="upcoming"
                time={formatTimeRange(meeting.start_time, meeting.duration)}
                attendees={meeting.attendees}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
            No meeting scheduled
          </div>
        )}
      </div>

      {/* Past Meetings */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Past Meetings</h3>
        {pastMeetings.length > 0 ? (
          <div className="space-y-3 max-w-2xl">
            {pastMeetings.map((meeting) => {
              const start = new Date(meeting.start_time).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              const end = new Date(new Date(meeting.start_time).getTime() + parseInt(meeting.duration) * 60000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              const durationMins = parseInt(meeting.duration);
              const hours = Math.floor(durationMins / 60);
              const mins = durationMins % 60;
              let duration = '';
              if (hours > 0) duration += `${hours} hr${hours > 1 ? 's' : ''}`;
              if (mins > 0) duration += `${duration ? ' ' : ''}${mins} min${mins > 1 ? 's' : ''}`;

              return (
                <MeetingCard
                  key={meeting.id}
                  date={formatDatePill(meeting.start_time)}
                  title={meeting.name}
                  variant="past"
                  startTime={start}
                  endTime={end}
                  duration={duration}
                  attendees={meeting.attendees}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm text-muted-foreground">
            No past meetings
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDetailPage;
