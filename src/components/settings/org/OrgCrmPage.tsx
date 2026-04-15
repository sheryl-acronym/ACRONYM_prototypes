import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, MoreVertical, Loader2, RefreshCw } from 'lucide-react';
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
import {
  initialHubSpotSettings,
  HUBSPOT_PIPELINE_OPTIONS,
  type hubspot_settings,
} from '@/settings-mock-data';

type ConnectedCrm = 'hubspot' | 'salesforce' | null;

export default function OrgCrmPage() {
  const [connected_crm, setConnectedCrm] = React.useState<ConnectedCrm>('hubspot');
  const [hubspot, setHubspot] = React.useState<hubspot_settings>(initialHubSpotSettings);
  const [change_crm_open, setChangeCrmOpen] = React.useState(false);
  const [disconnect_open, setDisconnectOpen] = React.useState(false);
  const [disconnect_confirm, setDisconnectConfirm] = React.useState('');
  const [testing_connection, setTestingConnection] = React.useState(false);
  const [test_result, setTestResult] = React.useState<'ok' | 'error' | null>(null);
  const [syncing, setSyncing] = React.useState(false);
  const [last_synced, setLastSynced] = React.useState('2 hours ago');
  const [remove_pipeline_id, setRemovePipelineId] = React.useState<string | null>(null);

  const disconnectHubspot = () => {
    setConnectedCrm(null);
    setHubspot((prev) => ({ ...prev, connected: false }));
  };

  const confirmChangeCrm = () => {
    setChangeCrmOpen(false);
    setDisconnectConfirm('');
    disconnectHubspot();
  };

  const confirmDisconnect = () => {
    setDisconnectOpen(false);
    setDisconnectConfirm('');
    disconnectHubspot();
  };

  const handleChangeCrmClose = (open: boolean) => {
    if (!open) setDisconnectConfirm('');
    setChangeCrmOpen(open);
  };

  const handleDisconnectClose = (open: boolean) => {
    if (!open) setDisconnectConfirm('');
    setDisconnectOpen(open);
  };

  const testConnection = () => {
    setTestingConnection(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult('ok');
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };

  const connectHubspot = () => {
    setConnectedCrm('hubspot');
    setHubspot({
      connected: true,
      connected_by_name: 'Alex Chen',
      connected_date: 'Apr 14, 2026',
      synced_pipeline_ids: ['pl-001'],
    });
  };

  const forceSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSynced('just now');
    }, 1800);
  };

  const togglePipeline = (id: string) => {
    setHubspot((prev) => {
      const already = prev.synced_pipeline_ids.includes(id);
      if (already && prev.synced_pipeline_ids.length === 1) return prev;
      return {
        ...prev,
        synced_pipeline_ids: already
          ? prev.synced_pipeline_ids.filter((p) => p !== id)
          : [...prev.synced_pipeline_ids, id],
      };
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-xl font-semibold">CRM</h1>
      </div>
      <p className="text-sm text-neutral-500 mb-8">
        Connect your CRM to sync deals, companies, and contacts with ACRONYM.
      </p>

      {/* CRM connection state */}
      {connected_crm ? (
        <div className="mb-8">
          {/* Connected header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                <img
                  src="/hubspot.png"
                  alt="HubSpot"
                  className="h-7 w-7 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-lg font-semibold text-neutral-900">HubSpot</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-500">Connected by {hubspot.connected_by_name}</span>
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
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <CrmCard
            logo={
              <img
                src="/hubspot.png"
                alt="HubSpot"
                className="h-7 w-7 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            }
            name="HubSpot"
            domain="hubspot.com"
            is_connected={false}
            blocked_by={null}
            on_connect={connectHubspot}
            on_disconnect={disconnectHubspot}
          />
          <CrmCard
            logo={<span className="text-sm font-bold text-neutral-400">SF</span>}
            name="Salesforce"
            domain="salesforce.com"
            coming_soon
            is_connected={false}
            blocked_by={null}
            on_connect={() => {}}
            on_disconnect={() => {}}
          />
        </div>
      )}

      {/* Connected CRM config */}
      {connected_crm === 'hubspot' && (
        <>
          <Separator className="my-8" />

          {/* Pipeline sync */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-neutral-700 mb-1">Deal Pipelines</h2>
            <p className="text-xs text-neutral-400 mb-4">
              Choose which HubSpot deal pipelines to sync to ACRONYM.
            </p>
            <div className="rounded-lg border border-neutral-200 overflow-hidden">
              {/* Synced pipeline rows */}
              {HUBSPOT_PIPELINE_OPTIONS.filter(p => hubspot.synced_pipeline_ids.includes(p.id)).map((pipeline, idx, arr) => (
                <div
                  key={pipeline.id}
                  className={`flex items-center justify-between px-4 py-3 ${idx < arr.length - 1 ? 'border-b border-neutral-100' : ''}`}
                >
                  <span className="text-sm text-neutral-800">{pipeline.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={hubspot.synced_pipeline_ids.length === 1}
                        onClick={() => setRemovePipelineId(pipeline.id)}
                        className="text-red-600 focus:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-200 bg-neutral-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      disabled={hubspot.synced_pipeline_ids.length === HUBSPOT_PIPELINE_OPTIONS.length}
                      className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                      Add pipeline
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {HUBSPOT_PIPELINE_OPTIONS.filter(p => !hubspot.synced_pipeline_ids.includes(p.id)).map(p => (
                      <DropdownMenuItem key={p.id} onClick={() => togglePipeline(p.id)}>
                        {p.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={forceSync}
                  disabled={syncing}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`h-3 w-3 ${syncing ? 'animate-spin' : ''}`} />
                  {syncing ? `Syncing…` : `Sync · ${last_synced}`}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Remove pipeline dialog */}
      {(() => {
        const pipeline = HUBSPOT_PIPELINE_OPTIONS.find(p => p.id === remove_pipeline_id);
        return (
          <Dialog open={!!remove_pipeline_id} onOpenChange={(open) => { if (!open) setRemovePipelineId(null); }}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-neutral-900">Remove {pipeline?.name}</DialogTitle>
                <DialogDescription className="pt-1 text-neutral-500 space-y-2">
                  <span className="block">This will stop syncing deals from <span className="font-medium text-neutral-700">{pipeline?.name}</span> to ACRONYM.</span>
                  <span className="block">Existing data already in ACRONYM will not be deleted. You can re-add this pipeline at any time.</span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 sm:gap-2">
                <Button variant="outline" size="sm" onClick={() => setRemovePipelineId(null)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => { togglePipeline(remove_pipeline_id!); setRemovePipelineId(null); }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Remove pipeline
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      })()}

      {/* Disconnect dialog */}
      <Dialog open={disconnect_open} onOpenChange={handleDisconnectClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">Disconnect HubSpot</DialogTitle>
            <DialogDescription className="pt-1 text-neutral-500 space-y-2">
              <span className="block">This will immediately disconnect HubSpot from ACRONYM.</span>
              <span className="block">All pipeline syncs and automations will stop. You can reconnect at any time.</span>
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
              Disconnect HubSpot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={change_crm_open} onOpenChange={handleChangeCrmClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">Change CRM</DialogTitle>
            <DialogDescription className="pt-1 text-neutral-500 space-y-2">
              <span className="block">ACRONYM only supports one connected CRM at a time.</span>
              <span className="block">To connect a new one, HubSpot must first be disconnected. All pipeline syncs and automations will stop immediately.</span>
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
            <Button variant="outline" size="sm" onClick={() => handleChangeCrmClose(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={disconnect_confirm !== 'DISCONNECT'}
              onClick={confirmChangeCrm}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
            >
              Disconnect HubSpot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── CrmCard ──────────────────────────────────────────────────────────────────

interface CrmCardProps {
  logo: React.ReactNode;
  name: string;
  domain: string;
  coming_soon?: boolean;
  is_connected: boolean;
  connected_email?: string;
  connected_date?: string;
  blocked_by: string | null;
  on_connect: () => void;
  on_disconnect: () => void;
}

function CrmCard({
  logo,
  name,
  domain,
  coming_soon,
  is_connected,
  connected_email,
  connected_date,
  blocked_by,
  on_connect,
  on_disconnect,
}: CrmCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border-2 p-5 flex flex-col gap-4 transition-all',
        is_connected
          ? 'border-neutral-900 bg-white'
          : 'border-neutral-200 bg-white'
      )}
    >
      {/* Logo + name + domain */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
            {logo}
          </div>
          <div>
            <p className="text-base font-bold text-neutral-900">{name}</p>
            <p className="text-sm text-neutral-400">{domain}</p>
          </div>
        </div>
        {coming_soon && (
          <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
        )}
      </div>

      {/* Connected details */}
      {is_connected && connected_email && (
        <div>
          <p className="text-xs text-neutral-500">{connected_email}</p>
          {connected_date && (
            <p className="text-xs text-neutral-400 mt-0.5">Since {connected_date}</p>
          )}
        </div>
      )}

      {/* Action */}
      <div className="mt-auto">
        {is_connected ? (
          <Button
            variant="outline"
            size="sm"
            onClick={on_disconnect}
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Disconnect
          </Button>
        ) : coming_soon ? (
          <Button variant="outline" size="sm" disabled className="w-full opacity-50 cursor-not-allowed gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        ) : blocked_by ? (
          <Button variant="outline" size="sm" disabled className="w-full opacity-50 cursor-not-allowed text-xs">
            Disconnect {blocked_by === 'hubspot' ? 'HubSpot' : 'Salesforce'} first
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
