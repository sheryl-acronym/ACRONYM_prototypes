import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Objection } from '@/objections-demo-data';
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
  AlertCircle,
  PlusCircle,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  PanelLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CategoryPill } from '@/components/CategoryPill';

interface ObjectionsPageProps {
  objections: Objection[];
}

type SortField = 'category' | 'objection' | 'description';
type SortDir = 'asc' | 'desc';

const allCategories: Array<'Fit and Capability' | 'Authority' | 'Alternatives' | 'Risk and Trust' | 'Budget and Value'> = [
  'Fit and Capability',
  'Authority',
  'Alternatives',
  'Risk and Trust',
  'Budget and Value',
];

const categoryOrder: Record<'Fit and Capability' | 'Authority' | 'Alternatives' | 'Risk and Trust' | 'Budget and Value', number> = {
  'Fit and Capability': 0,
  'Authority': 1,
  'Alternatives': 2,
  'Risk and Trust': 3,
  'Budget and Value': 4,
};

function SortableHeader({
  label,
  field,
  sortField,
  sortDir,
  onSort,
}: {
  label: string;
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

export const ObjectionsPage: React.FC<ObjectionsPageProps> = ({ objections }) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [categoryFilters, setCategoryFilters] = React.useState<Set<string>>(new Set());
  const [buyerPersonaFilters, setBuyerPersonaFilters] = React.useState<Set<string>>(new Set());
  const [sortField, setSortField] = React.useState<SortField>('category');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');

  // Extract unique buyer personas from all objections
  const allBuyerPersonas = React.useMemo(() => {
    const personas = new Set<string>();
    objections.forEach((obj) => {
      obj.typically_raised_by.forEach((persona) => {
        personas.add(persona);
      });
    });
    return Array.from(personas).sort();
  }, [objections]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const toggleBuyerPersonaFilter = (persona: string) => {
    setBuyerPersonaFilters((prev) => {
      const next = new Set(prev);
      if (next.has(persona)) next.delete(persona);
      else next.add(persona);
      return next;
    });
  };

  const filtered = React.useMemo(() => {
    let list = [...objections];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.objection.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.typically_raised_by.some((persona) => persona.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilters.size > 0) {
      list = list.filter((item) => categoryFilters.has(item.category));
    }

    // Buyer Persona filter
    if (buyerPersonaFilters.size > 0) {
      list = list.filter((item) =>
        item.typically_raised_by.some((persona) => buyerPersonaFilters.has(persona))
      );
    }

    // Sort
    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;

      if (sortField === 'category') {
        // Use custom category order
        const aOrder = categoryOrder[a.category];
        const bOrder = categoryOrder[b.category];
        return (aOrder - bOrder) * dir;
      }

      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      return String(aVal).localeCompare(String(bVal)) * dir;
    });

    return list;
  }, [objections, search, categoryFilters, buyerPersonaFilters, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedObjections = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, categoryFilters, buyerPersonaFilters]);

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
                  <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                    Playbook
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Objections</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <AlertCircle className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Objections</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Filter objections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-56 text-sm"
            />

            {/* Category filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${categoryFilters.size > 0 ? 'border-foreground/30' : ''}`}
                >
                  {categoryFilters.size > 0 ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoryFilters(new Set());
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Category
                  {categoryFilters.size > 0 && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {categoryFilters.size}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="space-y-1">
                  {allCategories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={categoryFilters.has(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                      />
                      <CategoryPill category={category} />
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Typically Raised By filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${buyerPersonaFilters.size > 0 ? 'border-foreground/30' : ''}`}
                >
                  {buyerPersonaFilters.size > 0 ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBuyerPersonaFilters(new Set());
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Typically Raised By
                  {buyerPersonaFilters.size > 0 && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {buyerPersonaFilters.size}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2 max-h-64 overflow-y-auto" align="start">
                <div className="space-y-1">
                  {allBuyerPersonas.map((persona) => (
                    <label
                      key={persona}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={buyerPersonaFilters.has(persona)}
                        onCheckedChange={() => toggleBuyerPersonaFilter(persona)}
                      />
                      <span className="text-sm">{persona}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex-1" />
          </div>
        </div>

        {/* Table */}
        <div className="px-8 pb-4 flex-1 overflow-y-auto flex flex-col">
          <div className="border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
            <Table className="flex-1">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>
                    <SortableHeader label="Category" field="category" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Objection" field="objection" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Description" field="description" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>Typically Raised By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedObjections.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      No objections found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedObjections.map((objection) => (
                    <TableRow
                      key={objection.id}
                      className="cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => navigate(`/objections/${objection.id}`)}
                    >
                      <TableCell>
                        <CategoryPill category={objection.category} />
                      </TableCell>
                      <TableCell style={{ width: '320px' }}>
                        <span className="text-sm font-medium">{objection.objection}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground line-clamp-2">{objection.description}</span>
                      </TableCell>
                      <TableCell>
                        {objection.typically_raised_by.length > 0 ? (
                          <div className="flex flex-wrap gap-1 w-72 max-h-14 overflow-hidden">
                            {objection.typically_raised_by.slice(0, 2).map((persona, idx) => (
                              <Badge key={idx} variant="outline" className="font-normal text-xs rounded-md px-2 py-1 flex-shrink-0">
                                {persona}
                              </Badge>
                            ))}
                            {objection.typically_raised_by.length > 2 && (
                              <Badge variant="secondary" className="font-normal text-xs rounded-md px-2 py-1 flex-shrink-0">
                                +{objection.typically_raised_by.length - 2}
                              </Badge>
                            )}
                          </div>
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
  );
};

export default ObjectionsPage;
