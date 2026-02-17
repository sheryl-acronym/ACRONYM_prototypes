import React from 'react';
import { ContactCardData } from '@/types';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ContactPill } from '@/components/ContactPill';
import { PersonaPill } from '@/components/PersonaPill';
import { BuyerRolePill } from '@/components/BuyerRolePill';

type ContactCardVariant = 'compact-hover' | 'compact' | 'full';

interface UnifiedContactCardProps {
  contact: ContactCardData;
  variant?: ContactCardVariant;
  showRisk?: boolean;
  expandableFields?: boolean;
}

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
  'bg-blue-200': 'bg-blue-200',
  'bg-green-200': 'bg-green-200',
  'bg-purple-200': 'bg-purple-200',
  'bg-pink-200': 'bg-pink-200',
  'bg-amber-200': 'bg-amber-200',
  'bg-red-200': 'bg-red-200',
  'bg-cyan-200': 'bg-cyan-200',
  'bg-indigo-200': 'bg-indigo-200',
  'bg-orange-200': 'bg-orange-200',
  'bg-violet-200': 'bg-violet-200',
  'bg-gray-300': 'bg-gray-300',
};

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

// Get avatar background color (data-driven, fallback to gray)
const getAvatarColor = (color?: string): string => {
  if (!color) return 'bg-gray-400';
  return avatarColorConfig[color] || color;
};

// Badge styling for tags
const getTagBadgeStyle = (tag?: string): string => {
  if (!tag) return 'bg-blue-50 text-blue-700 border-blue-200';

  switch (tag.toLowerCase()) {
    case 'champion':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'economic buyer':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'influencer':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'blocker':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-blue-50 text-blue-700 border-blue-200';
  }
};

// LinkedIn Icon Component (filled square with rounded corners)
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-3.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2ZM8 19H5V9H8V19ZM6.5 7.5C5.4 7.5 4.5 6.6 4.5 5.5C4.5 4.4 5.4 3.5 6.5 3.5C7.6 3.5 8.5 4.4 8.5 5.5C8.5 6.6 7.6 7.5 6.5 7.5ZM19 19H16V13.5C16 12 15.4 11 14 11C13 11 12.4 11.6 12.2 12.2C12.1 12.4 12 12.7 12 13V19H9C9 19 9 10 9 9H12V10.5C12.4 9.8 13.5 8.7 15.4 8.7C18 8.7 19 10.5 19 13V19Z" />
  </svg>
);

// Avatar component (reusable)
const Avatar: React.FC<{ name: string; color?: string; size?: 'sm' | 'md' | 'lg'; avatarUrl?: string }> = ({
  name,
  color,
  size = 'md',
  avatarUrl,
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  };

  // Photo variant - shows actual avatar image
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`rounded-full object-cover flex-shrink-0 ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0 ${getAvatarColor(color)} ${sizeClasses[size]}`}
    >
      {getInitials(name)}
    </span>
  );
};

// Compact Hover Variant (replaces AttendeeHoverCard)
const CompactHoverContent: React.FC<{ contact: ContactCardData }> = ({ contact }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ContactPill name={contact.name} avatarUrl={contact.avatar_url} avatarColor={contact.avatar_color} />
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-0" sideOffset={8} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <div className="flex flex-col gap-0">
          {/* Header Section */}
          <div className="px-6 pt-6 pb-3">
            <div className="flex items-start gap-3">
              <Avatar name={contact.name} color={contact.avatar_color} size="lg" avatarUrl={contact.avatar_url} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{contact.name}</h3>
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-gray-500 hover:text-gray-600 transition-colors"
                        title="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {contact.linkedin_url && (
                      <a
                        href={contact.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-600 transition-colors"
                        title="LinkedIn"
                      >
                        <LinkedInIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {contact.role && <span className="text-xs text-foreground/60">{contact.role}</span>}
                    {contact.role_in_buying_process && (
                      <BuyerRolePill role={contact.role_in_buying_process as 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker'} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <Separator className="mx-0" />

          {/* Persona & Tags Section */}
          <div className="px-6 pt-3 pb-6 space-y-4">
            {/* Persona */}
            {contact.persona && <PersonaPill persona={contact.persona} />}

            {/* Tags */}
            {contact.tags && contact.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`rounded-full font-normal text-xs px-2.5 py-0.5 ${getTagBadgeStyle(tag)}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Compact Variant (card display without expandable fields)
const CompactContent: React.FC<{ contact: ContactCardData }> = ({
  contact,
}) => {
  return (
    <div className="rounded-lg border bg-card p-4 max-w-[500px]">
      {/* Header Row */}
      <div className="flex items-start gap-3">
        <Avatar name={contact.name} color={contact.avatar_color} size="md" avatarUrl={contact.avatar_url} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{contact.name}</span>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-500 hover:text-gray-600 transition-colors flex-shrink-0"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              {contact.linkedin_url && (
                <a
                  href={contact.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-600 transition-colors flex-shrink-0"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {contact.job_title && <span className="text-xs text-foreground/60">{contact.job_title}</span>}
              {contact.role_in_buying_process && (
                <BuyerRolePill role={contact.role_in_buying_process as 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker'} />
              )}
              {contact.tags &&
                contact.tags.map((tag, i) => {
                  const buyerRoles = ['Champion', 'Economic Buyer', 'Influencer', 'Blocker'];
                  if (buyerRoles.includes(tag)) {
                    return (
                      <BuyerRolePill key={i} role={tag as 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker'} />
                    );
                  }
                  return (
                    <Badge
                      key={i}
                      variant="outline"
                      className={`rounded-full font-normal text-xs px-2.5 py-0.5 w-fit bg-white ${getTagBadgeStyle(tag)}`}
                    >
                      {tag}
                    </Badge>
                  );
                })}
              {contact.persona && <PersonaPill persona={contact.persona} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Full Variant (replaces KeyStakeholder card display)
const FullContent: React.FC<{ contact: ContactCardData; showRisk?: boolean; expandableFields?: boolean }> = ({
  contact,
  showRisk = true,
  expandableFields = true,
}) => {

  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Header Row */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar name={contact.name} color={contact.avatar_color} size="md" avatarUrl={contact.avatar_url} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{contact.name}</span>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-gray-500 hover:text-gray-600 transition-colors flex-shrink-0"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              {contact.linkedin_url && (
                <a
                  href={contact.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-600 transition-colors flex-shrink-0"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {contact.job_title && <span className="text-xs text-foreground/60">{contact.job_title}</span>}
              {contact.role_in_buying_process && (
                <BuyerRolePill role={contact.role_in_buying_process as 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker'} />
              )}
              {contact.tags &&
                contact.tags.map((tag, i) => {
                  const buyerRoles = ['Champion', 'Economic Buyer', 'Influencer', 'Blocker'];
                  if (buyerRoles.includes(tag)) {
                    return (
                      <BuyerRolePill key={i} role={tag as 'Champion' | 'Economic Buyer' | 'Influencer' | 'Blocker'} />
                    );
                  }
                  return (
                    <Badge
                      key={i}
                      variant="outline"
                      className={`rounded-full font-normal text-xs px-2.5 py-0.5 w-fit bg-white ${getTagBadgeStyle(tag)}`}
                    >
                      {tag}
                    </Badge>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metadata Sections */}
      {expandableFields && (
        <div className="space-y-3">
          {/* Buyer Persona */}
          {contact.persona && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Buyer Persona</h4>
              </div>
              <div>
                <PersonaPill persona={contact.persona} />
              </div>
            </div>
          )}

          {/* Role and Engagement */}
          {contact.role_and_engagement && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Role</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.role_and_engagement}</p>
              </div>
            </div>
          )}

          {/* Authority */}
          {contact.authority && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Authority</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.authority}</p>
              </div>
            </div>
          )}

          {/* Key Concerns */}
          {contact.key_concerns && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Key concerns</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.key_concerns}</p>
              </div>
            </div>
          )}

          {/* Communication Style */}
          {contact.communication_style && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Communication</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.communication_style}</p>
              </div>
            </div>
          )}

          {/* Personal Markers */}
          {contact.personal_markers && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Personal markers</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.personal_markers}</p>
              </div>
            </div>
          )}

          {/* Risk Description */}
          {showRisk && contact.risk && contact.risk.description && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Risk</h4>
              </div>
              <div>
                <p className="text-sm text-foreground/70 leading-relaxed">{contact.risk.description}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Minimal Variant (new - for inline displays)
// Main Component
export const UnifiedContactCard: React.FC<UnifiedContactCardProps> = ({
  contact,
  variant = 'full',
  showRisk = true,
  expandableFields = true,
}) => {
  switch (variant) {
    case 'compact-hover':
      return <CompactHoverContent contact={contact} />;
    case 'compact':
      return <CompactContent contact={contact} />;
    case 'full':
    default:
      return <FullContent contact={contact} showRisk={showRisk} expandableFields={expandableFields} />;
  }
};

export default UnifiedContactCard;
