import React from 'react';

interface StagePillProps {
  stage: string;
  className?: string;
}

const stageStyles: Record<string, { bg: string; text: string }> = {
  'First meeting scheduled': {
    bg: 'bg-[#E0F2FE]',
    text: 'text-blue-900',
  },
  'Discovery & Qualification': {
    bg: 'bg-[#F0EDFF]',
    text: 'text-purple-900',
  },
  'Demo': {
    bg: 'bg-[#FEF3C7]',
    text: 'text-amber-900',
  },
  'Proposal / Negotiation': {
    bg: 'bg-[#FECACA]',
    text: 'text-red-900',
  },
  'Closed Won': {
    bg: 'bg-[#DCFCE7]',
    text: 'text-green-900',
  },
  'Closed Lost': {
    bg: 'bg-[#F3F4F6]',
    text: 'text-gray-900',
  },
};

export const StagePill: React.FC<StagePillProps> = ({ stage, className = '' }) => {
  const styles = stageStyles[stage] || { bg: 'bg-gray-100', text: 'text-gray-900' };

  return (
    <div
      className={`inline-flex items-center justify-center h-6 px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} whitespace-nowrap ${className}`}
    >
      {stage}
    </div>
  );
};
