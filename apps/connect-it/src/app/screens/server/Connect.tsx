import React, { useEffect, useState } from 'react';
import { Text, Stack, Spinner } from 'tamagui';
import { useTCPContext } from '../../context/useTCPContext';
import { NetworkInfo } from 'react-native-network-info';
import QRCode from 'react-qr-code';

export function Connect() {
  const [ipAddress, setIpAddress] = useState('');

  const { server } = useTCPContext();

  useEffect(() => {
    async function getIpAddress() {
      const ip = await NetworkInfo.getIPV4Address();
      setIpAddress(ip);
    }
    if (!ipAddress) {
      getIpAddress();
    }
  }, [ipAddress]);

  if (!server) {
    return (
      <Stack height={'100%'} justifyContent="center" alignItems="center">
        <Spinner />
      </Stack>
    );
  }

  return (
    <Stack
      height={'100%'}
      justifyContent="center"
      alignItems="center"
      padding={20}
    >
      <QRCode value={ipAddress} />
      <Text color={'#000'} marginVertical={20}>
        Scan the above QR code from another device, or manually type in the
        below IP Address to connect the two devices.
      </Text>
      <Text color={'#000'}>IP Address: {ipAddress}</Text>
    </Stack>
  );
}
