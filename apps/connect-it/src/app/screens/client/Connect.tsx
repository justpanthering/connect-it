import React, { useState } from 'react';
import { Text, Stack, Input, Button } from 'tamagui';
import { useTCPContext } from '../../context/useTCPContext';

export function Connect() {
  const [serverIp, setServerIp] = useState<string>();
  const { handleCreateClientSocket } = useTCPContext();

  return (
    <Stack
      height={'100%'}
      justifyContent="center"
      alignItems="center"
      padding={20}
    >
      <Text color={'#000'} marginVertical={20}>
        Enter the the IP Address of the device you want to connect to.
      </Text>
      <Input
        minWidth={200}
        value={serverIp}
        onChangeText={setServerIp}
        textAlign="center"
        placeholder="IP Address"
      />
      <Button
        marginTop={10}
        onPress={() => {
          if (serverIp) {
            handleCreateClientSocket(serverIp);
          }
        }}
      >
        Connect
      </Button>
    </Stack>
  );
}
