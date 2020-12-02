import styled from 'styled-components/native';
import { Text, View, Image, Button, Alert } from 'react-native';
import React from 'react';

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
  padding: 15px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  elevation: 2;
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

const ProductCard = () => {
  const handleViewCart = () => {
    console.log('fui para o carrinho');
  };
  return (
    <ProductContainer>
      <ImageContainer>
        <StyledImage source={require('../../assets/images/fifa-18.png')} />
      </ImageContainer>

      <ProductInfoContainer>
        <ProductTitle>Nome do Jogo</ProductTitle>
        <Text>Nota: 250</Text>
        <ProductPrice>$250</ProductPrice>
        <Button
          onPress={() =>
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
            )
          }
          title="Adicionar ao Carrinho"
        />
      </ProductInfoContainer>
    </ProductContainer>
  );
};

export default ProductCard;
