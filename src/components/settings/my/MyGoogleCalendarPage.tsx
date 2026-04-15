import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreVertical, Plus, Loader2 } from 'lucide-react';
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
  initialGoogleCalendarSettings,
  type google_calendar_settings,
  type ignore_list_entry,
} from '@/settings-mock-data';

export default function MyGoogleCalendarPage() {
  const [settings, setSettings] = React.useState<google_calendar_settings>(
    initialGoogleCalendarSettings
  );
  const [disconnect_open, setDisconnectOpen] = React.useState(false);
  const [disconnect_confirm, setDisconnectConfirm] = React.useState('');
  const [testing_connection, setTestingConnection] = React.useState(false);
  const [test_result, setTestResult] = React.useState<'ok' | null>(null);

  const handleDisconnectClose = (open: boolean) => {
    if (!open) setDisconnectConfirm('');
    setDisconnectOpen(open);
  };

  const confirmDisconnect = () => {
    setSettings((prev) => ({ ...prev, connected: false }));
    setDisconnectOpen(false);
    setDisconnectConfirm('');
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

  const addIgnoreEntry = (entry: Omit<ignore_list_entry, 'id'>) => {
    setSettings((prev) => ({
      ...prev,
      ignore_list: [...prev.ignore_list, { ...entry, id: `gcal-il-${Date.now()}` }],
    }));
  };

  const deleteIgnoreEntry = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      ignore_list: prev.ignore_list.filter((e) => e.id !== id),
    }));
  };

  const updateIgnoreEntry = (id: string, skip_when: ignore_list_entry['skip_when']) => {
    setSettings((prev) => ({
      ...prev,
      ignore_list: prev.ignore_list.map((e) => e.id === id ? { ...e, skip_when } : e),
    }));
  };


  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Google Calendar</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Enable ACRONYM to have context of your upcoming meetings to support pre-meeting workflows.
      </p>

      {settings.connected ? (
        <>
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                <img
                  src="/googlecalendar.webp"
                  alt="Google Calendar"
                  className="h-7 w-7 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-lg font-semibold text-neutral-900">Google Calendar</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-500">{settings.connected_email}</span>
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

          <Separator className="mb-8" />

          <IgnoreListTable
            entries={settings.ignore_list}
            on_add={addIgnoreEntry}
            on_delete={deleteIgnoreEntry}
            on_update={updateIgnoreEntry}
            label="Ignored Meetings"
            description="Meetings matching these patterns will not be recognized in ACRONYM."
          />
        </>
      ) : (
        <div className="flex items-start justify-between p-5 rounded-lg border-2 border-neutral-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
              <img
                src="/googlecalendar.webp"
                alt="Google Calendar"
                className="h-6 w-6 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <p className="text-base font-bold text-neutral-900">Google Calendar</p>
              <p className="text-sm text-neutral-400">calendar.google.com</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSettings((prev) => ({ ...prev, connected: true, connected_email: 'alex@flex.com' }))}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        </div>
      )}

      {/* Disconnect dialog */}
      <Dialog open={disconnect_open} onOpenChange={handleDisconnectClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">Disconnect Google Calendar</DialogTitle>
            <DialogDescription className="pt-1 text-neutral-500 space-y-2">
              <span className="block">This will disconnect your Google Calendar from ACRONYM.</span>
              <span className="block">Pre-call workflows will stop triggering. You can reconnect at any time.</span>
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
