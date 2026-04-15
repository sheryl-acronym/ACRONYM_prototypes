import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

export default function OrgDataHygienePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-semibold">Data Hygiene</h1>
        <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
      </div>
      <p className="text-sm text-neutral-500 mb-8">
        CRM integrity alerts that fire when a condition is met signalling a data problem requiring action.
        Requires both Slack and a CRM to be connected.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-700">Planned Alerts</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {[
            {
              name: 'Missing Deal Notification',
              description: 'Fires when a call is detected with no associated deal record. Sends a Slack alert with an option to auto-create the deal in your connected CRM.',
            },
            {
              name: 'Stage Mismatch Detection',
              description: 'Fires when ACRONYM detects deal stage in CRM is inconsistent with call content. TBD.',
            },
            {
              name: 'Stale Deal Alert',
              description: 'Fires when a deal has had no activity or call for a defined period. TBD.',
            },
          ].map((alert) => (
            <div key={alert.name} className="px-5 py-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-700">{alert.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{alert.description}</p>
              </div>
              <Badge variant="secondary" className="text-xs flex-shrink-0 font-normal">Soon</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-10 flex flex-col items-center text-center">
        <ShieldCheck className="h-8 w-8 text-neutral-300 mb-3" />
        <p className="text-sm font-medium text-neutral-500">Data hygiene alerts are not yet built</p>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm">
          This section is stubbed to preserve the architecture. It will not be exposed to customers until the alerts are ready.
        </p>
      </div>
    </div>
  );
}
