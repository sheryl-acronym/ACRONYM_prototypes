import React from 'react';
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
import type { ContactCardData } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { DatePill } from '@/components/DatePill';
import { CustomerProfilePill } from '@/components/CustomerProfilePill';
import { CompanyDetailSidePanel } from '@/components/CompanyDetailSidePanel';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

export interface Company {
  id: string;
  name: string;
  domain: string;
  logo_url?: string;
  icon_color: string;
  last_meeting: string | null;
  next_meeting: string | null;
  customer_profile: string | null;
  employee_count: string | null;
  est_revenue: string | null;
  summary: string | null;
  recent_news?: Array<{
    date: string;
    title: string;
    source?: string;
  }>;
  total_funding_raised: string | null;
  num_funding_rounds: number | null;
  latest_funding_stage: string | null;
  latest_funding_round: string | null;
  hiring_signals?: Array<{
    role: string;
    count: number;
  }>;
  deal: string | null;
  deal_momentum: 'Strong' | 'Stalled' | 'At risk' | 'Closed' | 'Active' | null;
  primary_contact: string | null;
  primary_contact_color?: string;
  linkedin_url: string | null;
  industry: string | null;
  company_type: string | null;
  location: string | null;
  tech_stack: string | null;
  contacts?: ContactCardData[];
  upcoming_meetings?: Array<{
    date: string;
    title: string;
    time: string;
    attendees: Array<{ name: string; email?: string; contact_role?: 'buyer' | 'seller' }>;
  }>;
}

interface CompaniesPageProps {
  companies: Company[];
}

type SortField = 'name' | 'domain' | 'last_meeting' | 'customer_profile';
type SortDir = 'asc' | 'desc';

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
      <Icon className="h-3.5 w-3.5" />
      {label}
      {isActive ? (
        sortDir === 'asc' ? (
          <ArrowUp className="h-3.5 w-3.5" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5" />
        )
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
      )}
    </button>
  );
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ companies }) => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');
  const [selectedCompanyId, setSelectedCompanyId] = React.useState<string | null>(null);

  // Update selected company ID from URL on mount and when URL changes
  React.useEffect(() => {
    const updateSelectedId = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedCompanyId(params.get('company'));
    };

    updateSelectedId();
    window.addEventListener('popstate', updateSelectedId);
    return () => window.removeEventListener('popstate', updateSelectedId);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'last_meeting' ? 'desc' : 'asc');
    }
  };

  const filtered = React.useMemo(() => {
    let list = [...companies];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          (c.customer_profile?.toLowerCase().includes(q) ?? false)
      );
    }

    // Sort
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (sortField === 'last_meeting') {
        return (new Date(aVal).getTime() - new Date(bVal).getTime()) * dir;
      }

      return String(aVal).localeCompare(String(bVal)) * dir;
    });

    return list;
  }, [companies, search, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedCompanies = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search]);

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
                  <BreadcrumbPage>Companies</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <Building2 className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Companies</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Filter companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-56 text-sm"
            />
            <div className="flex-1" />
          </div>
        </div>

        {/* Table */}
        <div className="px-8 flex-1 overflow-y-auto flex flex-col">
          <div className="border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
            <Table className="flex-1">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <SortableHeader
                      label="Name and website"
                      icon={Building2}
                      field="name"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                  <TableHead>
                    <SortableHeader
                      label="Last meeting"
                      icon={Calendar}
                      field="last_meeting"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                  <TableHead>
                    <SortableHeader
                      label="Customer profile"
                      icon={Building2}
                      field="customer_profile"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                      No companies found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCompanies.map((company) => (
                    <TableRow
                      key={company.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setSelectedCompanyId(company.id);
                        const url = new URL(window.location);
                        url.searchParams.set('company', company.id);
                        window.history.pushState({}, '', url);
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {company.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={company.name}
                              className="w-8 h-8 rounded object-contain flex-shrink-0 border border-border/50"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <span
                            className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-base leading-none text-white font-bold ${company.icon_color} ${company.logo_url ? 'hidden' : ''}`}
                            style={{ fontFamily: 'Oxanium, sans-serif' }}
                          >
                            {company.name.charAt(0).toUpperCase()}
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">{company.name}</span>
                            <span className="text-sm text-muted-foreground truncate">{company.domain}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {company.last_meeting ? (
                          <DatePill date={formatShortDate(company.last_meeting) || ''} />
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {company.customer_profile ? (
                          <CustomerProfilePill profile={company.customer_profile} />
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
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
      </div>

      {/* Detail Side Panel */}
      {selectedCompanyId && (
        <CompanyDetailSidePanel
          companyId={selectedCompanyId}
          company={companies.find((c) => c.id === selectedCompanyId)!}
          onClose={() => {
            setSelectedCompanyId(null);
            const url = new URL(window.location);
            url.searchParams.delete('company');
            window.history.pushState({}, '', url);
          }}
        />
      )}
    </div>
  );
};

export default CompaniesPage;
