// src/ConnectionState.tsx

// React hooks are exported from the 'ably/react' path of the 'ably' package.
import { useAbly, useConnectionStateListener } from "ably/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

export function ConnectionState() {
  // This component displays the current connection state

  // The useAbly hook returns the Ably Realtime client instance provided by the AblyProvider
  const ably = useAbly();
  const [connectionState, setConnectionState] = useState(ably.connection.state);

  // useConnectionStateListener hook listens for changes in connection state
  useConnectionStateListener((stateChange) => {
    setConnectionState(stateChange.current);
  });

  return (
    <Badge variant="secondary" className="flex items-center gap-1 bg-green-200">
      <Globe className="w-3 h-3" />
      Status: {connectionState ? connectionState.toLocaleUpperCase() : "connecting..."}
    </Badge>
  );
}
