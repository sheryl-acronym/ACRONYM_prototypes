import { useLocation, Navigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';
import SettingsNav from './SettingsNav';

// Org pages
import OrgOrganizationPage from './org/OrgOrganizationPage';
import OrgCrmPage from './org/OrgCrmPage';
import OrgSlackPage from './org/OrgSlackPage';
import OrgCallRecorderPage from './org/OrgCallRecorderPage';
import OrgCustomSignalsPage from './org/OrgCustomSignalsPage';
import OrgPostCallWorkflowsPage from './org/OrgPostCallWorkflowsPage';
import OrgNotificationsPage from './org/OrgNotificationsPage';
import OrgDataHygienePage from './org/OrgDataHygienePage';

// My pages
import MyAccountPage from './my/MyAccountPage';
import MySlackPage from './my/MySlackPage';
import MyGoogleCalendarPage from './my/MyGoogleCalendarPage';
import MyGmailPage from './my/MyGmailPage';
import MyGoogleDrivePage from './my/MyGoogleDrivePage';
import MyAcronymRecorderPage from './my/MyAcronymRecorderPage';

// Map pathname → content component
const CONTENT_MAP: Record<string, React.ComponentType> = {
  '/settings/org/organization': OrgOrganizationPage,
  '/settings/org/integrations/crm': OrgCrmPage,
  '/settings/org/integrations/slack': OrgSlackPage,
  '/settings/org/integrations/call-recorder': OrgCallRecorderPage,
  '/settings/org/custom-signals': OrgCustomSignalsPage,
  '/settings/org/post-call-workflows': OrgPostCallWorkflowsPage,
  '/settings/org/notifications': OrgNotificationsPage,
  '/settings/org/data-hygiene': OrgDataHygienePage,
  '/settings/my/account': MyAccountPage,
  '/settings/my/integrations/slack': MySlackPage,
  '/settings/my/integrations/google-calendar': MyGoogleCalendarPage,
  '/settings/my/integrations/gmail': MyGmailPage,
  '/settings/my/integrations/google-drive': MyGoogleDrivePage,
  '/settings/my/integrations/acronym-recorder': MyAcronymRecorderPage,
};

export default function SettingsRoot() {
  const location = useLocation();
  const pathname = location.pathname;

  const ContentComponent = CONTENT_MAP[pathname];

  // If no matching content, redirect to default
  if (!ContentComponent) {
    return <Navigate to="/settings/my/account" replace />;
  }

  const isOrg = pathname.startsWith('/settings/org');
  const sectionTitle = isOrg ? 'Organization settings' : 'Settings';

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Thin header — sidebar trigger only */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-neutral-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-neutral-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
        </div>

        {/* Body: scrolls as one */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[960px] mx-auto px-10">
            {/* Page title */}
            <h1 className="text-2xl font-semibold text-neutral-900 pt-10 pb-8">{sectionTitle}</h1>
            {/* Nav + content */}
            <div className="flex gap-14 pb-20">
              <SettingsNav />
              <main className="flex-1 min-w-0">
                <ContentComponent />
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
