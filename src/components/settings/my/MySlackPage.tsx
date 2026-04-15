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
import { Badge } from '@/components/ui/badge';
import { initialMyNotifications, initialGoogleCalendarSettings, type my_notification_settings } from '@/settings-mock-data';

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none"
      style={{ backgroundColor: enabled ? '#10b981' : '#e2e8f0' }}
    >
      <span
        className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        style={{ transform: enabled ? 'translateX(1rem)' : 'translateX(0)' }}
      />
    </button>
  );
}

const NOTIFICATIONS = [
  {
    key: 'pre_call_brief_enabled' as const,
    title: 'Pre-meeting Notification',
    description: 'Receive high level pre-meeting prep notes ahead of your calls — who the call is with, and reminders on deal progression so far.',
    requires_gcal: true,
  },
  {
    key: 'post_meeting_summary_enabled' as const,
    title: 'Post-meeting summary',
    description: 'A summary of each of your completed calls — key signals, action items, and next steps — sent to you via DM.',
  },
  {
    key: 'daily_briefing_enabled' as const,
    title: 'Daily briefing',
    description: "Morning summary of your day's meetings and the open deals associated with them. Sent each morning.",
    coming_soon: true,
    requires_gcal: true,
  },
  {
    key: 'daily_wrap_up_enabled' as const,
    title: 'Daily wrap-up',
    description: 'End-of-day summary of what happened — calls completed, key signals surfaced, and open next steps. Sent each evening.',
    coming_soon: true,
  },
];

export default function MySlackPage() {
  const [connected, setConnected] = React.useState(true);
  const [disconnect_open, setDisconnectOpen] = React.useState(false);
  const [disconnect_confirm, setDisconnectConfirm] = React.useState('');
  const [testing_connection, setTestingConnection] = React.useState(false);
  const [test_result, setTestResult] = React.useState<'ok' | null>(null);
  const [notifications, setNotifications] = React.useState<my_notification_settings>(initialMyNotifications);
  const gcal_connected = initialGoogleCalendarSettings.connected;

  const workspace = 'Flex';
  const connected_by = 'Alex Chen';

  const confirmDisconnect = () => {
    setConnected(false);
    setDisconnectOpen(false);
    setDisconnectConfirm('');
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

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Slack</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Connect your personal Slack account to receive direct message notifications.
      </p>

      {connected ? (
        <>
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                <img
                  src="/slack.png"
                  alt="Slack"
                  className="h-7 w-7 object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-lg font-semibold text-neutral-900">Slack</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-500">
                    {workspace} workspace · Connected by {connected_by}
                  </span>
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

          {/* Notification settings */}
          <div>
            <h2 className="text-sm font-semibold text-neutral-700 mb-1">Notifications</h2>
            <p className="text-xs text-neutral-400 mb-4">
              Personal DM workflows delivered via Slack. All notifications are opt-in.
            </p>
            <div className="space-y-3">
              {NOTIFICATIONS.map((notif) => {
                const gcal_required = 'requires_gcal' in notif && notif.requires_gcal;
                const disabled = notif.coming_soon;
                return (
                  <div key={notif.key} className="rounded-lg border border-neutral-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${disabled ? 'text-neutral-400' : 'text-neutral-900'}`}>{notif.title}</p>
                          {notif.coming_soon && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">Coming Soon</Badge>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{notif.description}</p>
                      </div>
                      <div className="flex-shrink-0 pt-0.5">
                        {disabled ? (
                          <Toggle enabled={false} onToggle={() => {}} />
                        ) : (
                          <Toggle
                            enabled={notifications[notif.key]}
                            onToggle={() => setNotifications((prev) => ({ ...prev, [notif.key]: !prev[notif.key] }))}
                          />
                        )}
                      </div>
                    </div>
                    {gcal_required && (
                      <div className="mt-3 -mx-4 -mb-4 px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 rounded-b-lg flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${gcal_connected ? 'bg-green-500' : 'bg-neutral-300'}`} />
                        <span className="text-xs text-neutral-500">
                          {gcal_connected ? 'Connected to Google Calendar' : (
                            <>Google Calendar not connected — <a href="/settings/my/integrations/google-calendar" className="underline underline-offset-2 hover:text-neutral-700">connect it here</a></>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-start justify-between p-5 rounded-lg border-2 border-neutral-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
              <img
                src="/slack.png"
                alt="Slack"
                className="h-6 w-6 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <p className="text-base font-bold text-neutral-900">Slack</p>
              <p className="text-sm text-neutral-400">slack.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setConnected(true)} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        </div>
      )}

      {/* Disconnect dialog */}
      <Dialog open={disconnect_open} onOpenChange={handleDisconnectClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">Disconnect Slack</DialogTitle>
            <DialogDescription className="pt-1 text-neutral-500 space-y-2">
              <span className="block">This will disconnect your personal Slack account from ACRONYM.</span>
              <span className="block">You will stop receiving DM notifications. You can reconnect at any time.</span>
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
              Disconnect Slack
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
