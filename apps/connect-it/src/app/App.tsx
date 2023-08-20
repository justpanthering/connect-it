/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './utils/navigation';
import { Home } from './screens';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';

export const App = () => {
  const Stack = createStackNavigator();

  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen
            name={ROUTES.HOME}
            options={{ title: 'Home' }}
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
};

export default App;
