import React from 'react';
import { User } from 'lucide-react';

interface ContactPillProps {
  name: string;
  className?: string;
}

export const ContactPill: React.FC<ContactPillProps> = ({ name, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 h-6 px-2.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
    >
      <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <span className="truncate">{name}</span>
    </div>
  );
};
