import React from 'react';

interface CategoryPillProps {
  category: string;
  className?: string;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  'Fit and Capability': {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
  },
  'Authority': {
    bg: 'bg-slate-100',
    text: 'text-slate-900',
  },
  'Alternatives': {
    bg: 'bg-green-100',
    text: 'text-green-900',
  },
  'Risk and Trust': {
    bg: 'bg-amber-100',
    text: 'text-amber-900',
  },
  'Budget and Value': {
    bg: 'bg-purple-100',
    text: 'text-purple-900',
  },
  'Company': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
  },
  'Product & Pricing': {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
  },
  'Integration & Technical': {
    bg: 'bg-green-50',
    text: 'text-green-900',
  },
  'Implementation': {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
  },
  'Compliance & Operations': {
    bg: 'bg-rose-50',
    text: 'text-rose-900',
  },
  'Current State': {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
  },
  'Baseline Assessment': {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
  },
  'Founder-Led to First Sales Team Transition': {
    bg: 'bg-green-50',
    text: 'text-green-900',
  },
  'Sales Leader-Driven Scaling': {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
  },
};

export const CategoryPill: React.FC<CategoryPillProps> = ({ category, className = '' }) => {
  const styles = categoryStyles[category] || { bg: 'bg-gray-100', text: 'text-gray-900' };

  return (
    <div
      className={`inline-flex items-center justify-center h-6 px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} whitespace-nowrap ${className}`}
    >
      {category}
    </div>
  );
};
