import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text, View, Button, Alert } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItem from '../components/CartItem';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';
import OrderInfo from '../components/OrderInfo';

const CartItens = styled.FlatList`
  flex-grow: 0;
`;

const EmptyCartContainer = styled.View`
  margin-top: 50%;
`;
const EmptyCartText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #979797;
`;
const EmptyCartIcon = styled(Icon)`
  text-align: center;
`;

const EmptyCart = () => {
  return (
    <EmptyCartContainer>
      <EmptyCartIcon color="#979797" name="cart-off" size={100} />
      <EmptyCartText>Seu Carrinho está vázio</EmptyCartText>
    </EmptyCartContainer>
  );
};

const Cart = () => {
  const [cartState] = useContext(CartContext);

  return (
    <View>
      <CartItens
        data={cartState}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <CartItem key={item.id} product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<EmptyCart />}
        extraData={cartState}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ListFooterComponent={<OrderInfo />}
      />
    </View>
  );
};

export default Cart;
