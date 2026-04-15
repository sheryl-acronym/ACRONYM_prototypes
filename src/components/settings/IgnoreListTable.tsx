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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Trash2, Plus, MoreHorizontal, Sparkles } from 'lucide-react';
import { type ignore_list_entry } from '@/settings-mock-data';

interface IgnoreListTableProps {
  entries: ignore_list_entry[];
  on_add: (entry: Omit<ignore_list_entry, 'id'>) => void;
  on_delete: (id: string) => void;
  on_update?: (id: string, skip_when: ignore_list_entry['skip_when']) => void;
  label?: string;
  description?: string;
}

const MATCH_TYPE_LABELS: Record<ignore_list_entry['match_type'], string> = {
  exact: 'email',
  domain: 'domain',
  contains: 'contains',
};

const SKIP_WHEN_OPTIONS: { value: ignore_list_entry['skip_when']; label: string; description: string }[] = [
  { value: 'all_meetings', label: 'All meetings', description: 'Skip when all external attendees match' },
  { value: 'only_external_attendee', label: 'Only external attendee', description: 'Skip when this is the only external attendee' },
  { value: 'organizer_only', label: 'Organizer only', description: 'Skip when this is the meeting organizer' },
];


export default function IgnoreListTable({
  entries,
  on_add,
  on_delete,
  on_update,
  label = 'Ignore List',
  description,
}: IgnoreListTableProps) {
  const [modal_open, setModalOpen] = React.useState(false);
  const [draft_pattern, setDraftPattern] = React.useState('');
  const [draft_match_type, setDraftMatchType] = React.useState<ignore_list_entry['match_type']>('exact');
  const [draft_skip_when, setDraftSkipWhen] = React.useState<ignore_list_entry['skip_when']>('all_meetings');

  const handleSave = () => {
    if (!draft_pattern.trim()) return;
    on_add({ pattern: draft_pattern.trim(), match_type: draft_match_type, skip_when: draft_skip_when });
    setDraftPattern('');
    setDraftMatchType('exact');
    setDraftSkipWhen('all_meetings');
    setModalOpen(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setDraftPattern('');
      setDraftMatchType('exact');
      setDraftSkipWhen('all_meetings');
    }
    setModalOpen(open);
  };

  const handleSkipWhenChange = (id: string, value: string) => {
    const skip_when = value === 'none' ? undefined : value as ignore_list_entry['skip_when'];
    on_update?.(id, skip_when);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4 text-neutral-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
                Clean up existing data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-8 text-center">
            <p className="text-sm text-neutral-400">No entries yet</p>
          </div>
        ) : (
          <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
            {entries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-2.5 group">
                {/* Pattern + match type */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <span className="text-sm font-mono text-neutral-800 truncate">{entry.pattern}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal flex-shrink-0">
                    {MATCH_TYPE_LABELS[entry.match_type]}
                  </Badge>
                </div>

                {/* Skip when dropdown */}
                <Select
                  value={entry.skip_when ?? 'all_meetings'}
                  onValueChange={(v) => handleSkipWhenChange(entry.id, v)}
                >
                  <SelectTrigger className="h-7 text-xs w-44 flex-shrink-0">
                    <SelectValue placeholder="All meetings…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKIP_WHEN_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value!}>
                        <div>
                          <p className="text-sm">{opt.label}</p>
                          <p className="text-xs text-neutral-400">{opt.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Delete */}
                <button
                  onClick={() => on_delete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 text-neutral-400 transition-all rounded flex-shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="mt-2 gap-1.5 h-8 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add entry
        </Button>
      </div>

      <Dialog open={modal_open} onOpenChange={handleClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add ignore entry</DialogTitle>
            <DialogDescription>
              Specify an email address or domain to exclude from processing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Pattern</label>
              <Input
                placeholder="e.g. user@example.com or @example.com"
                value={draft_pattern}
                onChange={(e) => setDraftPattern(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Skip when <span className="font-normal text-neutral-400">(optional)</span></label>
              <Select
                value={draft_skip_when ?? 'none'}
                onValueChange={(v) => setDraftSkipWhen(v === 'none' ? undefined : v as ignore_list_entry['skip_when'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="No condition" />
                </SelectTrigger>
                <SelectContent>
                  {SKIP_WHEN_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value!}>
                      <div>
                        <p className="text-sm">{opt.label}</p>
                        <p className="text-xs text-neutral-400">{opt.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" size="sm" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!draft_pattern.trim()}>
              Add entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
