import React from 'react';
import { CustomerProfile } from '@/customer-profiles-demo-data';
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
  Users,
  PlusCircle,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  PanelLeft,
  X,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface CustomerProfilesPageProps {
  profiles: CustomerProfile[];
}

const categoryConfig: Record<string, { bg: string; text: string; border: string }> = {
  'Ideal': { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  'Secondary': { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  'Emerging': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
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

type SortField = 'category' | 'name' | 'description';
type SortDir = 'asc' | 'desc';

const allCategories: Array<'Ideal' | 'Secondary' | 'Emerging'> = ['Ideal', 'Secondary', 'Emerging'];

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
      className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
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
        <ChevronsUpDown className="h-3 w-3 text-muted-foreground/40" />
      )}
    </button>
  );
}

export const CustomerProfilesPage: React.FC<CustomerProfilesPageProps> = ({ profiles }) => {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(25);
  const [categoryFilters, setCategoryFilters] = React.useState<Set<string>>(new Set());
  const [sortField, setSortField] = React.useState<SortField>('category');
  const [sortDir, setSortDir] = React.useState<SortDir>('asc');

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

  const filtered = React.useMemo(() => {
    let list = [...profiles];

    // Text search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.example_companies.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilters.size > 0) {
      list = list.filter((p) => categoryFilters.has(p.category));
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
  }, [profiles, search, categoryFilters, sortField, sortDir]);

  const paginatedProfiles = filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [search, categoryFilters]);

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
                  <BreadcrumbPage>Customer Profiles</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Page header */}
        <div className="px-8 pt-8 pb-0 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6">
            <Users className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Customer Profiles</h1>
          </div>
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <Input
              placeholder="Filter profiles..."
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
                    <SortableHeader label="Category" field="category" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Profile Name" field="name" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>
                    <SortableHeader label="Description" field="description" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  </TableHead>
                  <TableHead>Example Companies</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProfiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                      No profiles found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <CategoryBadge category={profile.category} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{profile.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground line-clamp-2">{profile.description}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {profile.example_companies.map((company, idx) => (
                            <Badge key={idx} variant="outline" className="font-normal text-xs rounded-md px-2 py-1">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerProfilesPage;
