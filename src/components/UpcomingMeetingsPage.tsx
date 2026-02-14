import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PastMeeting, Momentum, PreCallBriefData } from '@/types';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Calendar,
  PlusCircle,
  ChevronsUpDown,
  SlidersHorizontal,
  ChevronsRight,
  Maximize2,
  MoreHorizontal,
  Upload,
  PanelLeft,
} from 'lucide-react';
import PreCallBrief from '@/components/PreCallBrief';
import { AttendeeHoverCard } from '@/components/AttendeeHoverCard';

const OVERLAY_BREAKPOINT = 1200;

interface UpcomingMeetingsPageProps {
  meetings: PastMeeting[];
  briefData?: Record<string, PreCallBriefData>;
}

function useIsNarrow(breakpoint: number) {
  const [isNarrow, setIsNarrow] = React.useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches);
    mq.addEventListener('change', handler);
    setIsNarrow(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);

  return isNarrow;
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

const momentumDot: Record<Momentum, string> = {
  Strong: 'bg-green-200',
  Stalled: 'bg-amber-200',
  'At risk': 'bg-red-200',
  Closed: 'bg-gray-200',
  Active: 'bg-blue-200',
};

function SortableHeader({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
      {label}
      <ChevronsUpDown className="h-3 w-3 text-muted-foreground/40" />
    </button>
  );
}

export const UpcomingMeetingsPage: React.FC<UpcomingMeetingsPageProps> = ({ meetings, briefData = {} }) => {
  const [search, setSearch] = React.useState('');
  const [selectedMeetingId, setSelectedMeetingId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const isNarrow = useIsNarrow(OVERLAY_BREAKPOINT);

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

  const panelContent = panelOpen && (
    <>
      {/* Panel toolbar */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSelectedMeetingId(null)}
            title="Close panel"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => navigate(`/meetings/${selectedMeetingId}`)}
            title="Open full page"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Brief content */}
      <div className="[&>div]:pt-2 [&>div]:min-h-0">
        <PreCallBrief data={activeBrief!} hideTopBar />
      </div>
    </>
  );

  return (
    <TooltipProvider>
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
                    <SortableHeader label="Attendees" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {sortedDateKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No upcoming meetings found.
                  </TableCell>
                </TableRow>
              ) : (
                sortedDateKeys.map((dateKey) => (
                  <React.Fragment key={dateKey}>
                    {/* Date group header */}
                    <TableRow className="hover:bg-transparent bg-muted/40">
                      <TableCell colSpan={4} className="py-2 px-4">
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
                          className={`cursor-pointer ${isSelected ? 'bg-muted/60' : ''}`}
                          onClick={() => {
                            if (hasBrief) {
                              setSelectedMeetingId(isSelected ? null : meeting.id);
                            }
                          }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className={`w-4 h-4 rounded-full flex-shrink-0 ${momentumDot[meeting.momentum]} cursor-help`} />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{meeting.momentum}</p>
                                </TooltipContent>
                              </Tooltip>
                              <span className="text-sm">{meeting.deal_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium">{meeting.name}</span>
                              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
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
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {meeting.company_logo_url ? (
                                <img
                                  src={meeting.company_logo_url}
                                  alt={meeting.company_name}
                                  className="w-4 h-4 rounded object-contain flex-shrink-0"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <span className={`w-4 h-4 rounded flex-shrink-0 ${meeting.company_icon_color} ${meeting.company_logo_url ? 'hidden' : ''}`} />
                              <span className="text-sm">{meeting.company_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {meeting.attendees.map((attendee, i) => (
                                <AttendeeHoverCard
                                  key={i}
                                  name={attendee.name}
                                  email={attendee.email}
                                  role={attendee.role}
                                />
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

      {/* Side panel — inline mode (wide screens) */}
      {panelOpen && !isNarrow && (
        <div className="w-[620px] flex-shrink-0 border-l bg-white min-h-screen overflow-y-auto animate-in slide-in-from-right-4 duration-200">
          {panelContent}
        </div>
      )}

      {/* Side panel — overlay mode (narrow screens) */}
      {panelOpen && isNarrow && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 animate-in fade-in duration-200"
            onClick={() => setSelectedMeetingId(null)}
          />
          {/* Overlay panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-[620px] max-w-[90vw] bg-white shadow-xl overflow-y-auto animate-in slide-in-from-right duration-200">
            {panelContent}
          </div>
        </>
      )}
      </div>
    </TooltipProvider>
  );
};

export default UpcomingMeetingsPage;
