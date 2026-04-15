import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function OrgSalesforcePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-neutral-400">SF</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Salesforce</h1>
            <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-3 mb-8">
        Connect your Salesforce org to sync deals, contacts, and companies with ACRONYM.
        Salesforce will follow the same connection structure as HubSpot.
      </p>
      <Button variant="outline" disabled className="gap-2 opacity-50 cursor-not-allowed">
        <Plus className="h-4 w-4" />
        Connect Salesforce
      </Button>
    </div>
  );
}
