import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
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

  const listLabel =
    settings.ignore_mode === 'blocklist' ? 'Ignored Meetings' : 'Tracked Meetings';
  const listDescription =
    settings.ignore_mode === 'blocklist'
      ? 'Meetings matching these patterns will not be recognized in ACRONYM.'
      : 'Only meetings matching these patterns will be recognized in ACRONYM.';

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-white flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <rect width="24" height="24" rx="3" fill="#4285F4" />
            <path d="M7 8h10v8H7z" fill="white" />
            <path d="M9 10h6M9 12h6M9 14h4" stroke="#4285F4" strokeWidth="1" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold">Google Calendar</h1>
      </div>
      <p className="text-sm text-neutral-500 mt-1 mb-8">
        Connect Google Calendar so ACRONYM can identify your upcoming meetings with external attendees and trigger pre-call workflows.
      </p>

      {/* Connection card */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 mb-6">
        <h2 className="text-sm font-semibold text-neutral-700 mb-4">Connection</h2>
        {settings.connected ? (
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-neutral-900">Connected</span>
              </div>
              <p className="text-sm text-neutral-600 mt-1">{settings.connected_email}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettings((prev) => ({ ...prev, connected: false }))}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Not connected</p>
              <p className="text-xs text-neutral-400 mt-1">
                Connect your Google Calendar to enable pre-call workflows.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() =>
                setSettings((prev) => ({
                  ...prev,
                  connected: true,
                  connected_email: 'alex@flex.com',
                }))
              }
            >
              Connect Calendar
            </Button>
          </div>
        )}
      </div>

      {settings.connected && (
        <>
          <Separator className="my-6" />

          {/* Filter mode */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-neutral-700 mb-1">Meeting Filter Mode</h2>
            <p className="text-xs text-neutral-400 mb-4">
              Control whether the list below excludes or includes meetings.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  {
                    mode: 'blocklist' as const,
                    label: 'Blocklist',
                    description: 'Ignore meetings matching entries below. All others are tracked.',
                  },
                  {
                    mode: 'allowlist' as const,
                    label: 'Allowlist',
                    description: 'Only track meetings matching entries below. All others are ignored.',
                  },
                ] as const
              ).map(({ mode, label, description }) => (
                <div
                  key={mode}
                  onClick={() => setSettings((prev) => ({ ...prev, ignore_mode: mode }))}
                  className={cn(
                    'p-4 rounded-lg border-2 cursor-pointer transition-all',
                    settings.ignore_mode === mode
                      ? 'border-neutral-900 bg-white'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={cn(
                        'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                        settings.ignore_mode === mode
                          ? 'border-neutral-900'
                          : 'border-neutral-300'
                      )}
                    >
                      {settings.ignore_mode === mode && (
                        <div className="h-2 w-2 rounded-full bg-neutral-900" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-neutral-900">{label}</p>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-6">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ignore list */}
          <IgnoreListTable
            entries={settings.ignore_list}
            on_add={addIgnoreEntry}
            on_delete={deleteIgnoreEntry}
            label={listLabel}
            description={listDescription}
          />
        </>
      )}
    </div>
  );
}
