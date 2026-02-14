import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import PreCallBrief from '@/components/PreCallBrief';
import DealsPage from '@/components/DealsPage';
import DealDetailPage from '@/components/DealDetailPage';
import DealDetailPageV2 from '@/components/DealDetailPageV2';
import PastMeetingsPage from '@/components/PastMeetingsPage';
import UpcomingMeetingsPage from '@/components/UpcomingMeetingsPage';
import CompaniesPage from '@/components/CompaniesPage';
import ContactsPage from '@/components/ContactsPage';
import CustomerProfilesPage from '@/components/CustomerProfilesPage';
import PlaybookPositioningPage from '@/components/PlaybookPositioningPage';
import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { provenDemoData } from '@/proven-demo-data';
import { dealsData } from '@/deals-demo-data';
import { dealDetailDemoData } from '@/deal-detail-demo-data';
import { pastMeetingsData } from '@/past-meetings-data';
import { upcomingMeetingsData } from '@/upcoming-meetings-data';
import { companiesData } from '@/companies-demo-data';
import { contactsData } from '@/contacts-demo-data';
import { customerProfilesData } from '@/customer-profiles-demo-data';

const meetingBriefData: Record<string, typeof provenDemoData> = {
  'um-001': provenDemoData,
};

function DealDetailRoute() {
  const { dealId } = useParams<{ dealId: string }>();
  const [version, setVersion] = React.useState<'v1' | 'v2' | '1st-call' | 'post-call-1'>('v1');

  const deal = React.useMemo(() => {
    if (!dealId) return undefined;
    if (version === '1st-call') {
      return dealDetailDemoData[`${dealId}-v3`];
    }
    if (version === 'post-call-1') {
      return dealDetailDemoData[`${dealId}-v2-post-call`];
    }
    return dealDetailDemoData[dealId];
  }, [dealId, version]);

  const handleVersionChange = React.useCallback((newVersion: 'v1' | 'v2' | '1st-call' | 'post-call-1') => {
    setVersion(newVersion);
  }, []);

  // If no specific detail data, build a fallback from the deals list
  if (!deal && dealId) {
    const baseDeal = dealsData.find((d) => d.id === dealId);
    if (baseDeal) {
      const fallbackData = {
        name: baseDeal.name,
        icon_color: baseDeal.icon_color,
        stage_name: baseDeal.stage_name,
        momentum: baseDeal.momentum,
        status: baseDeal.status,
        last_meeting: baseDeal.last_meeting,
        next_meeting: baseDeal.next_meeting,
        owner_name: baseDeal.owner_name,
        company_name: baseDeal.company_name,
        company_icon_color: baseDeal.company_icon_color,
        company_logo_url: baseDeal.company_logo_url,
        overview: {
          momentum_summary: 'Display momentum summary here.',
          last_meeting: { title: 'No meeting notes available yet.', bullets: [] },
          positive_signals: [],
          risk_factors: [],
          next_steps: [],
        },
        opportunity_summary: {
          headline: `${baseDeal.company_name}`,
          what_they_want: [],
          how_we_help: [],
          why_now: [],
          budget_and_roi: [],
        },
        key_stakeholders: [],
      };
      return version === 'v1' ? (
        <DealDetailPage data={fallbackData} onVersionChange={handleVersionChange} />
      ) : version === 'v2' ? (
        <DealDetailPageV2 data={fallbackData} onVersionChange={handleVersionChange} />
      ) : version === '1st-call' || version === 'post-call-1' ? (
        <DealDetailPage data={fallbackData} onVersionChange={handleVersionChange} />
      ) : null;
    }
  }

  if (!deal) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Deal not found.
      </div>
    );
  }

  return version === 'v1' ? (
    <DealDetailPage data={deal} onVersionChange={handleVersionChange} />
  ) : version === 'v2' ? (
    <DealDetailPageV2 data={deal} onVersionChange={handleVersionChange} />
  ) : version === '1st-call' || version === 'post-call-1' ? (
    <DealDetailPage data={deal} onVersionChange={handleVersionChange} />
  ) : null;
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Routes>
            <Route path="/" element={<Navigate to="/deals" replace />} />
            <Route path="/deals" element={<DealsPage deals={dealsData} />} />
            <Route path="/deals/:dealId" element={<DealDetailRoute />} />
            <Route path="/meetings" element={<UpcomingMeetingsPage meetings={upcomingMeetingsData} briefData={meetingBriefData} />} />
            <Route path="/meetings/um-001" element={<PreCallBrief data={provenDemoData} />} />
            <Route path="/meetings/past" element={<PastMeetingsPage meetings={pastMeetingsData} />} />
            <Route path="/companies" element={<CompaniesPage companies={companiesData} />} />
            <Route path="/contacts" element={<ContactsPage contacts={contactsData} />} />
            <Route path="/customer-profiles" element={<CustomerProfilesPage profiles={customerProfilesData} />} />
            <Route path="/playbook/positioning" element={<PlaybookPositioningPage />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
