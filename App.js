import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { color } from 'react-native-reanimated';
import Cart from './src/screens/Cart';
import Home from './src/screens/Home';
import { CartProvider } from './src/contexts/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#3f50b5' },
              headerTintColor: '#fff',
            }}
            initialRouteName="GameStore"
          >
            <Stack.Screen name="GameStore" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
      <StatusBar style="auto" />
    </>
  );
}
