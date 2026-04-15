import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { initialMyIntegrations } from '@/settings-mock-data';

interface Connection {
  id: string;
  name: string;
  logo: string;
  description?: string;
  coming_soon?: boolean;
  configure_path?: string; // if set, Configure button links here
}

const CONNECTIONS: Connection[] = [
  {
    id: 'slack',
    name: 'Slack',
    logo: '/slack.png',
    description: 'Receive personal DM notifications',
  },
  {
    id: 'google_calendar',
    name: 'Google Calendar',
    logo: '/googlecalendar.webp',
    description: 'Sync meetings and call context',
    configure_path: '/settings/my/integrations/google-calendar',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    logo: '/gmail.png',
    coming_soon: true,
  },
  {
    id: 'google_drive',
    name: 'Google Drive',
    logo: '/google-drive.png',
    coming_soon: true,
  },
  {
    id: 'acronym_recorder',
    name: 'ACRONYM Recorder',
    logo: '/acronym-recorder.png',
    coming_soon: true,
  },
];

export default function MyConnectionsPage() {
  const [connections, setConnections] = React.useState(initialMyIntegrations);
  const [testing, setTesting] = React.useState<string | null>(null);
  const [test_ok, setTestOk] = React.useState<string | null>(null);
  const [disconnect_id, setDisconnectId] = React.useState<string | null>(null);
  const [disconnect_confirm, setDisconnectConfirm] = React.useState('');

  const handleDisconnectClose = (open: boolean) => {
    if (!open) {
      setDisconnectId(null);
      setDisconnectConfirm('');
    }
  };

  const confirmDisconnect = () => {
    if (!disconnect_id) return;
    setConnections((prev) => ({ ...prev, [disconnect_id]: { connected: false } }));
    setDisconnectId(null);
    setDisconnectConfirm('');
  };

  const handleConnect = (id: string) => {
    setConnections((prev) => ({ ...prev, [id]: { connected: true, connected_email: 'alex@flex.com' } }));
  };

  const testConnection = (id: string) => {
    setTesting(id);
    setTestOk(null);
    setTimeout(() => {
      setTesting(null);
      setTestOk(id);
      setTimeout(() => setTestOk(null), 3000);
    }, 1500);
  };

  const disconnectingName = CONNECTIONS.find((c) => c.id === disconnect_id)?.name ?? '';

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-2">Connections</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Allow ACRONYM to connect to your tools for more context and power personal workflows.
      </p>

      <div className="rounded-lg border border-neutral-200 bg-white divide-y divide-neutral-100 overflow-hidden">
        {CONNECTIONS.map((conn) => {
          const state = connections[conn.id];
          const is_connected = state?.connected ?? false;

          return (
            <div key={conn.id} className="flex items-center gap-3 px-4 py-3.5">
              {/* Logo */}
              <div className="h-9 w-9 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center flex-shrink-0">
                <img
                  src={conn.logo}
                  alt={conn.name}
                  className="h-5 w-5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Name + description */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${conn.coming_soon ? 'text-neutral-400' : 'text-neutral-900'}`}>
                  {conn.name}
                </p>
                {conn.description && !conn.coming_soon && (
                  <p className="text-xs text-neutral-400 mt-0.5">{conn.description}</p>
                )}
                {conn.coming_soon && (
                  <p className="text-xs text-neutral-400 mt-0.5">Coming soon</p>
                )}
              </div>

              {/* Actions */}
              {conn.coming_soon ? (
                <span className="text-xs text-neutral-300 font-medium">Coming soon</span>
              ) : is_connected ? (
                <div className="flex items-center gap-2">
                  {test_ok === conn.id && (
                    <span className="text-xs text-green-600 font-medium">Verified</span>
                  )}
                  <span className="text-sm font-medium text-indigo-600">Connected</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => testConnection(conn.id)} disabled={testing === conn.id}>
                        {testing === conn.id ? (
                          <span className="flex items-center gap-1.5"><Loader2 className="h-3.5 w-3.5 animate-spin" />Testing…</span>
                        ) : 'Test connection'}
                      </DropdownMenuItem>
                      {conn.configure_path && (
                        <DropdownMenuItem asChild>
                          <Link to={conn.configure_path}>Configure</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => setDisconnectId(conn.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : conn.configure_path ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={conn.configure_path}>Configure</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={conn.configure_path}>Configure</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleConnect(conn.id)}>
                    Connect
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleConnect(conn.id)}>Connect</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Disconnect dialog */}
      <Dialog open={!!disconnect_id} onOpenChange={handleDisconnectClose}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Disconnect {disconnectingName}</DialogTitle>
            <DialogDescription className="pt-1 space-y-2">
              <span className="block">This will disconnect your {disconnectingName} account from ACRONYM.</span>
              <span className="block">You can reconnect at any time.</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-1">
            <p className="text-xs text-neutral-500">
              Type <span className="font-mono font-semibold text-neutral-800">DISCONNECT</span> to confirm
            </p>
            <input
              value={disconnect_confirm}
              onChange={(e) => setDisconnectConfirm(e.target.value)}
              placeholder="DISCONNECT"
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm font-mono placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" size="sm" onClick={() => handleDisconnectClose(false)}>Cancel</Button>
            <Button
              size="sm"
              disabled={disconnect_confirm !== 'DISCONNECT'}
              onClick={confirmDisconnect}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
