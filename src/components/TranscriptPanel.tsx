import React from 'react';
import { ChevronsLeft, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UnifiedContactCard } from '@/components/UnifiedContactCard';
import { ContactCardData } from '@/types';

interface TranscriptEntry {
  speaker: string;
  text: string;
  timestamp: string;
  role?: 'buyer' | 'seller';
}

interface TranscriptPanelProps {
  transcript: {
    entries: TranscriptEntry[];
  };
  onClose: () => void;
  isInset?: boolean;
}

function getBubbleColor(role?: 'buyer' | 'seller'): string {
  switch (role) {
    case 'buyer':
      return 'bg-white border-slate-200';
    case 'seller':
      return 'bg-slate-100 border-slate-200';
    default:
      return 'bg-slate-50 border-slate-200';
  }
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({ transcript, onClose, isInset = false }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopyTranscript = React.useCallback(() => {
    const transcriptText = transcript.entries
      .map((entry) => `${entry.speaker} [${entry.timestamp}]\n${entry.text}`)
      .join('\n\n');

    navigator.clipboard.writeText(transcriptText);
    setCopied(true);

    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  }, [transcript.entries]);

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

  // Prevent body scroll when panel is open (only for overlay mode)
  React.useEffect(() => {
    if (isInset) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isInset]);

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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyTranscript}
          className="h-8 w-8"
          title={copied ? "Copied" : "Copy transcript"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Content - scrollable */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
      >
        {transcript.entries.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No transcript available for this meeting.
          </div>
        ) : (
          transcript.entries.map((entry, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div className="w-fit">
                  <UnifiedContactCard
                    contact={{
                      id: entry.speaker,
                      name: entry.speaker,
                      avatar_color: 'bg-slate-200',
                    } as ContactCardData}
                    variant="compact-hover"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex-shrink-0">
                  [{entry.timestamp}]
                </p>
              </div>
              <div className={`border rounded-lg p-3 ${getBubbleColor(entry.role)}`}>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.text}
                </p>
              </div>
            </div>
          ))
        )}
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

export default TranscriptPanel;
