/* eslint-disable import/no-dynamic-require */
import styled from 'styled-components/native';
import { Text, View, Image, Button, Alert } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/images/images';
import { CartContext } from '../contexts/CartContext';

const ImageContainer = styled.View`
  flex: 1;
`;
const StyledImage = styled.Image`
  width: 90%;
  height: 150px;
  border-radius: 10px;
`;
const ProductInfoContainer = styled.View`
  flex: 2;
  justify-content: space-between;
`;
const ProductContainer = styled.View`
  display: flex;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  flex-direction: row;
  padding: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  elevation: 3;
  margin: 5px;
`;
const ProductTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: black;
`;

const ProductCard = ({ product }) => {
  const [cartState, dispatch] = useContext(CartContext);
  const { id, name, score, price } = product;
  const navigation = useNavigation();
  const handleViewCart = () => {
    navigation.navigate('Cart');
  };
  const handleAddCart = () => {
    if (cartState.find((item) => item.id === id)) {
      dispatch({ type: 'ADD_QTY', product });
    } else {
      dispatch({ type: 'ADD', product });
    }
    Alert.alert(
      'Produto Adicionado',
      'Deseja ver o carrinho?',
      [
        {
          text: 'Ver Carrinho',
          onPress: handleViewCart,
        },
        {
          text: 'Continuar Comprando',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <ProductContainer>
      <ImageContainer>
        <StyledImage source={images[id]} />
      </ImageContainer>

      <ProductInfoContainer>
        <ProductTitle>{name}</ProductTitle>
        <Text>{`Nota: ${score}`}</Text>
        <ProductPrice>{`$${price}`}</ProductPrice>
        <Button
          onPress={handleAddCart}
          title={
            cartState.find((item) => item.id === id)
              ? 'Adicionar mais'
              : 'Adicionar ao Carrinho'
          }
        />
      </ProductInfoContainer>
    </ProductContainer>
  );
};

export default ProductCard;
