import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MapsScreen, MainScreen } from '../screens/index';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Maps" component={MapsScreen} options={{ title: 'Mapa' }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
