import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Mail } from 'lucide-react';

export default function MyGmailPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
          <Mail className="h-5 w-5 text-neutral-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Gmail</h1>
            <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-3 mb-8">
        Connect Gmail to read emails associated with your deals and draft follow-up emails directly.
        Email context is currently read via HubSpot — direct Gmail integration will expand the data source and enable additional workflows.
      </p>
      <Button variant="outline" disabled className="gap-2 opacity-50 cursor-not-allowed">
        <Plus className="h-4 w-4" />
        Connect Gmail
      </Button>
    </div>
  );
}
