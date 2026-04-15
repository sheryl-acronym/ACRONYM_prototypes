import React from 'react';
import { Link } from 'react-router-dom';
import { initialMyNotifications, type my_notification_settings } from '@/settings-mock-data';

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

export default function MyNotificationsPage() {
  const [settings, setSettings] = React.useState<my_notification_settings>(
    initialMyNotifications
  );

  const notifications = [
    {
      key: 'pre_call_brief_enabled' as const,
      title: 'Pre-call notification',
      description:
        'A terse heads-up before each meeting — who the call is with, what deal it relates to. Includes a "Help me prep" prompt to generate a deeper brief on demand.',
    },
    {
      key: 'daily_briefing_enabled' as const,
      title: 'Daily briefing',
      description:
        "Morning summary of your day's meetings and the open deals associated with them. Sent each morning at your configured time.",
    },
    {
      key: 'daily_wrap_up_enabled' as const,
      title: 'Daily wrap-up',
      description:
        'End-of-day summary of what happened — calls completed, key signals surfaced, and open next steps. Sent each evening.',
    },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Notifications</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Personal DM workflows delivered to you via Slack. All notifications are opt-in — none are on by default.
        Reps can only configure direct message workflows; channel workflows are managed under Org Settings.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
        {notifications.map((notif) => (
          <div key={notif.key} className="flex items-start justify-between gap-6 p-5">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900">{notif.title}</p>
              <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{notif.description}</p>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              <Toggle
                enabled={settings[notif.key]}
                onToggle={() =>
                  setSettings((prev) => ({ ...prev, [notif.key]: !prev[notif.key] }))
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-neutral-50 border border-neutral-200 p-4">
        <p className="text-xs text-neutral-500">
          Notifications are delivered via your connected Slack account. Make sure Slack is connected under{' '}
          <Link to="/settings/my/integrations/slack" className="font-medium text-neutral-700 underline underline-offset-2">
            My Settings → Integrations → Slack
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
