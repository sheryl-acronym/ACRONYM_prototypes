import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { User, BookOpen, Mail } from 'lucide-react';

interface AttendeeHoverCardProps {
  name: string;
  email?: string;
  role?: string;
  title?: string;
  persona?: string;
  linkedin_url?: string;
  tags?: string[];
}

export const AttendeeHoverCard: React.FC<AttendeeHoverCardProps> = ({
  name,
  email,
  role,
  title,
  persona,
  linkedin_url,
  tags,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleLinkedInClick = (e: React.MouseEvent) => {
    if (linkedin_url) {
      e.preventDefault();
      window.open(linkedin_url, '_blank');
    }
  };

  const getTagStyle = (tag: string) => {
    if (tag === 'Champion') {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    if (tag === 'Economic Buyer') {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-0.5 text-xs font-normal text-muted-foreground cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <User className="h-3 w-3" />
          {name}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-6 overflow-hidden"
        align="start"
        sideOffset={8}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Top section: Name with LinkedIn icon */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar placeholder */}
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h4 className="font-semibold text-sm text-foreground">{name}</h4>
                  <div className="flex items-center gap-1">
                    {email && (
                      <button
                        onClick={() => window.location.href = `mailto:${email}`}
                        className="text-muted-foreground hover:text-blue-600 transition-colors flex-shrink-0 focus:outline-none"
                        title="Send email"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                    )}
                    {linkedin_url && (
                      <button
                        onClick={handleLinkedInClick}
                        className="text-muted-foreground hover:text-blue-600 transition-colors flex-shrink-0 focus:outline-none"
                        title="View LinkedIn profile"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </button>
                    )}
                  </div>
                </div>
                {role && (
                  <p className="text-xs text-muted-foreground">{role}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Persona section */}
        {persona && (
          <div className="mb-3">
            <div className="inline-flex items-center gap-2 bg-slate-50 rounded-md px-2.5 py-1.5 border border-slate-200">
              <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-foreground">{persona}</span>
            </div>
          </div>
        )}

        {/* Tags section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <div key={i} className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border ${getTagStyle(tag)}`}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
