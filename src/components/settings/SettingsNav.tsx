import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  coming_soon?: boolean;
  managed?: boolean;
}

interface NavGroup {
  label: string;
  prefix: string;
  items: NavItem[];
}

interface NavSection {
  type: 'item' | 'group' | 'spacer';
  item?: NavItem;
  group?: NavGroup;
}

const ORG_NAV: NavSection[] = [
  {
    type: 'item',
    item: { label: 'Organization', path: '/settings/org/organization' },
  },
  {
    type: 'spacer',
  },
  {
    type: 'group',
    group: {
      label: 'Connections',
      prefix: '/settings/org/integrations',
      items: [
        { label: 'CRM', path: '/settings/org/integrations/crm' },
        { label: 'Call Recorder', path: '/settings/org/integrations/call-recorder' },
        { label: 'Slack', path: '/settings/org/integrations/slack' },
      ],
    },
  },
  {
    type: 'spacer',
  },
  {
    type: 'group',
    group: {
      label: 'Knowledge',
      prefix: '/settings/org/knowledge',
      items: [
        { label: 'Custom Signals', path: '/settings/org/custom-signals', managed: true },
        { label: 'Knowledge Base', path: '/settings/org/knowledge-base', coming_soon: true },
      ],
    },
  },
  {
    type: 'spacer',
  },
  {
    type: 'group',
    group: {
      label: 'Workflows',
      prefix: '/settings/org/workflows',
      items: [
        { label: 'Post-Call Workflows', path: '/settings/org/post-call-workflows' },
        { label: 'Slack Notifications', path: '/settings/org/notifications' },
        { label: 'Data Hygiene', path: '/settings/org/data-hygiene', coming_soon: true },
      ],
    },
  },
];

const MY_NAV: NavSection[] = [
  {
    type: 'item',
    item: { label: 'Account', path: '/settings/my/account' },
  },
  {
    type: 'spacer',
  },
  {
    type: 'group',
    group: {
      label: 'Connections',
      prefix: '/settings/my/integrations',
      items: [
        { label: 'Slack', path: '/settings/my/integrations/slack' },
        { label: 'Google Calendar', path: '/settings/my/integrations/google-calendar' },
        { label: 'Gmail', path: '/settings/my/integrations/gmail', coming_soon: true },
        { label: 'Google Drive', path: '/settings/my/integrations/google-drive', coming_soon: true },
        { label: 'ACRONYM Recorder', path: '/settings/my/integrations/acronym-recorder', coming_soon: true },
      ],
    },
  },
];

export default function SettingsNav() {
  const location = useLocation();
  const isOrg = location.pathname.startsWith('/settings/org');

  const activeNav = isOrg ? ORG_NAV : MY_NAV;

  return (
    <div className="w-48 flex-shrink-0">
      <nav className="sticky top-0 space-y-0.5">
        {activeNav.map((section, i) => {
          if (section.type === 'item' && section.item) {
            return (
              <NavItemRow key={i} item={section.item} pathname={location.pathname} />
            );
          }
          if (section.type === 'group' && section.group) {
            return (
              <NavGroupRow key={i} group={section.group} pathname={location.pathname} />
            );
          }
          if (section.type === 'spacer') {
            return <div key={i} className="h-3" />;
          }
          return null;
        })}
        <div className="pt-6 mt-24 border-t border-neutral-200">
          {isOrg ? (
            <Link
              to="/settings/my/integrations/slack"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            >
              <span>Personal settings</span>
              <ExternalLink className="h-3 w-3 text-neutral-400 flex-shrink-0" />
            </Link>
          ) : (
            <Link
              to="/settings/org/organization"
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
            >
              <span>Organization settings</span>
              <ExternalLink className="h-3 w-3 text-neutral-400 flex-shrink-0" />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

function NavItemRow({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.path;

  if (item.coming_soon) {
    return (
      <div className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-neutral-400 cursor-default select-none">
        <span>{item.label}</span>
        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">
          Soon
        </Badge>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={cn(
        'flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors',
        isActive
          ? 'bg-neutral-100 text-neutral-900 font-medium'
          : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
      )}
    >
      <span>{item.label}</span>
      {item.managed && (
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal text-neutral-300 border-neutral-200">
          Managed
        </Badge>
      )}
    </Link>
  );
}

function NavGroupRow({ group, pathname }: { group: NavGroup; pathname: string }) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors group">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{group.label}</span>
        <ChevronDown className="h-3 w-3 text-neutral-300 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-0.5 mb-2 space-y-0.5">
          {group.items.map((item) => (
            <NavItemRow key={item.path} item={item} pathname={pathname} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
