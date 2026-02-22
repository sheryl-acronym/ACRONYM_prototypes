import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PanelLeft,
  MoreHorizontal,
  Users,
  ChevronLeft,
  Bookmark,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { DiscoveryQuestion } from '@/discovery-questions-demo-data';
import { Signal, signalsData } from '@/signals-demo-data';
import { CategoryPill } from '@/components/CategoryPill';
import { CustomerProfilePill } from '@/components/CustomerProfilePill';
import { CompanyPill } from '@/components/CompanyPill';
import { SignalDetailSidePanel } from '@/components/SignalDetailSidePanel';

interface DiscoveryQuestionDetailPageProps {
  question: DiscoveryQuestion;
  hideTopBar?: boolean;
  onBack?: () => void;
}

const CategorySection: React.FC<{ question: DiscoveryQuestion }> = ({ question }) => (
  <div className="mb-8">
    <CategoryPill category={question.category} />
  </div>
);

const QuestionSection: React.FC<{ question: string }> = ({ question }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-foreground mb-4">{question}</h2>
  </div>
);

const WhyAskingSection: React.FC<{ whyAsking: string }> = ({ whyAsking }) => (
  <div className="mb-8">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Why are we asking
    </h2>
    <p className="text-sm text-foreground/80 leading-relaxed">{whyAsking}</p>
  </div>
);

const TypicallyRelevantForSection: React.FC<{ question: DiscoveryQuestion }> = ({ question }) => (
  <div className="mb-8">
    <div className="space-y-3">
      <div className="grid grid-cols-[180px_1fr] gap-6 items-start">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Typically relevant for</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {question.typically_relevant_for.length > 0 ? (
            question.typically_relevant_for.map((profile, idx) => (
              <CustomerProfilePill key={idx} profile={profile} />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">Not specified</span>
          )}
        </div>
      </div>
    </div>
    <Separator className="mt-8" />
  </div>
);

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper function to format date as "Mon DD, H:MMPM"
function formatSignalDate(dateStr: string, timeStr?: string): string {
  const date = new Date(dateStr);
  const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();

  if (timeStr) {
    return `${monthStr} ${day}, ${timeStr}`;
  }
  return `${monthStr} ${day}`;
}

const SignalCard: React.FC<{ signal: Signal; onClick: () => void }> = ({ signal, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-stone-200 rounded-lg p-4 hover:border-stone-300 hover:bg-stone-50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-slate-200 text-xs font-semibold">
              {getInitials(signal.speaker_name)}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs font-semibold text-muted-foreground">{signal.speaker_name}</p>
        </div>
        <CompanyPill company_name={signal.company_name} company_logo_url={signal.company_logo_url} />
      </div>
      <div className="mb-3">
        <div className="bg-stone-100 rounded-lg px-3 py-2 inline-block max-w-full">
          <p className="text-sm text-foreground/80 leading-relaxed">{signal.conversation_snippet}</p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        <p>from {signal.meeting_title} • {formatSignalDate(signal.meeting_date, signal.meeting_time)}</p>
      </div>
    </button>
  );
};

const PinnedSignalsSection: React.FC<{ question: DiscoveryQuestion; onSignalClick: (signal: Signal) => void }> = ({ question, onSignalClick }) => {
  const relatedSignals = (question as any).related_signal_ids
    ? (question as any).related_signal_ids
        .map((id: string) => signalsData.find((signal: Signal) => signal.id === id))
        .filter((signal: Signal | undefined): signal is Signal => signal !== undefined)
    : [];

  if (relatedSignals.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Pinned Examples
        </p>
      </div>
      <div className="space-y-4">
        {relatedSignals.slice(0, 5).map((signal: Signal) => (
          <SignalCard
            key={signal.id}
            signal={signal}
            onClick={() => onSignalClick(signal)}
          />
        ))}
      </div>
    </div>
  );
};

const TopBar: React.FC<{ questionText: string; onBack?: () => void }> = ({ questionText, onBack }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/discovery-questions');
    }
  };
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
                Playbook
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/discovery-questions">Discovery Questions</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">{questionText}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBack}
        className="h-8 w-8"
        title="Back"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const DiscoveryQuestionDetailPage: React.FC<DiscoveryQuestionDetailPageProps> = ({
  question,
  hideTopBar = false,
  onBack,
}) => {
  const [selectedSignalId, setSelectedSignalId] = React.useState<string | null>(null);

  const handleSignalClick = (signal: Signal) => {
    setSelectedSignalId(signal.id);
  };

  const selectedSignal = selectedSignalId ? signalsData.find((s) => s.id === selectedSignalId) : null;

  if (hideTopBar) {
    return (
      <>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 w-full">
              <CategorySection question={question} />
              <QuestionSection question={question.question} />
              <WhyAskingSection whyAsking={question.why_asking} />
              <TypicallyRelevantForSection question={question} />
              <PinnedSignalsSection question={question} onSignalClick={handleSignalClick} />
            </div>
          </div>
        </div>

        {/* Signal Detail Side Panel */}
        {selectedSignal && selectedSignalId && (
          <SignalDetailSidePanel
            signalId={selectedSignalId}
            signal={selectedSignal}
            onClose={() => setSelectedSignalId(null)}
            hideResponseApproach={true}
            contextTitle={question.question}
            contextCategory={question.category}
            contextPath={`/discovery-questions`}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
        <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
          <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
            <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
              <PanelLeft className="h-4 w-4" />
            </SidebarTrigger>
            <div className="flex-1 flex items-center">
              <TopBar questionText={question.question} onBack={onBack} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
              <CategorySection question={question} />
              <QuestionSection question={question.question} />
              <WhyAskingSection whyAsking={question.why_asking} />
              <TypicallyRelevantForSection question={question} />
              <PinnedSignalsSection question={question} onSignalClick={handleSignalClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Signal Detail Side Panel */}
      {selectedSignal && selectedSignalId && (
        <SignalDetailSidePanel
          signalId={selectedSignalId}
          signal={selectedSignal}
          onClose={() => setSelectedSignalId(null)}
          hideResponseApproach={true}
          contextTitle={question.question}
          contextCategory={question.category}
          contextPath={`/discovery-questions`}
        />
      )}
    </>
  );
};

export default DiscoveryQuestionDetailPage;
