import React from 'react';
import { FAQ } from '@/faqs-demo-data';
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
  HelpCircle,
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

interface FAQsPageProps {
  faqs: FAQ[];
}

const categoryConfig: Record<string, { bg: string; text: string; border: string }> = {
  'Company': { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  'Product & Pricing': { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-200' },
  'Integration & Technical': { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  'Implementation': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  'Compliance & Operations': { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-200' },
};

function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category];
  return (
    <Badge
      variant="outline"
      className={`${config.bg} ${config.text} ${config.border} font-normal text-xs rounded-md px-2.5 py-0.5`}
    >
      {category}
    </Badge>
  );
}

type SortField = 'category' | 'question' | 'answer';
type SortDir = 'asc' | 'desc';

const allCategories: Array<'Company' | 'Product & Pricing' | 'Integration & Technical' | 'Implementation' | 'Compliance & Operations'> = [
  'Company',
  'Product & Pricing',
  'Integration & Technical',
  'Implementation',
  'Compliance & Operations',
];

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

export const FAQsPage: React.FC<FAQsPageProps> = ({ faqs }) => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [categoryFilters, setCategoryFilters] = React.useState<Set<string>>(new Set());
  const [personaFilters, setPersonaFilters] = React.useState<Set<string>>(new Set());
  const [sortField, setSortField] = React.useState<SortField>('category');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');

  // Extract unique personas from all FAQs
  const allPersonas = React.useMemo(() => {
    const personas = new Set<string>();
    faqs.forEach((faq) => {
      faq.typically_asked_by.forEach((persona) => {
        personas.add(persona);
      });
    });
    return Array.from(personas).sort();
  }, [faqs]);

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

  const togglePersonaFilter = (persona: string) => {
    setPersonaFilters((prev) => {
      const next = new Set(prev);
      if (next.has(persona)) next.delete(persona);
      else next.add(persona);
      return next;
    });
  };

  const filtered = React.useMemo(() => {
    let list = [...faqs];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.typically_asked_by.some((persona) => persona.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilters.size > 0) {
      list = list.filter((item) => categoryFilters.has(item.category));
    }

    // Persona filter
    if (personaFilters.size > 0) {
      list = list.filter((item) =>
        item.typically_asked_by.some((persona) => personaFilters.has(persona))
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

      return String(aVal).localeCompare(String(bVal)) * dir;
    });

    return list;
  }, [faqs, search, categoryFilters, personaFilters, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedFAQs = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, categoryFilters, personaFilters]);

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
                  <BreadcrumbPage>FAQs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <HelpCircle className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">FAQs</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Filter FAQs..."
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
                      <CategoryBadge category={category} />
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Persona filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1.5 h-8 text-sm font-normal ${personaFilters.size > 0 ? 'border-foreground/30' : ''}`}
                >
                  {personaFilters.size > 0 ? (
                    <span
                      className="h-3.5 w-3.5 flex items-center justify-center rounded-sm bg-foreground text-background cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPersonaFilters(new Set());
                      }}
                    >
                      <X className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <PlusCircle className="h-3.5 w-3.5" />
                  )}
                  Typically Asked By
                  {personaFilters.size > 0 && (
                    <>
                      <span className="mx-0.5 h-4 w-px bg-border" />
                      <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-xs font-normal">
                        {personaFilters.size}
                      </Badge>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2 max-h-64 overflow-y-auto" align="start">
                <div className="space-y-1">
                  {allPersonas.map((persona) => (
                    <label
                      key={persona}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <Checkbox
                        checked={personaFilters.has(persona)}
                        onCheckedChange={() => togglePersonaFilter(persona)}
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
                    <SortableHeader label="Question" field="question" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Answer" field="answer" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>Typically Asked By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFAQs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      No FAQs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedFAQs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell>
                        <CategoryBadge category={faq.category} />
                      </TableCell>
                      <TableCell style={{ width: '320px' }}>
                        <span className="text-sm font-medium">{faq.question}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</span>
                      </TableCell>
                      <TableCell>
                        {faq.typically_asked_by.length > 0 ? (
                          <div className="flex flex-wrap gap-1 w-72 max-h-14 overflow-hidden">
                            {faq.typically_asked_by.slice(0, 2).map((persona, idx) => (
                              <Badge key={idx} variant="outline" className="font-normal text-xs rounded-md px-2 py-1 flex-shrink-0">
                                {persona}
                              </Badge>
                            ))}
                            {faq.typically_asked_by.length > 2 && (
                              <Badge variant="secondary" className="font-normal text-xs rounded-md px-2 py-1 flex-shrink-0">
                                +{faq.typically_asked_by.length - 2}
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

export default FAQsPage;
