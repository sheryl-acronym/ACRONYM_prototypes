import React from 'react';

export type Effectiveness = 'Stalls' | 'Loses Deal' | 'Blocks Deal' | 'Delays Signature';

interface EffectivenessPillProps {
  effectiveness: Effectiveness;
  className?: string;
}

const effectivenessStyles = {
  Stalls: {
    bg: 'bg-[#FFF4D6]',
    text: 'text-yellow-900',
  },
  'Loses Deal': {
    bg: 'bg-[#FFE0E0]',
    text: 'text-red-900',
  },
  'Blocks Deal': {
    bg: 'bg-[#FFE0E0]',
    text: 'text-red-900',
  },
  'Delays Signature': {
    bg: 'bg-[#DBEAFF]',
    text: 'text-blue-900',
  },
};

export const EffectivenessPill: React.FC<EffectivenessPillProps> = ({
  effectiveness,
  className = '',
}) => {
  const styles = effectivenessStyles[effectiveness];

  return (
    <div
      className={`w-fit inline-flex items-center justify-center px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} ${className}`}
    >
      {effectiveness}
    </div>
  );
};
