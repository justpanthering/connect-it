import { useCallback, useEffect, useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';
import { HANDSHAKE_KEYS } from './constants';

export function useClient() {
  const [clientSocket, setClientSocket] = useState<TcpSocket.Socket>();

  useEffect(() => {
    return () => {
      clientSocket && clientSocket.destroy();
    };
  }, [clientSocket]);

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

  const resetClient = useCallback(() => {
    if (clientSocket) {
      clientSocket.destroy();
      setClientSocket(null);
    }
  }, [clientSocket]);

  return { clientSocket, handleCreateClientSocket, resetClient };
}
