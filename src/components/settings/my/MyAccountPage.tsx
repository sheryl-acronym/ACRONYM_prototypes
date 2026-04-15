import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy } from 'lucide-react';

const ORG_ID = 'ac-8f3d2e1b-4c7a-4f9d-b2e6-1a3c5f7d9e2b';

const WORK_FUNCTIONS = [
  'Sales',
  'Customer Success',
  'Marketing',
  'Engineering',
  'Product',
  'Partnerships',
  'Leadership',
];


export default function MyAccountPage() {
  const [full_name, setFullName] = React.useState('Sheryl Soo');
  const [preferred_name, setPreferredName] = React.useState('Sheryl');
  const [work_function, setWorkFunction] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const copyOrgId = () => {
    navigator.clipboard.writeText(ORG_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const initials = full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl space-y-10">

      {/* Profile */}
      <div>
        <h2 className="text-base font-semibold text-neutral-900 mb-6">Profile</h2>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Full name</label>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">{initials}</span>
                </div>
                <Input value={full_name} onChange={(e) => setFullName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">
                What should ACRONYM call you? <span className="text-red-500">*</span>
              </label>
              <Input value={preferred_name} onChange={(e) => setPreferredName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">Your function</label>
            <Select value={work_function} onValueChange={setWorkFunction}>
              <SelectTrigger>
                <SelectValue placeholder="Select your function" />
              </SelectTrigger>
              <SelectContent>
                {WORK_FUNCTIONS.map((fn) => (
                  <SelectItem key={fn} value={fn}>{fn}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>

      {/* Account */}
      <div>
        <div className="space-y-0 rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
          {/* Log out */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <p className="text-sm text-neutral-700">Log out of all devices</p>
            <Button variant="outline" size="sm">Log out</Button>
          </div>
          {/* Delete account */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <p className="text-sm text-neutral-700">Delete account</p>
            <p className="text-sm text-neutral-400">Please contact your administrator to deprovision your account.</p>
          </div>
          {/* Role */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <p className="text-sm text-neutral-700">Account type</p>
            <span className="text-sm text-neutral-500">Owner</span>
          </div>
          {/* Org ID */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <p className="text-sm text-neutral-700">Organization ID</p>
            <button
              onClick={copyOrgId}
              className="flex items-center gap-1.5 font-mono text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 rounded px-2 py-1 hover:bg-neutral-100 transition-colors"
            >
              <span>{ORG_ID}</span>
              {copied ? <span className="text-green-600">Copied!</span> : <Copy className="h-3 w-3 flex-shrink-0" />}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
