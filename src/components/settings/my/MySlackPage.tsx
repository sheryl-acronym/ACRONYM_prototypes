import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

export default function MySlackPage() {
  const [connected, setConnected] = React.useState(true);
  const email = 'alex@flex.com';
  const date = 'Jan 20, 2026';

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
          <img src="/slack.png" alt="Slack" className="h-6 w-6 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <h1 className="text-xl font-semibold">Slack</h1>
      </div>
      <p className="text-sm text-neutral-500 mt-1 mb-8">
        Connect your personal Slack account to receive direct message notifications. Required for personal notification workflows.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        {connected ? (
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-neutral-900">Connected</span>
              </div>
              <p className="text-sm text-neutral-600 mt-1">{email}</p>
              <p className="text-xs text-neutral-400 mt-1">Connected {date}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setConnected(false)} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Not connected</p>
              <p className="text-xs text-neutral-400 mt-1">Connect Slack to receive personal DM notifications.</p>
            </div>
            <Button size="sm" onClick={() => setConnected(true)}>
              Connect Slack
            </Button>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4">
        <p className="text-xs text-neutral-500">
          <span className="font-medium text-neutral-700">Note:</span> This is your personal Slack connection for direct messages.
          Org-level Slack (for channel workflows) is configured separately under{' '}
          <span className="font-medium text-neutral-700">Org Settings → Integrations → Slack</span>.
        </p>
      </div>
    </div>
  );
}
