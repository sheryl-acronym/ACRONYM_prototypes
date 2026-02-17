import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Building2,
  PlusCircle,
  X,
  Search,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DatePill } from '@/components/DatePill';
import { PersonaPill } from '@/components/PersonaPill';
import { CompanyPill } from '@/components/CompanyPill';
import { ContactDetailSidePanel } from '@/components/ContactDetailSidePanel';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface Contact {
  id: string;
  name: string;
  email: string;
  last_meeting: string | null;
  buyer_persona: string | null;
  company?: string | null;
  job_title?: string | null;
  reports_to?: string | null;
  linkedin_url?: string | null;
  personal_markers?: string[] | null;
}

interface ContactsPageProps {
  contacts: Contact[];
  selectedContactId?: string;
  onContactSelect?: (contactId: string) => void;
  onCloseSidePanel?: () => void;
}

type SortField = 'name' | 'last_meeting' | 'buyer_persona' | 'company';
type SortDir = 'asc' | 'desc';

function formatShortDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
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

export const ContactsPage: React.FC<ContactsPageProps> = ({
  contacts,
  selectedContactId,
  onContactSelect,
  onCloseSidePanel,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [buyerPersonaFilter, setBuyerPersonaFilter] = React.useState('');
  const [companyFilter, setCompanyFilter] = React.useState('');
  const [companySearchFilter, setCompanySearchFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [sortField, setSortField] = React.useState<SortField>('name');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'last_meeting' ? 'desc' : 'asc');
    }
  };

  const filtered = React.useMemo(() => {
    let list = [...contacts];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.buyer_persona?.toLowerCase().includes(q) ?? false)
      );
    }

    // Buyer persona filter
    if (buyerPersonaFilter) {
      list = list.filter((c) => c.buyer_persona === buyerPersonaFilter);
    }

    // Company filter
    if (companyFilter) {
      list = list.filter((c) => c.company === companyFilter);
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
  }, [contacts, search, buyerPersonaFilter, companyFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedContacts = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, buyerPersonaFilter, companyFilter]);

  // Get unique buyer personas
  const uniquePersonas = React.useMemo(() => {
    const personas = new Set<string>();
    contacts.forEach((c) => {
      if (c.buyer_persona) {
        personas.add(c.buyer_persona);
      }
    });
    return Array.from(personas).sort();
  }, [contacts]);

  // Get unique companies
  const uniqueCompanies = React.useMemo(() => {
    const companies = new Set<string>();
    contacts.forEach((c) => {
      if (c.company) {
        companies.add(c.company);
      }
    });
    return Array.from(companies).sort();
  }, [contacts]);

  // Get selected contact
  const selectedContact = React.useMemo(() => {
    if (!selectedContactId) return undefined;
    return contacts.find((c) => c.id === selectedContactId);
  }, [selectedContactId, contacts]);

  return (
    <>
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
                  <BreadcrumbPage>Contacts</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            </div>
          </div>
          {/* Page header */}
          <div className="px-8 pt-8 pb-0 flex-shrink-0">
            {/* Title */}
            <div className="flex items-center gap-2.5 mb-6">
              <User className="h-5 w-5 text-foreground" />
              <h1 className="text-2xl font-bold text-foreground">Contacts</h1>
            </div>
            {/* Filter bar */}
            <div className="flex items-center gap-2 mb-6">
              <Input
                placeholder="Filter contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-56 text-sm"
              />

              {/* Buyer Persona filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1.5 h-8 text-sm font-normal ${buyerPersonaFilter ? 'border-foreground/30' : ''}`}
                  >
                    {buyerPersonaFilter ? (
                      <span
                        className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBuyerPersonaFilter('');
                        }}
                      >
                        <X className="h-2.5 w-2.5" />
                      </span>
                    ) : (
                      <PlusCircle className="h-3.5 w-3.5" />
                    )}
                    Buyer Persona
                    {buyerPersonaFilter && (
                      <>
                        <span className="mx-0.5 h-4 w-px bg-border" />
                        <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                          1
                        </Badge>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="space-y-1">
                    {uniquePersonas.map((persona) => (
                      <label
                        key={persona}
                        className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                      >
                        <Checkbox
                          checked={buyerPersonaFilter === persona}
                          onCheckedChange={() => {
                            if (buyerPersonaFilter === persona) {
                              setBuyerPersonaFilter('');
                            } else {
                              setBuyerPersonaFilter(persona);
                            }
                          }}
                        />
                        <span>{persona}</span>
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Company filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1.5 h-8 text-sm font-normal ${companyFilter ? 'border-foreground/30' : ''}`}
                  >
                    {companyFilter ? (
                      <span
                        className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompanyFilter('');
                        }}
                      >
                        <X className="h-2.5 w-2.5" />
                      </span>
                    ) : (
                      <PlusCircle className="h-3.5 w-3.5" />
                    )}
                    Company
                    {companyFilter && (
                      <>
                        <span className="mx-0.5 h-4 w-px bg-border" />
                        <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                          1
                        </Badge>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="start">
                  <div className="space-y-2">
                    <div className="relative flex items-center">
                      <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none flex-shrink-0" />
                      <Input
                        placeholder="Search..."
                        value={companySearchFilter}
                        onChange={(e) => setCompanySearchFilter(e.target.value)}
                        className="h-7 text-xs pl-7 pr-2 focus:ring-0 focus:border-input"
                      />
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {uniqueCompanies
                        .filter((company) =>
                          company.toLowerCase().includes(companySearchFilter.toLowerCase())
                        )
                        .map((company) => (
                          <label
                            key={company}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                          >
                            <Checkbox
                              checked={companyFilter === company}
                              onCheckedChange={() => {
                                if (companyFilter === company) {
                                  setCompanyFilter('');
                                } else {
                                  setCompanyFilter(company);
                                }
                              }}
                            />
                            <span className="flex-1">{company}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

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
                        label="Name"
                        icon={User}
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
                        label="Buyer persona"
                        icon={User}
                        field="buyer_persona"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    </TableHead>
                    <TableHead>
                      <SortableHeader
                        label="Company"
                        icon={Building2}
                        field="company"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                        No contacts found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedContacts.map((contact) => (
                      <TableRow
                        key={contact.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => onContactSelect?.(contact.id)}
                      >
                        <TableCell>
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8 flex-shrink-0 mt-0.5">
                              <AvatarFallback className="text-xs font-medium">
                                {getInitials(contact.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium">{contact.name}</span>
                              <span className="text-sm text-muted-foreground">{contact.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.last_meeting ? (
                            <DatePill date={formatShortDate(contact.last_meeting) || ''} />
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {contact.buyer_persona ? (
                            <PersonaPill persona={contact.buyer_persona} />
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {contact.company ? (
                            <CompanyPill company_name={contact.company} />
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
      </div>

      {/* Contact Detail Side Panel */}
      {selectedContactId && selectedContact && (
        <ContactDetailSidePanel
          contactId={selectedContactId}
          contact={selectedContact}
          onClose={onCloseSidePanel || (() => {})}
        />
      )}
    </>
  );
};

export default ContactsPage;
