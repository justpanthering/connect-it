import React, { useCallback } from 'react';
import { ROUTES, SERVER_ROUTES, StackParamList } from '../utils/navigation';
import { Button, Text, Stack } from 'tamagui';
import { QrCode, Scan } from '@tamagui/lucide-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TCPMode, useTCPContext } from '../context/useTCPContext';
import { useFocusEffect } from '@react-navigation/native';

export function Home(
  props: NativeStackScreenProps<StackParamList, ROUTES.HOME>
) {
  const { handleSetTCPMode, handleEnteredHomeScreen } = useTCPContext();

  useFocusEffect(
    useCallback(() => {
      handleEnteredHomeScreen();
    }, [])
  );

  return (
    <Stack height={'100%'} justifyContent="center" alignItems="center">
      <Button
        icon={<QrCode size={24} />}
        onPress={() => {
          handleSetTCPMode(TCPMode.SERVER);
          props.navigation.push(SERVER_ROUTES.CONNECT);
        }}
      >
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
