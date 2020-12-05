import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import ProductCard from '../components/ProductCard';
// import * as data from '../../products.json';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';

const OrderByMenu = styled(Picker)`
  background-color: white;
  elevation: 3;
  margin-left: 10px;
`;

const HeaderListContainer = styled.View`
  display: flex;
  flex-flow: row;
  margin-bottom: 10px;
`;

const TextInputFilter = styled.TextInput`
  height: 50px;
  elevation: 3;
  border-radius: 10px;
  background-color: white;
  padding: 0 10px;
  flex: 1;
`;

const ArrowDownIcon = styled(Icon)`
  color: #3f50b5;
  position: absolute;
  right: 0;
  z-index: 4;
  elevation: 4;
  top: 25%;
  margin-right: 10px;
`;

const DeleteBadge = styled.View`
  background-color: red;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  width: 20px;
  position: absolute;
  right: 5px;
  top: -5px;
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

const EmptyProductList = () => {
  return (
    <SafeAreaView>
      <EmptyCartIcon color="#979797" name="frowno" size={100} />
      <EmptyCartText>Nenhum Jogo Encontrado</EmptyCartText>
    </SafeAreaView>
  );
};

const Home = ({ navigation }) => {
  const productsMock = require('../../products.json');
  const [products, setProducts] = useState(productsMock);
  const [cartState] = useContext(CartContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
          <Icon
            style={{ marginRight: 15 }}
            color="#fff"
            name="shoppingcart"
            size={30}
          />
          {cartState.length > 0 && (
            <DeleteBadge>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {cartState.length}
              </Text>
            </DeleteBadge>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartState]);

  const [productNameFilter, setProductNameFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const patternFilter = new RegExp(productNameFilter, 'i');
      const copyProducts = [...products];
      const filtredArray = copyProducts.filter(
        (product) => !productNameFilter || product.name.match(patternFilter),
      );
      setFilteredProducts(filtredArray);
    }, 300);
    return () => clearTimeout(timer);
  }, [productNameFilter]);

  function orderProducts(type) {
    const copyFilteredProducts = [...filteredProducts];
    const copyProducts = [...products];
    let sortedFiltered = [];
    let sortedProducts = [];
    if (type === null) {
      setFilteredProducts(productsMock);
      setProducts(productsMock);
      return;
    }
    if (type === 'price') {
      sortedFiltered = copyFilteredProducts.sort(
        (itemA, itemB) => parseFloat(itemA.price) - parseFloat(itemB.price),
      );
      sortedProducts = copyProducts.sort(
        (itemA, itemB) => parseFloat(itemA.price) - parseFloat(itemB.price),
      );
    } else if (type === 'popularity') {
      sortedFiltered = copyFilteredProducts.sort(
        (itemA, itemB) => parseFloat(itemB.score) - parseFloat(itemA.score),
      );
      sortedProducts = copyProducts.sort(
        (itemA, itemB) => parseFloat(itemB.score) - parseFloat(itemA.score),
      );
    } else {
      sortedFiltered = copyFilteredProducts.sort(
        (itemA, itemB) => itemA.name > itemB.name,
      );
      sortedProducts = copyProducts.sort(
        (itemA, itemB) => itemA.name > itemB.name,
      );
    }
    setFilteredProducts(sortedFiltered);
    setProducts(sortedProducts);
  }
  const [orderProductsBy, setOrderProducts] = useState(null);
  useEffect(() => {
    orderProducts(orderProductsBy);
  }, [orderProductsBy]);

  return (
    <View style={{ flex: 1 }}>
      {filteredProducts && (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListHeaderComponent={
            <HeaderListContainer>
              <TextInputFilter
                onChangeText={(text) => setProductNameFilter(text)}
                placeholder="Nome do Produto..."
                multiline={false}
                value={productNameFilter}
              />
              <View style={{ flex: 1 }}>
                <OrderByMenu
                  style={{ borderRadius: 10 }}
                  selectedValue={orderProductsBy}
                  onValueChange={(value) => setOrderProducts(value)}
                >
                  <Picker.Item label="Ordernar por..." value={null} />
                  <Picker.Item label="Preço" value="price" />
                  <Picker.Item label="Popularidade" value="popularity" />
                  <Picker.Item label="A -> Z" value="alphabetically" />
                </OrderByMenu>
                <ArrowDownIcon name="down" size={30} />
              </View>
            </HeaderListContainer>
          }
          ListEmptyComponent={<EmptyProductList />}
          keyExtractor={(item) => item.id.toString()}
          extraData={filteredProducts}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
};

export default Home;
