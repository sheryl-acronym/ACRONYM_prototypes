import React from 'react';
import { Calendar } from 'lucide-react';

interface DatePillProps {
  date: string;
  className?: string;
}

export const DatePill: React.FC<DatePillProps> = ({ date, className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 h-6 px-2.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
    >
      <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <span className="truncate">{date}</span>
    </div>
  );
};
