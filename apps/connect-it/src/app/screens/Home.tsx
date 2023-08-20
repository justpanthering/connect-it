import React from 'react';
import { Button, Text, Stack } from 'tamagui';
import { QrCode, Scan } from '@tamagui/lucide-icons';

export function Home() {
  return (
    <Stack height={'100%'} justifyContent="center" alignItems="center">
      <Button icon={<QrCode size={24} />}>
        <Text>Show QR</Text>
      </Button>
      <Text marginVertical={10} color={'black'}>
        or
      </Text>
      <Button icon={<Scan size={24} />}>
        <Text>Scan QR</Text>
      </Button>
    </Stack>
  );
}
