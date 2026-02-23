import React from 'react';
import { PostCallSummaryData } from '@/types';
import {
  Zap,
  Calendar,
  Users,
  FileText,
  Building,
  Box,
  MoreHorizontal,
  Link as LinkIcon,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ContactPill } from '@/components/ContactPill';
import { CompanyPill } from '@/components/CompanyPill';
import { DealPill } from '@/components/DealPill';
import { ActionItem } from '@/components/ActionItem';
import { TranscriptPanel } from '@/components/TranscriptPanel';

interface PostCallSummaryProps {
  data: PostCallSummaryData;
  hideTopBar?: boolean;
}

const momentumConfig = {
  Strong: { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200', badge: 'bg-green-100 text-green-800 border-green-200' },
  Active: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  Stalled: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  'At risk': { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200', badge: 'bg-red-100 text-red-800 border-red-200' },
  Closed: { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-800 border-gray-200' },
};

const statusIcon = (status: 'complete' | 'partial' | 'missing'): string => {
  switch (status) {
    case 'complete':
      return '⬤';
    case 'partial':
      return '◐';
    case 'missing':
      return '⚪';
  }
};

const MeddicsSection: React.FC<{
  meddic?: PostCallSummaryData['meddic'];
}> = ({ meddic }) => {
  const [expandedIndices, setExpandedIndices] = React.useState<Set<number>>(
    () => new Set(meddic?.components.map((_, i) => i) ?? [])
  );

  const toggleExpanded = (index: number) => {
    const newSet = new Set(expandedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedIndices(newSet);
  };

  if (!meddic || meddic.components.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        MEDDIC data not available for this meeting.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8">Status</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-48">Component</th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Information Captured</th>
              <th className="text-left px-4 py-3 font-medium text-foreground w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {meddic.components.map((comp, i) => (
              <React.Fragment key={i}>
                <tr
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => toggleExpanded(i)}
                >
                  <td className="px-4 py-3 text-center">{statusIcon(comp.status)}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{comp.name}</td>
                  <td className="px-4 py-3 text-foreground/80">{comp.information}</td>
                  <td className="px-4 py-3 text-right">
                    {comp.details && comp.details.length > 0 && (
                      <span className="text-muted-foreground/50 text-sm">
                        {expandedIndices.has(i) ? '‸' : '›'}
                      </span>
                    )}
                  </td>
                </tr>
                {expandedIndices.has(i) && comp.details && comp.details.length > 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-3">
                      <ul className="space-y-2">
                        {comp.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                            <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PostCallSummary: React.FC<PostCallSummaryProps> = ({ data, hideTopBar = false }) => {
  const colors = momentumConfig[data.momentum.status];
  const [showTranscript, setShowTranscript] = React.useState(false);

  return (
    <div className="flex flex-1 min-h-screen relative flex-col bg-white">
      {/* Full-width header - sticky */}
      {!hideTopBar && (
        <div className="sticky top-0 z-20 flex-shrink-0 h-[50px] flex items-center px-3 bg-white border-b border-slate-200">
          <div className="flex-1 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                {data.breadcrumb.map((item, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {i === data.breadcrumb.length - 1 ? (
                        <BreadcrumbPage>{item}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content area with flex layout */}
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 min-w-0 bg-white flex flex-col overflow-hidden transition-all`}>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[760px] mx-auto px-8 py-4 pb-24 w-full">
            {/* Title and Momentum Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-3">{data.title}</h1>
            </div>

            {/* Meeting Metadata Section - Two Column Layout */}
            <div className="space-y-4 mb-6">
              <div className="grid gap-x-8" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div className="flex items-start gap-2 w-fit">
                  <Box className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Deal</p>
                </div>
                <div className="text-left">
                  <DealPill deal="Integration Partnership" momentum="Strong" />
                </div>
              </div>
              <div className="grid gap-x-8" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div className="flex items-start gap-2 w-fit">
                  <Building className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                </div>
                <div className="text-left">
                  <CompanyPill
                    company_name={data.metadata.company.name}
                    company_logo_url={data.metadata.company.logo_url}
                  />
                </div>
              </div>
              <div className="grid gap-x-8" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div className="flex items-start gap-2 w-fit">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Date and Time</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{data.metadata.date_time}</p>
                </div>
              </div>
              <div className="grid gap-x-8" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div className="flex items-start gap-2 w-fit">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Participants</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ContactPill name="Alex Martinez" avatarColor="blue-400" />
                  <ContactPill name="Jamie Chen" avatarColor="green-400" />
                  <ContactPill name="Morgan Davis" avatarColor="purple-400" />
                </div>
              </div>
              <div className="grid gap-x-8" style={{ gridTemplateColumns: '120px 1fr' }}>
                <div className="flex items-start gap-2 w-fit">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Transcript</p>
                </div>
                <div className="text-left">
                  <button
                    onClick={() => setShowTranscript(true)}
                    disabled={!data.transcript}
                    className="inline-flex items-center gap-2 h-6 px-3 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">View transcript</span>
                  </button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Momentum Summary Card */}
            <div className={`border rounded-lg p-4 mb-6 ${colors.bg} ${colors.border}`}>
              <div className="flex items-start gap-2">
                <Zap className={`h-5 w-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-sm font-semibold ${colors.text}`}>Momentum</p>
                    <Badge className={`${colors.badge} border`}>{data.momentum.status}</Badge>
                  </div>
                  <p className={`text-sm ${colors.text} leading-relaxed`}>{data.momentum.description}</p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Separator className="my-6" />
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="intel">Intel</TabsTrigger>
                <TabsTrigger value="meddic">MEDDIC</TabsTrigger>
              </TabsList>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-6">
                <div className="space-y-6">
                  {/* Meeting Summary */}
                  <div>
                    <h2 className="text-sm font-semibold text-foreground mb-3">Meeting Summary</h2>
                    <div className="space-y-3">
                      {data.meeting_summary.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-sm text-foreground leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Key Discussion Points */}
                  {data.key_discussion_points && data.key_discussion_points.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Key signals this call</h2>
                        <ul className="space-y-2">
                          {data.key_discussion_points.map((point, i) => {
                            const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'];
                            const bgColor = colors[i % colors.length];
                            return (
                              <li key={i} className="flex items-start gap-2 group">
                                <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 mt-1.5 ${bgColor}`} />
                                <span className="text-sm text-foreground">{point}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Our Next Steps */}
                  {data.our_next_steps && data.our_next_steps.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Our next steps</h2>
                        <div className="space-y-2">
                          {data.our_next_steps.map((step, i) => (
                            <ActionItem
                              key={i}
                              text={step.text}
                              assignee={step.assignee}
                              completed={false}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Their Next Steps */}
                  {data.their_next_steps && data.their_next_steps.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Their next steps</h2>
                        <div className="space-y-2">
                          {data.their_next_steps.map((step, i) => (
                            <ActionItem
                              key={i}
                              text={step.text}
                              assignee={step.assignee}
                              completed={false}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* Intel Tab */}
              <TabsContent value="intel" className="mt-6">
                <div className="space-y-6">
                  {/* What We Learned This Call */}
                  {data.what_we_learned && data.what_we_learned.length > 0 && (
                    <div>
                      <h2 className="text-sm font-semibold text-foreground mb-3">What we learned this call</h2>
                      <div className="space-y-4">
                        {data.what_we_learned.map((section, i) => (
                          <div key={i}>
                            <h3 className="text-sm font-medium text-foreground mb-2">{section.title}</h3>
                            <ul className="space-y-2 ml-2">
                              {section.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-sm text-foreground leading-relaxed">• {item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Positive Signals */}
                  {data.positive_signals && data.positive_signals.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Positive signals</h2>
                        <div className="space-y-4">
                          {data.positive_signals.map((signal, i) => (
                            <div key={i}>
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{signal.title}: {signal.description}</p>
                                </div>
                              </div>
                              {signal.evidence && (
                                <div className="ml-6 mb-2">
                                  <p className="text-xs text-muted-foreground mb-1">Evidence:</p>
                                  <p className="text-sm text-foreground/80">{signal.evidence}</p>
                                </div>
                              )}
                              {signal.quote && (
                                <div className="ml-6">
                                  <p className="text-xs text-muted-foreground mb-1">Quote:</p>
                                  <p className="text-sm text-foreground/80 italic">"{signal.quote}"</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Risk Factors */}
                  {data.risk_factors && data.risk_factors.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Risk factors</h2>
                        <div className="space-y-4">
                          {data.risk_factors.map((risk, i) => (
                            <div key={i}>
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-slate-400 flex-shrink-0 mt-0.5">•</span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{risk.title}: {risk.description}</p>
                                </div>
                              </div>
                              {risk.evidence && (
                                <div className="ml-6 mb-2">
                                  <p className="text-xs text-muted-foreground mb-1">Evidence:</p>
                                  <p className="text-sm text-foreground/80">{risk.evidence}</p>
                                </div>
                              )}
                              {risk.quote && (
                                <div className="ml-6">
                                  <p className="text-xs text-muted-foreground mb-1">Quote:</p>
                                  <p className="text-sm text-foreground/80 italic">"{risk.quote}"</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* MEDDIC Tab */}
              <TabsContent value="meddic" className="mt-6">
                <MeddicsSection meddic={data.meddic} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </div>

        {/* Inset Transcript Panel */}
        {showTranscript && data.transcript && (
          <div className="w-[420px] bg-white border-l border-slate-200 flex flex-col overflow-hidden">
            <TranscriptPanel
              transcript={data.transcript}
              onClose={() => setShowTranscript(false)}
              isInset={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCallSummary;
