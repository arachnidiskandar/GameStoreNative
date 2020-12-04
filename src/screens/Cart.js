import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, Button, Alert } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';

const CartItens = styled.FlatList`
  flex-grow: 0;
`;
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
    <SafeAreaView style={globalStyles.container}>
      <CartItens
        data={cartState}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <CartItem key={item.id} product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>Está Vázio</Text>}
        extraData={cartState}
      />
      {cartState.length > 0 && (
        <OrderSummaryContainer>
          <StyledText>Valor dos itens: ${getTotalItens()}</StyledText>
          <StyledText>Frete: ${getShippimentValue()}</StyledText>
          <TotalValue>
            Valor total: ${getShippimentValue() + getTotalItens()}
          </TotalValue>
          <Button onPress={handlePurchase} title="Finalizar Compra" />
        </OrderSummaryContainer>
      )}
    </SafeAreaView>
  );
};

export default Cart;
