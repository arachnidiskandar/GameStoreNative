import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './src/screens/Cart';
import Home from './src/screens/Home';
import { CartProvider } from './src/contexts/CartContext';
import { theme } from './src/Styles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: '#fff',
            }}
            initialRouteName="GameStore"
          >
            <Stack.Screen name="GameStore" component={Home} />
            <Stack.Screen name="Carrinho" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
      <StatusBar style="auto" />
    </>
  );
}
