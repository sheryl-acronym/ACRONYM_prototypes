import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock } from 'lucide-react';
import {
  initialHubSpotSettings,
  HUBSPOT_PIPELINE_OPTIONS,
  type hubspot_settings,
} from '@/settings-mock-data';

export default function OrgHubSpotPage() {
  const [settings, setSettings] = React.useState<hubspot_settings>(initialHubSpotSettings);

  const togglePipeline = (id: string) => {
    setSettings((prev) => {
      const already = prev.synced_pipeline_ids.includes(id);
      if (already && prev.synced_pipeline_ids.length === 1) return prev; // keep at least one
      return {
        ...prev,
        synced_pipeline_ids: already
          ? prev.synced_pipeline_ids.filter((p) => p !== id)
          : [...prev.synced_pipeline_ids, id],
      };
    });
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-white flex items-center justify-center flex-shrink-0">
          <img
            src="/hubspot.png"
            alt="HubSpot"
            className="h-7 w-7 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <h1 className="text-xl font-semibold">HubSpot</h1>
      </div>
      <p className="text-sm text-neutral-500 mt-1 mb-8">
        Connect HubSpot to sync deals, contacts, and companies with ACRONYM. Only one CRM can be connected at a time.
      </p>

      {/* Connection card */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6 mb-6">
        <h2 className="text-sm font-semibold text-neutral-700 mb-4">Connection</h2>
        {settings.connected ? (
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-neutral-900">Connected</span>
              </div>
              <p className="text-sm text-neutral-600 mt-1">
                Connected by <span className="font-medium">{settings.connected_by_name}</span>
              </p>
              <p className="text-xs text-neutral-400 mt-1">Since {settings.connected_date}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSettings((prev) => ({ ...prev, connected: false }))}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-700">Not connected</p>
              <p className="text-xs text-neutral-400 mt-1">
                Connect HubSpot to start syncing deals, contacts, and companies.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() =>
                setSettings({
                  connected: true,
                  connected_by_name: 'Alex Chen',
                  connected_date: 'Apr 14, 2026',
                  synced_pipeline_ids: ['pl-001'],
                })
              }
            >
              Connect HubSpot
            </Button>
          </div>
        )}
      </div>

      {/* Pipeline sync — only show when connected */}
      {settings.connected && (
        <>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 mb-6">
            <h2 className="text-sm font-semibold text-neutral-700 mb-1">Pipeline Sync</h2>
            <p className="text-xs text-neutral-400 mb-5">
              Choose which HubSpot pipelines ACRONYM should track. Unselected pipelines will not appear in ACRONYM.
              At least one pipeline must be selected.
            </p>
            <div className="space-y-3">
              {HUBSPOT_PIPELINE_OPTIONS.map((pipeline) => {
                const checked = settings.synced_pipeline_ids.includes(pipeline.id);
                return (
                  <div
                    key={pipeline.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => togglePipeline(pipeline.id)}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => togglePipeline(pipeline.id)}
                    />
                    <span className="text-sm text-neutral-800">{pipeline.name}</span>
                  </div>
                );
              })}
            </div>
            {settings.synced_pipeline_ids.length === 1 && (
              <p className="text-xs text-amber-600 mt-3">At least one pipeline must remain selected.</p>
            )}
          </div>

          {/* Managed by ACRONYM */}
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-neutral-600">Managed by ACRONYM</h2>
              <Badge variant="outline" className="text-neutral-400 border-neutral-200 font-normal text-xs gap-1">
                <Lock className="h-3 w-3" />
                Read-only
              </Badge>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              These behaviors are automatic once HubSpot is connected. They are not configurable.
            </p>
            <ul className="space-y-2">
              {[
                'Contact, company, and deal ingestion — ACRONYM reads existing records from HubSpot to match against processed calls and meetings.',
                'Deal matching — incoming calls are automatically matched to open HubSpot deals based on attendee and company data.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-neutral-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
