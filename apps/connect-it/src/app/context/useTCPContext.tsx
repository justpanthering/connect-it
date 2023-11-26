import React, { useCallback, useState } from 'react';
import { generateContext } from './generateContext';
import TcpSocket from 'react-native-tcp-socket';
import { useServer } from './useServer';
import { useClient } from './useClient';

export enum TCPMode {
  SERVER = 'server',
  CLIENT = 'client',
}
type TCPModeTypes = TCPMode.SERVER | TCPMode.CLIENT;

export const [TCPContext, useTCPContext] = generateContext<{
  tcpMode: TCPMode | null;
  handleSetTCPMode: (mode: TCPMode) => void;
  server: TcpSocket.Server | null;
  handleEnteredHomeScreen: () => void;
  handleCreateClientSocket: (ipv4Address: string) => void;
}>();

export function TCPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tcpMode, setTCPMode] = useState<TCPModeTypes | null>(null);

  const { server, initializeServerSocket, resetServer } = useServer();
  const { handleCreateClientSocket, resetClient } = useClient();

  const handleSetTCPMode = useCallback(
    (mode: TCPModeTypes) => {
      setTCPMode(mode);
      if (mode === TCPMode.SERVER && !server) {
        initializeServerSocket();
      }
    },
    [server, initializeServerSocket]
  );

  const handleEnteredHomeScreen = useCallback(() => {
    setTCPMode(null);
    resetClient();
    resetServer();
  }, [resetClient, resetServer]);

  return (
    <TCPContext.Provider
      value={{
        tcpMode,
        handleSetTCPMode,
        server,
        handleEnteredHomeScreen,
        handleCreateClientSocket,
      }}
    >
      {children}
    </TCPContext.Provider>
  );
}
