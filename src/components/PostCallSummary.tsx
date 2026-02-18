import React from 'react';
import { PostCallSummaryData } from '@/types';
import {
  CheckCircle2,
  Zap,
  Calendar,
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

export const PostCallSummary: React.FC<PostCallSummaryProps> = ({ data, hideTopBar = false }) => {
  const colors = momentumConfig[data.momentum.status];

  return (
    <div className="flex flex-1 min-h-screen relative flex-col bg-white">
      {/* Full-width header - sticky */}
      {!hideTopBar && (
        <div className="sticky top-0 z-20 flex-shrink-0 h-[50px] flex items-center px-3 bg-white border-b border-slate-200">
          <div className="flex-1 flex items-center">
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
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="max-w-[760px] mx-auto px-8 py-4 pb-24 w-full">
            {/* Title and Momentum Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-3">{data.title}</h1>
              <div className="flex items-center gap-3">
                <Badge className={`${colors.badge} border`}>{data.momentum.status}</Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Meeting Metadata Section - Two Column Layout */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-x-8">
                <div className="w-fit">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Company</p>
                  <p className="text-sm font-medium text-foreground">{data.metadata.company.name}</p>
                </div>
                <div className="text-left">
                  {/* Spacer for alignment */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8">
                <div className="flex items-start gap-2 w-fit">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-muted-foreground">Date and Time</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{data.metadata.date_time}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Momentum Summary Card */}
            <div className={`border rounded-lg p-4 mb-6 ${colors.bg} ${colors.border}`}>
              <div className="flex items-start gap-2">
                <Zap className={`h-5 w-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                <div>
                  <p className={`text-sm font-semibold ${colors.text} mb-1`}>Momentum</p>
                  <p className={`text-sm ${colors.text} leading-relaxed`}>{data.momentum.description}</p>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="bg-transparent p-0 h-auto border-b border-slate-200 w-full justify-start rounded-none gap-0">
                <TabsTrigger
                  value="summary"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium px-0 mr-6"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger
                  value="next-steps"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-colors pb-2.5 pt-2 text-sm font-medium px-0 mr-6"
                >
                  Next Steps
                </TabsTrigger>
              </TabsList>

              {/* Summary Tab */}
              <TabsContent value="summary" className="mt-6">
                <div className="space-y-6">
                  {/* Meeting Summary */}
                  <div>
                    <h2 className="text-sm font-semibold text-foreground mb-3">Meeting Summary</h2>
                    <p className="text-sm text-foreground leading-relaxed">{data.meeting_summary}</p>
                  </div>

                  {/* Key Discussion Points */}
                  {data.key_discussion_points && data.key_discussion_points.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-sm font-semibold text-foreground mb-3">Key Discussion Points</h2>
                        <ul className="space-y-2">
                          {data.key_discussion_points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 group">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>

              {/* Next Steps Tab */}
              <TabsContent value="next-steps" className="mt-6">
                {data.next_steps && data.next_steps.length > 0 ? (
                  <div className="space-y-3">
                    {data.next_steps.map((step, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50/50 transition-colors">
                        <p className="text-sm font-medium text-foreground mb-3">{step.text}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">Due {step.due_date}</span>
                          <span className="text-xs font-medium text-muted-foreground">{step.assignee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No next steps recorded.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCallSummary;
