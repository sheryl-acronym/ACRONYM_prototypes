import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MoreVertical, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import IgnoreListTable from '@/components/settings/IgnoreListTable';
import {
  initialCallRecorderSettings,
  CALL_RECORDER_OPTIONS,
  type call_recorder_provider,
  type ignore_list_entry,
} from '@/settings-mock-data';

const PROVIDER_LABELS: Record<call_recorder_provider, string> = {
  fathom: 'Fathom',
  fireflies: 'Fireflies',
  gong: 'Gong',
  grain: 'Grain',
  granola: 'Granola',
};

const PROVIDER_URLS: Record<call_recorder_provider, string> = {
  fathom: 'fathom.video',
  fireflies: 'fireflies.ai',
  gong: 'gong.io',
  grain: 'grain.com',
  granola: 'granola.ai',
};

const PROVIDER_INITIALS: Record<call_recorder_provider, string> = {
  fathom: 'F',
  fireflies: 'FF',
  gong: 'G',
  grain: 'Gr',
  granola: 'Gr',
};

const PROVIDER_LOGOS: Partial<Record<call_recorder_provider, string>> = {
  fathom: '/fathom.png',
  fireflies: '/fireflies.png',
  gong: '/gong.png',
  grain: '/grain.png',
  granola: '/granola.png',
};

export default function OrgCallRecorderPage() {
  const [connected_recorder, setConnectedRecorder] = React.useState<call_recorder_provider | null>('fathom');
  const [disconnect_open, setDisconnectOpen] = React.useState(false);
  const [disconnect_confirm, setDisconnectConfirm] = React.useState('');
  const [testing_connection, setTestingConnection] = React.useState(false);
  const [test_result, setTestResult] = React.useState<'ok' | null>(null);

  const testConnection = () => {
    setTestingConnection(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult('ok');
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };
  // Ignore list is independent of which recorder is connected — persists across switches
  const [ignore_list, setIgnoreList] = React.useState<ignore_list_entry[]>(initialCallRecorderSettings.ignore_list);

  const connectRecorder = (id: call_recorder_provider) => setConnectedRecorder(id);

  const confirmDisconnect = () => {
    setConnectedRecorder(null);
    setDisconnectOpen(false);
    setDisconnectConfirm('');
  };

  const handleDisconnectClose = (open: boolean) => {
    if (!open) setDisconnectConfirm('');
    setDisconnectOpen(open);
  };

  const addIgnoreEntry = (entry: Omit<ignore_list_entry, 'id'>) => {
    setIgnoreList((prev) => [...prev, { ...entry, id: `il-${Date.now()}` }]);
  };

  const deleteIgnoreEntry = (id: string) => {
    setIgnoreList((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Call Recorder</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Connect your organization's call recorder so ACRONYM can automatically receive your incoming call transcripts and backfill against existing call transcripts.
      </p>

      {/* Connected state */}
      {connected_recorder ? (
        <>
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-3">
              <ProviderIcon provider={connected_recorder} size="lg" />
              <div>
                <span className="text-lg font-semibold text-neutral-900">
                  {PROVIDER_LABELS[connected_recorder]}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-500">Connected by Alex Chen</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {test_result === 'ok' && (
                <span className="text-xs text-green-600 font-medium">Connection verified</span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={testConnection}
                disabled={testing_connection}
                className="gap-1.5"
              >
                {testing_connection && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Test Connection
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setDisconnectOpen(true)}
                    className="text-red-600 focus:text-red-600"
                  >
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

        </>
      ) : (
        /* Disconnected — recorder selection grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CALL_RECORDER_OPTIONS.map((option) => (
            <RecorderCard
              key={option.id}
              provider_id={option.id as call_recorder_provider}
              name={option.label}
              coming_soon={option.coming_soon}
              on_connect={() => connectRecorder(option.id as call_recorder_provider)}
            />
          ))}
        </div>
      )}

      {/* Ignore list — persists regardless of which recorder is connected */}
      <Separator className="my-8" />

      <IgnoreListTable
        entries={ignore_list}
        on_add={addIgnoreEntry}
        on_delete={deleteIgnoreEntry}
        label="Org Ignore List"
        description="Calls involving these email addresses or domains will never be processed by ACRONYM."
      />


      {/* Disconnect dialog */}
      <Dialog open={disconnect_open} onOpenChange={handleDisconnectClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">
              Disconnect {connected_recorder ? PROVIDER_LABELS[connected_recorder] : ''}
            </DialogTitle>
            <DialogDescription className="pt-1 text-neutral-500 space-y-2">
              <span className="block">This will stop ACRONYM from reading new recordings from {connected_recorder ? PROVIDER_LABELS[connected_recorder] : 'this recorder'}.</span>
              <span className="block">Calls already processed will not be affected. You can reconnect at any time.</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-1">
            <p className="text-xs text-neutral-500">
              Type <span className="font-mono font-semibold text-neutral-800">DISCONNECT</span> to confirm
            </p>
            <input
              value={disconnect_confirm}
              onChange={(e) => setDisconnectConfirm(e.target.value)}
              placeholder="DISCONNECT"
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm font-mono placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDisconnectClose(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={disconnect_confirm !== 'DISCONNECT'}
              onClick={confirmDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── ProviderIcon ─────────────────────────────────────────────────────────────

function ProviderIcon({ provider, size }: { provider: call_recorder_provider; size: 'md' | 'lg' }) {
  const logo = PROVIDER_LOGOS[provider];
  const dim = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  const img_dim = size === 'lg' ? 'h-7 w-7' : 'h-6 w-6';
  return (
    <div className={`${dim} rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0`}>
      {logo ? (
        <img
          src={logo}
          alt={provider}
          className={`${img_dim} object-contain`}
          onError={(e) => {
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              (e.target as HTMLImageElement).style.display = 'none';
              parent.textContent = PROVIDER_INITIALS[provider];
            }
          }}
        />
      ) : (
        <span className="text-sm font-bold text-neutral-600">{PROVIDER_INITIALS[provider]}</span>
      )}
    </div>
  );
}

// ─── RecorderCard ──────────────────────────────────────────────────────────────

interface RecorderCardProps {
  provider_id: call_recorder_provider;
  name: string;
  coming_soon?: boolean;
  on_connect: () => void;
}

function RecorderCard({ provider_id, name, coming_soon, on_connect }: RecorderCardProps) {
  return (
    <div className={cn(
      'flex flex-col gap-4 p-5 rounded-lg border-2 transition-all bg-white',
      coming_soon ? 'border-neutral-200 opacity-60' : 'border-neutral-200'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ProviderIcon provider={provider_id} size="md" />
          <div>
            <p className="text-base font-bold text-neutral-900">{name}</p>
            <p className="text-sm text-neutral-400 mt-0.5">{PROVIDER_URLS[provider_id]}</p>
          </div>
        </div>
        {coming_soon && (
          <Badge variant="secondary" className="font-normal text-xs flex-shrink-0 ml-2">Coming Soon</Badge>
        )}
      </div>
      <div className="mt-auto">
        {coming_soon ? (
          <Button variant="outline" size="sm" disabled className="w-full opacity-50 cursor-not-allowed gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={on_connect} className="w-full gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}
