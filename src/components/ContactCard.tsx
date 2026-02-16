import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Mail, Briefcase, Linkedin, User } from 'lucide-react';

export interface ContactCardData {
  id: string;
  name: string;
  email?: string;
  role?: string;
  title?: string;
  persona?: string;
  linkedin_url?: string;
}

interface ContactCardProps {
  contact: ContactCardData;
  variant?: 'default' | 'outline';
  className?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  className = '',
}) => {
  const handleLinkedInClick = (e: React.MouseEvent) => {
    if (contact.linkedin_url) {
      e.preventDefault();
      window.open(contact.linkedin_url, '_blank');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`inline-flex items-center gap-2 h-6 px-3 rounded-full border border-input bg-background text-xs font-normal text-foreground cursor-pointer hover:bg-slate-50 transition-colors ${className}`}
        >
          <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="truncate">{contact.name}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden" align="start" sideOffset={8}>
        {/* Header with avatar and LinkedIn icon */}
        <div className="bg-slate-50 px-4 py-3 border-b flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-foreground">{contact.name}</h4>
            {contact.title && (
              <p className="text-xs text-muted-foreground mt-0.5">{contact.title}</p>
            )}
          </div>
          {contact.linkedin_url && (
            <button
              onClick={handleLinkedInClick}
              className="ml-2 p-1.5 text-muted-foreground hover:text-slate-900 transition-colors"
              title="View LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-3 space-y-2.5">
          {contact.role && (
            <div className="flex items-center gap-2.5">
              <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{contact.role}</span>
            </div>
          )}

          {contact.email && (
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a
                href={`mailto:${contact.email}`}
                className="text-xs text-blue-600 hover:underline truncate"
              >
                {contact.email}
              </a>
            </div>
          )}

          {contact.persona && (
            <div className="pt-1.5 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-1">Buyer Persona</p>
              <p className="text-xs text-foreground">{contact.persona}</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
