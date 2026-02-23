import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import ConnectorsSection from '@/components/ConnectorsSection';
import SlackConfigurationPage from '@/components/SlackConfigurationPage';
import { PanelLeft, Plug } from 'lucide-react';

export default function SettingsPage() {
  const [currentView, setCurrentView] = React.useState<'connections' | 'slack-config'>('connections');

  const handleConfigureSlack = () => {
    setCurrentView('slack-config');
  };

  const handleBackFromConfig = () => {
    setCurrentView('connections');
  };

  if (currentView === 'slack-config') {
    return <SlackConfigurationPage onBack={handleBackFromConfig} />;
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main settings panel */}
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Content area - flex-col layout to accommodate title + content */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* Content below title */}
          <div className="flex flex-1 min-h-0 overflow-hidden justify-center px-8">
          <div className="flex flex-1 min-h-0 overflow-hidden max-w-[1200px] w-full">

          {/* Main Content */}
          <main className="flex-1 overflow-hidden flex flex-col items-stretch justify-start min-w-[720px]">
            <div className="w-full h-full p-8 overflow-y-auto">
              {/* Header */}
              <div className="mb-8 flex items-center gap-2.5">
                <Plug className="h-5 w-5 text-foreground" />
                <h2 className="text-2xl font-bold">
                  Connections
                </h2>
              </div>

              {/* Content - Only show Connections */}
              <ConnectorsSection onConfigureSlack={handleConfigureSlack} />
            </div>
          </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
