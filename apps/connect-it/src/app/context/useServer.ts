import { useCallback, useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { HANDSHAKE_KEYS } from './constants';

export function useServer() {
  const [server, setServer] = useState<TcpSocket.Server | null>(null);

  useEffect(() => {
    return () => {
      server && server.close();
    };
  }, [server]);

  const initializeServerSocket = useCallback(() => {
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
    setServer(server);
  }, []);

  const resetServer = useCallback(() => {
    if (server) {
      server.close();
      setServer(null);
    }
  }, [server]);

  return { server, initializeServerSocket, resetServer };
}
