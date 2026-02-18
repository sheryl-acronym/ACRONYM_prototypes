import React from 'react';
import { User } from 'lucide-react';

interface ContactPillProps {
  name: string;
  className?: string;
  avatarColor?: string;
  avatarUrl?: string;
  isTeamMember?: boolean;
}

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Avatar color mapping configuration
const avatarColorConfig: Record<string, string> = {
  'blue-400': 'bg-blue-400',
  'blue-500': 'bg-blue-500',
  'green-400': 'bg-green-400',
  'green-500': 'bg-green-500',
  'purple-400': 'bg-purple-400',
  'purple-500': 'bg-purple-500',
  'pink-400': 'bg-pink-400',
  'pink-500': 'bg-pink-500',
  'amber-400': 'bg-amber-400',
  'amber-500': 'bg-amber-500',
  'red-400': 'bg-red-400',
  'red-500': 'bg-red-500',
  'cyan-400': 'bg-cyan-400',
  'cyan-500': 'bg-cyan-500',
  'indigo-400': 'bg-indigo-400',
  'indigo-500': 'bg-indigo-500',
  'orange-400': 'bg-orange-400',
  'orange-500': 'bg-orange-500',
};

// Get avatar background color (data-driven, fallback to gray)
const getAvatarColor = (color?: string): string => {
  if (!color) return 'bg-gray-400';
  return avatarColorConfig[color] || color;
};

export const ContactPill: React.FC<ContactPillProps> = ({ name, className = '', avatarColor, avatarUrl, isTeamMember = false }) => {
  // Team member variant - shows Flex logo
  if (isTeamMember) {
    return (
      <div
        className={`inline-flex items-center gap-2 h-6 px-1.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
      >
        <img
          src="/flexlogo.png"
          alt="Flex"
          className="h-4 w-4 flex-shrink-0"
        />
        <span className="truncate">{name}</span>
      </div>
    );
  }

  // Photo variant - shows actual avatar image
  if (avatarUrl) {
    return (
      <div
        className={`inline-flex items-center gap-2 h-6 px-1.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
      >
        <img
          src={avatarUrl}
          alt={name}
          className="h-4 w-4 rounded object-cover flex-shrink-0"
        />
        <span className="truncate">{name}</span>
      </div>
    );
  }

  // Avatar variant - shows colored avatar with initials
  if (avatarColor) {
    return (
      <div
        className={`inline-flex items-center gap-2 h-6 px-1.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
      >
        <span
          className={`inline-flex items-center justify-center rounded text-white font-semibold flex-shrink-0 h-4 w-4 text-xs ${getAvatarColor(avatarColor)}`}
        >
          {getInitials(name)}
        </span>
        <span className="truncate">{name}</span>
      </div>
    );
  }

  // Icon variant (default) - shows user icon
  return (
    <div
      className={`inline-flex items-center gap-2 h-6 px-1.5 py-1 rounded-sm border border-input bg-background text-sm font-medium text-foreground whitespace-nowrap ${className}`}
    >
      <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <span className="truncate">{name}</span>
    </div>
  );
};
