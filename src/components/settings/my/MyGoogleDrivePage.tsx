import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen } from 'lucide-react';

export default function MyGoogleDrivePage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
          <FolderOpen className="h-5 w-5 text-neutral-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Google Drive</h1>
            <Badge variant="secondary" className="font-normal text-xs">Coming Soon</Badge>
          </div>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-3 mb-8">
        Connect Google Drive to extract context from files and surface relevant content in your workflows.
        No functionality is built yet — this tile signals roadmap intent.
      </p>
      <Button variant="outline" disabled className="gap-2 opacity-50 cursor-not-allowed">
        <Plus className="h-4 w-4" />
        Connect Google Drive
      </Button>
    </div>
  );
}
