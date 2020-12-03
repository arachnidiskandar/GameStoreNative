import React from 'react';
import styled from 'styled-components/native';
import { Text, View, Image, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CartItem from '../components/CartItem';
import { globalStyles } from '../../Styles';

const OrderSummaryContainer = styled.View`
  border-radius: 20px;
  padding: 10px 20px;
  background-color: white;
  margin-top: 10px;
  elevation: 3;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;
const StyledText = styled.Text`
  font-size: 16px;
  margin: 5px 0;
`;

const TotalValue = styled(StyledText)`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Cart = () => {
  const handlePurchase = () => {
    Alert.alert('Compra Realizada com Sucesso', '', [
      {
        text: 'Ok',
        onPress: '',
      },
    ]);
    console.log('Comprei');
  };
  return (
    <ScrollView style={globalStyles.container}>
      <CartItem />
      <OrderSummaryContainer>
        <StyledText>Valor dos itens: $11</StyledText>
        <StyledText>Frete: $10</StyledText>
        <TotalValue>Valor total: $999</TotalValue>
        <Button onPress={handlePurchase} title="Finalizar Compra" />
      </OrderSummaryContainer>
    </ScrollView>
  );
};

export default Cart;
