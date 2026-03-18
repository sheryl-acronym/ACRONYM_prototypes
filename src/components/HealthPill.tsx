import React from 'react';

export type AccountHealth = 'Healthy' | 'Monitor' | 'At Risk';

interface HealthPillProps {
  health: AccountHealth;
  className?: string;
}

const healthStyles: Record<AccountHealth, { bg: string; text: string }> = {
  Healthy: {
    bg: 'bg-[#D8F5E8]',
    text: 'text-green-900',
  },
  Monitor: {
    bg: 'bg-[#FFF4D6]',
    text: 'text-yellow-900',
  },
  'At Risk': {
    bg: 'bg-[#FFE0E0]',
    text: 'text-red-900',
  },
};

export const HealthPill: React.FC<HealthPillProps> = ({ health, className = '' }) => {
  const styles = healthStyles[health];

  return (
    <div
      className={`inline-flex items-center justify-center h-6 px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} whitespace-nowrap ${className}`}
    >
      {health}
    </div>
  );
};
