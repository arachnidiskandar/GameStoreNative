import styled from 'styled-components/native';
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const ImageContainer = styled.View`
  flex: 1;
  align-items: flex-start;
`;
const StyledImage = styled.Image`
  width: 70%;
  height: 50px;
  border-radius: 15px;
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  elevation: 2;
`;
const ProductTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const QntyContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
`;
const ProductPrice = styled.Text`
  font-size: 18px;
  color: black;
`;
const TotalPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 0 5px;
`;

const StyledIcon = styled(Icon)`
  background-color: #3f50b5;
  border-radius: 10px;
  align-self: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  elevation: 3;
`;

const DeleteButton = styled.Button`
  background-color: red;
`;

const ProductCard = () => {
  const value = 0;
  const handleChange = () => {
    console.log('fui para o carrinho');
  };
  const deleteItem = () => {
    console.log('deletado');
  };
  const handleDelete = () => {
    Alert.alert(
      'Você tem certeza?',
      'Deseja excluir esse item?',
      [
        {
          text: 'sim',
          onPress: deleteItem,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };
  return (
    <ProductContainer>
      <ImageContainer>
        <StyledImage source={require('../../assets/images/fifa-18.png')} />
        <DeleteButton onPress={handleDelete} title="Excluir" />
      </ImageContainer>

      <ProductInfoContainer>
        <ProductTitle>Nome do Jogo</ProductTitle>

        <QntyContainer>
          <ProductPrice>$250</ProductPrice>
          <QntyContainer>
            <StyledIcon name="minus" size={20} />
            <TotalPrice>1</TotalPrice>
            <StyledIcon name="plus" size={20} />
          </QntyContainer>
          <TotalPrice>Total: $123</TotalPrice>
        </QntyContainer>
      </ProductInfoContainer>
    </ProductContainer>
  );
};

export default ProductCard;
