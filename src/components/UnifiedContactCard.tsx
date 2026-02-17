import React from 'react';
import { ContactCardData } from '@/types';
import { User, Mail, Briefcase, BookOpen, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

type ContactCardVariant = 'compact-hover' | 'compact-click' | 'full' | 'minimal';

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

// Risk badge styling
const getRiskBadgeStyles = (level: 'LOW' | 'MEDIUM' | 'HIGH'): string => {
  switch (level) {
    case 'HIGH':
      return 'bg-red-50 text-red-900 border-red-200';
    case 'MEDIUM':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'LOW':
      return 'bg-green-50 text-green-900 border-green-200';
  }
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

// Avatar component (reusable)
const Avatar: React.FC<{ name: string; color?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  name,
  color,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  };

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-2 hover:bg-slate-50 rounded px-2 py-1 transition-colors">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">{contact.name}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-6" sideOffset={8}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Avatar name={contact.name} color={contact.avatar_color} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{contact.name}</h3>
                {contact.linkedin_url && (
                  <a
                    href={contact.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
              {contact.role && <p className="text-xs text-muted-foreground mt-0.5">{contact.role}</p>}
            </div>
          </div>

          {/* Email */}
          {contact.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a href={`mailto:${contact.email}`} className="text-xs text-blue-600 hover:underline truncate">
                {contact.email}
              </a>
            </div>
          )}

          {/* Persona */}
          {contact.persona && (
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Buyer Persona:</span>
              </div>
              <p className="text-xs text-foreground mt-1">{contact.persona}</p>
            </div>
          )}

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

          {/* Role in buying process */}
          {contact.role_in_buying_process && (
            <div>
              <Badge variant="outline" className="rounded-full font-normal text-xs px-2.5 py-0.5 w-fit">
                {contact.role_in_buying_process}
              </Badge>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Compact Click Variant (replaces ContactCard)
const CompactClickContent: React.FC<{ contact: ContactCardData }> = ({ contact }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center h-6 px-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors gap-1.5">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground truncate">{contact.name}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-80 p-0" sideOffset={8}>
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{contact.name}</h3>
              {contact.job_title && <p className="text-xs text-muted-foreground mt-0.5">{contact.job_title}</p>}
            </div>
            {contact.linkedin_url && (
              <a
                href={contact.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        <div className="px-4 py-3 space-y-2.5">
          {/* Role */}
          {contact.role && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground">{contact.role}</span>
            </div>
          )}

          {/* Email */}
          {contact.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">
                {contact.email}
              </a>
            </div>
          )}

          {/* Persona */}
          {contact.persona && (
            <>
              <div className="pt-2 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-foreground mb-2">Buyer Persona</h4>
                <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {contact.persona}
                </Badge>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
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
        <Avatar name={contact.name} color={contact.avatar_color} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-foreground">{contact.name}</span>
            <div className="flex items-center gap-2 flex-wrap">
              {contact.job_title && <span className="text-xs text-foreground/60">{contact.job_title}</span>}
              {contact.role_in_buying_process && (
                <Badge variant="outline" className="rounded-full font-normal text-xs px-2.5 py-0.5 w-fit">
                  {contact.role_in_buying_process}
                </Badge>
              )}
              {contact.tags &&
                contact.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`rounded-full font-normal text-xs px-2.5 py-0.5 w-fit bg-white ${getTagBadgeStyle(tag)}`}
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        {showRisk && contact.risk && (
          <Badge variant="outline" className={`rounded-full font-normal text-xs px-2.5 py-0.5 flex-shrink-0 uppercase ${getRiskBadgeStyles(contact.risk.level)}`}>
            {contact.risk.level} Risk
          </Badge>
        )}
      </div>

      {/* Detailed Metadata Sections */}
      {expandableFields && (
        <div className="space-y-3">
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

          {/* Persona */}
          {contact.persona && (
            <div className="grid gap-3" style={{ gridTemplateColumns: '120px 1fr' }}>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Buyer Persona</h4>
              </div>
              <div>
                <Badge variant="outline" className="rounded-md font-normal text-xs px-2.5 py-0.5 w-fit flex items-center gap-1.5">
                  <BookOpen size={14} />
                  {contact.persona}
                </Badge>
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
const MinimalContent: React.FC<{ contact: ContactCardData }> = ({ contact }) => {
  return (
    <div className="inline-flex items-center gap-2">
      <Avatar name={contact.name} color={contact.avatar_color} size="sm" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{contact.name}</span>
        {contact.job_title && <span className="text-xs text-muted-foreground">{contact.job_title}</span>}
        {contact.tags &&
          contact.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="rounded-full font-normal text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
};

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
    case 'compact-click':
      return <CompactClickContent contact={contact} />;
    case 'full':
      return <FullContent contact={contact} showRisk={showRisk} expandableFields={expandableFields} />;
    case 'minimal':
      return <MinimalContent contact={contact} />;
    default:
      return <FullContent contact={contact} showRisk={showRisk} expandableFields={expandableFields} />;
  }
};

export default UnifiedContactCard;
