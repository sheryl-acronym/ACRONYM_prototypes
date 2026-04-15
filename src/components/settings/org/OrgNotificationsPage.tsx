import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
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
} from '@/components/ui/dialog';
import { Trash2, Plus, Bell, ArrowRight, Pencil, RefreshCw, ChevronsUpDown, X, ExternalLink } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import {
  initialOrgWorkflows,
  initialOrgSlackSettings,
  SLACK_CHANNELS,
  type org_workflow_instance,
  type workflow_trigger_type,
} from '@/settings-mock-data';

// Reusable inline toggle
function Toggle({ enabled, onToggle, disabled }: { enabled: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={disabled ? undefined : onToggle}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
      style={{ backgroundColor: enabled ? '#10b981' : '#e2e8f0' }}
    >
      <span
        className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        style={{ transform: enabled ? 'translateX(1rem)' : 'translateX(0)' }}
      />
    </button>
  );
}

const TRIGGER_OPTIONS: { value: workflow_trigger_type; label: string }[] = [
  { value: 'post_call', label: 'Post-call summary — after every call' },
  { value: 'weekly', label: 'Weekly pipeline review — recurring schedule' },
];


const WEEKLY_DAY_OPTIONS = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
];


const REP_OPTIONS = [
  { value: 'alice', label: 'Alice Johnson' },
  { value: 'bob', label: 'Bob Smith' },
  { value: 'carol', label: 'Carol Lee' },
  { value: 'dan', label: 'Dan Kim' },
];

interface PostCallFilters {
  reps: string[];
}

const DEFAULT_FILTERS: PostCallFilters = {
  reps: [],
};

const TRIGGER_ICONS: Record<workflow_trigger_type, string> = {
  post_call: 'After call',
  weekly: 'Weekly',
  daily: 'Daily',
};

function RepMultiSelect({
  selected,
  onChange,
  onRemove,
}: {
  selected: string[];
  onChange: (reps: string[]) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filtered = REP_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const selectedLabels = REP_OPTIONS.filter((o) => selected.includes(o.value)).map((o) => o.label);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">Filter by rep</label>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Remove
        </button>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-left hover:bg-neutral-50 transition-colors"
          >
            <span className={selected.length === 0 ? 'text-neutral-400' : 'text-neutral-800'}>
              {selected.length === 0
                ? 'Select reps…'
                : selectedLabels.length <= 2
                ? selectedLabels.join(', ')
                : `${selectedLabels.slice(0, 2).join(', ')} +${selectedLabels.length - 2} more`}
            </span>
            <ChevronsUpDown className="h-3.5 w-3.5 text-neutral-400 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <div className="p-2 border-b border-neutral-100">
            <Input
              placeholder="Search reps…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-sm"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="text-xs text-neutral-400 text-center py-4">No reps found</p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggle(opt.value)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors text-left"
                >
                  <Checkbox checked={selected.includes(opt.value)} onCheckedChange={() => toggle(opt.value)} />
                  {opt.label}
                </button>
              ))
            )}
          </div>
          {selected.length > 0 && (
            <div className="border-t border-neutral-100 p-2">
              <button
                type="button"
                onClick={() => onChange([])}
                className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function OrgNotificationsPage() {
  const [workflows, setWorkflows] = React.useState<org_workflow_instance[]>(initialOrgWorkflows);
  const [slack_connected, setSlackConnected] = React.useState(initialOrgSlackSettings.connected);
  const [sheet_open, setSheetOpen] = React.useState(false);
  const [editing_id, setEditingId] = React.useState<string | null>(null);
  const [refreshing_channels, setRefreshingChannels] = React.useState(false);

  // Draft state
  const [draft_name, setDraftName] = React.useState('');
  const [draft_trigger, setDraftTrigger] = React.useState<workflow_trigger_type>('post_call');
  const [draft_timing, setDraftTiming] = React.useState('');
  const [draft_day, setDraftDay] = React.useState('Monday');
  const [draft_filters, setDraftFilters] = React.useState<PostCallFilters>(DEFAULT_FILTERS);
  const [filters_expanded, setFiltersExpanded] = React.useState(false);
  const [draft_channel, setDraftChannel] = React.useState('');

  const openSheet = () => {
    setEditingId(null);
    setDraftName('');
    setDraftTrigger('post_call');
    setDraftTiming('');
    setDraftDay('Monday');
    setDraftFilters(DEFAULT_FILTERS);
    setFiltersExpanded(false);
    setDraftChannel('');
    setSheetOpen(true);
  };

  const openEdit = (workflow: org_workflow_instance) => {
    setEditingId(workflow.id);
    setDraftName(workflow.name);
    setDraftTrigger(workflow.trigger_type);
    const label = workflow.trigger_label === 'After every call' ? '' : workflow.trigger_label;
    setDraftTiming(label);
    if (workflow.trigger_type === 'weekly' && label) {
      setDraftDay(label);
    } else {
      setDraftDay('Monday');
    }
    setDraftFilters(DEFAULT_FILTERS);
    setFiltersExpanded(false);
    const channel = SLACK_CHANNELS.find((c) => `#${c.name}` === workflow.destination_channel);
    setDraftChannel(channel?.id ?? '');
    setSheetOpen(true);
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  const saveWorkflow = () => {
    if (!draft_name.trim() || !draft_channel) return;
    const trigger_label =
      draft_trigger === 'post_call'
        ? 'After every call'
        : draft_trigger === 'weekly'
        ? draft_day
        : draft_timing || '';
    const channelName = SLACK_CHANNELS.find((c) => c.id === draft_channel)?.name ?? draft_channel;

    if (editing_id) {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === editing_id
            ? { ...w, name: draft_name.trim(), trigger_type: draft_trigger, trigger_label, destination_channel: `#${channelName}`, enabled: true }
            : w
        )
      );
    } else {
      setWorkflows((prev) => [
        ...prev,
        { id: `wf-${Date.now()}`, name: draft_name.trim(), trigger_type: draft_trigger, trigger_label, destination_channel: `#${channelName}`, enabled: true },
      ]);
    }
    setSheetOpen(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Slack Notifications</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Org-wide notification workflows delivered to Slack channels.
      </p>

      {/* Slack connection header */}
      <div
        className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 bg-white mb-8 cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setSlackConnected((v) => !v)}
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
            <img src="/slack.png" alt="Slack" className="h-5 w-5 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          {slack_connected ? (
            <div>
              <p className="text-sm font-medium text-neutral-800">Slack</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-xs text-neutral-500">{initialOrgSlackSettings.workspace_name} workspace connected</span>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-neutral-800">Slack</p>
              <p className="text-xs text-neutral-400 mt-0.5">Not connected</p>
            </div>
          )}
        </div>
        <Link
          to="/settings/org/integrations/slack"
          className="flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {slack_connected ? 'Manage' : 'Connect'}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Default Workflows */}
      {(() => {
        const defaults = workflows.filter((w) => w.is_default);
        const custom = workflows.filter((w) => !w.is_default);
        return (
          <>
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-neutral-700 mb-4">Default Workflows</h2>
              <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
                {defaults.map((workflow) => (
                  <WorkflowRow
                    key={workflow.id}
                    workflow={workflow}
                    onToggle={() => toggleWorkflow(workflow.id)}
                    onDelete={() => deleteWorkflow(workflow.id)}
                    onEdit={() => openEdit(workflow)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-neutral-700">Custom Workflows</h2>
                <Button variant="outline" size="sm" onClick={openSheet} className="gap-1.5 h-8 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add workflow
                </Button>
              </div>

              {custom.length === 0 ? (
                <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-10 flex flex-col items-center text-center">
                  <Bell className="h-7 w-7 text-neutral-300 mb-3" />
                  <p className="text-sm font-medium text-neutral-500">No custom workflows yet</p>
                  <p className="text-xs text-neutral-400 mt-1">Add a workflow to send additional Slack notifications to your team.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
                  {custom.map((workflow) => (
                    <WorkflowRow
                      key={workflow.id}
                      workflow={workflow}
                      onToggle={() => toggleWorkflow(workflow.id)}
                      onDelete={() => deleteWorkflow(workflow.id)}
                      onEdit={() => openEdit(workflow)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        );
      })()}

      <Separator className="my-8" />

      {/* Custom Alerts — coming soon */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-sm font-semibold text-neutral-700">Custom Alerts</h2>
          <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
        </div>
        <p className="text-sm text-neutral-400">
          Configure alerts that fire when specific deal events or signal thresholds are met.
        </p>
      </div>

      <Link
        to="/settings/my/notifications"
        className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors mt-6"
      >
        <span className="text-xs font-medium text-neutral-700">Manage Personal Slack Notifications</span>
        <ExternalLink className="h-3 w-3 text-neutral-400" />
      </Link>

      {/* Add / Edit workflow modal */}
      <Dialog open={sheet_open} onOpenChange={setSheetOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing_id && workflows.find((w) => w.id === editing_id)?.is_default
                ? `Edit ${workflows.find((w) => w.id === editing_id)?.name}`
                : editing_id ? 'Edit workflow' : 'Add workflow'}
            </DialogTitle>
            {(!editing_id || !workflows.find((w) => w.id === editing_id)?.is_default) && (
              <DialogDescription>Configure a recurring Slack notification for your org.</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-4 py-2">
            {!editing_id || !workflows.find((w) => w.id === editing_id)?.is_default ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Workflow name</label>
                  <Input
                    placeholder="e.g. CS call summary to #cs-team"
                    value={draft_name}
                    onChange={(e) => setDraftName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Workflow Type</label>
                  <Select
                    value={draft_trigger}
                    onValueChange={(v) => {
                      setDraftTrigger(v as workflow_trigger_type);
                      setDraftTiming('');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TRIGGER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {draft_trigger === 'weekly' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Day</label>
                    <Select value={draft_day} onValueChange={setDraftDay}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {WEEKLY_DAY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-neutral-400">Sent at 8:00 AM in each recipient's local timezone.</p>
                  </div>
                )}

                {draft_trigger === 'post_call' && (
                  <div>
                    {!filters_expanded ? (
                      <button
                        type="button"
                        onClick={() => setFiltersExpanded(true)}
                        className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                        Filter by rep
                      </button>
                    ) : (
                      <RepMultiSelect
                        selected={draft_filters.reps}
                        onChange={(reps) => setDraftFilters((f) => ({ ...f, reps }))}
                        onRemove={() => { setFiltersExpanded(false); setDraftFilters((f) => ({ ...f, reps: [] })); }}
                      />
                    )}
                  </div>
                )}
              </>
            ) : draft_trigger === 'weekly' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Day</label>
                <Select value={draft_day} onValueChange={setDraftDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a day" />
                  </SelectTrigger>
                  <SelectContent>
                    {WEEKLY_DAY_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-neutral-400">Sent at 8:00 AM in each recipient's local timezone.</p>
              </div>
            ) : null}

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Destination channel</label>
              <p className="text-xs text-neutral-400">Select the channel where post-meeting summaries will be sent.</p>
              <div className="flex gap-2">
                <Select value={draft_channel} onValueChange={setDraftChannel}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Choose a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {SLACK_CHANNELS.map((ch) => (
                      <SelectItem key={ch.id} value={ch.id}>
                        #{ch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  onClick={() => {
                    setRefreshingChannels(true);
                    setTimeout(() => setRefreshingChannels(false), 1200);
                  }}
                  className="flex items-center justify-center h-9 w-9 rounded-md border border-neutral-200 bg-white text-neutral-400 hover:text-neutral-700 hover:border-neutral-300 transition-colors flex-shrink-0"
                  title="Refresh channels"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${refreshing_channels ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-neutral-400">
                Private channels require the ACRONYM app to be invited first.
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={saveWorkflow}
                disabled={
                  !draft_channel ||
                  (!editing_id || !workflows.find((w) => w.id === editing_id)?.is_default
                    ? !draft_name.trim() || (draft_trigger === 'weekly' && !draft_day)
                    : false)
                }
                className="flex-1"
              >
                {editing_id ? 'Save changes' : 'Add workflow'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WorkflowRow({
  workflow,
  onToggle,
  onDelete,
  onEdit,
}: {
  workflow: org_workflow_instance;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const unconfigured = !workflow.destination_channel;

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-medium ${unconfigured || !workflow.enabled ? 'text-neutral-400' : 'text-neutral-900'}`}>
            {workflow.name}
          </p>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">
            {TRIGGER_ICONS[workflow.trigger_type]}
          </Badge>
        </div>
        {unconfigured ? (
          <p className="text-xs text-neutral-400 mt-0.5 italic">No channel configured</p>
        ) : (
          <p className="text-xs text-neutral-400 mt-0.5">
            {workflow.trigger_label} → <span className="font-mono">{workflow.destination_channel}</span>
          </p>
        )}
      </div>

      {unconfigured ? (
        <button
          onClick={onEdit}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex-shrink-0"
        >
          Set up
        </button>
      ) : (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={onEdit}
            className="p-1.5 hover:text-neutral-700 text-neutral-400 rounded transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          {!workflow.is_default && (
            <button
              onClick={onDelete}
              className="p-1.5 hover:text-red-500 text-neutral-400 rounded transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      <Toggle enabled={workflow.enabled} onToggle={onToggle} disabled={unconfigured} />
    </div>
  );
}
