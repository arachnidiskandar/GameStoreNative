import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CartItem from '../components/CartItem';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';

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
    return arrSubtotals.reduce((acc, current) => acc + current);
  }
  function getShippimentValue() {
    if (getTotalItens() > 250) {
      return 0;
    }
    return cartState.length * 10;
  }
  return (
    <ScrollView style={globalStyles.container}>
      {cartState.length === 0 && (
        <View>
          <Text>Está Vázio</Text>
        </View>
      )}
      {cartState.length > 0 && (
        <View style={{ padding: 5 }}>
          {cartState.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
          <OrderSummaryContainer>
            <StyledText>Valor dos itens: ${getTotalItens()}</StyledText>
            <StyledText>Frete: ${getShippimentValue()}</StyledText>
            <TotalValue>
              Valor total: ${getShippimentValue() + getTotalItens()}
            </TotalValue>
            <Button onPress={handlePurchase} title="Finalizar Compra" />
          </OrderSummaryContainer>
        </View>
      )}
    </ScrollView>
  );
};

export default Cart;
