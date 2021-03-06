import styled from 'styled-components/native';
import {
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images/images';
import { CartContext } from '../contexts/CartContext';

const StyledImage = styled.Image`
  flex: 1;
  width: 100%;
  height: 50px;
  align-self: center;
  margin-right: 10px;
`;
const ProductInfoContainer = styled.View`
  flex: 4;
  justify-content: space-around;
`;
const ProductContainer = styled.View`
  flex: 1;
  background-color: white;
  border-radius: 10px;
  flex-direction: row;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  elevation: 3;
  height: 80px;
  padding: 5px;
  margin: 15px 0 5px;
`;
const ProductTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const QntyContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TotalPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 0 5px;
`;

const QtyIcon = styled(Icon)`
  background-color: ${(props) => (props.disabled ? '#d3d3d3' : '#3f50b5')};
  border-radius: 10px;
  align-self: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  elevation: 3;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.pressed ? 0.6 : 1)};
`;

const DeleteIcon = styled(Icon)`
  color: white;
  opacity: ${(props) => (props.pressed ? 0.6 : 1)};
`;

const RemoveContainer = styled.View`
  position: absolute;
  background-color: red;
  padding: 5px;
  border-radius: 15px;
  right: -5px;
  top: -10px;
  elevation: 3;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const ProductCard = ({ product }) => {
  const [cartState, dispatch] = useContext(CartContext);
  const { id, name, price, qty } = product;

  const handleDelete = () => {
    Alert.alert(
      'Você tem certeza?',
      'Deseja excluir esse item?',
      [
        {
          text: 'sim',
          onPress: () => dispatch({ type: 'REMOVE', product }),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };
  const handleChangeQty = (type) => dispatch({ type, product });

  return (
    <ProductContainer>
      <StyledImage source={images[id]} />
      <ProductInfoContainer>
        <ProductTitle numberOfLines={1}>{name}</ProductTitle>
        <QntyContainer>
          <QntyContainer>
            <Pressable
              disabled={qty === 1}
              onPress={() => handleChangeQty('REMOVE_QTY')}
            >
              {({ pressed }) => (
                <QtyIcon
                  pressed={pressed}
                  disabled={qty === 1}
                  name="minus"
                  size={20}
                />
              )}
            </Pressable>
            <TotalPrice>{qty}</TotalPrice>
            <Pressable onPress={() => handleChangeQty('ADD_QTY')}>
              {({ pressed }) => (
                <QtyIcon pressed={pressed} name="plus" size={20} />
              )}
            </Pressable>
          </QntyContainer>
          <TotalPrice>
            Total: ${Math.round((price * qty + Number.EPSILON) * 100) / 100}
          </TotalPrice>
        </QntyContainer>
      </ProductInfoContainer>

      <RemoveContainer>
        <Pressable onPress={handleDelete}>
          {({ pressed }) => (
            <DeleteIcon pressed={pressed} name="delete" size={20} />
          )}
        </Pressable>
      </RemoveContainer>
    </ProductContainer>
  );
};

export default ProductCard;
