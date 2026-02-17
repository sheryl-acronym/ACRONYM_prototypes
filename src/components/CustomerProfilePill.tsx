import React from 'react';
import { BookOpen } from 'lucide-react';

interface CustomerProfilePillProps {
  profile: string;
  className?: string;
}

export const CustomerProfilePill: React.FC<CustomerProfilePillProps> = ({ profile, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 h-6 px-2.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap w-fit ${className}`}
    >
      <BookOpen className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <span className="truncate">{profile}</span>
    </div>
  );
};
