/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES, SERVER_ROUTES, StackParamList } from './utils/navigation';
import { Home } from './screens';
import { Connect as ServerConnect } from './screens/server';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';
import { TCPContextProvider } from './context/useTCPContext';

export const App = () => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="dark-content" />
      <TCPContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.HOME}>
            <Stack.Screen
              name={ROUTES.HOME}
              options={{ title: 'Home' }}
              component={Home}
            />
            <Stack.Group>
              <Stack.Screen
                name={SERVER_ROUTES.CONNECT}
                component={ServerConnect}
                options={{
                  title: 'Connect to this device',
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </TCPContextProvider>
    </TamaguiProvider>
  );
};

export default App;
