import React from 'react';
import { Account } from '@/accounts-demo-data';
import { AccountDetailPage } from '@/components/AccountDetailPage';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Maximize2, MoreHorizontal } from 'lucide-react';

interface AccountDetailSidePanelProps {
  account: Account;
  onClose: () => void;
}

export const AccountDetailSidePanel: React.FC<AccountDetailSidePanelProps> = ({
  account,
  onClose,
}) => {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleExpandToFullPage = () => {
    window.location.href = `/accounts/${account.id}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[620px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 overflow-hidden">
        {/* Panel header */}
        <div className="h-[50px] flex items-center justify-between px-3 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
              title="Collapse"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleExpandToFullPage}
              title="Open full page"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content — renders the detail page in panel mode */}
        <div className="flex-1 overflow-hidden">
          <AccountDetailPage account={account} hideTopBar={true} />
        </div>
      </div>
    </>
  );
};

export default AccountDetailSidePanel;
