import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Deal, DealStage, Momentum } from '@/types';
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
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Box,
  PlusCircle,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  User,
  LayoutGrid,
  Square,
  MessageSquare,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  PanelLeft,
  Table as TableIcon,
  Columns,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface DealsPageProps {
  deals: Deal[];
  initialView?: 'board' | 'table';
  onViewChange?: (view: 'board' | 'table') => void;
}

const stageConfig: Record<DealStage, { bg: string; text: string; border: string }> = {
  'First meeting scheduled': { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  'Discovery & Qualification': { bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-200' },
  'Demo': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  'Proposal / Negotiation': { bg: 'bg-sky-50', text: 'text-sky-900', border: 'border-sky-200' },
  'Closed Won': { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  'Closed Lost': { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200' },
};

const momentumConfig: Record<Momentum, { bg: string; text: string; border: string; dot: string }> = {
  Strong: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300', dot: 'bg-emerald-400' },
  Stalled: { bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-300', dot: 'bg-yellow-400' },
  'At risk': { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300', dot: 'bg-rose-400' },
  Closed: { bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300', dot: 'bg-slate-400' },
  Active: { bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300', dot: 'bg-blue-400' },
};

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StageCell({ stage }: { stage: DealStage }) {
  const config = stageConfig[stage];

  return (
    <Badge
      variant="outline"
      className={`${config.bg} ${config.text} ${config.border} font-normal text-xs rounded-md px-2.5 py-0.5`}
    >
      {stage}
    </Badge>
  );
}

function MomentumCell({ momentum }: { momentum: Momentum }) {
  const config = momentumConfig[momentum];
  return (
    <Badge
      variant="outline"
      className={`${config.bg} ${config.text} ${config.border} font-normal text-xs rounded-md px-2.5 py-0.5`}
    >
      {momentum}
    </Badge>
  );
}

type SortField = 'stage_name' | 'name' | 'momentum' | 'last_meeting' | 'next_meeting' | 'owner_name' | 'company_name';
type SortDir = 'asc' | 'desc';

const allStages: DealStage[] = [
  'First meeting scheduled',
  'Discovery & Qualification',
  'Demo',
  'Proposal / Negotiation',
  'Closed Won',
  'Closed Lost',
];

const allMomentums: Momentum[] = ['Strong', 'Active', 'Stalled', 'At risk', 'Closed'];

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
      className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
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
        <ChevronsUpDown className="h-3 w-3 text-muted-foreground/40" />
      )}
    </button>
  );
}

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
  const config = momentumConfig[deal.momentum];
  return (
    <div
      className="bg-white border border-slate-200 rounded-md cursor-pointer hover:shadow-md transition-shadow relative flex flex-col"
      onClick={onClick}
    >
      {/* Owner Avatar - Top Right */}
      <div className="absolute top-3 right-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 cursor-help">
                {deal.owner_name.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              {deal.owner_name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main content - grows to fill space */}
      <div className="p-3 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-1">
          {deal.company_logo_url ? (
            <>
              <div className="logo-frame w-6 h-6 rounded flex-shrink-0 border border-slate-300 bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={deal.company_logo_url}
                  alt={deal.company_name}
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
                className="logo-fallback w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[8px] leading-none text-gray-600 bg-gray-200 hidden"
                style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
              >
                {deal.company_name.charAt(0).toUpperCase()}.
              </span>
            </>
          ) : (
            <span
              className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[8px] leading-none text-gray-600 bg-gray-200"
              style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
            >
              {deal.company_name.charAt(0).toUpperCase()}.
            </span>
          )}
          <span className="text-sm font-medium text-foreground truncate">{deal.company_name}</span>
        </div>
        <div className="flex items-center gap-1 min-w-0 pr-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="cursor-help pointer-events-auto flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${config.dot}`} />
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {deal.momentum}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-xs text-muted-foreground line-clamp-2 flex-1 min-w-0">{deal.name}</div>
        </div>

        {/* MEDDIC section */}
        {deal.meddic_completion && (
          <div className="text-xs text-muted-foreground line-clamp-3 mt-2">
            <div className="font-medium">
              MEDDIC: {deal.meddic_completion.complete}/{deal.meddic_completion.complete + deal.meddic_completion.partial + deal.meddic_completion.missing} completed
            </div>
            {deal.meddic_completion.gaps && deal.meddic_completion.gaps.length > 0 && (
              <div className="text-muted-foreground text-[10px] mt-0.5">
                gaps: {deal.meddic_completion.gaps.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Tray - Next meeting */}
      <div className="bg-slate-50 border-t border-slate-200 rounded-b-md px-3 py-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3 flex-shrink-0" />
        <span className="text-xs font-medium">Next meeting:</span>
        <span className="truncate">{deal.next_meeting ? formatShortDate(deal.next_meeting) : 'No meeting scheduled'}</span>
      </div>
    </div>
  );
}

function KanbanBoardView({ deals, onDealClick }: { deals: Deal[]; onDealClick: (dealId: string) => void }) {
  const dealsByStage = React.useMemo(() => {
    const grouped: Record<DealStage, Deal[]> = {
      'First meeting scheduled': [],
      'Discovery & Qualification': [],
      'Demo': [],
      'Proposal / Negotiation': [],
      'Closed Won': [],
      'Closed Lost': [],
    };

    deals.forEach((deal) => {
      grouped[deal.stage_name].push(deal);
    });

    return grouped;
  }, [deals]);

  return (
    <div className="flex gap-4 h-full pb-4">
      {allStages.map((stage) => {
        const stageDeals = dealsByStage[stage];
        const config = stageConfig[stage];

        return (
          <div key={stage} className="w-[340px] flex-shrink-0 flex flex-col">
            <div className={`${config.bg} ${config.border} border rounded-t-lg px-3 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${config.text}`}>{stage}</span>
                <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                  {stageDeals.length}
                </Badge>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
              {stageDeals.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No deals
                </div>
              ) : (
                stageDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} onClick={() => onDealClick(deal.id)} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const DealsPage: React.FC<DealsPageProps> = ({ deals, initialView = 'table', onViewChange }) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [stageFilters, setStageFilters] = React.useState<Set<DealStage>>(new Set());
  const [momentumFilters, setMomentumFilters] = React.useState<Set<Momentum>>(new Set());
  const [sortField, setSortField] = React.useState<SortField>('last_meeting');
  const [sortDir, setSortDir] = React.useState<SortDir>('desc');
  const [viewMode, setViewMode] = React.useState<'table' | 'board'>(initialView);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'last_meeting' || field === 'next_meeting' ? 'desc' : 'asc');
    }
  };

  const toggleStageFilter = (stage: DealStage) => {
    setStageFilters((prev) => {
      const next = new Set(prev);
      if (next.has(stage)) next.delete(stage);
      else next.add(stage);
      return next;
    });
  };

  const toggleMomentumFilter = (m: Momentum) => {
    setMomentumFilters((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  };

  const filtered = React.useMemo(() => {
    let list = [...deals];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.company_name.toLowerCase().includes(q) ||
          d.stage_name.toLowerCase().includes(q) ||
          d.owner_name.toLowerCase().includes(q)
      );
    }

    // Stage filter
    if (stageFilters.size > 0) {
      list = list.filter((d) => stageFilters.has(d.stage_name));
    }

    // Momentum filter
    if (momentumFilters.size > 0) {
      list = list.filter((d) => momentumFilters.has(d.momentum));
    }

    // Sort
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (sortField === 'last_meeting' || sortField === 'next_meeting') {
        return (new Date(aVal).getTime() - new Date(bVal).getTime()) * dir;
      }

      return String(aVal).localeCompare(String(bVal)) * dir;
    });

    return list;
  }, [deals, search, stageFilters, momentumFilters, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedDeals = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, stageFilters, momentumFilters]);

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
                  <BreadcrumbPage>Deals</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <Box className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Deals</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
          <Input
            placeholder="Filter deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-56 text-sm"
          />

          {/* Deal stage filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1.5 h-8 text-sm font-normal ${stageFilters.size > 0 ? 'border-foreground/30' : ''}`}
              >
                {stageFilters.size > 0 ? (
                  <span
                    className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStageFilters(new Set());
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </span>
                ) : (
                  <PlusCircle className="h-3.5 w-3.5" />
                )}
                Deal stage
                {stageFilters.size > 0 && (
                  <>
                    <span className="mx-0.5 h-4 w-px bg-border" />
                    <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                      {stageFilters.size}
                    </Badge>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <div className="space-y-1">
                {allStages.map((stage) => (
                  <label
                    key={stage}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                  >
                    <Checkbox
                      checked={stageFilters.has(stage)}
                      onCheckedChange={() => toggleStageFilter(stage)}
                    />
                    <StageCell stage={stage} />
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Momentum filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-1.5 h-8 text-sm font-normal ${momentumFilters.size > 0 ? 'border-foreground/30' : ''}`}
              >
                {momentumFilters.size > 0 ? (
                  <span
                    className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMomentumFilters(new Set());
                    }}
                  >
                    <X className="h-2.5 w-2.5" />
                  </span>
                ) : (
                  <PlusCircle className="h-3.5 w-3.5" />
                )}
                Momentum
                {momentumFilters.size > 0 && (
                  <>
                    <span className="mx-0.5 h-4 w-px bg-border" />
                    <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                      {momentumFilters.size}
                    </Badge>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="start">
              <div className="space-y-1">
                {allMomentums.map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                  >
                    <Checkbox
                      checked={momentumFilters.has(m)}
                      onCheckedChange={() => toggleMomentumFilter(m)}
                    />
                    <MomentumCell momentum={m} />
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex-1" />
          <div className="flex items-center gap-1 border rounded-md p-0.5">
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1.5 h-7 text-xs font-normal"
              onClick={() => {
                setViewMode('table');
                onViewChange?.('table');
              }}
            >
              <TableIcon className="h-3.5 w-3.5" />
              Table view
            </Button>
            <Button
              variant={viewMode === 'board' ? 'secondary' : 'ghost'}
              size="sm"
              className="gap-1.5 h-7 text-xs font-normal"
              onClick={() => {
                setViewMode('board');
                onViewChange?.('board');
              }}
            >
              <Columns className="h-3.5 w-3.5" />
              By deal stage
            </Button>
          </div>
        </div>
        </div>

        {/* Content area - Table or Board view */}
        {viewMode === 'table' ? (
          <>
            {/* Table */}
            <div className="px-8 flex-1 overflow-y-auto flex flex-col">
              <div className="border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                <Table className="flex-1">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>
                        <SortableHeader label="Deal stage" icon={LayoutGrid} field="stage_name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Company" icon={Building2} field="company_name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Deal name" icon={Box} field="name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Momentum" icon={Square} field="momentum" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Last meeting" icon={MessageSquare} field="last_meeting" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Next meeting" icon={Calendar} field="next_meeting" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                      <TableHead>
                        <SortableHeader label="Owner" icon={User} field="owner_name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDeals.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                          No deals found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedDeals.map((deal) => (
                        <TableRow key={deal.id} className="cursor-pointer" onClick={() => navigate(`/deals/${deal.id}`)}>
                          <TableCell>
                            <StageCell stage={deal.stage_name} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {deal.company_logo_url ? (
                                <img
                                  src={deal.company_logo_url}
                                  alt={deal.company_name}
                                  className="w-4 h-4 rounded object-contain flex-shrink-0 border border-border/50"
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                              ) : null}
                              <span
                                className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px] leading-none text-muted-foreground ${deal.company_logo_url ? 'hidden' : ''}`}
                                style={{ fontFamily: 'Oxanium, sans-serif', fontWeight: 800 }}
                              >
                                {deal.company_name.charAt(0).toUpperCase()}.
                              </span>
                              <span className="text-sm">{deal.company_name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{deal.name}</span>
                          </TableCell>
                          <TableCell>
                            <MomentumCell momentum={deal.momentum} />
                          </TableCell>
                          <TableCell>
                            {deal.last_meeting ? (
                              <Badge variant="outline" className="font-normal text-xs rounded-md px-2.5 py-0.5 gap-1.5 text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {formatShortDate(deal.last_meeting)}
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {deal.next_meeting ? (
                              <span className="text-sm text-muted-foreground">
                                {formatShortDate(deal.next_meeting)}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">No meeting scheduled</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal text-xs rounded-md px-2.5 py-0.5 gap-1.5 text-muted-foreground">
                              <User className="h-3 w-3" />
                              {deal.owner_name}
                            </Badge>
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
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(0)}
                    disabled={page === 0}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(totalPages - 1)}
                    disabled={page >= totalPages - 1}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Board view */}
            <div className="flex-1 min-h-0 overflow-hidden">
              <div className="h-full overflow-auto px-8">
                <KanbanBoardView deals={filtered} onDealClick={(dealId) => navigate(`/deals/${dealId}`)} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DealsPage;
