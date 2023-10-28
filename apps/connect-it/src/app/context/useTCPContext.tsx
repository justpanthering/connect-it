import React, { useCallback, useEffect, useState } from 'react';
import { generateContext } from './generateContext';
import TcpSocket from 'react-native-tcp-socket';

export enum TCPMode {
  SERVER = 'server',
  CLIENT = 'client',
}
type TCPModeTypes = TCPMode.SERVER | TCPMode.CLIENT;

export const [TCPContext, useTCPContext] = generateContext<{
  tcpMode: TCPMode | null;
  handleSetTCPMode: (mode: TCPMode) => void;
  serverSocket: TcpSocket.Server | null;
  handleEnteredHomeScreen: () => void;
}>();

export function TCPContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tcpMode, setTCPMode] = useState<TCPModeTypes | null>(null);
  const [serverSocket, setServerSocket] = useState<TcpSocket.Server | null>(
    null
  );

  useEffect(() => {
    return () => {
      serverSocket && serverSocket.close();
    };
  }, [serverSocket]);

  const handleSetTCPMode = useCallback(
    (mode: TCPModeTypes) => {
      setTCPMode(mode);
      if (!serverSocket) {
        const server = TcpSocket.createServer(function (socket) {
          socket.on('data', (data) => {
            socket.write('Echo server ' + data);
          });

          socket.on('error', (error) => {
            console.log('An error ocurred with client socket ', error);
          });

          socket.on('close', (error) => {
            console.log('Closed connection with ', socket.address());
          });
        });
        // Start server
        server.listen({ port: 12345, host: '0.0.0.0', reuseAddress: true });
        // Set event listner on server socket
        server.on('error', (error) => {
          console.log('An error ocurred with the server', error);
        });
        server.on('close', () => {
          console.log('Server closed connection');
        });
        // Save value in context
        setServerSocket(server);
      }
    },
    [serverSocket]
  );

  const handleEnteredHomeScreen = useCallback(() => {
    if (serverSocket) {
      serverSocket.close();
      setServerSocket(null);
      setTCPMode(null);
    }
  }, [serverSocket]);

  return (
    <TCPContext.Provider
      value={{
        tcpMode,
        handleSetTCPMode,
        serverSocket,
        handleEnteredHomeScreen,
      }}
    >
      {children}
    </TCPContext.Provider>
  );
}
