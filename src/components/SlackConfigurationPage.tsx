import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlackNotificationSettings } from '@/types';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

interface SlackConfigurationPageProps {
  onBack: () => void;
}

// Mock available Slack channels
const MOCK_SLACK_CHANNELS = [
  { id: 'C1234567', name: 'general' },
  { id: 'C1234568', name: 'sales' },
  { id: 'C1234569', name: 'deals' },
  { id: 'C1234570', name: 'updates' },
  { id: 'C1234571', name: 'announcements' },
];

const DEFAULT_SETTINGS: SlackNotificationSettings = {
  pre_call_brief: {
    enabled: true,
    destination: 'dm',
    timing: '15m',
    timing_unit: 'minutes',
    timing_value: 15,
  },
  post_call_summary: {
    enabled: true,
    destination: 'dm',
  },
  daily_digest: {
    enabled: false,
    destination: 'dm',
    timing: '9am',
    timing_unit: 'time_of_day',
  },
  weekly_digest: {
    enabled: false,
    destination: 'dm',
    timing: '9am',
    timing_unit: 'time_of_day',
  },
};

export default function SlackConfigurationPage({ onBack }: SlackConfigurationPageProps) {
  const [settings, setSettings] = React.useState<SlackNotificationSettings>(DEFAULT_SETTINGS);
  const [customPrompt, setCustomPrompt] = React.useState<string>('');

  const updateNotificationSetting = (
    key: keyof SlackNotificationSettings,
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const toggleNotification = (key: keyof SlackNotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main settings panel */}
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <button
                    onClick={onBack}
                    className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Settings
                  </button>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>Slack Configuration</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-1 min-h-0 overflow-hidden justify-center">
            {/* Main Content */}
            <main className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full overflow-y-auto">
              {/* Header */}
              <div className="mb-8 flex gap-4">
                <div className="h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-50">
                  <img src="/slack.png" alt="Slack" className="h-10 w-10 object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold">Slack</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Configure how ACRONYM sends notifications to Slack
                  </p>
                </div>
              </div>

              {/* Connection Details Card */}
              <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Connected as</p>
                    <p className="text-base font-semibold text-slate-900 mt-1">your-workspace-name</p>
                    <p className="text-xs text-slate-600 mt-1">Connected to your Slack workspace</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Test Connection
                  </Button>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Pre-Call Brief Section */}
              <NotificationSection
                title="Pre-meeting Brief"
                description="Receive a pre-meeting brief before upcoming calls to help you prep for your meetings"
                enabled={settings.pre_call_brief.enabled}
                onToggle={() => toggleNotification('pre_call_brief')}
                destination={settings.pre_call_brief.destination}
                onDestinationChange={(value) =>
                  updateNotificationSetting('pre_call_brief', 'destination', value)
                }
                timing={settings.pre_call_brief.timing}
                onTimingChange={(value) =>
                  updateNotificationSetting('pre_call_brief', 'timing', value)
                }
                slackChannelId={settings.pre_call_brief.slack_channel_id}
                slackChannelName={settings.pre_call_brief.slack_channel_name}
                onChannelChange={(id, name) => {
                  updateNotificationSetting('pre_call_brief', 'slack_channel_id', id);
                  updateNotificationSetting('pre_call_brief', 'slack_channel_name', name);
                }}
                showTimingOptions
                timingOptions={[
                  { label: '15 minutes before', value: '15m' },
                  { label: '30 minutes before', value: '30m' },
                  { label: '1 hour before', value: '1h' },
                  { label: '2 hours before', value: '2h' },
                ]}
              />

              <Separator className="my-8" />

              {/* Post-Call Summary Section */}
              <NotificationSection
                title="Post-meeting Summary"
                description="Receive a post-meeting summary notification with a TL;DR; of the meeting outcome"
                enabled={settings.post_call_summary.enabled}
                onToggle={() => toggleNotification('post_call_summary')}
                destination={settings.post_call_summary.destination}
                onDestinationChange={(value) =>
                  updateNotificationSetting('post_call_summary', 'destination', value)
                }
                slackChannelId={settings.post_call_summary.slack_channel_id}
                slackChannelName={settings.post_call_summary.slack_channel_name}
                onChannelChange={(id, name) => {
                  updateNotificationSetting('post_call_summary', 'slack_channel_id', id);
                  updateNotificationSetting('post_call_summary', 'slack_channel_name', name);
                }}
                showTimingOptions={false}
              />

              <Separator className="my-8" />

              {/* Daily Digest Section */}
              <NotificationSection
                title="Daily Briefing"
                description="Get a daily briefing of your upcoming meetings for the day"
                enabled={settings.daily_digest.enabled}
                onToggle={() => toggleNotification('daily_digest')}
                destination={settings.daily_digest.destination}
                onDestinationChange={(value) =>
                  updateNotificationSetting('daily_digest', 'destination', value)
                }
                timing={settings.daily_digest.timing}
                onTimingChange={(value) =>
                  updateNotificationSetting('daily_digest', 'timing', value)
                }
                slackChannelId={settings.daily_digest.slack_channel_id}
                slackChannelName={settings.daily_digest.slack_channel_name}
                onChannelChange={(id, name) => {
                  updateNotificationSetting('daily_digest', 'slack_channel_id', id);
                  updateNotificationSetting('daily_digest', 'slack_channel_name', name);
                }}
                showTimingOptions
                timingOptions={[
                  { label: '8:00 AM', value: '8am' },
                  { label: '9:00 AM', value: '9am' },
                  { label: '10:00 AM', value: '10am' },
                  { label: '12:00 PM', value: '12pm' },
                  { label: '3:00 PM', value: '3pm' },
                  { label: '5:00 PM', value: '5pm' },
                ]}
              />

              <Separator className="my-8" />

              {/* Weekly Digest Section */}
              <NotificationSection
                title="Weekly Digest"
                description="Get a weekly overview of all critical deal activity from the week"
                enabled={settings.weekly_digest.enabled}
                onToggle={() => toggleNotification('weekly_digest')}
                destination={settings.weekly_digest.destination}
                onDestinationChange={(value) =>
                  updateNotificationSetting('weekly_digest', 'destination', value)
                }
                timing={settings.weekly_digest.timing}
                onTimingChange={(value) =>
                  updateNotificationSetting('weekly_digest', 'timing', value)
                }
                slackChannelId={settings.weekly_digest.slack_channel_id}
                slackChannelName={settings.weekly_digest.slack_channel_name}
                onChannelChange={(id, name) => {
                  updateNotificationSetting('weekly_digest', 'slack_channel_id', id);
                  updateNotificationSetting('weekly_digest', 'slack_channel_name', name);
                }}
                showTimingOptions
                timingOptions={[
                  { label: 'Monday, 9:00 AM', value: 'mon-9am' },
                  { label: 'Monday, 5:00 PM', value: 'mon-5pm' },
                  { label: 'Friday, 9:00 AM', value: 'fri-9am' },
                  { label: 'Friday, 5:00 PM', value: 'fri-5pm' },
                ]}
                showCustomPrompt
                customPrompt={customPrompt}
                onCustomPromptChange={setCustomPrompt}
              />

              <Separator className="my-8" />

              {/* Add Custom Notification Button */}
              <div className="w-full">
                <Button variant="outline" className="w-full">
                  Add Custom Notification
                </Button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-12">
                <Button onClick={onBack} variant="outline">
                  Cancel
                </Button>
                <Button>Save Settings</Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NotificationSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  destination: 'dm' | 'channel';
  onDestinationChange: (value: 'dm' | 'channel') => void;
  timing?: string;
  onTimingChange?: (value: string) => void;
  slackChannelId?: string;
  slackChannelName?: string;
  onChannelChange: (id: string, name: string) => void;
  showTimingOptions?: boolean;
  timingOptions?: { label: string; value: string }[];
  showCustomPrompt?: boolean;
  customPrompt?: string;
  onCustomPromptChange?: (value: string) => void;
}

function NotificationSection({
  title,
  description,
  enabled,
  onToggle,
  destination,
  onDestinationChange,
  timing,
  onTimingChange,
  slackChannelId,
  onChannelChange,
  showTimingOptions = false,
  timingOptions = [],
  showCustomPrompt = false,
  customPrompt = '',
  onCustomPromptChange,
}: NotificationSectionProps) {
  return (
    <div className="space-y-4">
      {/* Header with toggle */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <button
          onClick={onToggle}
          className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          style={{
            backgroundColor: enabled ? '#10b981' : '#e2e8f0',
          }}
        >
          <span
            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            style={{
              transform: enabled ? 'translateX(1.25rem)' : 'translateX(0)',
            }}
          />
        </button>
      </div>

      {/* Content (only show if enabled) */}
      {enabled && (
        <div className="bg-slate-50 rounded-lg p-6 space-y-6">
          {/* Timing option (if applicable) */}
          {showTimingOptions && timing && onTimingChange && timingOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Send notification</label>
              <Select value={timing} onValueChange={onTimingChange}>
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Destination options */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Send to</label>
            <div className="space-y-2">
              {/* DM Option */}
              <DestinationOption
                id="dm"
                label="Direct Message"
                description="Send as a direct message to you"
                selected={destination === 'dm'}
                onChange={() => onDestinationChange('dm')}
              />

              {/* Channel Option */}
              <DestinationOption
                id="channel"
                label="Slack Channel"
                description="Send to a specific Slack channel"
                selected={destination === 'channel'}
                onChange={() => onDestinationChange('channel')}
              />
            </div>

            {/* Channel selector (show if channel is selected) */}
            {destination === 'channel' && (
              <div className="mt-4 ml-6">
                <label htmlFor="channel-select" className="text-sm font-medium">
                  Select channel
                </label>
                <Select value={slackChannelId || ''} onValueChange={(id) => {
                  const channel = MOCK_SLACK_CHANNELS.find((c) => c.id === id);
                  if (channel) {
                    onChannelChange(id, channel.name);
                  }
                }}>
                  <SelectTrigger id="channel-select" className="w-full max-w-xs mt-2">
                    <SelectValue placeholder="Choose a channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_SLACK_CHANNELS.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        # {channel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Custom Prompt (only show if enabled) */}
          {showCustomPrompt && (
            <>
              <div className="border-t border-slate-200 pt-6">
                <label className="text-sm font-medium">Custom Prompt</label>
                <p className="text-xs text-slate-600 mt-1 mb-3">Add custom directions for how ACRONYM should generate this notification</p>
                <textarea
                  value={customPrompt}
                  onChange={(e) => onCustomPromptChange?.(e.target.value)}
                  placeholder="E.g., Focus on high-value deals only, Include competitor mentions, Summarize in bullet points..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface DestinationOptionProps {
  id: string;
  label: string;
  description: string;
  selected: boolean;
  onChange: () => void;
}

function DestinationOption({
  id,
  label,
  description,
  selected,
  onChange,
}: DestinationOptionProps) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
      onClick={onChange}
    >
      <Checkbox
        id={id}
        checked={selected}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer block"
        >
          {label}
        </label>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
