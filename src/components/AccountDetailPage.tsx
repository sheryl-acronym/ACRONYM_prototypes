import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from '@/accounts-demo-data';
import { HealthPill } from '@/components/HealthPill';
import { ContactPill } from '@/components/ContactPill';
import { MeetingCard } from '@/components/MeetingCard';
import { pastMeetingsData } from '@/past-meetings-data';
import { upcomingMeetingsData } from '@/upcoming-meetings-data';
import { dealsData } from '@/deals-demo-data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  PanelLeft,
  CheckCircle2,
  RefreshCw,
  DollarSign,
  User,
  CalendarDays,
  Clock,
  Activity,
  Calendar,
  CalendarPlus,
  Briefcase,
  Trophy,
  Zap,
  HeartPulse,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

interface AccountDetailPageProps {
  account: Account;
  hideTopBar?: boolean;
}

function formatARR(arr: number | null): string {
  if (arr == null) return '—';
  if (arr >= 1_000_000) return `$${(arr / 1_000_000).toFixed(1)}M`;
  if (arr >= 1_000) return `$${Math.round(arr / 1_000)}K`;
  return `$${arr}`;
}

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const DEMO_TODAY = new Date('2026-03-16');

// --- Meeting helpers ---

function formatMeetingDate(isoStr: string): string {
  const d = new Date(isoStr);
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = String(d.getDate()).padStart(2, '0');
  return `${month} ${day}`;
}

function formatTime12h(isoStr: string): string {
  return new Date(isoStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function parseDurationMins(duration: string): number {
  const m = duration.match(/(\d+)m/);
  if (m) return parseInt(m[1]);
  const h = duration.match(/(\d+)h/);
  if (h) return parseInt(h[1]) * 60;
  return 45;
}

function getEndTime(startIso: string, duration: string): string {
  const d = new Date(startIso);
  d.setMinutes(d.getMinutes() + parseDurationMins(duration));
  return formatTime12h(d.toISOString());
}

function DealCard({
  name,
  stage_name,
  owner_name,
  last_meeting,
  status,
  company_logo_url,
  company_icon_color,
  company_name,
}: {
  name: string;
  stage_name: string;
  owner_name?: string;
  last_meeting?: string | null;
  status: 'won' | 'in_progress' | 'active';
  company_logo_url?: string;
  company_icon_color?: string;
  company_name?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
      {/* Icon */}
      <div className="mt-0.5 flex-shrink-0">
        {company_logo_url ? (
          <div className="w-8 h-8 rounded border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
            <img src={company_logo_url} alt={company_name} className="w-6 h-6 object-contain" />
          </div>
        ) : (
          <div className={`w-8 h-8 rounded flex items-center justify-center ${company_icon_color ?? 'bg-slate-200'}`}>
            <Briefcase className="h-4 w-4 text-white/80" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug truncate">{name}</p>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
            status === 'won'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {status === 'won' ? <Trophy className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
            {stage_name}
          </span>
          {owner_name && (
            <span className="text-xs text-muted-foreground">{owner_name}</span>
          )}
          {last_meeting && (
            <span className="text-xs text-muted-foreground">
              Last meeting {formatShortDate(last_meeting)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DealsTabContent({ account }: { account: Account }) {
  const closedDeals = account.deal_ids
    .map((id) => dealsData.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => d != null);

  const hasAnything = account.active_deal || closedDeals.length > 0;

  if (!hasAnything) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center gap-2">
        <Briefcase className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No deals found</p>
        <p className="text-xs text-muted-foreground/60">
          Closed-won deals and active renewals for {account.company_name} will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {account.active_deal && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Open</h3>
          <div className="space-y-2">
            <DealCard
              name={account.active_deal.name}
              stage_name={account.active_deal.stage_name}
              status="active"
              company_icon_color={account.company_icon_color}
              company_logo_url={account.company_logo_url}
              company_name={account.company_name}
            />
          </div>
        </div>
      )}
      {closedDeals.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Closed won</h3>
          <div className="space-y-2">
            {closedDeals.map((deal) => (
              <DealCard
                key={deal.id}
                name={deal.name}
                stage_name={deal.stage_name}
                owner_name={deal.owner_name}
                last_meeting={deal.last_meeting}
                status="won"
                company_logo_url={deal.company_logo_url}
                company_icon_color={deal.company_icon_color}
                company_name={deal.company_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MeetingsTabContent({ account }: { account: Account }) {
  const allMeetings = [...pastMeetingsData, ...upcomingMeetingsData].filter(
    (m) => m.company_name === account.company_name
  );

  const upcoming = allMeetings
    .filter((m) => new Date(m.start_time) > DEMO_TODAY)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  const past = allMeetings
    .filter((m) => new Date(m.start_time) <= DEMO_TODAY)
    .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

  if (allMeetings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-center gap-2">
        <CalendarDays className="h-8 w-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No meetings found</p>
        <p className="text-xs text-muted-foreground/60">
          Meetings with {account.company_name} contacts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming</h3>
          <div className="space-y-2">
            {upcoming.map((m) => (
              <MeetingCard
                key={m.id}
                date={formatMeetingDate(m.start_time)}
                title={m.name}
                time={`${formatTime12h(m.start_time)} – ${getEndTime(m.start_time, m.duration)}`}
                attendees={m.attendees}
                variant="upcoming"
              />
            ))}
          </div>
        </div>
      )}
      {past.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Past</h3>
          <div className="space-y-2">
            {past.map((m) => (
              <MeetingCard
                key={m.id}
                date={formatMeetingDate(m.start_time)}
                title={m.name}
                startTime={formatTime12h(m.start_time)}
                endTime={getEndTime(m.start_time, m.duration)}
                duration={m.duration}
                attendees={m.attendees}
                variant="past"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getRenewalUrgency(dateStr: string | null): 'overdue' | 'soon' | null {
  if (!dateStr) return null;
  const daysUntil = Math.ceil((new Date(dateStr).getTime() - DEMO_TODAY.getTime()) / 86400000);
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 90) return 'soon';
  return null;
}

function DatePillInline({ dateStr }: { dateStr: string | null }) {
  if (!dateStr) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">{formatShortDate(dateStr)}</span>
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center py-1.5">
      <span className="w-36 text-sm text-muted-foreground flex-shrink-0 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {children}
    </div>
  );
}

function AccountHeader({ account }: { account: Account }) {
  return (
    <div className="flex items-center gap-3">
      {account.company_logo_url ? (
        <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
          <img src={account.company_logo_url} alt={account.company_name} className="w-8 h-8 object-contain" />
        </div>
      ) : (
        <span
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-[11px] leading-none text-white flex-shrink-0 ${account.company_icon_color}`}
          style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
        >
          {account.company_name.charAt(0).toUpperCase()}.
        </span>
      )}
      <div>
        <h1 className="text-xl font-bold text-foreground leading-tight">{account.company_name}</h1>
        <p className="text-sm text-muted-foreground">Customer account</p>
      </div>
    </div>
  );
}

export const AccountDetailPage: React.FC<AccountDetailPageProps> = ({
  account,
  hideTopBar = false,
}) => {
  const navigate = useNavigate();
  const renewalUrgency = getRenewalUrgency(account.renewal_date);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Topbar */}
      {!hideTopBar && (
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/accounts"
                  onClick={(e) => { e.preventDefault(); navigate('/accounts'); }}
                  className="cursor-pointer"
                >
                  Customers
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{account.company_name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">

          <AccountHeader account={account} />

          <Separator className="my-4" />

          {/* Metadata rows */}
          <div className="space-y-0 mb-4">
            <MetaRow icon={Activity} label="Health">
              <HealthPill health={account.health_status} />
            </MetaRow>

            <MetaRow icon={DollarSign} label="ARR">
              <div className="inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border border-gray-200">
                <span className="text-sm font-medium text-foreground">{formatARR(account.arr)}</span>
              </div>
            </MetaRow>

            <MetaRow icon={RefreshCw} label="Renewal">
              {account.renewal_date ? (
                <div className={`inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border ${renewalUrgency === 'overdue' ? 'border-red-300' : renewalUrgency === 'soon' ? 'border-amber-300' : 'border-gray-200'}`}>
                  <span className={`text-sm font-medium ${renewalUrgency === 'overdue' ? 'text-red-600' : renewalUrgency === 'soon' ? 'text-amber-600' : 'text-foreground'}`}>
                    {formatShortDate(account.renewal_date)}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}
            </MetaRow>

            <MetaRow icon={User} label="Owner">
              <ContactPill name={account.csm_owner} isTeamMember />
            </MetaRow>

            <MetaRow icon={Calendar} label="Last meeting">
              <DatePillInline dateStr={account.last_meeting} />
            </MetaRow>

            <MetaRow icon={Clock} label="Days since contact">
              {account.last_meeting ? (() => {
                const days = Math.floor((DEMO_TODAY.getTime() - new Date(account.last_meeting).getTime()) / 86400000);
                const color = days > 30 ? 'text-red-600 border-red-300' : days > 14 ? 'text-amber-600 border-amber-300' : 'text-foreground border-gray-200';
                return (
                  <div className={`inline-flex items-center gap-2 h-6 rounded-md bg-white px-2 border ${color}`}>
                    <span className="text-sm font-medium">{days}d</span>
                  </div>
                );
              })() : <span className="text-sm text-muted-foreground">—</span>}
            </MetaRow>

            <MetaRow icon={CalendarPlus} label="Next meeting">
              <DatePillInline dateStr={account.next_meeting} />
            </MetaRow>
          </div>

          <Separator className="mb-4" />

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList className="h-auto p-0 bg-transparent gap-0 rounded-none border-b border-slate-200 w-full justify-start mb-6">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="deals"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
              >
                Deals
              </TabsTrigger>
              <TabsTrigger
                value="meetings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
              >
                Meetings
              </TabsTrigger>
            </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="m-0">
            <div className="space-y-6">

              {/* Account health summary */}
              {account.health_summary && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Account Health Summary</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Value realization</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{account.health_summary.value_realization}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Renewal outlook</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{account.health_summary.renewal_outlook}</p>
                    </div>
                  </div>
                </section>
              )}

              {account.health_summary && <Separator />}

              {/* Success criteria */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Success Criteria</h2>
                </div>
                <ul className="space-y-2">
                  {account.success_criteria.map((criterion, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-muted-foreground text-xs flex items-center justify-center font-medium">
                        {i + 1}
                      </span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Notes */}
              {account.metadata.notes != null && (
                <>
                  <Separator />
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Notes</h2>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{String(account.metadata.notes)}</p>
                  </section>
                </>
              )}

            </div>
          </TabsContent>

          {/* Deals tab */}
          <TabsContent value="deals" className="m-0">
            <DealsTabContent account={account} />
          </TabsContent>

          {/* Meetings tab */}
          <TabsContent value="meetings" className="m-0">
            <MeetingsTabContent account={account} />
          </TabsContent>
        </Tabs>

        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
