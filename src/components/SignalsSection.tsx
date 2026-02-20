import React from 'react';
import { Bookmark, TrendingUp } from 'lucide-react';
import { CompanyPill } from '@/components/CompanyPill';
import { Signal, signalsData } from '@/signals-demo-data';

interface SignalsSectionProps {
  signals?: Signal[];
  onSignalClick?: (signal: Signal) => void;
}

// Mock trend data for the chart
const trendData = [
  { period: 'Week 1', value: 180 },
  { period: 'Week 2', value: 195 },
  { period: 'Week 3', value: 210 },
  { period: 'Week 4', value: 254 },
];

// Use the main signalsData from signals-demo-data
const mockSignals: Signal[] = signalsData;

const formatDateForBox = (dateString: string): { month: string; day: string } => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString();
  return { month, day };
};

const formatTime = (timeString?: string): string => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const TrendChart: React.FC<{ data: Array<{ period: string; value: number }> }> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const width = 120;
  const height = 60;
  const padding = 8;

  // Find min and max values for scaling
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  // Calculate points for SVG path
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const pointSpacing = chartWidth / (data.length - 1);

  const points = data.map((d, index) => {
    const x = padding + index * pointSpacing;
    const y = padding + chartHeight - ((d.value - minValue) / range) * chartHeight;
    return { x, y, value: d.value };
  });

  // Create path data for line
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-12">
      {/* Grid line at bottom */}
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e7e5e4" strokeWidth="1" />

      {/* Trend line */}
      <path d={pathData} stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="#16a34a" />
      ))}
    </svg>
  );
};

const SignalCard: React.FC<{ signal: Signal; onClick?: () => void }> = ({ signal, onClick }) => {
  const dateBox = formatDateForBox(signal.meeting_date);
  const formattedTime = formatTime(signal.meeting_time);

  return (
    <div
      onClick={onClick}
      className="border border-stone-200 rounded-lg p-4 hover:border-stone-300 hover:bg-stone-50 transition-colors cursor-pointer">
      {/* Speaker name and company pill */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-muted-foreground">
          {signal.speaker_name}
        </p>
        <CompanyPill company_name={signal.company_name} company_logo_url={signal.company_logo_url} />
      </div>

      {/* Chat bubble */}
      <div className="mb-4">
        <div className="bg-stone-100 rounded-2xl px-4 py-3 inline-block max-w-full">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {signal.conversation_snippet}
          </p>
        </div>
      </div>

      {/* Footer with meeting context and date/time */}
      <div className="text-xs text-muted-foreground">
        <p>
          from <span className="font-medium">{signal.meeting_title}</span> • {dateBox.month} {dateBox.day}{formattedTime && ` • ${formattedTime}`}
        </p>
      </div>
    </div>
  );
};

export const SignalsSection: React.FC<SignalsSectionProps> = ({ signals = mockSignals, onSignalClick }) => {
  if (signals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">
          Signals will appear here as this objection is detected in conversations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Signals Stat */}
        <div className="border border-stone-200 rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
            Total Signals
          </p>
          <p className="text-4xl font-bold text-foreground">254</p>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-emerald-600 font-medium">+5</span> this week
          </p>
        </div>

        {/* Trend Stat */}
        <div className="border border-stone-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Trend
            </p>
            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <TrendChart data={trendData} />
          <p className="text-xs text-muted-foreground mt-3">
            <span className="text-emerald-600 font-medium">increasing</span> • +12% vs. last week
          </p>
        </div>
      </div>

      {/* Pinned Examples Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Pinned Examples
          </p>
        </div>
        <div className="space-y-4">
          {signals.slice(0, 3).map((signal) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              onClick={() => onSignalClick?.(signal)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignalsSection;
