import React from 'react';

type Momentum = 'Strong' | 'Stalled' | 'At risk' | 'Closed' | 'Active';

interface DealPillProps {
  deal: string;
  momentum?: Momentum | null;
  className?: string;
}

const momentumColorMap: Record<Momentum, string> = {
  Strong: 'bg-emerald-400',
  Stalled: 'bg-yellow-400',
  'At risk': 'bg-rose-400',
  Closed: 'bg-slate-400',
  Active: 'bg-blue-400',
};

export const DealPill: React.FC<DealPillProps> = ({ deal, momentum, className = '' }) => {
  const dotColor = momentum ? momentumColorMap[momentum] : 'bg-gray-400';

  return (
    <div
      className={`inline-flex items-center gap-2 h-6 px-2.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap w-fit ${className}`}
    >
      <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
      <span className="truncate">{deal}</span>
    </div>
  );
};
