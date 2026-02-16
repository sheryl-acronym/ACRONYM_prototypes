import React from 'react';
import { DealDetailData } from '@/types';
import { X, ChevronsLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealDetailPageV2 from '@/components/DealDetailPageV2';

interface DealDetailSidePanelProps {
  dealId: string;
  deal: DealDetailData | undefined;
  onClose: () => void;
}

export const DealDetailSidePanel: React.FC<DealDetailSidePanelProps> = ({
  dealId,
  deal,
  onClose,
}) => {
  const handleOpenFullPage = React.useCallback(() => {
    // Navigate to full deal detail page
    window.location.href = `/deals/${dealId}`;
  }, [dealId]);

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

  // Prevent body scroll when panel is open
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!deal) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 z-50 h-full w-[620px] max-w-[90vw] bg-white border-l border-slate-200 animate-in slide-in-from-right duration-200 flex flex-col overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-slate-100"
            title="Collapse panel"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenFullPage}
              className="h-8 w-8 p-0 hover:bg-slate-100"
              title="Open full page"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-slate-100"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <DealDetailPageV2 data={deal} />
        </div>
      </div>
    </>
  );
};
