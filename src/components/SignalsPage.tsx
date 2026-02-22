import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Signal, signalsData } from '@/signals-demo-data';
import { faqs } from '@/faqs-demo-data';
import { discoveryQuestionsData } from '@/discovery-questions-demo-data';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PanelLeft, Zap } from 'lucide-react';
import SignalDetailPage from '@/components/SignalDetailPage';

interface SignalsPageProps {
  signals?: Signal[];
}

const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatTime = (timeString?: string): string => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const categoryConfig: Record<string, { bg: string; text: string; border: string }> = {
  'Fit and Capability': { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  'Authority': { bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-200' },
  'Alternatives': { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  'Risk and Trust': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  'Budget and Value': { bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-200' },
};

function SignalListItem({ signal, onClick }: { signal: Signal; onClick: () => void }) {
  const config = categoryConfig[signal.category || ''];
  const formattedTime = formatTime(signal.meeting_time);

  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-stone-200 rounded-lg p-4 hover:border-stone-300 hover:bg-stone-50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-foreground text-sm">{signal.objection}</h3>
        {signal.category && config && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-md ${config.bg} ${config.text} ${config.border} border`}
          >
            {signal.category}
          </span>
        )}
      </div>

      {/* Snippet */}
      <div className="mb-3">
        <div className="bg-stone-100 rounded-lg px-3 py-2 inline-block max-w-full">
          <p className="text-xs text-foreground/80 leading-relaxed">{signal.conversation_snippet}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>{signal.speaker_name} • {signal.company_name}</p>
        <p>
          {formatDateForDisplay(signal.meeting_date)}
          {formattedTime && ` • ${formattedTime}`}
        </p>
      </div>
    </button>
  );
}

function SignalsListView({ signals, onSignalClick }: { signals: Signal[]; onSignalClick: (signal: Signal) => void }) {
  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <SignalListItem
          key={signal.id}
          signal={signal}
          onClick={() => onSignalClick(signal)}
        />
      ))}
    </div>
  );
}

export const SignalsPage: React.FC<SignalsPageProps> = ({ signals = signalsData }) => {
  const navigate = useNavigate();
  const { signalId } = useParams<{ signalId?: string }>();
  const [selectedSignal, setSelectedSignal] = React.useState<Signal | null>(null);

  // Load selected signal from URL param
  React.useEffect(() => {
    if (signalId) {
      const signal = signals.find((s) => s.id === signalId);
      if (signal) {
        setSelectedSignal(signal);
      }
    }
  }, [signalId, signals]);

  const handleSignalClick = (signal: Signal) => {
    setSelectedSignal(signal);
    navigate(`/signals/${signal.id}`);
  };

  // If a signal is selected, show the detail page
  if (selectedSignal) {
    // Check if this is an FAQ or Discovery Question signal (has no objection field)
    let contextTitle: string | undefined;
    let contextCategory: string | undefined;
    let contextPath: string | undefined;

    if (!selectedSignal.objection) {
      // First check if this is a Discovery Question signal
      const relatedDQ = discoveryQuestionsData.find((dq) => dq.related_signal_ids?.includes(selectedSignal.id));
      if (relatedDQ) {
        contextTitle = relatedDQ.question;
        contextCategory = relatedDQ.category;
        contextPath = '/discovery-questions';
      } else {
        // Otherwise, find which FAQ this signal belongs to
        const relatedFaq = faqs.find((faq) => faq.related_signal_ids?.includes(selectedSignal.id));
        if (relatedFaq) {
          contextTitle = relatedFaq.question;
          contextCategory = relatedFaq.category;
          contextPath = '/faqs';
        }
      }
    }

    return (
      <SignalDetailPage signal={selectedSignal} contextTitle={contextTitle} contextCategory={contextCategory} contextPath={contextPath} />
    );
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      {/* Main content area */}
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
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/objections');
                    }}
                  >
                    Objections
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Signals</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {/* Title */}
          <div className="flex items-center gap-2.5 mb-8">
            <Zap className="h-5 w-5 text-foreground" />
            <h1 className="text-2xl font-bold text-foreground">Signals</h1>
          </div>

          {/* Signals list */}
          {signals.length > 0 ? (
            <SignalsListView signals={signals} onSignalClick={handleSignalClick} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No signals found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignalsPage;
