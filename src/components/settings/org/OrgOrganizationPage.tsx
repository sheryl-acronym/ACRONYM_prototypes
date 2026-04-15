import React from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Copy, Search } from 'lucide-react';

const MOCK_MEMBERS = [
  { id: 'm-001', name: 'Alex Chen', email: 'alex@flex.com', role: 'Owner', status: 'Active', is_primary: true },
  { id: 'm-002', name: 'Jordan Kim', email: 'jordan@flex.com', role: 'Owner', status: 'Active', is_primary: false },
  { id: 'm-003', name: 'Riley Park', email: 'riley@flex.com', role: 'User', status: 'Active', is_primary: false },
  { id: 'm-004', name: 'Morgan Davis', email: 'morgan@flex.com', role: 'User', status: 'Active', is_primary: false },
  { id: 'm-005', name: 'Sheryl Soo', email: 'sheryl@goacronym.com', role: 'Owner', status: 'Active', is_primary: false },
];

const ORG_ID = 'd5c14f34-b5cf-4ff3-9a38-4c07a255762d';
const DOMAIN = 'withflex.com';

export default function OrgOrganizationPage() {
  const [search, setSearch] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const filtered_members = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyId = () => {
    navigator.clipboard.writeText(ORG_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const owner_count = MOCK_MEMBERS.filter((m) => m.role === 'Owner').length;
  const member_count = MOCK_MEMBERS.length;

  return (
    <div>
      {/* Workspace overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Workspace overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <StatBlock value={DOMAIN} label="Allowed email domain" />
          <StatBlock value={String(member_count)} label="Total members" />
          <StatBlock value={String(owner_count)} label="Owners" />
        </div>
      </section>

      <Separator />

      {/* Members */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Members</h2>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <div className="ml-auto">
            <p className="text-sm text-neutral-400">
              Role assignment is managed by ACRONYM
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50">
                <TableHead className="text-sm font-medium text-neutral-500 h-10">Name</TableHead>
                <TableHead className="text-sm font-medium text-neutral-500 h-10">Role</TableHead>
                <TableHead className="text-sm font-medium text-neutral-500 h-10">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered_members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-600 flex-shrink-0">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                        <p className="text-sm text-neutral-400">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-sm text-neutral-700">
                      {member.is_primary ? 'Primary Owner' : member.role}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal bg-green-50 text-green-700 hover:bg-green-50"
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <Separator />

      {/* Workspace ID */}
      <section className="py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-700">Workspace ID</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-neutral-500">{ORG_ID}</span>
            <button
              onClick={handleCopyId}
              className="p-1 hover:text-neutral-900 text-neutral-400 transition-colors rounded"
              title="Copy ID"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            {copied && <span className="text-xs text-green-600">Copied</span>}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBlock({
  value,
  label,
  action,
}: {
  value: string;
  label: string;
  action?: string;
}) {
  return (
    <div>
      <p className="text-base font-semibold text-neutral-900">{value}</p>
      <p className="text-sm text-neutral-400 mt-0.5">{label}</p>
      {action && (
        <button className="text-sm text-blue-600 hover:text-blue-700 mt-1 font-medium">
          {action}
        </button>
      )}
    </div>
  );
}
