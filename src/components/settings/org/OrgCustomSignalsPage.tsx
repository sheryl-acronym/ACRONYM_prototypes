import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Lock, MessageSquarePlus } from 'lucide-react';

interface custom_signal {
  id: string;
  name: string;
  slug: string;
  description: string;
  tag: string;
  enabled: boolean;
}

const MOCK_SIGNALS: custom_signal[] = [
  {
    id: 'cs-001',
    name: 'Value Comprehension Gap',
    slug: 'value-comprehension-gap',
    description:
      'Captures verbatim moments where a buyer reveals a gap in their understanding of ACRONYM — at the platform or company level. A gap requires evidence of a PRIOR INCORRECT BELIEF, expressed SURPRISE at a capability, or a "so what" moment where the buyer understands value for the first time.',
    tag: 'Buyer',
    enabled: true,
  },
  {
    id: 'cs-002',
    name: 'Competitive Mention',
    slug: 'competitive-mention',
    description:
      'Detects when a competing product or vendor is named or referenced by any participant. Captures the context of the mention — whether it is a direct comparison, a displacement scenario, or an incumbent relationship.',
    tag: 'Buyer',
    enabled: true,
  },
  {
    id: 'cs-003',
    name: 'Pricing Sensitivity Signal',
    slug: 'pricing-sensitivity',
    description:
      'Identifies moments where the buyer explicitly pushes back on price, requests a discount, compares cost to alternatives, or signals budget constraint. Does not fire on routine pricing questions.',
    tag: 'Buyer',
    enabled: false,
  },
];

export default function OrgCustomSignalsPage() {
  const [signals, setSignals] = React.useState<custom_signal[] | null>(null);


  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-semibold">Custom Signals</h1>
        <Badge variant="outline" className="text-neutral-400 border-neutral-200 font-normal text-xs gap-1">
          <Lock className="h-3 w-3" />
          Managed by ACRONYM
        </Badge>
      </div>
      <p className="text-sm text-neutral-500 mb-8">
        Custom Signals are defined to extract intelligence from your knowledge sources like call transcripts and emails.
      </p>

      {signals ? (
        <div className="space-y-3">
          {signals.map((signal) => (
            <div key={signal.id} className="rounded-lg border border-neutral-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4 mb-1">
                <p className="text-base font-bold text-neutral-900">{signal.name}</p>
                <button onClick={() => setSignals(null)} className="p-0.5 rounded text-neutral-300 hover:text-neutral-400 transition-colors flex-shrink-0">
                  <Lock className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs font-mono text-neutral-400 mb-4">{signal.slug}</p>
              <p className="text-sm text-neutral-500 mb-4 leading-relaxed line-clamp-3">
                {signal.description}
              </p>
              <Badge variant="outline" className="rounded-full text-xs font-normal text-neutral-600 border-neutral-300">
                {signal.tag}
              </Badge>
            </div>
          ))}
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-6 flex flex-col items-center text-center">
            <p className="text-sm text-neutral-400">Contact your ACRONYM administrator to add a new custom signal.</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setSignals(MOCK_SIGNALS)}
          className="w-full rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-10 flex flex-col items-center text-center hover:bg-neutral-100 transition-colors"
        >
          <MessageSquarePlus className="h-7 w-7 text-neutral-300 mb-3" />
          <p className="text-sm font-medium text-neutral-500">No custom signals configured yet</p>
          <p className="text-xs text-neutral-400 mt-1">
            Contact your ACRONYM administrator to set up custom signals for your org.
          </p>
        </button>
      )}
    </div>
  );
}
