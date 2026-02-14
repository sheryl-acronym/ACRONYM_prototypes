import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Briefcase } from 'lucide-react';

interface AttendeeHoverCardProps {
  name: string;
  email?: string;
  role?: string;
}

export const AttendeeHoverCard: React.FC<AttendeeHoverCardProps> = ({
  name,
  email,
  role,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="font-normal text-xs rounded-md px-2.5 py-0.5 gap-1.5 text-muted-foreground cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <User className="h-3 w-3" />
          {name}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start" sideOffset={8}>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm">{name}</h4>
          </div>
          {role && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{role}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a
                href={`mailto:${email}`}
                className="text-xs text-blue-600 hover:underline truncate"
              >
                {email}
              </a>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
