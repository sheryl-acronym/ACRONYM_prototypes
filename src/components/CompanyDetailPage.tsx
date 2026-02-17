import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Globe,
  Calendar,
  Users,
  PanelLeft,
  MoreHorizontal,
  Box,
  Briefcase,
  MapPin,
  Linkedin,
  ChevronDown,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company } from '@/components/CompaniesPage';
import { CustomerProfilePill } from '@/components/CustomerProfilePill';
import { DatePill } from '@/components/DatePill';
import { DealPill } from '@/components/DealPill';
import { ContactPill } from '@/components/ContactPill';
import { UnifiedContactCard } from '@/components/UnifiedContactCard';
import { MeetingCard } from '@/components/MeetingCard';

interface CompanyDetailPageProps {
  company: Company;
  hideTopBar?: boolean;
}

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const TopBar: React.FC<{ companyName: string }> = ({ companyName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/companies');
                }}
              >
                Companies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{companyName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CompanyHeader: React.FC<{ company: Company }> = ({ company }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3">
      {company.logo_url ? (
        <img
          src={company.logo_url}
          alt={company.name}
          className="w-10 h-10 rounded object-contain flex-shrink-0 border border-border/50"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <span
        className={`w-10 h-10 rounded flex-shrink-0 flex items-center justify-center text-lg leading-none text-white font-bold ${company.icon_color} ${company.logo_url ? 'hidden' : ''}`}
        style={{ fontFamily: 'Oxanium, sans-serif' }}
      >
        {company.name.charAt(0).toUpperCase()}
      </span>
      <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
    </div>
  </div>
);

const MetadataRows: React.FC<{ company: Company }> = ({ company }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCompanyDetailsExpanded, setIsCompanyDetailsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Initial Metadata Fields */}
      <div className="space-y-3">
        {/* Deals */}
        {company.deal && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Deals</span>
            </div>
            <DealPill deal={company.deal} momentum={company.deal_momentum} />
          </div>
        )}

        {/* Customer profile */}
        {company.customer_profile && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Customer Profile</span>
            </div>
            <div className="flex items-center">
              <CustomerProfilePill profile={company.customer_profile} />
            </div>
          </div>
        )}

        {/* Domain */}
        {company.domain && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Domain</span>
            </div>
            <a
              href={`https://${company.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground underline decoration-dotted hover:decoration-solid"
            >
              {company.domain}
            </a>
          </div>
        )}

        {/* Last meeting */}
        {company.last_meeting && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Last meeting</span>
            </div>
            <div className="flex items-center">
              <DatePill date={formatShortDate(company.last_meeting) || ''} />
            </div>
          </div>
        )}

        {/* Next meeting */}
        {company.next_meeting && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Next meeting</span>
            </div>
            <div className="flex items-center">
              <DatePill date={formatShortDate(company.next_meeting) || ''} />
            </div>
          </div>
        )}

        {/* Primary contact */}
        {company.primary_contact && (
          <div className="grid grid-cols-[160px_1fr] gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Primary Contact</span>
            </div>
            <div className="flex items-center">
              <ContactPill name={company.primary_contact} avatarColor={company.primary_contact_color} />
            </div>
          </div>
        )}

        {/* Company Details Collapsible Section */}
        {(company.industry || company.employee_count || company.est_revenue || company.company_type || company.location || company.linkedin_url || company.tech_stack) && (
          <div className="mt-3">
            {isCompanyDetailsExpanded && (
              <div className="space-y-3">
                {/* Industry */}
                {company.industry && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Industry</span>
                    </div>
                    <p className="text-sm text-foreground">{company.industry}</p>
                  </div>
                )}

                {/* Employee count */}
                {company.employee_count && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Employee count</span>
                    </div>
                    <p className="text-sm text-foreground">{company.employee_count}</p>
                  </div>
                )}

                {/* Est. Revenue */}
                {company.est_revenue && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Est. Revenue</span>
                    </div>
                    <p className="text-sm text-foreground">{company.est_revenue}</p>
                  </div>
                )}

                {/* Company type */}
                {company.company_type && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Company type</span>
                    </div>
                    <p className="text-sm text-foreground">{company.company_type}</p>
                  </div>
                )}

                {/* Location */}
                {company.location && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Location</span>
                    </div>
                    <p className="text-sm text-foreground">{company.location}</p>
                  </div>
                )}

                {/* LinkedIn */}
                {company.linkedin_url && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">LinkedIn</span>
                    </div>
                    <a
                      href={company.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground underline decoration-dotted hover:decoration-solid"
                    >
                      {company.linkedin_url}
                    </a>
                  </div>
                )}

                {/* Tech Stack */}
                {company.tech_stack && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">Tech Stack</span>
                    </div>
                    <p className="text-sm text-foreground">{company.tech_stack}</p>
                  </div>
                )}

                {/* See Less Button */}
                <button
                  onClick={() => setIsCompanyDetailsExpanded(false)}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>See less</span>
                  <ChevronDown className="h-4 w-4 transition-transform rotate-180" />
                </button>
              </div>
            )}

            {!isCompanyDetailsExpanded && (
              <button
                onClick={() => setIsCompanyDetailsExpanded(true)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>See more</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Separator */}
      {company.primary_contact && (company.industry || company.contacts || company.upcoming_meetings) && (
        <Separator />
      )}

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-3">
          {/* Summary */}
          {company.summary && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Summary</h3>
              <p className="text-sm text-foreground leading-relaxed">{company.summary}</p>
            </div>
          )}

          {/* Divider */}
          {company.summary && company.recent_news && company.recent_news.length > 0 && (
            <Separator className="mt-6" />
          )}

          {/* Recent News */}
          {company.recent_news && company.recent_news.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent News</h3>
              <ul className="space-y-2">
                {company.recent_news.map((newsItem, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0 mt-1">•</span>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm text-foreground">{newsItem.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{newsItem.date}</p>
                        {newsItem.source && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <a
                              href={newsItem.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-foreground underline decoration-dotted hover:decoration-solid"
                            >
                              Source
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Divider */}
          {company.recent_news && company.recent_news.length > 0 && (company.founded || company.total_funding_raised || company.num_funding_rounds || company.latest_funding_stage || company.latest_funding_round) && (
            <Separator className="mt-6" />
          )}

          {/* Funding Information */}
          {(company.founded || company.total_funding_raised || company.num_funding_rounds || company.latest_funding_stage || company.latest_funding_round) && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Funding Information</h3>
              <div className="space-y-3">
                {company.founded && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Founded</span>
                    <p className="text-sm text-foreground">{company.founded}</p>
                  </div>
                )}
                {company.total_funding_raised && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Total Funding Raised</span>
                    <p className="text-sm text-foreground">{company.total_funding_raised}</p>
                  </div>
                )}
                {company.num_funding_rounds !== null && company.num_funding_rounds !== undefined && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Number of Rounds</span>
                    <p className="text-sm text-foreground">{company.num_funding_rounds}</p>
                  </div>
                )}
                {company.latest_funding_stage && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Latest Stage</span>
                    <p className="text-sm text-foreground">{company.latest_funding_stage}</p>
                  </div>
                )}
                {company.latest_funding_round && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Latest Round</span>
                    <p className="text-sm text-foreground">{company.latest_funding_round}</p>
                  </div>
                )}
                {company.latest_funding_date && (
                  <div className="grid grid-cols-[160px_1fr] gap-6">
                    <span className="text-sm font-medium text-muted-foreground">Last Funding Date</span>
                    <p className="text-sm text-foreground">{company.latest_funding_date}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          {(company.founded || company.total_funding_raised || company.num_funding_rounds || company.latest_funding_stage || company.latest_funding_round) && company.hiring_signals && company.hiring_signals.length > 0 && (
            <Separator className="mt-6" />
          )}

          {/* Hiring Signals */}
          {company.hiring_signals && company.hiring_signals.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Hiring Signals</h3>
              <ul className="space-y-2">
                {company.hiring_signals.map((signal, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground flex-shrink-0">•</span>
                      <span className="text-sm text-foreground">{signal.role}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground bg-slate-100 px-2.5 py-1 rounded-full">{signal.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </TabsContent>

        {/* Research Tab */}
        <TabsContent value="research" className="mt-6 space-y-3">
          {/* Company Overview */}
          {company.company_overview && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Company Overview</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{company.company_overview}</p>
            </div>
          )}

          {/* Divider */}
          {company.company_overview && (company.product_offering && company.product_offering.length > 0) && (
            <Separator className="mt-6" />
          )}

          {/* Product Offering */}
          {company.product_offering && company.product_offering.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Product Offering</h3>
              <ul className="space-y-2">
                {company.product_offering.map((offering, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0 mt-1">•</span>
                    <p className="text-sm text-foreground">{offering}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fallback message if no content */}
          {!company.company_overview && (!company.product_offering || company.product_offering.length === 0) && (
            <p className="text-sm text-muted-foreground">No research information available</p>
          )}
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts" className="mt-6">
          {company.contacts && company.contacts.length > 0 ? (
            <div className="space-y-3">
              {company.contacts.map((contact) => (
                <UnifiedContactCard key={contact.name} contact={contact} variant="compact" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No contacts available</p>
          )}
        </TabsContent>

        {/* Meetings Tab */}
        <TabsContent value="meetings" className="mt-6 space-y-6">
          {/* Upcoming Meetings */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming</h3>
            {company.upcoming_meetings && company.upcoming_meetings.length > 0 ? (
              <div className="space-y-2">
                {company.upcoming_meetings.map((meeting, index) => (
                  <MeetingCard
                    key={index}
                    date={meeting.date}
                    title={meeting.title}
                    time={meeting.time}
                    attendees={meeting.attendees}
                    variant="upcoming"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming meetings scheduled</p>
            )}
          </div>

          {/* Divider */}
          {(company.upcoming_meetings && company.upcoming_meetings.length > 0) && (company.past_meetings && company.past_meetings.length > 0) && (
            <Separator />
          )}

          {/* Past Meetings */}
          {company.past_meetings && company.past_meetings.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Past</h3>
              <div className="space-y-2">
                {company.past_meetings.map((meeting, index) => (
                  <MeetingCard
                    key={index}
                    date={meeting.date}
                    title={meeting.title}
                    time={meeting.time}
                    attendees={meeting.attendees}
                    variant="past"
                  />
                ))}
              </div>
            </div>
          )}

          {/* No meetings fallback */}
          {(!company.upcoming_meetings || company.upcoming_meetings.length === 0) && (!company.past_meetings || company.past_meetings.length === 0) && (
            <p className="text-sm text-muted-foreground">No meetings scheduled</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({
  company,
  hideTopBar = false,
}) => {
  if (hideTopBar) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 w-full">
            <CompanyHeader company={company} />

            <MetadataRows company={company} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Full-width header - sticky */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <TopBar companyName={company.name || 'Unknown'} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
            <CompanyHeader company={company} />

            <MetadataRows company={company} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
