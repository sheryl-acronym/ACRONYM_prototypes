import React from 'react';
import { ChevronsLeft, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranscriptEntry {
  speaker: string;
  timestamp: string;
  text: string;
}

interface TranscriptSidePanelProps {
  transcriptUrl?: string;
  highlightTimestamp?: string;
  onClose: () => void;
  isInset?: boolean;
}

// Mock transcript data - in a real app, this would come from an API
const getMockTranscript = (): TranscriptEntry[] => [
  {
    speaker: 'Sarah Martinez',
    timestamp: '00:00:30',
    text: 'Thanks for taking the time to meet with us today. We\'re really interested in learning more about how Flex works.',
  },
  {
    speaker: 'Jacob Francis',
    timestamp: '00:01:15',
    text: 'Absolutely, happy to be here. Let me start by giving you an overview of the platform and how it integrates with your existing systems.',
  },
  {
    speaker: 'Sarah Martinez',
    timestamp: '00:05:45',
    text: 'That makes sense. One of our big challenges has been managing our product catalog.',
  },
  {
    speaker: 'Sarah Martinez',
    timestamp: '00:19:05',
    text: 'Does Flex handle the complexity of verifying which products actually qualify for HSA/FSA? We have thousands of SKUs and we\'re not sure how to manage that at scale.',
  },
  {
    speaker: 'Jacob Francis',
    timestamp: '00:20:15',
    text: 'Great question. Yes, Flex intelligently handles HSA/FSA verification on a per-SKU basis. You can create rules that map products to compliance categories. This eliminates manual tracking and scales automatically with your catalog.',
  },
  {
    speaker: 'Sarah Martinez',
    timestamp: '00:21:30',
    text: 'That\'s really helpful. And what about the implementation process?',
  },
  {
    speaker: 'Jacob Francis',
    timestamp: '00:22:00',
    text: 'We handle all the technical setup. Most customers are up and running within 2-3 weeks. We also provide training for your team.',
  },
  {
    speaker: 'Sarah Martinez',
    timestamp: '00:23:15',
    text: 'Perfect. Let\'s move forward with this.',
  },
];

export const TranscriptSidePanel: React.FC<TranscriptSidePanelProps> = ({
  highlightTimestamp,
  onClose,
  isInset = false,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const highlightRef = React.useRef<HTMLDivElement>(null);

  const transcript = getMockTranscript();

  // Scroll to highlighted timestamp when panel opens
  React.useEffect(() => {
    if (highlightRef.current && scrollContainerRef.current) {
      setTimeout(() => {
        highlightRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [highlightTimestamp]);

  // Handle ESC key to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const content = (
    <>
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
            title="Close transcript"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-sm font-semibold text-foreground">Transcript</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content - scrollable */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
      >
        {transcript.map((entry, idx) => {
          const isHighlighted =
            highlightTimestamp && entry.timestamp === highlightTimestamp;
          return (
            <div
              key={idx}
              ref={isHighlighted ? highlightRef : null}
              className={`space-y-2 ${
                isHighlighted ? 'bg-yellow-50 p-4 rounded-lg border border-yellow-200' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-muted-foreground">
                  {entry.speaker}
                </p>
                <p className="text-xs text-muted-foreground">
                  [{entry.timestamp}]
                </p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                {entry.text}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );

  // If inset mode (on full page), render as a flex container
  if (isInset) {
    return <div className="flex flex-col h-full overflow-hidden">{content}</div>;
  }

  // Otherwise render as overlay (for side panel)
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 z-50 h-full w-[620px] max-w-[90vw] bg-white border-l border-slate-200 animate-in slide-in-from-right duration-200 flex flex-col overflow-hidden shadow-xl">
        {content}
      </div>
    </>
  );
};

export default TranscriptSidePanel;
