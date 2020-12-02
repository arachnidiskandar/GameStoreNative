import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import Cart from './src/screens/Cart';
import Home from './src/screens/Home';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100%;
  padding: 0 20px;
`;
export default function App() {
  return (
    <StyledContainer>
      {/* <Home /> */}
      <Cart />
      <StatusBar style="auto" />
    </StyledContainer>
  );
}
