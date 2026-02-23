import React from 'react';
import { Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { connectorsMockData } from '@/connectors-mock-data';

type Connector = typeof connectorsMockData[0];

interface ConnectorsSectionProps {
  onConfigureSlack?: () => void;
}

export default function ConnectorsSection({ onConfigureSlack }: ConnectorsSectionProps) {
  const [connectors, setConnectors] = React.useState<Connector[]>(connectorsMockData);

  const handleConnect = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'connected' as const } : c))
    );
  };

  return (
    <div className="w-full">
      {/* Connectors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectors.map((connector) => (
          <ConnectorCard
            key={connector.id}
            connector={connector}
            onConnect={handleConnect}
            onConfigure={connector.id === 'slack' ? onConfigureSlack : undefined}
          />
        ))}
      </div>
    </div>
  );
}

interface ConnectorCardProps {
  connector: Connector;
  onConnect: (id: string) => void;
  onConfigure?: () => void;
}

function ConnectorCard({ connector, onConnect, onConfigure }: ConnectorCardProps) {
  const isConnected = connector.status === 'connected';
  const isConfigurable = connector.status === 'configured';

  return (
    <div className="flex flex-col border border-border rounded-lg p-6 hover:border-slate-300 transition-colors">
      {/* Top section: Icon + Name + Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div
            className="h-12 w-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200"
          >
            {connector.logo_url ? (
              <img
                src={connector.logo_url}
                alt={connector.name}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <span className="text-xl">{connector.icon}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base">{connector.name}</h3>
            {connector.url && (
              <p className="text-xs text-slate-500 mt-0.5">{connector.url}</p>
            )}
            {connector.badge && (
              <Badge variant="secondary" className="text-xs mt-1">
                {connector.badge}
              </Badge>
            )}
          </div>
        </div>
        {isConnected && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors">
                <Settings className="h-4 w-4 text-slate-600" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="end">
              <div className="space-y-1">
                <button
                  onClick={onConfigure}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors"
                >
                  Configure
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors text-red-600 hover:bg-red-50">
                  Disconnect
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-6 flex-1">{connector.description}</p>

      {/* Bottom section: Action button */}
      <div className="flex items-center justify-between">
        {isConnected && (
          <>
            <div className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <span className="inline-block w-2 h-2 rounded-full bg-green-600"></span>
              Connected
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
            >
              Test Connection
            </Button>
          </>
        )}
        {!isConnected && !isConfigurable && (
          <div className="flex-1" />
        )}
        {isConfigurable && (
          <div className="flex-1" />
        )}
        {!isConnected && !isConfigurable && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onConnect(connector.id)}
            className="gap-1.5 h-8 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        )}
        {isConfigurable && (
          <Button
            size="sm"
            variant="outline"
            onClick={onConfigure}
            className="h-8 text-xs"
          >
            Configure
          </Button>
        )}
      </div>
    </div>
  );
}
