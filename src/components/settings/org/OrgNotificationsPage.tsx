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
import { Trash2, Plus, Bell, ArrowRight, Pencil, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  initialOrgWorkflows,
  initialOrgSlackSettings,
  SLACK_CHANNELS,
  type org_workflow_instance,
  type workflow_trigger_type,
} from '@/settings-mock-data';

// Reusable inline toggle
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none"
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
  { value: 'daily', label: 'Daily briefing — recurring schedule' },
];

const TIMING_OPTIONS: Record<workflow_trigger_type, { value: string; label: string }[]> = {
  post_call: [],
  weekly: [
    { value: 'Monday, 9:00 AM', label: 'Monday, 9:00 AM' },
    { value: 'Monday, 5:00 PM', label: 'Monday, 5:00 PM' },
    { value: 'Friday, 9:00 AM', label: 'Friday, 9:00 AM' },
    { value: 'Friday, 5:00 PM', label: 'Friday, 5:00 PM' },
  ],
  daily: [
    { value: '8:00 AM', label: '8:00 AM' },
    { value: '9:00 AM', label: '9:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '5:00 PM', label: '5:00 PM' },
    { value: '6:00 PM', label: '6:00 PM' },
  ],
};

const TRIGGER_ICONS: Record<workflow_trigger_type, string> = {
  post_call: 'After call',
  weekly: 'Weekly',
  daily: 'Daily',
};

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
  const [draft_channel, setDraftChannel] = React.useState('');

  const openSheet = () => {
    setEditingId(null);
    setDraftName('');
    setDraftTrigger('post_call');
    setDraftTiming('');
    setDraftChannel('');
    setSheetOpen(true);
  };

  const openEdit = (workflow: org_workflow_instance) => {
    setEditingId(workflow.id);
    setDraftName(workflow.name);
    setDraftTrigger(workflow.trigger_type);
    setDraftTiming(workflow.trigger_label === 'After every call' ? '' : workflow.trigger_label);
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
        : draft_timing || TIMING_OPTIONS[draft_trigger][0]?.value || '';
    const channelName = SLACK_CHANNELS.find((c) => c.id === draft_channel)?.name ?? draft_channel;

    if (editing_id) {
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === editing_id
            ? { ...w, name: draft_name.trim(), trigger_type: draft_trigger, trigger_label, destination_channel: `#${channelName}` }
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
              <h2 className="text-sm font-semibold text-neutral-700 mb-1">Default Workflows</h2>
              <p className="text-xs text-neutral-400 mb-4">
                Built-in workflows configured by ACRONYM. Toggle on or off, or edit the destination channel.
              </p>
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
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-neutral-700">Custom Workflows</h2>
                <Button variant="outline" size="sm" onClick={openSheet} className="gap-1.5 h-8 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Add workflow
                </Button>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Additional workflows you've configured. Multiple instances of the same type can coexist with different destinations.
              </p>
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
          Define custom workflow types and delivery conditions beyond the defaults above.
          Configure alerts that fire when specific deal events or signal thresholds are met.
        </p>
      </div>

      {/* Add / Edit workflow modal */}
      <Dialog open={sheet_open} onOpenChange={setSheetOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editing_id ? 'Edit workflow' : 'Add workflow'}</DialogTitle>
            {editing_id && workflows.find((w) => w.id === editing_id)?.is_default && (
              <DialogDescription>
                Editing <span className="font-medium text-neutral-700">{workflows.find((w) => w.id === editing_id)?.name}</span>
              </DialogDescription>
            )}
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
                  <label className="text-sm font-medium text-neutral-700">Trigger type</label>
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

                {draft_trigger !== 'post_call' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Send timing</label>
                    <Select value={draft_timing} onValueChange={setDraftTiming}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMING_OPTIONS[draft_trigger].map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
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
                    ? !draft_name.trim() || (draft_trigger !== 'post_call' && !draft_timing)
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
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-medium ${workflow.enabled ? 'text-neutral-900' : 'text-neutral-400'}`}>
            {workflow.name}
          </p>
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">
            {TRIGGER_ICONS[workflow.trigger_type]}
          </Badge>
        </div>
        <p className="text-xs text-neutral-400 mt-0.5">
          {workflow.trigger_label} → <span className="font-mono">{workflow.destination_channel}</span>
        </p>
      </div>
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
      <Toggle enabled={workflow.enabled} onToggle={onToggle} />
    </div>
  );
}
