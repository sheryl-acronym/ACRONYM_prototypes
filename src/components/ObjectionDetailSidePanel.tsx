import React from 'react';
import { Objection } from '@/objections-demo-data';
import {
  ChevronsRight,
  Maximize2,
  MoreHorizontal,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ObjectionDetailPage from '@/components/ObjectionDetailPage';

interface ObjectionDetailSidePanelProps {
  objectionId: string;
  objection: Objection;
  onClose: () => void;
}

export const ObjectionDetailSidePanel: React.FC<ObjectionDetailSidePanelProps> = ({
  objectionId,
  objection,
  onClose,
}) => {
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

  const handleOpenFullPage = React.useCallback(() => {
    // Navigate to full objection detail page
    window.location.href = `/objections/${objectionId}`;
  }, [objectionId]);

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
        <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
              title="Collapse panel"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOpenFullPage}
              className="h-8 w-8"
              title="Open full page"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
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
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Share"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <ObjectionDetailPage objection={objection} hideTopBar={true} />
        </div>
      </div>
    </>
  );
};

export default ObjectionDetailSidePanel;
