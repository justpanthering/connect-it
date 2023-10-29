import React, { useCallback, useEffect, useState } from 'react';
import { generateContext } from './generateContext';
import TcpSocket from 'react-native-tcp-socket';
import { NetworkInfo } from 'react-native-network-info';

export enum TCPMode {
  SERVER = 'server',
  CLIENT = 'client',
}
type TCPModeTypes = TCPMode.SERVER | TCPMode.CLIENT;

const HANDSHAKE_KEYS = {
  CLIENT_KEY: 'CLIENT_SAYS_HELLO',
  SERVER_KEY: 'SERVER_SAYS_HELLO',
};

export const [TCPContext, useTCPContext] = generateContext<{
  tcpMode: TCPMode | null;
  handleSetTCPMode: (mode: TCPMode) => void;
  serverSocket: TcpSocket.Server | null;
  handleEnteredHomeScreen: () => void;
  handleCreateClientSocket: (ipv4Address: string) => void;
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

  const [clientSocket, setClientSocket] = useState<TcpSocket.Socket>();

  useEffect(() => {
    return () => {
      serverSocket && serverSocket.close();
    };
  }, [serverSocket]);

  const handleSetTCPMode = useCallback(
    (mode: TCPModeTypes) => {
      setTCPMode(mode);
      if (mode === TCPMode.SERVER && !serverSocket) {
        const server = TcpSocket.createServer(function (socket) {
          socket.on('data', (data) => {
            console.log('SERVER: Received data', data.toString());
            if (data.toString() === HANDSHAKE_KEYS.CLIENT_KEY) {
              socket.write(HANDSHAKE_KEYS.SERVER_KEY);
            } else socket.write('Echo server ' + data);
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

  const handleCreateClientSocket = useCallback(
    async (ipv4Address: string) => {
      const client = TcpSocket.createConnection(
        { port: 12345, host: ipv4Address },
        () => {
          // Write on the socket
          client.write(HANDSHAKE_KEYS.CLIENT_KEY);
        }
      );

      client.on('data', function (data) {
        console.log('CLIENT: Received data', data.toString());
        if (!clientSocket) {
          if (data.toString() === HANDSHAKE_KEYS.SERVER_KEY) {
            console.log('CLIENT: Socket connection successful');
            setClientSocket(clientSocket);
          } else {
            console.log(
              'CLIENT: Invalid handshake key from server. Disconnecting...'
            );
            client.destroy();
            setClientSocket(null);
          }
        }
      });

      client.on('error', function (error) {
        console.log('Client: ', error);
      });

      client.on('close', function () {
        console.log('Connection closed!');
        setClientSocket(null);
      });
    },
    [clientSocket]
  );

  const handleEnteredHomeScreen = useCallback(() => {
    if (serverSocket) {
      serverSocket.close();
      setServerSocket(null);
      setTCPMode(null);
    } else {
      setClientSocket(null);
    }
  }, [serverSocket]);

  return (
    <TCPContext.Provider
      value={{
        tcpMode,
        handleSetTCPMode,
        serverSocket,
        handleEnteredHomeScreen,
        handleCreateClientSocket,
      }}
    >
      {children}
    </TCPContext.Provider>
  );
}
