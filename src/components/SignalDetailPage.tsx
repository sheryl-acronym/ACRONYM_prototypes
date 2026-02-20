import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PanelLeft,
  MoreHorizontal,
  ChevronRight,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import TranscriptSidePanel from '@/components/TranscriptSidePanel';
import { Signal } from '@/signals-demo-data';
import { CategoryPill } from '@/components/CategoryPill';

interface SignalDetailPageProps {
  signal: Signal;
  hideTopBar?: boolean;
}

const TopBar: React.FC<{ signal: Signal }> = ({ signal }) => {
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
                  navigate('/objections');
                }}
              >
                Objections
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{signal.objection}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signals');
                }}
              >
                Signals
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{signal.meeting_title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SignalHeader: React.FC<{ signal: Signal; onTranscriptClick: () => void }> = ({ signal, onTranscriptClick }) => {
  return (
    <div className="mb-8">
      {signal.category && (
        <div className="mb-3">
          <CategoryPill category={signal.category} />
        </div>
      )}
      {signal.objection && (
        <>
          <h1 className="text-2xl font-bold text-foreground">{signal.objection}</h1>
          <p className="text-sm font-semibold text-foreground mt-4 mb-1">Objection Signal</p>
        </>
      )}
      <button
        onClick={onTranscriptClick}
        className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground/80 border-b border-dotted border-foreground/60 hover:border-foreground/80 transition-colors bg-transparent border-0 p-0 cursor-pointer"
      >
        from {signal.meeting_title} • {formatDate(signal.meeting_date)}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ConversationExcerptSection: React.FC<{
  snippet: string;
  speakerName: string;
  timestamp?: string;
  responseSpeakerName?: string;
  responseSnippet?: string;
  responseTimestamp?: string;
}> = ({ snippet, speakerName, timestamp, responseSpeakerName, responseSnippet, responseTimestamp }) => (
  <div className="mb-8">
    {/* Customer objection */}
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <p className="text-xs font-semibold text-muted-foreground">{speakerName}</p>
        {timestamp && <p className="text-xs text-muted-foreground">[{timestamp}]</p>}
      </div>
      <div className="bg-stone-100 rounded-2xl px-4 py-3 border border-stone-200">
        <p className="text-sm text-foreground/90 leading-relaxed">{snippet}</p>
      </div>
    </div>

    {/* Seller response */}
    {responseSpeakerName && responseSnippet && (
      <div>
        <div className="mb-3 flex items-center gap-2">
          <p className="text-xs font-semibold text-muted-foreground">{responseSpeakerName}</p>
          {responseTimestamp && <p className="text-xs text-muted-foreground">[{responseTimestamp}]</p>}
        </div>
        <div className="bg-stone-100 rounded-2xl px-4 py-3 border border-stone-200 mb-3">
          <p className="text-sm text-foreground/90 leading-relaxed">{responseSnippet}</p>
        </div>
      </div>
    )}
  </div>
);

const ResponseApproachSection: React.FC<{ approach?: string }> = ({ approach }) => {
  if (!approach) return null;
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-foreground mb-3">Response Approach</h2>
      <p className="text-sm text-foreground/80 leading-relaxed">{approach}</p>
    </div>
  );
};

const WhyThisWorksSection: React.FC<{ reasoning?: string }> = ({ reasoning }) => {
  if (!reasoning) return null;
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-foreground mb-3">Why This Works</h2>
      <p className="text-sm text-foreground/80 leading-relaxed">{reasoning}</p>
    </div>
  );
};

const MetadataRows: React.FC<{ signal: Signal; onTranscriptClick: () => void; onViewTranscript?: () => void }> = ({ signal, onTranscriptClick, onViewTranscript }) => {
  return (
    <div className="space-y-8">
      <ConversationExcerptSection
        snippet={signal.conversation_snippet}
        speakerName={signal.speaker_name}
        timestamp={signal.timestamp}
        responseSpeakerName={signal.response_speaker_name}
        responseSnippet={signal.response_snippet}
        responseTimestamp={signal.response_timestamp}
      />

      {signal.transcript_url && signal.transcript_url !== '#' && (
        <div className="-mt-6">
          <Button
            onClick={onViewTranscript || onTranscriptClick}
            variant="outline"
            size="sm"
            className="w-full"
          >
            View in Transcript
          </Button>
        </div>
      )}

      <div className="border-t border-slate-200" />

      <ResponseApproachSection approach={signal.response_approach} />
      <WhyThisWorksSection reasoning={signal.why_this_works} />
    </div>
  );
};

export const SignalDetailPage: React.FC<SignalDetailPageProps> = ({
  signal,
  hideTopBar = false,
}) => {
  const navigate = useNavigate();
  const [isTranscriptOpen, setIsTranscriptOpen] = React.useState(false);

  const handleTranscriptClick = React.useCallback(() => {
    setIsTranscriptOpen(true);
  }, []);

  const handleCloseTranscript = React.useCallback(() => {
    setIsTranscriptOpen(false);
  }, []);

  const handleViewTranscript = React.useCallback(() => {
    // If already on full page, just open the inset panel
    if (!hideTopBar) {
      setIsTranscriptOpen(true);
    } else {
      // Navigate to full page and open transcript
      navigate(`/signals/${signal.id}?transcript=true`);
    }
  }, [signal.id, navigate, hideTopBar]);

  // Check if transcript should be open on mount (from URL param)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('transcript') === 'true') {
      setIsTranscriptOpen(true);
    }
  }, []);

  if (hideTopBar) {
    return (
      <>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 w-full pb-24">
              <SignalHeader signal={signal} onTranscriptClick={handleTranscriptClick} />
              <MetadataRows signal={signal} onTranscriptClick={handleTranscriptClick} onViewTranscript={handleViewTranscript} />
            </div>
          </div>
        </div>
        {isTranscriptOpen && (
          <TranscriptSidePanel
            transcriptUrl={signal.transcript_url}
            highlightTimestamp={signal.timestamp}
            onClose={handleCloseTranscript}
          />
        )}
      </>
    );
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main content area */}
      <div className={`flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden transition-all ${isTranscriptOpen ? 'mr-0' : ''}`}>
        {/* Full-width header - sticky */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <TopBar signal={signal} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
            <SignalHeader signal={signal} onTranscriptClick={handleTranscriptClick} />
            <MetadataRows signal={signal} onTranscriptClick={handleTranscriptClick} onViewTranscript={handleViewTranscript} />
          </div>
        </div>
      </div>

      {/* Inset Transcript Panel */}
      {isTranscriptOpen && (
        <div className="w-[360px] bg-white border-l border-slate-200 flex flex-col overflow-hidden">
          <TranscriptSidePanel
            transcriptUrl={signal.transcript_url}
            highlightTimestamp={signal.timestamp}
            onClose={handleCloseTranscript}
            isInset={true}
          />
        </div>
      )}
    </div>
  );
};

export default SignalDetailPage;
