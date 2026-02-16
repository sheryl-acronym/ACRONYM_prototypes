import React from 'react';
import { Momentum } from '@/types';

interface MomentumPillProps {
  momentum: Momentum;
  className?: string;
}

const momentumStyles = {
  Strong: {
    bg: 'bg-[#D8F5E8]',
    text: 'text-green-900',
  },
  Active: {
    bg: 'bg-[#DBEAFF]',
    text: 'text-blue-900',
  },
  Stalled: {
    bg: 'bg-[#FFF4D6]',
    text: 'text-yellow-900',
  },
  'At risk': {
    bg: 'bg-[#FFE0E0]',
    text: 'text-red-900',
  },
  Closed: {
    bg: 'bg-gray-100',
    text: 'text-gray-900',
  },
};

export const MomentumPill: React.FC<MomentumPillProps> = ({ momentum, className = '' }) => {
  const styles = momentumStyles[momentum];

  return (
    <div
      className={`inline-flex items-center justify-center h-6 px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} whitespace-nowrap ${className}`}
    >
      {momentum}
    </div>
  );
};
