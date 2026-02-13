import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PastMeeting, Momentum } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
  User,
  Snowflake,
  Loader2,
  AlertCircle,
  PanelLeft,
} from 'lucide-react';

interface PastMeetingsPageProps {
  meetings: PastMeeting[];
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
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

export const PastMeetingsPage: React.FC<PastMeetingsPageProps> = ({ meetings }) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

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

  const grouped = React.useMemo(() => groupByDate(filtered), [filtered]);
  const sortedDateKeys = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <TooltipProvider>
      <div className="flex-1 bg-sidebar h-screen flex flex-col p-3 overflow-hidden">
        <div className="bg-white rounded-lg shadow-md flex flex-col flex-1 overflow-hidden">
      {/* Full-width header */}
      <div className="flex-shrink-0 h-[50px] flex items-center px-3 gap-2">
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
                <BreadcrumbPage>Past Meetings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="px-3">
        <div className="border-t border-slate-200"></div>
      </div>
      {/* Page header */}
      <div className="px-8 pt-8 pb-0">
        {/* Title */}
        <div className="flex items-center gap-2.5 mb-6">
          <Calendar className="h-5 w-5 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">Past Meetings</h1>
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
                  No past meetings found.
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
                  {grouped[dateKey].map((meeting) => (
                    <TableRow key={meeting.id} className="cursor-pointer">
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
                          <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                            {meeting.status === 'Processing' ? (
                              <Loader2 className="h-3 w-3" />
                            ) : meeting.status === 'Error' ? (
                              <AlertCircle className="h-3 w-3 text-red-500" />
                            ) : !meeting.status ? (
                              <Snowflake className="h-3 w-3" />
                            ) : null}
                            {meeting.status && meeting.status !== 'Error' && (
                              <span>{meeting.status} &bull; </span>
                            )}
                            {formatTime(meeting.start_time)} &bull; {meeting.duration}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded flex-shrink-0 ${meeting.company_icon_color}`} />
                          <span className="text-sm">{meeting.company_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {meeting.attendees.map((attendee, i) => (
                            <Badge key={i} variant="outline" className="font-normal text-xs rounded-md px-2.5 py-0.5 gap-1.5 text-muted-foreground">
                              <User className="h-3 w-3" />
                              {attendee.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
          </Table>
        </div>
      </div>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default PastMeetingsPage;
