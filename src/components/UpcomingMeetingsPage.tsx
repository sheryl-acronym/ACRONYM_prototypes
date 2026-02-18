import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PastMeeting, PreCallBriefData } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Calendar,
  PlusCircle,
  ChevronsUpDown,
  SlidersHorizontal,
  PanelLeft,
} from 'lucide-react';
import { ContactPill } from '@/components/ContactPill';
import { DealPill } from '@/components/DealPill';
import { CompanyPill } from '@/components/CompanyPill';
import { MeetingDetailSidePanel } from '@/components/MeetingDetailSidePanel';

function filterAttendeesByRole(
  attendees: { name: string; email?: string; role?: string; contact_role?: 'buyer' | 'seller' }[],
  contactRole: 'buyer' | 'seller'
) {
  return attendees.filter((a) => a.contact_role === contactRole);
}

interface UpcomingMeetingsPageProps {
  meetings: PastMeeting[];
  briefData?: Record<string, PreCallBriefData>;
}

function formatTimeRange(dateStr: string, duration: string): string {
  const start = new Date(dateStr);
  const mins = parseInt(duration, 10);
  const end = new Date(start.getTime() + mins * 60_000);
  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  return `${fmt(start)} - ${fmt(end)}`;
}

function formatGroupDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
}

function groupByDate(meetings: PastMeeting[]): Record<string, PastMeeting[]> {
  const groups: Record<string, PastMeeting[]> = {};
  for (const meeting of meetings) {
    const dateKey = new Date(meeting.start_time).toDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(meeting);
  }
  return groups;
}


function SortableHeader({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground transition-colors">
      {label}
      <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
    </button>
  );
}

export const UpcomingMeetingsPage: React.FC<UpcomingMeetingsPageProps> = ({ meetings, briefData = {} }) => {
  const [search, setSearch] = React.useState('');
  const [selectedMeetingId, setSelectedMeetingId] = React.useState<string | null>(null);
  const navigate = useNavigate();

  // Update selected meeting ID from URL on mount and when URL changes
  React.useEffect(() => {
    const updateSelectedId = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedMeetingId(params.get('meeting'));
    };

    updateSelectedId();
    window.addEventListener('popstate', updateSelectedId);
    return () => window.removeEventListener('popstate', updateSelectedId);
  }, []);

  const filtered = React.useMemo(() => {
    if (!search) return meetings;
    const q = search.toLowerCase();
    return meetings.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.deal_name.toLowerCase().includes(q) ||
        m.company_name.toLowerCase().includes(q) ||
        m.attendees.some((a) => a.name.toLowerCase().includes(q))
    );
  }, [meetings, search]);

  // Sort chronologically (earliest first) for upcoming
  const sorted = React.useMemo(() => {
    return [...filtered].sort(
      (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );
  }, [filtered]);

  const grouped = React.useMemo(() => groupByDate(sorted), [sorted]);
  const sortedDateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const activeBrief = selectedMeetingId ? briefData[selectedMeetingId] : null;
  const panelOpen = !!activeBrief && !!selectedMeetingId;

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
        {/* Main table area */}
        <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Full-width header - sticky */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/meetings');
                    }}
                  >
                    Meetings
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Upcoming</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <Calendar className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Upcoming</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-1">
            <Input
              placeholder="Filter meetings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-56 text-sm"
            />
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-sm font-normal">
              <PlusCircle className="h-3.5 w-3.5" />
              Company
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-sm font-normal">
              <PlusCircle className="h-3.5 w-3.5" />
              Deal
            </Button>
            <div className="flex-1" />
            <Button variant="outline" size="sm" className="gap-1.5 h-8 text-sm font-normal">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              View
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="px-8 pt-8 pb-8 flex-1 overflow-y-auto flex flex-col">
          <div className="border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <SortableHeader label="Deal" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Meeting" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Company" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Invitees" />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Team" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {sortedDateKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No upcoming meetings found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedDateKeys.map((dateKey) => (
                  <React.Fragment key={dateKey}>
                    {/* Date group header */}
                    <TableRow className="hover:bg-transparent bg-muted/40">
                      <TableCell colSpan={5} className="py-2 px-4">
                        <span className="text-sm font-medium text-foreground">
                          {formatGroupDate(grouped[dateKey][0].start_time)}
                        </span>
                      </TableCell>
                    </TableRow>
                    {/* Meetings in this group */}
                    {grouped[dateKey].map((meeting) => {
                      const hasBrief = !!briefData[meeting.id];
                      const isSelected = selectedMeetingId === meeting.id;
                      return (
                        <TableRow
                          key={meeting.id}
                          className={`cursor-pointer ${isSelected ? 'bg-muted/60' : ''} h-fit`}
                          onClick={() => {
                            if (hasBrief) {
                              if (isSelected) {
                                setSelectedMeetingId(null);
                                const url = new URL(window.location.href);
                                url.searchParams.delete('meeting');
                                window.history.pushState({}, '', url);
                              } else {
                                setSelectedMeetingId(meeting.id);
                                const url = new URL(window.location.href);
                                url.searchParams.set('meeting', meeting.id);
                                window.history.pushState({}, '', url);
                              }
                            }
                          }}
                        >
                          <TableCell className="py-2 px-3">
                            <DealPill deal={meeting.deal_name} momentum={meeting.momentum} />
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium">{meeting.name}</span>
                              <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
                                {meeting.status === 'Now' && (
                                  <span className="text-green-600 font-medium">Now</span>
                                )}
                                {meeting.status === 'Recording' && (
                                  <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                    Recording
                                  </span>
                                )}
                                {meeting.status && <span>&bull;</span>}
                                {formatTimeRange(meeting.start_time, meeting.duration)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <CompanyPill
                              company_name={meeting.company_name}
                              company_logo_url={meeting.company_logo_url}
                            />
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              {filterAttendeesByRole(meeting.attendees, 'buyer').map((attendee, i) => (
                                <ContactPill key={i} name={attendee.name} />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              {filterAttendeesByRole(meeting.attendees, 'seller').map((attendee, i) => (
                                <ContactPill key={i} name={attendee.name} />
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Detail Side Panel */}
      {panelOpen && activeBrief && (
        <MeetingDetailSidePanel
          meetingId={selectedMeetingId!}
          briefData={activeBrief}
          onClose={() => {
            setSelectedMeetingId(null);
            const url = new URL(window.location.href);
            url.searchParams.delete('meeting');
            window.history.pushState({}, '', url);
          }}
        />
      )}
    </div>
  );
};

export default UpcomingMeetingsPage;
