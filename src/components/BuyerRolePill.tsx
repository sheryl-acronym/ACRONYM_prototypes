import React from 'react';

type BuyerRole = 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker';

interface BuyerRolePillProps {
  role: string | BuyerRole;
  className?: string;
}

const buyerRoleStyles: Record<BuyerRole, { bg: string; text: string }> = {
  Champion: {
    bg: 'bg-[#D8F5E8]',
    text: 'text-green-900',
  },
  'Economic Buyer': {
    bg: 'bg-[#FFF4D6]',
    text: 'text-yellow-900',
  },
  Influencer: {
    bg: 'bg-[#DBEAFF]',
    text: 'text-blue-900',
  },
  Blocker: {
    bg: 'bg-[#FFE0E0]',
    text: 'text-red-900',
  },
};

// Default style for unknown roles
const defaultStyle = {
  bg: 'bg-gray-100',
  text: 'text-gray-900',
};

export const BuyerRolePill: React.FC<BuyerRolePillProps> = ({ role, className = '' }) => {
  const styles = buyerRoleStyles[role as BuyerRole] || defaultStyle;

  return (
    <div
      className={`inline-flex items-center justify-center h-6 px-3 py-1 rounded-full font-medium text-xs ${styles.bg} ${styles.text} whitespace-nowrap ${className}`}
    >
      {role}
    </div>
  );
};
