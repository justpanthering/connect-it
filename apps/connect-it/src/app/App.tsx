/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './utils/navigation';
import { Home } from './screens';

export const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name={ROUTES.HOME} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
