import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function OrgTeamPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-semibold">Team</h1>
        <Badge variant="outline" className="text-neutral-400 border-neutral-200 font-normal text-xs">Deferred</Badge>
      </div>
      <p className="text-sm text-neutral-500 mb-8">
        Member roster giving you visibility into who is active on the workspace and their setup status.
      </p>
      <div className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50 p-12 flex flex-col items-center text-center">
        <Users className="h-8 w-8 text-neutral-300 mb-3" />
        <p className="text-sm font-medium text-neutral-500">Team management is coming soon</p>
        <p className="text-xs text-neutral-400 mt-1 max-w-sm">
          Self-serve member management, invite flows, and team structure are on the roadmap. Your team is currently managed directly by ACRONYM.
        </p>
      </div>
    </div>
  );
}
