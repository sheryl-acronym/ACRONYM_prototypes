import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';

const CALL_TYPE_RULES = [
  { call_type: 'New Business Sales Call', processed: true, note: 'Full extraction — qualification, next steps, close confidence' },
  { call_type: 'Customer Success Call', processed: true, note: 'Full extraction' },
  { call_type: 'Internal Meeting', processed: false, note: 'Skipped — no external attendees' },
  { call_type: 'Recruiting / HR Call', processed: false, note: 'Skipped — not a revenue call' },
  { call_type: 'Demo / Webinar (multi-attendee)', processed: false, note: 'Skipped by default — contact ACRONYM to enable' },
];

const ROLE_MAPPINGS = [
  { sub_role: 'Account Executive', call_types: 'New Business Sales Call, Expansion Call' },
  { sub_role: 'Customer Success Manager', call_types: 'Customer Success Call, Renewal Call' },
  { sub_role: 'Solutions Engineer', call_types: 'New Business Sales Call, Demo Call' },
];

export default function OrgCallClassificationPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-semibold">Call Classification</h1>
        <Badge variant="outline" className="text-neutral-400 border-neutral-200 font-normal text-xs gap-1">
          <Lock className="h-3 w-3" />
          Managed by ACRONYM
        </Badge>
      </div>
      <p className="text-sm text-neutral-500 mb-8">
        Controls which call types ACRONYM processes. These rules are managed by ACRONYM. Contact your ACRONYM administrator if you want a skipped call type included.
      </p>

      {/* Call processing rules */}
      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-700">Call Processing Rules</h2>
          <p className="text-xs text-neutral-400 mt-0.5">Which call types ACRONYM processes and which are skipped by default.</p>
        </div>
        <div className="divide-y divide-neutral-100">
          {CALL_TYPE_RULES.map((rule) => (
            <div key={rule.call_type} className="flex items-start gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800">{rule.call_type}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{rule.note}</p>
              </div>
              <Badge
                variant={rule.processed ? 'default' : 'secondary'}
                className={`text-xs flex-shrink-0 ${rule.processed ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}`}
              >
                {rule.processed ? 'Processed' : 'Skipped'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Team to call type mapping */}
      <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-700">Team-to-Call-Type Mapping</h2>
          <p className="text-xs text-neutral-400 mt-0.5">Which sub-roles map to which call types based on ACRONYM configuration.</p>
        </div>
        <div className="divide-y divide-neutral-100">
          {ROLE_MAPPINGS.map((mapping) => (
            <div key={mapping.sub_role} className="flex items-start gap-4 px-5 py-3.5">
              <p className="text-sm font-medium text-neutral-800 w-52 flex-shrink-0">{mapping.sub_role}</p>
              <p className="text-sm text-neutral-500">{mapping.call_types}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
