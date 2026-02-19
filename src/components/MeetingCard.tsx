'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ContactPill } from '@/components/ContactPill';

interface Attendee {
  name: string;
  email?: string;
  contact_role?: 'buyer' | 'seller';
}

interface MeetingCardProps {
  date: string; // Format: "JAN 06"
  title: string; // e.g. "Demo and pricing review"
  variant?: 'upcoming' | 'past'; // upcoming shows time range, past shows start time, end time, duration
  time?: string; // For upcoming: "2:00 PM - 2:45 PM"
  startTime?: string; // For past: "2:00 PM"
  endTime?: string; // For past: "2:45 PM"
  duration?: string; // For past: "45 mins"
  attendees: Attendee[];
  maxAttendees?: number; // Maximum number of attendees to show before +n more
  onClick?: () => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  date,
  title,
  variant = 'upcoming',
  time,
  startTime,
  endTime,
  duration,
  attendees,
  maxAttendees = 3,
  onClick,
}) => {
  const isPast = variant === 'past';
  const displayedAttendees = attendees.slice(0, maxAttendees);
  const remainingCount = attendees.length - maxAttendees;

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-0 mb-0">
        <div className="flex gap-4">
          {/* Date box */}
          <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-lg flex flex-col items-center justify-center bg-gray-50">
            <span className="text-xs text-gray-600 font-semibold">
              {date.split(' ')[0]}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {date.split(' ')[1]}
            </span>
          </div>

          {/* Title and metadata */}
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="text-sm font-semibold text-foreground truncate mb-1">
              {title}
            </h3>
            {isPast ? (
              <p className="text-sm text-muted-foreground">
                {startTime} – {endTime} • {duration}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">{time}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-0 py-4 pl-4">
        {/* Attendees */}
        <div className="flex items-center gap-1.5 min-w-0">
          {displayedAttendees.map((attendee, index) => (
            <ContactPill
              key={`${attendee.name}-${index}`}
              name={attendee.name}
            />
          ))}
          {remainingCount > 0 && (
            <div className="h-6 px-2 rounded border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0 whitespace-nowrap">
              +{remainingCount} more
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
