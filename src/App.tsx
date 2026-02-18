import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PreCallBrief from '@/components/PreCallBrief';
import PostCallSummary from '@/components/PostCallSummary';
import DealsPage from '@/components/DealsPage';
import DealDetailPage from '@/components/DealDetailPage';
import DealDetailPageV2 from '@/components/DealDetailPageV2';
import PastMeetingsPage from '@/components/PastMeetingsPage';
import UpcomingMeetingsPage from '@/components/UpcomingMeetingsPage';
import CompaniesPage from '@/components/CompaniesPage';
import CompanyDetailPage from '@/components/CompanyDetailPage';
import ContactsPage from '@/components/ContactsPage';
import ContactDetailPage from '@/components/ContactDetailPage';
import CustomerProfilesPage from '@/components/CustomerProfilesPage';
import BuyerPersonasPage from '@/components/BuyerPersonasPage';
import DiscoveryQuestionsPage from '@/components/DiscoveryQuestionsPage';
import FAQsPage from '@/components/FAQsPage';
import ObjectionsPage from '@/components/ObjectionsPage';
import PlaybookPositioningPage from '@/components/PlaybookPositioningPage';
import ComponentsPage from '@/components/ComponentsPage';
import AppSidebar from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { provenDemoData, provenDemoDataCall2 } from '@/proven-demo-data';
import { dealsData } from '@/deals-demo-data';
import { dealDetailDemoData } from '@/deal-detail-demo-data';
import { pastMeetingsData } from '@/past-meetings-data';
import { upcomingMeetingsData } from '@/upcoming-meetings-data';
import { upcomingMeetingsBriefData } from '@/upcoming-meetings-brief-data';
import { pastMeetingsSummaryData } from '@/past-meetings-summary-data';
import { companiesData } from '@/companies-demo-data';
import { contactsData } from '@/contacts-demo-data';
import { customerProfilesData } from '@/customer-profiles-demo-data';
import { buyerPersonasData } from '@/buyer-personas-demo-data';
import { discoveryQuestionsData } from '@/discovery-questions-demo-data';
import { faqs } from '@/faqs-demo-data';
import { objectionsData } from '@/objections-demo-data';

const meetingBriefData = upcomingMeetingsBriefData;
const meetingSummaryData = pastMeetingsSummaryData;

function PreCallBriefRoute() {
  const { meetingId: urlMeetingId, version: urlVersion } = useParams<{ meetingId?: string; version?: 'call-1' | 'call-2' }>();
  const [version, setVersion] = React.useState<'call-1' | 'call-2'>(urlVersion || 'call-1');

  // Get brief data for the meeting, with fallback to PROVEN data for um-001
  const briefData = urlMeetingId && meetingBriefData[urlMeetingId]
    ? meetingBriefData[urlMeetingId]
    : (urlMeetingId === 'um-001' && version === 'call-2' ? provenDemoDataCall2 : provenDemoData);

  const handleVersionChange = React.useCallback((newVersion: 'call-1' | 'call-2') => {
    setVersion(newVersion);
    // Update URL when version changes
    window.history.pushState(null, '', `/meetings/${urlMeetingId || 'um-001'}/${newVersion}`);
  }, [urlMeetingId]);

  return <PreCallBrief data={briefData} onVersionChange={handleVersionChange} currentVersion={version} />;
}

function PostCallSummaryRoute() {
  const { meetingId: urlMeetingId } = useParams<{ meetingId?: string }>();

  // Get summary data for the meeting
  const summaryData = urlMeetingId && meetingSummaryData[urlMeetingId]
    ? meetingSummaryData[urlMeetingId]
    : null;

  if (!summaryData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Meeting summary not found.
      </div>
    );
  }

  return <PostCallSummary data={summaryData} />;
}

function DealsPageRoute() {
  const { view: urlView } = useParams<{ view?: 'board' | 'table' }>();
  const [view, setView] = React.useState<'board' | 'table'>(urlView || 'table');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDealId = searchParams.get('dealId') || undefined;

  const handleViewChange = React.useCallback((newView: 'board' | 'table') => {
    setView(newView);
    // Update URL when view changes
    if (newView === 'table') {
      window.history.pushState(null, '', '/deals');
    } else {
      window.history.pushState(null, '', `/deals/${newView}`);
    }
  }, []);

  const handleDealSelect = React.useCallback((dealId: string) => {
    setSearchParams({ dealId });
  }, [setSearchParams]);

  const handleCloseSidePanel = React.useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <DealsPage
      deals={dealsData}
      companies={companiesData}
      initialView={view}
      onViewChange={handleViewChange}
      selectedDealId={selectedDealId}
      onDealSelect={handleDealSelect}
      onCloseSidePanel={handleCloseSidePanel}
    />
  );
}

function DealDetailRoute() {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  const [version, setVersion] = React.useState<'v1' | 'v2' | '1st-call' | 'post-call-1'>('v1');

  // Redirect if dealId is a view name (board/table)
  React.useEffect(() => {
    if (dealId === 'board' || dealId === 'table') {
      navigate(`/deals/${dealId}`);
    }
  }, [dealId, navigate]);

  const deal = React.useMemo(() => {
    if (!dealId) return undefined;
    if (dealId === 'board' || dealId === 'table') return undefined;
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

function ContactsRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedContactId = searchParams.get('contactId') || undefined;

  const handleContactSelect = React.useCallback(
    (contactId: string) => {
      setSearchParams({ contactId });
    },
    [setSearchParams]
  );

  const handleCloseSidePanel = React.useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return (
    <ContactsPage
      contacts={contactsData}
      selectedContactId={selectedContactId}
      onContactSelect={handleContactSelect}
      onCloseSidePanel={handleCloseSidePanel}
    />
  );
}

function ContactDetailRoute() {
  const { contactId } = useParams<{ contactId: string }>();

  const contact = React.useMemo(() => {
    if (!contactId) return undefined;
    return contactsData.find((c) => c.id === contactId);
  }, [contactId]);

  if (!contact) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Contact not found.
      </div>
    );
  }

  return <ContactDetailPage contact={contact} />;
}

function CompanyDetailRoute() {
  const { companyId } = useParams<{ companyId: string }>();

  const company = React.useMemo(() => {
    if (!companyId) return undefined;
    return companiesData.find((c) => c.id === companyId);
  }, [companyId]);

  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Company not found.
      </div>
    );
  }

  return <CompanyDetailPage company={company} />;
}

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Routes>
            <Route path="/" element={<Navigate to="/deals" replace />} />
            <Route path="/deals" element={<DealsPageRoute />} />
            <Route path="/deals/:view/:dealId" element={<DealDetailRoute />} />
            <Route path="/deals/:dealId" element={<DealDetailRoute />} />
            <Route path="/deals/:view" element={<DealsPageRoute />} />
            <Route path="/meetings" element={<UpcomingMeetingsPage meetings={upcomingMeetingsData} briefData={meetingBriefData} />} />
            <Route path="/meetings/past" element={<PastMeetingsPage meetings={pastMeetingsData} summaryData={meetingSummaryData} />} />
            <Route path="/meetings/past/:meetingId" element={<PostCallSummaryRoute />} />
            <Route path="/meetings/:meetingId/:version" element={<PreCallBriefRoute />} />
            <Route path="/meetings/:meetingId" element={<PreCallBriefRoute />} />
            <Route path="/companies" element={<CompaniesPage companies={companiesData} />} />
            <Route path="/companies/:companyId" element={<CompanyDetailRoute />} />
            <Route path="/contacts" element={<ContactsRoute />} />
            <Route path="/contacts/:contactId" element={<ContactDetailRoute />} />
            <Route path="/customer-profiles" element={<CustomerProfilesPage profiles={customerProfilesData} />} />
            <Route path="/buyer-personas" element={<BuyerPersonasPage personas={buyerPersonasData} />} />
            <Route path="/discovery-questions" element={<DiscoveryQuestionsPage questions={discoveryQuestionsData} />} />
            <Route path="/faqs" element={<FAQsPage faqs={faqs} />} />
            <Route path="/objections" element={<ObjectionsPage objections={objectionsData} />} />
            <Route path="/playbook/positioning" element={<PlaybookPositioningPage />} />
            <Route path="/components" element={<ComponentsPage />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
