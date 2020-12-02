import styled from 'styled-components/native';
import { Text, View, Image, Button, Alert, TextInput } from 'react-native';
import React from 'react';

const ImageContainer = styled.View`
  flex: 1;
`;
const StyledImage = styled.Image`
  width: 75%;
  height: 75px;
  border-radius: 20px;
`;
const ProductInfoContainer = styled.View`
  flex: 3;
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
  const value = 0;
  const handleChange = () => {
    console.log('fui para o carrinho');
  };
  return (
    <ProductContainer>
      <ImageContainer>
        <StyledImage source={require('../../assets/images/fifa-18.png')} />
      </ImageContainer>

      <ProductInfoContainer>
        <ProductTitle>Nome do Jogo</ProductTitle>
        <Text>1</Text>
      </ProductInfoContainer>
    </ProductContainer>
  );
};

export default ProductCard;
