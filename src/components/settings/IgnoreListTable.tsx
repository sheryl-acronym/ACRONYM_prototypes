import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { type ignore_list_entry } from '@/settings-mock-data';

interface IgnoreListTableProps {
  entries: ignore_list_entry[];
  on_add: (entry: Omit<ignore_list_entry, 'id'>) => void;
  on_delete: (id: string) => void;
  label?: string;
  description?: string;
}

const MATCH_TYPE_LABELS: Record<ignore_list_entry['match_type'], string> = {
  exact: 'Exact email',
  domain: 'Domain',
  contains: 'Contains',
};

export default function IgnoreListTable({
  entries,
  on_add,
  on_delete,
  label = 'Ignore List',
  description,
}: IgnoreListTableProps) {
  const [sheet_open, setSheetOpen] = React.useState(false);
  const [draft_pattern, setDraftPattern] = React.useState('');
  const [draft_match_type, setDraftMatchType] = React.useState<ignore_list_entry['match_type']>('exact');
  const handleSave = () => {
    if (!draft_pattern.trim()) return;
    on_add({ pattern: draft_pattern.trim(), match_type: draft_match_type });
    setDraftPattern('');
    setDraftMatchType('exact');
    setSheetOpen(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-neutral-700">{label}</h3>
            {description && (
              <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSheetOpen(true)}
            className="gap-1.5 h-8 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add entry
          </Button>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-8 text-center">
            <p className="text-sm text-neutral-400">No entries yet</p>
          </div>
        ) : (
          <div className="rounded-lg border border-neutral-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50">
                  <TableHead className="text-xs font-medium text-neutral-500 h-9">Pattern</TableHead>
                  <TableHead className="text-xs font-medium text-neutral-500 h-9">Match Type</TableHead>
                  <TableHead className="w-10 h-9" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id} className="group">
                    <TableCell className="text-sm font-mono text-neutral-800 py-2.5">
                      {entry.pattern}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <Badge variant="secondary" className="text-xs font-normal">
                        {MATCH_TYPE_LABELS[entry.match_type]}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <button
                        onClick={() => on_delete(entry.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 text-neutral-400 transition-all rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add entry sheet */}
      <Sheet open={sheet_open} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-96">
          <SheetHeader>
            <SheetTitle>Add ignore entry</SheetTitle>
            <SheetDescription>
              Specify an email address or domain to exclude from processing.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Pattern</label>
              <Input
                placeholder="e.g. user@example.com or @example.com"
                value={draft_pattern}
                onChange={(e) => setDraftPattern(e.target.value)}
              />
              <p className="text-xs text-neutral-400">
                Use <code className="bg-neutral-100 px-1 rounded text-xs">@domain.com</code> format to match all emails on a domain.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Match type</label>
              <Select
                value={draft_match_type}
                onValueChange={(v) => setDraftMatchType(v as ignore_list_entry['match_type'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exact">Exact email — match this specific address</SelectItem>
                  <SelectItem value="domain">Domain — match any email on this domain</SelectItem>
                  <SelectItem value="contains">Contains — match any email containing this string</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!draft_pattern.trim()} className="flex-1">
                Add entry
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
