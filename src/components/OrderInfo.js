import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, Button, Alert } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const TotalValue = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin: 5px 0 10px;
`;
const StyledText = styled.Text`
  margin: 5px 0;
`;
const OrderSummaryContainer = styled.View`
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-top: 10px;
  elevation: 3;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;
const OrderInfo = () => {
  const [cartState, dispatch] = useContext(CartContext);

  const handlePurchase = () => {
    dispatch({ type: 'RESET' });
    Alert.alert('Compra Realizada com Sucesso', '', [
      {
        text: 'Ok',
        onPress: '',
      },
    ]);
  };
  function getTotalItens() {
    const arrSubtotals = cartState.map((item) => item.qty * item.price);
    const total = arrSubtotals.reduce((acc, current) => acc + current);
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }
  function getShippimentValue() {
    if (getTotalItens() > 250) {
      return 0;
    }
    return cartState.length * 10;
  }

  return cartState.length > 0 ? (
    <OrderSummaryContainer>
      <StyledText>Valor dos itens: ${getTotalItens()}</StyledText>
      <StyledText>Frete: ${getShippimentValue()}</StyledText>
      <TotalValue>
        Valor total: ${getShippimentValue() + getTotalItens()}
      </TotalValue>
      <Button onPress={handlePurchase} title="Finalizar Compra" />
    </OrderSummaryContainer>
  ) : null;
};

export default OrderInfo;
