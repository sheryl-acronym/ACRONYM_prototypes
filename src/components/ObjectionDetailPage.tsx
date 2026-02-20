import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PanelLeft,
  MoreHorizontal,
  Users,
  Target,
  Bookmark,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Objection } from '@/objections-demo-data';
import { Signal, signalsData } from '@/signals-demo-data';
import { CompanyPill } from '@/components/CompanyPill';
import { CategoryPill } from '@/components/CategoryPill';
import { PersonaPill } from '@/components/PersonaPill';
import { EffectivenessPill } from '@/components/EffectivenessPill';

interface ObjectionDetailPageProps {
  objection: Objection;
  hideTopBar?: boolean;
}

const TopBar: React.FC<{ objectionTitle: string }> = ({ objectionTitle }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
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
              <BreadcrumbPage>{objectionTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ObjectionHeader: React.FC<{ objection: Objection }> = ({ objection }) => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <CategoryPill category={objection.category} />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-4">{objection.objection}</h1>
    </div>
  );
};

const DescriptionSection: React.FC<{ description: string }> = ({ description }) => (
  <div className="mb-8">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Description
    </h2>
    <p className="text-sm text-foreground/80 leading-relaxed">{description}</p>
  </div>
);

const KeyMovesSection: React.FC = () => (
  <div className="mb-8">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Key moves
    </h2>
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Move 1: Title</p>
          <p className="text-sm text-foreground/70">Description of the move and how to approach it.</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Move 2: Title</p>
          <p className="text-sm text-foreground/70">Description of the move and how to approach it.</p>
        </div>
      </div>
    </div>
  </div>
);

const WhatNotToDoSection: React.FC = () => (
  <div className="mb-8">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      What not to do
    </h2>
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">Don't dismiss the concern outright</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">Don't make promises you can't keep</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">Don't skip the data or evidence</p>
      </div>
    </div>
  </div>
);

const IdealOutcomeSection: React.FC = () => (
  <div className="mb-8">
    <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground/60 mb-3">
      Ideal outcome
    </h2>
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">Prospect understands the concern is valid and has clear answers</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">They feel confident moving forward despite the objection</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0 mt-2.5" />
        <p className="text-sm text-foreground/70">Deal momentum increases rather than stalls</p>
      </div>
    </div>
  </div>
);

const EffectivenessAndRaisedBySection: React.FC<{ objection: Objection }> = ({ objection }) => (
  <>
    <Separator className="my-8" />
    <div className="space-y-3">
      <div className="grid grid-cols-[180px_1fr] gap-6">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Effectiveness</span>
        </div>
        <EffectivenessPill effectiveness="Stalls" />
      </div>

      <div className="grid grid-cols-[180px_1fr] gap-6">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Typically raised by</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {objection.typically_raised_by.length > 0 ? (
            objection.typically_raised_by.map((persona, idx) => (
              <PersonaPill key={idx} persona={persona} />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">Not specified</span>
          )}
        </div>
      </div>
    </div>
  </>
);

const SignalCard: React.FC<{ signal: Signal; onClick: () => void }> = ({ signal, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-stone-200 rounded-lg p-4 hover:border-stone-300 hover:bg-stone-50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-muted-foreground">{signal.speaker_name}</p>
        <CompanyPill company_name={signal.company_name} company_logo_url={signal.company_logo_url} />
      </div>
      <div className="mb-3">
        <div className="bg-stone-100 rounded-lg px-3 py-2 inline-block max-w-full">
          <p className="text-xs text-foreground/80 leading-relaxed">{signal.conversation_snippet}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>from {signal.meeting_title}</p>
        <p>{signal.meeting_date}</p>
      </div>
    </button>
  );
};

const PinnedExamplesSection: React.FC<{ objection: Objection; onSignalClick: (signal: Signal) => void }> = ({ objection, onSignalClick }) => {
  const relatedSignals = signalsData.filter((signal) => signal.objection === objection.objection);

  if (relatedSignals.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          Pinned Examples
        </p>
      </div>
      <div className="space-y-4">
        {relatedSignals.slice(0, 3).map((signal) => (
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

const ResponsePlayTabContent: React.FC<{ objection: Objection }> = ({ objection }) => (
  <div className="pt-8 space-y-8">
    <KeyMovesSection />
    <WhatNotToDoSection />
    <IdealOutcomeSection />
    <EffectivenessAndRaisedBySection objection={objection} />
  </div>
);

const SignalsTab: React.FC<{ objection: Objection; onSignalClick: (signal: Signal) => void }> = ({ objection, onSignalClick }) => (
  <div>
    <PinnedExamplesSection objection={objection} onSignalClick={onSignalClick} />
  </div>
);

export const ObjectionDetailPage: React.FC<ObjectionDetailPageProps> = ({
  objection,
  hideTopBar = false,
}) => {
  const navigate = useNavigate();

  const handleSignalClick = (signal: Signal) => {
    navigate(`/signals/${signal.id}`);
  };

  if (hideTopBar) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 w-full">
            <ObjectionHeader objection={objection} />
            <DescriptionSection description={objection.description} />
            <Tabs defaultValue="response-play" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="response-play">Response Play</TabsTrigger>
                <TabsTrigger value="signals">Signals</TabsTrigger>
              </TabsList>
              <TabsContent value="response-play">
                <ResponsePlayTabContent objection={objection} />
              </TabsContent>
              <TabsContent value="signals">
                <SignalsTab objection={objection} onSignalClick={handleSignalClick} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen relative bg-sidebar overflow-hidden">
      <div className="flex-1 min-w-0 bg-white flex flex-col m-3 rounded-lg shadow-md overflow-hidden">
        <div className="z-20 bg-white h-[50px] flex items-center px-3 gap-2 border-b border-slate-200 flex-shrink-0">
          <SidebarTrigger className="h-8 w-8 p-1.5 hover:bg-slate-100 rounded transition-colors">
            <PanelLeft className="h-4 w-4" />
          </SidebarTrigger>
          <div className="flex-1 flex items-center">
            <TopBar objectionTitle={objection.objection} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto px-8 pt-8 pb-24 w-full">
            <ObjectionHeader objection={objection} />
            <DescriptionSection description={objection.description} />
            <Tabs defaultValue="response-play" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="response-play">Response Play</TabsTrigger>
                <TabsTrigger value="signals">Signals</TabsTrigger>
              </TabsList>
              <TabsContent value="response-play">
                <ResponsePlayTabContent objection={objection} />
              </TabsContent>
              <TabsContent value="signals">
                <SignalsTab objection={objection} onSignalClick={handleSignalClick} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectionDetailPage;
