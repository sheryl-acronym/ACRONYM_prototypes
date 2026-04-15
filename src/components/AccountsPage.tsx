import React from 'react';
import { Account, AccountHealth } from '@/accounts-demo-data';
import { AccountDetailSidePanel } from '@/components/AccountDetailSidePanel';
import { HealthPill } from '@/components/HealthPill';
import { ContactPill } from '@/components/ContactPill';
import { DatePill } from '@/components/DatePill';
import { DealPill } from '@/components/DealPill';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Briefcase,
  PlusCircle,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  User,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  PanelLeft,
  Activity,
  DollarSign,
  RefreshCw,
  Calendar,
  CalendarPlus,
  Clock,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

export type { Account };

interface AccountsPageProps {
  accounts: Account[];
  selectedAccountId?: string;
  onAccountSelect?: (accountId: string) => void;
  onCloseSidePanel?: () => void;
}

type SortField =
  | 'company_name'
  | 'health_status'
  | 'arr'
  | 'renewal_date'
  | 'csm_owner'
  | 'last_meeting'
  | 'days_since_contact'
  | 'next_meeting';

type SortDir = 'asc' | 'desc';

// Anchored demo date so date-based logic works correctly with mock data
const DEMO_TODAY = new Date('2026-03-16');

const allHealthStates: AccountHealth[] = ['Healthy', 'Monitor', 'At Risk'];
const allOwners = ['Jordan Lee', 'Sarah Kim', 'Marcus Chan'];
const renewalWindows = [30, 60, 90] as const;
type RenewalWindow = typeof renewalWindows[number];

// Health sort order: Healthy first when ascending
const healthOrder: AccountHealth[] = ['Healthy', 'Monitor', 'At Risk'];

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatRenewalDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatARR(arr: number | null): string {
  if (arr == null) return '—';
  if (arr >= 1_000_000) return `$${(arr / 1_000_000).toFixed(1)}M`;
  if (arr >= 1_000) return `$${Math.round(arr / 1_000)}K`;
  return `$${arr}`;
}

function getRenewalUrgency(renewalDate: string | null): 'overdue' | 'soon' | 'upcoming' | null {
  if (!renewalDate) return null;
  const renewal = new Date(renewalDate);
  const daysUntil = Math.ceil((renewal.getTime() - DEMO_TODAY.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 90) return 'soon';
  return 'upcoming';
}

function getDaysSinceContact(lastMeeting: string | null): number | null {
  if (!lastMeeting) return null;
  const diff = DEMO_TODAY.getTime() - new Date(lastMeeting).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function SortableHeader({
  label,
  icon: Icon,
  field,
  sortField,
  sortDir,
  onSort,
}: {
  label: string;
  icon: React.ElementType;
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
}) {
  const isActive = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon className="h-3 w-3" />
      {label}
      {isActive ? (
        sortDir === 'asc' ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
      )}
    </button>
  );
}

function AccountLogoCell({ account }: { account: Account }) {
  return (
    <div className="flex items-center gap-2">
      {account.company_logo_url ? (
        <>
          <div className="logo-frame w-6 h-6 rounded flex-shrink-0 border border-slate-200 bg-white flex items-center justify-center overflow-hidden">
            <img
              src={account.company_logo_url}
              alt={account.company_name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                const frame = e.currentTarget.parentElement;
                const fallback = frame?.nextElementSibling;
                if (frame) frame.style.display = 'none';
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
          </div>
          <span
            className="logo-fallback w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[8px] leading-none text-white hidden"
            style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
          >
            {account.company_name.charAt(0).toUpperCase()}.
          </span>
        </>
      ) : (
        <span
          className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[8px] leading-none text-white ${account.company_icon_color}`}
          style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
        >
          {account.company_name.charAt(0).toUpperCase()}.
        </span>
      )}
      <span className="text-sm font-medium">{account.company_name}</span>
    </div>
  );
}

function RenewalCell({ renewalDate }: { renewalDate: string | null }) {
  if (!renewalDate) return <span className="text-sm text-muted-foreground">—</span>;

  const urgency = getRenewalUrgency(renewalDate);
  const formatted = formatRenewalDate(renewalDate);

  const urgencyStyles = {
    overdue: 'text-red-600 font-medium',
    soon: 'text-amber-600 font-medium',
    upcoming: 'text-foreground',
    null: 'text-muted-foreground',
  };

  return (
    <span className={`text-sm ${urgencyStyles[urgency ?? 'null']}`}>
      {formatted}
    </span>
  );
}

export const AccountsPage: React.FC<AccountsPageProps> = ({
  accounts,
  selectedAccountId,
  onAccountSelect,
  onCloseSidePanel,
}) => {
  const selectedAccount = selectedAccountId
    ? accounts.find((a) => a.id === selectedAccountId) ?? null
    : null;
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [healthFilters, setHealthFilters] = React.useState<Set<AccountHealth>>(new Set());
  const [ownerFilters, setOwnerFilters] = React.useState<Set<string>>(new Set());
  const [renewalWindow, setRenewalWindow] = React.useState<RenewalWindow | null>(null);
  const [sortField, setSortField] = React.useState<SortField>('renewal_date');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      // Date fields default desc (most recent first), renewal_date asc (soonest first)
      setSortDir(field === 'last_meeting' || field === 'next_meeting' ? 'desc' : 'asc');
      if (field === 'days_since_contact') setSortDir('desc');
    }
  };

  const toggleHealthFilter = (h: AccountHealth) => {
    setHealthFilters((prev) => {
      const next = new Set(prev);
      if (next.has(h)) next.delete(h);
      else next.add(h);
      return next;
    });
  };

  const toggleOwnerFilter = (owner: string) => {
    setOwnerFilters((prev) => {
      const next = new Set(prev);
      if (next.has(owner)) next.delete(owner);
      else next.add(owner);
      return next;
    });
  };

  const filtered = React.useMemo(() => {
    let list = [...accounts];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.company_name.toLowerCase().includes(q) ||
          a.csm_owner.toLowerCase().includes(q) ||
          a.success_criteria.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (healthFilters.size > 0) {
      list = list.filter((a) => healthFilters.has(a.health_status));
    }

    if (ownerFilters.size > 0) {
      list = list.filter((a) => ownerFilters.has(a.csm_owner));
    }

    if (renewalWindow != null) {
      const cutoff = new Date(DEMO_TODAY.getTime() + renewalWindow * 24 * 60 * 60 * 1000);
      list = list.filter((a) => {
        if (!a.renewal_date) return false;
        const d = new Date(a.renewal_date);
        return d >= DEMO_TODAY && d <= cutoff;
      });
    }

    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;

      if (sortField === 'health_status') {
        const aIdx = healthOrder.indexOf(a.health_status);
        const bIdx = healthOrder.indexOf(b.health_status);
        return (aIdx - bIdx) * dir;
      }

      if (sortField === 'arr') {
        const aVal = a.arr ?? -1;
        const bVal = b.arr ?? -1;
        return (aVal - bVal) * dir;
      }

      if (sortField === 'days_since_contact') {
        const aVal = getDaysSinceContact(a.last_meeting) ?? -1;
        const bVal = getDaysSinceContact(b.last_meeting) ?? -1;
        return (aVal - bVal) * dir;
      }

      if (
        sortField === 'renewal_date' ||
        sortField === 'last_meeting' ||
        sortField === 'next_meeting'
      ) {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        return (new Date(aVal).getTime() - new Date(bVal).getTime()) * dir;
      }

      // String fields: company_name, csm_owner
      const aVal = (a[sortField as keyof Account] as string) ?? '';
      const bVal = (b[sortField as keyof Account] as string) ?? '';
      return String(aVal).localeCompare(String(bVal)) * dir;
    });

    return list;
  }, [accounts, search, healthFilters, ownerFilters, renewalWindow, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  React.useEffect(() => {
    setPage(0);
  }, [search, healthFilters, ownerFilters, renewalWindow]);

  return (
    <>
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Topbar */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Customers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page header */}
        <div className="flex-shrink-0 px-8 pt-8 pb-0">
          <div className="flex items-center gap-2.5 mb-6">
            <Briefcase className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Filter accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-56 text-sm"
            />

            {/* Health filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${healthFilters.size > 0 ? 'border-foreground/30' : ''}`}
                >
                  {healthFilters.size > 0 ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setHealthFilters(new Set());
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Health
                  {healthFilters.size > 0 && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {healthFilters.size}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2" align="start">
                <div className="space-y-1">
                  {allHealthStates.map((h) => (
                    <label
                      key={h}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={healthFilters.has(h)}
                        onCheckedChange={() => toggleHealthFilter(h)}
                      />
                      <HealthPill health={h} />
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Owner filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${ownerFilters.size > 0 ? 'border-foreground/30' : ''}`}
                >
                  {ownerFilters.size > 0 ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setOwnerFilters(new Set()); }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Owner
                  {ownerFilters.size > 0 && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {ownerFilters.size}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2" align="start">
                <div className="space-y-1">
                  {allOwners.map((owner) => (
                    <label
                      key={owner}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={ownerFilters.has(owner)}
                        onCheckedChange={() => toggleOwnerFilter(owner)}
                      />
                      <ContactPill name={owner} isTeamMember />
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Renewal window filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${renewalWindow != null ? 'border-foreground/30' : ''}`}
                >
                  {renewalWindow != null ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setRenewalWindow(null); }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Renewal
                  {renewalWindow != null && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {renewalWindow}d
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2" align="start">
                <div className="space-y-1">
                  {renewalWindows.map((w) => (
                    <button
                      key={w}
                      onClick={() => setRenewalWindow(renewalWindow === w ? null : w)}
                      className={`w-full flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent transition-colors ${renewalWindow === w ? 'font-medium text-foreground' : 'text-muted-foreground'}`}
                    >
                      <span>Next {w} days</span>
                      {renewalWindow === w && <X className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Table */}
        <div className="px-8 flex-1 overflow-y-auto">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <SortableHeader label="Account" icon={Briefcase} field="company_name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Health" icon={Activity} field="health_status" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="ARR" icon={DollarSign} field="arr" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Renewal" icon={RefreshCw} field="renewal_date" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Open deal" icon={Briefcase} field="company_name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Owner" icon={User} field="csm_owner" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Last meeting" icon={MessageSquare} field="last_meeting" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Days since contact" icon={Clock} field="days_since_contact" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Next meeting" icon={Calendar} field="next_meeting" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                      No accounts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((account) => (
                    <TableRow
                      key={account.id}
                      className="cursor-pointer leading-none"
                      onClick={() => onAccountSelect?.(account.id)}
                    >
                      <TableCell>
                        <AccountLogoCell account={account} />
                      </TableCell>
                      <TableCell>
                        <HealthPill health={account.health_status} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium tabular-nums">{formatARR(account.arr)}</span>
                      </TableCell>
                      <TableCell>
                        <RenewalCell renewalDate={account.renewal_date} />
                      </TableCell>
                      <TableCell>
                        {account.active_deal ? (
                          <DealPill deal={account.active_deal.name} />
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ContactPill name={account.csm_owner} isTeamMember />
                      </TableCell>
                      <TableCell>
                        {account.last_meeting && formatShortDate(account.last_meeting) ? (
                          <DatePill date={formatShortDate(account.last_meeting)!} />
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const days = getDaysSinceContact(account.last_meeting);
                          if (days == null) return <span className="text-sm text-muted-foreground">—</span>;
                          const color = days > 30 ? 'text-red-500' : days > 14 ? 'text-amber-500' : 'text-muted-foreground';
                          return <span className={`text-sm tabular-nums ${color}`}>{days}d</span>;
                        })()}
                      </TableCell>
                      <TableCell>
                        {account.next_meeting && formatShortDate(account.next_meeting) ? (
                          <DatePill date={formatShortDate(account.next_meeting)!} />
                        ) : (
                          <button
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground border border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 rounded-sm px-2 py-1 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <CalendarPlus className="h-3 w-3" />
                            Schedule
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-8 py-4 flex items-center justify-between border-t">
          <div className="text-sm text-muted-foreground">
            0 of {filtered.length} row(s) selected.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select
                value={String(rowsPerPage)}
                onValueChange={(val) => {
                  setRowsPerPage(Number(val));
                  setPage(0);
                }}
              >
                <SelectTrigger className="h-8 w-16 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages || 1}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(0)} disabled={page === 0}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(page - 1)} disabled={page === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Account detail side panel */}
    {selectedAccount && (
      <AccountDetailSidePanel
        account={selectedAccount}
        onClose={onCloseSidePanel || (() => {})}
      />
    )}
    </>
  );
};

export default AccountsPage;
