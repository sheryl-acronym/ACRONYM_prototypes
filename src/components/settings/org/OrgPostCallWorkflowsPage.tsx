import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Lock, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  initialPostCallWorkflows,
  type post_call_workflows_settings,
  type crm_sync_field,
} from '@/settings-mock-data';

const CALL_TYPE_RULES = [
  { call_type: 'Sales', processed: true, note: 'Full extraction — qualification, next steps, close confidence' },
  { call_type: 'Demo', processed: true, note: 'Full extraction — qualification, next steps, close confidence' },
  { call_type: 'Onboarding', processed: true, note: 'Full extraction — account health, next steps' },
  { call_type: 'Customer Success', processed: true, note: 'Full extraction — account health, next steps' },
  { call_type: 'Support', processed: true, note: 'Full extraction — next steps' },
  { call_type: 'Partnership', processed: true, note: 'Full extraction — next steps' },
  { call_type: 'Internal', processed: false, note: 'Skipped — no external attendees' },
  { call_type: 'Recruiting', processed: false, note: 'Skipped — not a revenue call' },
  { call_type: 'Other', processed: false, note: 'Skipped by default — contact ACRONYM to enable' },
];

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

export default function OrgPostCallWorkflowsPage() {
  const [settings, setSettings] = React.useState<post_call_workflows_settings>(
    initialPostCallWorkflows
  );
  const [framework_crm_sync, setFrameworkCrmSync] = React.useState(true);
  const [crm_connected, setCrmConnected] = React.useState(true); // toggle for prototype

  const toggleSummarySync = () =>
    setSettings((prev) => ({
      ...prev,
      summary_sync: { ...prev.summary_sync, enabled: !prev.summary_sync.enabled },
    }));

  const toggleSummaryCrmSync = () =>
    setSettings((prev) => ({
      ...prev,
      summary_sync: {
        ...prev.summary_sync,
        crm_sync_enabled: !prev.summary_sync.crm_sync_enabled,
      },
    }));

  const toggleNextStepsCrmSync = () =>
    setSettings((prev) => ({
      ...prev,
      next_steps: {
        ...prev.next_steps,
        crm_sync_enabled: !prev.next_steps.crm_sync_enabled,
      },
    }));

  const toggleCloseConfidenceCrmSync = () =>
    setSettings((prev) => ({
      ...prev,
      close_confidence: {
        ...prev.close_confidence,
        crm_sync_enabled: !prev.close_confidence.crm_sync_enabled,
      },
    }));

  const toggleFrameworkField = (field_id: string) => {
    setSettings((prev) => ({
      ...prev,
      qualification_framework: {
        ...prev.qualification_framework,
        crm_fields: prev.qualification_framework.crm_fields.map((f) =>
          f.field_id === field_id ? { ...f, enabled: !f.enabled } : f
        ),
      },
    }));
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Post-Call Workflows</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Define which calls ACRONYM processes, what gets extracted, and where it goes. All extraction is automatic once configured.
      </p>

      {/* ── 1. Call Processing ── */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Call Processing</h2>
          <Badge variant="outline" className="text-neutral-400 border-neutral-200 font-normal text-xs gap-1">
            <Lock className="h-3 w-3" />
            Managed by ACRONYM
          </Badge>
        </div>
        <p className="text-sm text-neutral-500">
          ACRONYM automatically processes the following call types. Contact your ACRONYM administrator to adjust settings.
        </p>
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="divide-y divide-neutral-100">
            {CALL_TYPE_RULES.map((rule) => (
              <div key={rule.call_type} className="flex items-start gap-4 px-5 py-3.5">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800">{rule.call_type}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{rule.note}</p>
                </div>
                <Badge
                  variant={rule.processed ? 'default' : 'secondary'}
                  className={`text-xs flex-shrink-0 ${rule.processed ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}`}
                >
                  {rule.processed ? 'Processed' : 'Skipped'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* ── 2. Intelligence Framework ── */}
      <div className="space-y-4 mb-8">
        <div>
          <h2 className="text-base font-semibold mb-1">Qualification Framework</h2>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-neutral-400">Applies to</span>
            <Badge variant="secondary" className="text-xs font-normal rounded-full">Sales</Badge>
            <Badge variant="secondary" className="text-xs font-normal rounded-full">Demo</Badge>
          </div>
          <p className="text-sm text-neutral-500">
            ACRONYM extracts qualification signal from processed sales and demo calls according to the selected framework.
          </p>
        </div>

        {/* Framework selector */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600 font-medium">Framework</span>
          <Select
            value={settings.qualification_framework.framework}
            onValueChange={(v) => setSettings((prev) => ({
              ...prev,
              qualification_framework: { ...prev.qualification_framework, framework: v as post_call_workflows_settings['qualification_framework']['framework'] },
            }))}
          >
            <SelectTrigger className="h-8 w-44 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medpicc">MEDDPICC</SelectItem>
              <SelectItem value="spiced" disabled>SPICED · Soon</SelectItem>
              <SelectItem value="bant" disabled>BANT · Soon</SelectItem>
              <SelectItem value="custom" disabled>Custom · Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* HubSpot sync toggle + field mapping */}
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div
            className={`flex items-center justify-between px-4 py-3 transition-colors ${crm_connected ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-not-allowed opacity-50'}`}
            onClick={() => crm_connected && setFrameworkCrmSync((v) => !v)}
          >
            <div>
              <p className="text-sm font-medium text-neutral-800">Sync to CRM</p>
              <p className="text-xs text-neutral-400 mt-0.5">Push extracted fields to associated deal records in your connected CRM</p>
            </div>
            <Toggle enabled={framework_crm_sync && crm_connected} onToggle={() => crm_connected && setFrameworkCrmSync((v) => !v)} />
          </div>
          {framework_crm_sync && (
            <>
              <div className="border-t border-neutral-100 px-4 py-2.5 bg-neutral-50 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Field</span>
                <span className="text-xs text-neutral-400">CRM field</span>
              </div>
              <div className="divide-y divide-neutral-100">
                {settings.qualification_framework.crm_fields.map((field) => (
                  <FrameworkFieldRow
                    key={field.field_id}
                    field={field}
                    onToggle={() => toggleFrameworkField(field.field_id)}
                  />
                ))}
              </div>
              <div className="border-t border-neutral-100 px-4 py-3 flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-neutral-300 flex-shrink-0" />
                <p className="text-xs text-neutral-400">Field mapping is managed by ACRONYM. Contact your administrator to make changes.</p>
              </div>
            </>
          )}
          <CrmTray crm_connected={crm_connected} onToggle={() => setCrmConnected((v) => !v)} />
        </div>
      </div>

      <Separator className="my-8" />

      {/* ── 3. CRM Sync ── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-semibold mb-1">CRM Sync</h2>
          <p className="text-sm text-neutral-500">
            Choose which extracted outputs are pushed to your connected CRM after each call.
          </p>
        </div>

        {/* Post-Call Summary — standalone card, no field mapping */}
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div
            className={`flex items-start justify-between px-4 py-3 transition-colors ${crm_connected ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-not-allowed opacity-50'}`}
            onClick={() => crm_connected && toggleSummaryCrmSync()}
          >
            <div className="pr-6">
              <p className="text-sm font-medium text-neutral-800">Post-Call Summary</p>
              <p className="text-xs text-neutral-400 mt-0.5">Push a meeting summary note to the associated deal record after each call</p>
            </div>
            <Toggle enabled={settings.summary_sync.crm_sync_enabled && crm_connected} onToggle={() => crm_connected && toggleSummaryCrmSync()} />
          </div>
          <CrmTray crm_connected={crm_connected} onToggle={() => setCrmConnected((v) => !v)} />
        </div>

        {/* Close Confidence + Next Steps — field mapping card */}
        <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Output</span>
            <span className="text-xs text-neutral-400">CRM field</span>
          </div>
          <CrmSyncRow
            label="Close Confidence"
            crm_field={settings.close_confidence.crm_field}
            enabled={settings.close_confidence.crm_sync_enabled}
            crm_connected={crm_connected}
            onToggle={toggleCloseConfidenceCrmSync}
          />
          <CrmSyncRow
            label="Next Steps"
            crm_field={settings.next_steps.crm_field}
            enabled={settings.next_steps.crm_sync_enabled}
            crm_connected={crm_connected}
            onToggle={toggleNextStepsCrmSync}
          />
          {/* Custom fields coming soon */}
          <div className="border-t border-neutral-100 px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs text-neutral-300 italic">Custom fields</span>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-normal">Coming soon</Badge>
          </div>
          <CrmTray crm_connected={crm_connected} onToggle={() => setCrmConnected((v) => !v)} />
        </div>
      </div>
    </div>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

interface WorkflowSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  hideToggle?: boolean;
  children?: React.ReactNode;
}

function WorkflowSection({
  title,
  description,
  enabled,
  onToggle,
  hideToggle = false,
  children,
}: WorkflowSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5 pr-4">
          <h3 className="text-sm font-semibold text-neutral-800">{title}</h3>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
        {!hideToggle && <Toggle enabled={enabled} onToggle={onToggle} />}
      </div>
      {(hideToggle || enabled) && children && (
        <div className="bg-neutral-50 rounded-lg p-4 space-y-3">{children}</div>
      )}
    </div>
  );
}

function FrameworkFieldRow({
  field,
}: {
  field: crm_sync_field;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <p className="text-sm font-medium text-neutral-800">{field.field_label}</p>
      <DisabledFieldSelect value={field.enabled ? field.crm_field_name : ''} placeholder="Not synced" />
    </div>
  );
}

function CrmSyncRow({
  label,
  crm_field,
  enabled,
  crm_connected,
  onToggle,
}: {
  label: string;
  crm_field: string;
  enabled: boolean;
  crm_connected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 border-t border-neutral-100 first:border-t-0 transition-colors ${crm_connected ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-not-allowed opacity-50'}`}
      onClick={() => crm_connected && onToggle()}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800 w-36 flex-shrink-0">{label}</p>
        <DisabledFieldSelect value={crm_field} placeholder="No field mapped" />
      </div>
      <div className="ml-4 flex-shrink-0">
        <Toggle enabled={enabled && crm_connected} onToggle={() => crm_connected && onToggle()} />
      </div>
    </div>
  );
}

function CrmTray({ crm_connected, onToggle }: { crm_connected: boolean; onToggle: () => void }) {
  return (
    <div
      className="border-t border-neutral-100 px-4 py-2.5 bg-neutral-50 flex items-center justify-between cursor-pointer"
      onClick={onToggle}
    >
      {crm_connected ? (
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
          <span className="text-xs text-neutral-500">Connected to HubSpot</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-neutral-300 flex-shrink-0" />
          <span className="text-xs text-neutral-400">No CRM connected</span>
        </div>
      )}
      {!crm_connected && (
        <Link
          to="/settings/org/integrations/crm"
          className="flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Connect a CRM
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

function DisabledFieldSelect({ value, placeholder }: { value: string; placeholder: string }) {
  return (
    <div className="flex items-center justify-between gap-2 h-7 px-2.5 rounded-md border border-neutral-200 bg-neutral-50 text-xs text-neutral-400 w-52 cursor-not-allowed select-none">
      <span className={value ? 'font-mono text-neutral-500' : 'italic text-neutral-300'}>
        {value || placeholder}
      </span>
      <svg className="h-3.5 w-3.5 text-neutral-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
