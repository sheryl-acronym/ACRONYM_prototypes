import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DealDetailData,
  DealStage,
  Momentum,
  ReasoningWithVerbatims,
  Verbatim,
} from '@/types';
import {
  Building2,
  Calendar,
  ChevronsRight,
  FileText,
  Maximize2,
  MoreHorizontal,
  Upload,
  User,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Trash2,
  BookOpen,
  Plus,
  CheckCircle2,
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DealDetailPageV2Props {
  data: DealDetailData;
  onVersionChange?: (version: 'v1' | 'v2') => void;
}

const momentumConfig: Record<Momentum, { bg: string; text: string; border: string }> = {
  Strong: { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  Stalled: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  'At risk': { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200' },
  Closed: { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200' },
  Active: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
};

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
        <button className="mt-0.5 p-0.5 rounded hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-slate-600" />
          <span className="text-xs font-semibold text-foreground">AI Reasoning</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{reasoning.text}</p>
        {reasoning.verbatims?.map((v: Verbatim, vi: number) => (
          <VerbatimCallout key={vi} verbatim={v} />
        ))}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200">
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
          <button
            onClick={() => setFeedback(feedback === 'helpful' ? null : 'helpful')}
            className={`p-1 rounded transition-colors ${
              feedback === 'helpful'
                ? 'bg-slate-200 text-foreground'
                : 'text-muted-foreground hover:bg-slate-100'
            }`}
            title="Helpful"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setFeedback(feedback === 'not-helpful' ? null : 'not-helpful')}
            className={`p-1 rounded transition-colors ${
              feedback === 'not-helpful'
                ? 'bg-slate-200 text-foreground'
                : 'text-muted-foreground hover:bg-slate-100'
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
      className="w-full text-left mt-2 border-l-2 border-slate-300 pl-3 py-1.5 hover:border-amber-400 hover:bg-amber-50/50 transition-colors rounded-r cursor-pointer group/verbatim"
    >
      <p className="text-xs text-foreground/70 leading-relaxed italic">{verbatim.quote}</p>
      {verbatim.speaker || verbatim.timestamp ? (
        <span className="text-[10px] text-muted-foreground mt-1 inline-block group-hover/verbatim:text-amber-600 transition-colors">
          {verbatim.speaker}{verbatim.speaker && verbatim.timestamp ? ' · ' : ''}{verbatim.timestamp}
        </span>
      ) : null}
    </button>
  );
};

const TopBar: React.FC<{ dealName: string; onVersionChange?: (version: 'v1' | 'v2') => void }> = ({ dealName, onVersionChange }) => {
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
          <Select defaultValue="v2" onValueChange={(v) => onVersionChange(v as 'v1' | 'v2')}>
            <SelectTrigger className="w-auto h-8 text-xs px-2.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">V1</SelectItem>
              <SelectItem value="v2">V2</SelectItem>
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
  onNameChange?: (newName: string) => void;
}> = ({ dealName, dealIconColor, onNameChange }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState(dealName);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedName.trim()) {
      onNameChange?.(editedName.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedName(dealName);
      setIsEditing(false);
    }
  };

  const [logoError, setLogoError] = React.useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <img
          src="/proven.png"
          alt="Company logo"
          className="w-7 h-7 rounded object-contain flex-shrink-0"
          onError={() => setLogoError(true)}
        />
        {logoError && (
          <span className={`w-7 h-7 rounded-full flex-shrink-0 ${dealIconColor}`} />
        )}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold text-foreground bg-transparent border-b-2 border-foreground outline-none px-0.5"
          />
        ) : (
          <h1
            onClick={() => onNameChange && setIsEditing(true)}
            className={`text-2xl font-bold text-foreground ${onNameChange ? 'cursor-text hover:text-foreground/80 transition-colors' : ''}`}
          >
            {dealName}
          </h1>
        )}
      </div>
    </div>
  );
};

const MetadataRows: React.FC<{ data: DealDetailData }> = ({ data }) => {
  return (
    <div className="space-y-0">
      {/* Owner */}
      <div className="flex items-center py-2.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <User className="h-4 w-4" />
          Owner
        </span>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[9px] font-semibold flex-shrink-0">
            {data.owner_name.split(' ').map((n) => n[0]).join('').toUpperCase()}
          </span>
          {data.owner_name}
        </div>
      </div>

      {/* Company */}
      <div className="flex items-center py-2.5">
        <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Company
        </span>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <img
            src="/proven.png"
            alt={data.company_name}
            className="h-5 w-5 rounded object-contain"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <span className={`w-5 h-5 rounded hidden ${data.company_icon_color || 'bg-gray-300'}`} />
          {data.company_name}
          {data.customer_profile && (
            <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 ml-1">
              <FileText className="h-3 w-3 mr-1" />
              {data.customer_profile}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

const CurrentStateSection: React.FC<{ summary: string; momentum: Momentum }> = ({ summary, momentum }) => {
  const momentumStyle = momentumConfig[momentum];

  return (
    <div className="py-4">
      <div className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-col items-start justify-center flex-shrink-0">
          <Badge
            className={`${momentumStyle.bg} ${momentumStyle.text} ${momentumStyle.border} font-medium text-sm rounded-md px-3 py-1.5`}
          >
            {momentum}
          </Badge>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground/80">{summary}</p>
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
  lastMeetingDate?: string | null;
}> = ({ title, bullets, lastMeetingDate }) => {
  const [items, setItems] = React.useState(bullets);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editText, setEditText] = React.useState('');

  const addNewBullet = () => {
    const newIndex = items.length;
    setItems([...items, '']);
    setEditingIndex(newIndex);
    setEditText('');
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditText(items[index]);
  };

  const saveEdit = (index: number) => {
    const updated = [...items];
    updated[index] = editText;
    setItems(updated);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
          Last meeting overview
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={addNewBullet}
            className="p-0.5 rounded hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          {lastMeetingDate && (
            <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs text-muted-foreground hover:text-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatShortDate(lastMeetingDate)}</span>
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-foreground mb-3">{title}</p>
      <ul className="space-y-1">
        {items.map((b, i) => (
          <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${lastMeetingReasonings[i] || !b ? 'hover:bg-slate-100/50' : ''}`}>
            <span className="text-slate-400 leading-none select-none mt-0.5">&bull;</span>
            {editingIndex === i ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => saveEdit(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveEdit(i);
                  } else if (e.key === 'Escape') {
                    cancelEdit();
                  }
                }}
                className="flex-1 text-sm h-auto py-0.5 px-2 border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded"
                placeholder="Add note..."
                autoFocus
              />
            ) : (
              <>
                <span className={`flex-1 cursor-text rounded px-1 -mx-1 py-0.5 transition-colors ${!b ? 'hover:bg-muted/50 text-muted-foreground/50' : 'hover:bg-muted/50'}`} onClick={() => startEdit(i)}>
                  {b || 'Click to add note...'}
                </span>
                {lastMeetingReasonings[i] && (
                  <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
                    <ReasoningPopover reasoning={lastMeetingReasonings[i]} />
                  </span>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

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
  const [items, setItems] = React.useState(signals);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editLabel, setEditLabel] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const addNewSignal = () => {
    const newIndex = items.length;
    setItems([...items, { label: 'New signal', description: 'Add description...' }]);
    setEditingIndex(newIndex);
    setEditLabel('New signal');
    setEditDescription('Add description...');
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditLabel(items[index].label);
    setEditDescription(items[index].description);
  };

  const saveEdit = (index: number) => {
    const updated = [...items];
    updated[index] = { label: editLabel, description: editDescription };
    setItems(updated);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
          Positive signals
        </h2>
        <button
          onClick={addNewSignal}
          className="p-0.5 rounded hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((s, i) => (
          <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${positiveSignalReasonings[i] ? 'hover:bg-slate-100/50' : ''}`}>
            <span className="text-slate-400 leading-none select-none mt-0.5">&bull;</span>
            {editingIndex === i ? (
              <span className="flex-1 flex flex-col gap-1">
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onBlur={() => saveEdit(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(i);
                    } else if (e.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                  className="text-sm font-semibold h-auto py-0.5 px-2 border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded"
                  placeholder="Label"
                  autoFocus
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onBlur={() => saveEdit(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(i);
                    } else if (e.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                  className="text-sm h-auto py-0.5 px-2 border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded"
                  placeholder="Description"
                />
              </span>
            ) : (
              <>
                <span className="flex-1 cursor-text rounded px-1 -mx-1 py-0.5 hover:bg-muted/50 transition-colors" onClick={() => startEdit(i)}>
                  <span className="font-semibold text-foreground">{s.label}</span>
                  {' - '}
                  {s.description}
                </span>
                {positiveSignalReasonings[i] && (
                  <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
                    <ReasoningPopover reasoning={positiveSignalReasonings[i]} />
                  </span>
                )}
              </>
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
  const [items, setItems] = React.useState(risks);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editLabel, setEditLabel] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const addNewRisk = () => {
    const newIndex = items.length;
    setItems([...items, { label: 'New risk', description: 'Add description...' }]);
    setEditingIndex(newIndex);
    setEditLabel('New risk');
    setEditDescription('Add description...');
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditLabel(items[index].label);
    setEditDescription(items[index].description);
  };

  const saveEdit = (index: number) => {
    const updated = [...items];
    updated[index] = { label: editLabel, description: editDescription };
    setItems(updated);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60">
          Risk factors
        </h2>
        <button
          onClick={addNewRisk}
          className="p-0.5 rounded hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((r, i) => (
          <li key={i} className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${riskFactorReasonings[i] ? 'hover:bg-slate-100/50' : ''}`}>
            <span className="text-slate-400 leading-none select-none mt-0.5">&bull;</span>
            {editingIndex === i ? (
              <span className="flex-1 flex flex-col gap-1">
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onBlur={() => saveEdit(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(i);
                    } else if (e.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                  className="text-sm font-semibold h-auto py-0.5 px-2 border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded"
                  placeholder="Label"
                  autoFocus
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onBlur={() => saveEdit(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEdit(i);
                    } else if (e.key === 'Escape') {
                      cancelEdit();
                    }
                  }}
                  className="text-sm h-auto py-0.5 px-2 border-transparent bg-muted/40 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded"
                  placeholder="Description"
                />
              </span>
            ) : (
              <>
                <span className="flex-1 cursor-text rounded px-1 -mx-1 py-0.5 hover:bg-muted/50 transition-colors" onClick={() => startEdit(i)}>
                  <span className="font-semibold text-foreground">{r.label}</span>
                  {' - '}
                  {r.description}
                </span>
                {riskFactorReasonings[i] && (
                  <span className="flex-shrink-0 opacity-0 group-hover/bullet:opacity-100 transition-opacity">
                    <ReasoningPopover reasoning={riskFactorReasonings[i]} />
                  </span>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const NextStepsSection: React.FC<{
  steps: { text: string; due_date: string; assignee: string; completed: boolean; reasoning?: ReasoningWithVerbatims }[];
  title?: string;
}> = ({ steps, title = 'Next steps' }) => {
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

  return (
    <div className="py-4">
      <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
        {title}
      </h2>
      <div className="space-y-2">
        {items.map((step, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => setDraggedIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedIndex !== null && draggedIndex !== i) {
                moveItem(draggedIndex, i);
                setDraggedIndex(null);
              }
            }}
            className={`group/step flex items-start gap-3 p-3 rounded-lg transition-colors ${
              draggedIndex === i
                ? 'bg-slate-100 opacity-50 cursor-move'
                : 'hover:bg-slate-50 hover:cursor-move'
            }`}
          >
            <Checkbox
              checked={step.completed}
              onCheckedChange={(checked) => {
                const updated = [...items];
                updated[i] = { ...updated[i], completed: !!checked };
                setItems(updated);
              }}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {step.text}
                </span>
              </div>
              {step.assignee && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{step.assignee}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover/step:opacity-100 transition-opacity">
              {step.reasoning && (
                <ReasoningPopover reasoning={step.reasoning} />
              )}
              <button
                onClick={() => copyItem(i)}
                className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                title="Copy"
              >
                <Copy className="h-4 w-4 text-slate-500" />
              </button>
              <button
                onClick={() => deleteItem(i)}
                className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OpportunitySummaryBullet: React.FC<{
  item: string | { text: string; reasoning?: any };
}> = ({ item }) => {
  const text = typeof item === 'string' ? item : item.text;
  const reasoning = typeof item === 'string' ? undefined : item.reasoning;

  return (
    <li className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${reasoning ? 'hover:bg-slate-100/50' : ''}`}>
      <span className="text-slate-400 leading-none select-none mt-0.5">&bull;</span>
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
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5">What they're looking for:</h3>
        <ul className="space-y-1">
          {data.what_they_want.map((item, i) => (
            <OpportunitySummaryBullet key={i} item={item} />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5">How we can help them:</h3>
        <ul className="space-y-1">
          {data.how_we_help.map((item, i) => (
            <OpportunitySummaryBullet key={i} item={item} />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5">Why now:</h3>
        <ul className="space-y-1">
          {data.why_now.map((item, i) => (
            <OpportunitySummaryBullet key={i} item={item} />
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5">Budget & ROI:</h3>
        <ul className="space-y-1">
          {data.budget_and_roi.map((item, i) => (
            <OpportunitySummaryBullet key={i} item={item} />
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const KeyStakeholdersSection: React.FC<{
  stakeholders: DealDetailData['key_stakeholders'];
}> = ({ stakeholders }) => (
  <div className="py-4">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Key Stakeholders
    </h2>
    <div className="space-y-3">
      {stakeholders.map((s, i) => (
        <div key={i} className="rounded-lg border bg-card p-4">
          {/* Header row: avatar, name, role in buying process, and risk badge */}
          <div className="flex items-start gap-3 mb-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 ${s.avatar_color || 'bg-gray-400'}`}
            >
              {s.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-foreground">{s.name}</span>
                <div className="flex flex-wrap gap-1.5">
                  {s.role_in_buying_process && (
                    <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit">
                      {s.role_in_buying_process}
                    </Badge>
                  )}
                  {s.tags && s.tags.map((tag, ti) => (
                    <Badge key={ti} variant="secondary" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {s.risk && (
              <Badge variant="outline" className={`rounded-md font-normal text-xs px-2.5 py-0.5 flex-shrink-0 uppercase ${
                s.risk.level === 'HIGH' ? 'bg-red-50 text-red-900 border-red-200' :
                s.risk.level === 'MEDIUM' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                'bg-green-50 text-green-900 border-green-200'
              }`}>
                {s.risk.level} Risk
              </Badge>
            )}
          </div>

          {/* Additional context sections - two column layout */}
          <div className="space-y-3">
            {s.role_and_engagement && (
              <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Role</h4>
                </div>
                <div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.role_and_engagement}</p>
                </div>
              </div>
            )}

            {s.buyer_persona && (
              <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Buyer Persona</h4>
                </div>
                <div>
                  <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit">
                    {s.buyer_persona}
                  </Badge>
                </div>
              </div>
            )}

            {s.authority && (
              <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Authority</h4>
                </div>
                <div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.authority}</p>
                </div>
              </div>
            )}

            {s.key_concerns && (
              <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Key concerns</h4>
                </div>
                <div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.key_concerns}</p>
                </div>
              </div>
            )}

            {s.risk && (
              <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Risk</h4>
                </div>
                <div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.risk.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
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
    <li className={`group/bullet flex items-start gap-2 text-sm text-foreground/80 rounded px-2 py-1 -mx-2 transition-colors ${reasoning ? 'hover:bg-slate-100/50' : ''}`}>
      <span className="text-slate-400 leading-none select-none mt-0.5">&bull;</span>
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
        No intel available.
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

const DealStageProgress: React.FC<{ currentStage: DealStage }> = ({ currentStage }) => {
  const stages: Array<{ stage: DealStage; label: string; bgColor: string; textColor: string; bgLight: string }> = [
    { stage: 'First meeting scheduled', label: '1st Call', bgColor: 'bg-blue-500', textColor: 'text-blue-900', bgLight: 'bg-blue-100' },
    { stage: 'Discovery & Qualification', label: 'Discovery', bgColor: 'bg-violet-500', textColor: 'text-violet-900', bgLight: 'bg-violet-100' },
    { stage: 'Demo', label: 'Demo', bgColor: 'bg-amber-500', textColor: 'text-amber-900', bgLight: 'bg-amber-100' },
    { stage: 'Proposal / Negotiation', label: 'Proposal', bgColor: 'bg-sky-500', textColor: 'text-sky-900', bgLight: 'bg-sky-100' },
    { stage: 'Closed Won', label: 'Closed', bgColor: 'bg-green-500', textColor: 'text-green-900', bgLight: 'bg-green-100' },
  ];

  const currentIndex = stages.findIndex((s) => s.stage === currentStage);

  return (
    <div className="py-4">
      <div className="flex items-center gap-0 h-12">
        {stages.map((item, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isFuture = index > currentIndex;

          return (
            <div key={item.stage} className="relative flex-1">
              <div
                className={`h-12 px-4 flex items-center justify-center gap-2 transition-all ${
                  isCompleted
                    ? item.bgLight
                    : isActive
                    ? item.bgLight
                    : 'bg-gray-100'
                }`}
                style={{
                  transform: 'skewX(-15deg)',
                  opacity: isFuture ? 0.6 : 1,
                  marginRight: index < stages.length - 1 ? '-12px' : 0,
                  position: 'relative',
                  zIndex: stages.length - index,
                }}
              >
                <div style={{ transform: 'skewX(15deg)' }} className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                  {isCompleted && (
                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${item.textColor}`} />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      isFuture
                        ? 'text-gray-600'
                        : item.textColor
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MeetingCard: React.FC<{ label: string; date: string | null }> = ({ label, date }) => {
  const formattedDate = date ? formatShortDate(date) : null;

  return (
    <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-1">
            {label}
          </h3>
          {formattedDate ? (
            <p className="text-sm font-medium text-foreground">{formattedDate}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Not scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MeetingsRow: React.FC<{ lastMeeting: string | null; nextMeeting: string | null }> = ({
  lastMeeting,
  nextMeeting,
}) => {
  return (
    <div className="py-4 flex gap-4">
      <MeetingCard label="Last meeting" date={lastMeeting} />
      <MeetingCard label="Next meeting" date={nextMeeting} />
    </div>
  );
};

const CollapsedMeddicsTable: React.FC<{
  meddic?: DealDetailData['meddic'];
}> = ({ meddic }) => {
  if (!meddic) {
    return null;
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg">
      <table className="w-full text-xs">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left px-2 py-2 font-medium text-foreground">Component</th>
            <th className="text-center px-2 py-2 font-medium text-foreground w-8">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {meddic.components.map((comp, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-2 py-2 text-foreground text-xs">{comp.name}</td>
              <td className="px-2 py-2 text-center">{statusIcon(comp.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MeddicsSection: React.FC<{
  meddic?: DealDetailData['meddic'];
}> = ({ meddic }) => {
  const [expandedIndices, setExpandedIndices] = React.useState<Set<number>>(
    () => new Set(meddic?.components.map((_, i) => i) ?? [])
  );

  if (!meddic) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        MEDDIC status not available.
      </div>
    );
  }

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
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8">Status</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-48">Component</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Information Captured</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {meddic.components.map((comp, i) => (
              <React.Fragment key={i}>
                <tr
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
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
                    <td colSpan={2}></td>
                    <td colSpan={2} className="px-4 py-3">
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

export const DealDetailPageV2: React.FC<DealDetailPageV2Props> = ({ data, onVersionChange }) => {
  const [dealName, setDealName] = React.useState(data.name);
  const [transcriptOpen, setTranscriptOpen] = React.useState(false);
  const [highlightQuote, setHighlightQuote] = React.useState<string | null>(null);
  const isNarrow = useIsNarrow(OVERLAY_BREAKPOINT);

  const handleDealNameChange = React.useCallback((newName: string) => {
    setDealName(newName);
  }, []);

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
        <div className="sticky top-0 z-20 flex-shrink-0 h-[50px] flex items-center px-3 bg-white border-b border-slate-200">
          <div className="flex-1 flex items-center">
            <TopBar dealName={data.name} onVersionChange={onVersionChange} />
          </div>
        </div>
        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 bg-white overflow-y-auto">
            <div className="max-w-[1040px] mx-auto px-8 py-4 pb-24 w-full">
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <DealHeader dealName={dealName} dealIconColor={data.icon_color} onNameChange={handleDealNameChange} />
                <div className="mt-2">
                  <MetadataRows data={data} />
                </div>
              </div>
              <div className="flex justify-end">
                <MeetingsRow lastMeeting={data.last_meeting} nextMeeting={data.next_meeting} />
              </div>
            </div>

            <Separator className="my-4" />

            <DealStageProgress currentStage={data.stage_name} />

            <CurrentStateSection summary={data.overview.momentum_summary} momentum={data.momentum} />

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="col-span-2 min-w-0">
            <Tabs defaultValue="overview">
              <TabsList className="bg-transparent p-0 h-auto border-b border-slate-200 w-full justify-around rounded-none gap-0">
                <TabsTrigger
                  value="overview"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="intel"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium"
                >
                  Intel
                </TabsTrigger>
                <TabsTrigger
                  value="meddic"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium"
                >
                  MEDDIC
                </TabsTrigger>
                <TabsTrigger
                  value="stakeholders"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium"
                >
                  Stakeholders
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <LastMeetingSection
                  title={data.overview.last_meeting.title}
                  bullets={data.overview.last_meeting.bullets}
                  lastMeetingDate={data.last_meeting}
                />
                <div className="pt-4 space-y-6">
                  <PositiveSignalsSection signals={data.overview.positive_signals} />
                  <RiskFactorsSection risks={data.overview.risk_factors} />
                </div>
                <div className="space-y-3">
                  <NextStepsSection
                    title="Our next steps"
                    steps={data.overview.next_steps.filter(s => s.assignee.includes('Flex'))}
                  />
                  <NextStepsSection
                    title="Their next steps"
                    steps={data.overview.next_steps.filter(s => s.assignee.includes('PROVEN'))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="intel">
                <OpportunitySummarySection data={data.opportunity_summary} />
                <Separator className="my-4" />
                <IntelSection intel={data.intel} />
              </TabsContent>

              <TabsContent value="meddic">
                <MeddicsSection meddic={data.meddic} />
              </TabsContent>

              <TabsContent value="stakeholders">
                <KeyStakeholdersSection stakeholders={data.key_stakeholders} />
              </TabsContent>
            </Tabs>
              </div>

              {/* Right column - MEDDIC & Meetings */}
              <div className="border-l border-slate-200 pl-4 space-y-6 min-w-0">
                <div>
                  <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                    MEDDIC Status
                  </h2>
                  <CollapsedMeddicsTable meddic={data.meddic} />
                </div>

                <div>
                  <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-4">
                    Meetings
                  </h2>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs text-foreground font-medium mb-1">PROVEN Skincare &lt;&gt; Flex</p>
                      <p className="text-xs text-muted-foreground">Jan 15, 2026 at 1:00 PM</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-xs text-foreground font-medium mb-1">PROVEN Skincare &lt;&gt; Flex</p>
                      <p className="text-xs text-muted-foreground">Jan 23, 2026 at 12:30 PM</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
                    Key Stakeholders
                  </h2>
                  <div className="space-y-3">
                    {data.key_stakeholders && data.key_stakeholders[0] && (
                      <div className="rounded-lg border bg-card p-4">
                        {/* Header row only - no details below */}
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 ${data.key_stakeholders[0].avatar_color || 'bg-gray-400'}`}
                          >
                            {data.key_stakeholders[0].name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-sm font-semibold text-foreground">{data.key_stakeholders[0].name}</span>
                              <div className="flex flex-wrap gap-1.5">
                                {data.key_stakeholders[0].role_in_buying_process && (
                                  <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit">
                                    {data.key_stakeholders[0].role_in_buying_process}
                                  </Badge>
                                )}
                                {data.key_stakeholders[0].tags && data.key_stakeholders[0].tags.map((tag, ti) => (
                                  <Badge key={ti} variant="secondary" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          {data.key_stakeholders[0].risk && (
                            <Badge variant="outline" className={`rounded-md font-normal text-xs px-2.5 py-0.5 flex-shrink-0 uppercase ${
                              data.key_stakeholders[0].risk.level === 'HIGH' ? 'bg-red-50 text-red-900 border-red-200' :
                              data.key_stakeholders[0].risk.level === 'MEDIUM' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                              'bg-green-50 text-green-900 border-green-200'
                            }`}>
                              {data.key_stakeholders[0].risk.level} Risk
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

        {/* Floating chat bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
          <div className="flex items-center justify-center pb-6 pointer-events-auto">
            <div className="w-full max-w-[600px] mx-4 bg-white rounded-full shadow-lg border border-slate-200 px-6 py-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask ACE..."
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
              <button className="flex-shrink-0 px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-medium rounded-full transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </TranscriptPanelContext.Provider>
  );
};

export default DealDetailPageV2;
