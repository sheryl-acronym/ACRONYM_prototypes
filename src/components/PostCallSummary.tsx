import React from 'react';
import { PostCallSummaryData } from '@/types';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
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

interface PostCallSummaryProps {
  data: PostCallSummaryData;
  hideTopBar?: boolean;
}

export const PostCallSummary: React.FC<PostCallSummaryProps> = ({ data, hideTopBar = false }) => {
  const momentumColor = {
    Strong: 'bg-green-100 text-green-800 border-green-200',
    Active: 'bg-blue-100 text-blue-800 border-blue-200',
    Stalled: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'At risk': 'bg-red-100 text-red-800 border-red-200',
    Closed: 'bg-gray-100 text-gray-800 border-gray-200',
  }[data.momentum.status];

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
      {!hideTopBar && (
        <>
          <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200">
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
          <Separator />
        </>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">{data.title}</h1>
          <div className="flex items-center gap-2">
            <Badge className={`${momentumColor} border`}>{data.momentum.status}</Badge>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Meeting Info */}
        <div className="px-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Meeting Info</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Company</p>
                <p className="text-sm font-medium text-foreground">{data.metadata.company.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-sm font-medium text-foreground">{data.metadata.date_time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium text-foreground">{data.metadata.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Momentum Section */}
        <div className="px-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Momentum</h2>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">{data.momentum.description}</p>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Meeting Summary */}
        <div className="px-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Meeting Summary</h2>
          <p className="text-sm text-foreground leading-relaxed">{data.meeting_summary}</p>
        </div>

        {/* Key Discussion Points */}
        {data.key_discussion_points && data.key_discussion_points.length > 0 && (
          <>
            <Separator className="mb-6" />
            <div className="px-6 mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Key Discussion Points</h2>
              <ul className="space-y-2">
                {data.key_discussion_points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Next Steps */}
        {data.next_steps && data.next_steps.length > 0 && (
          <>
            <Separator className="mb-6" />
            <div className="px-6 mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Next Steps</h2>
              <div className="space-y-3">
                {data.next_steps.map((step, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground mb-2">{step.text}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Due: {step.due_date}</span>
                      <span className="text-xs text-muted-foreground">{step.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="pb-6" />
      </div>
    </div>
  );
};

export default PostCallSummary;
