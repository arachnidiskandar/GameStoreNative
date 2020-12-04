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
import * as data from '../../products.json';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';

const OrderByMenu = styled(Picker)`
  background-color: white;
  elevation: 3;
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

const FiltersContainer = styled.View`
  padding: 20px 20px 0;
`;

const Home = ({ navigation }) => {
  const products = [...data.default];
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

  // const [productNameFilter, setProductNameFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const patternFilter = new RegExp(productNameFilter, 'i');
  //     const copyProducts = [...products];
  //     const filtredArray = copyProducts.filter(
  //       (product) => !productNameFilter || product.name.match(patternFilter),
  //     );
  //     setFilteredProducts(filtredArray);
  //   }, 300);
  //   return () => clearTimeout(timer);
  // }, [productNameFilter]);

  const [orderProductsBy, setOrderProducts] = useState(null);
  useEffect(() => {
    if (orderProductsBy === null) {
      setFilteredProducts([...products]);
    } else if (orderProductsBy === 'price') {
      const copyArrProducts = [...filteredProducts];
      const sortedArr = copyArrProducts.sort(
        (itemA, itemB) => parseFloat(itemA.price) - parseFloat(itemB.price),
      );
      setFilteredProducts(sortedArr);
    } else if (orderProductsBy === 'popularity') {
      const copyArrProducts = [...filteredProducts];
      const sortedArr = copyArrProducts.sort(
        (itemA, itemB) => parseFloat(itemB.score) - parseFloat(itemA.score),
      );
      setFilteredProducts(sortedArr);
    } else {
      const copyArrProducts = [...filteredProducts];
      const sortedArr = copyArrProducts.sort(
        (itemA, itemB) => itemA.name > itemB.name,
      );
      setFilteredProducts(sortedArr);
    }
  }, [orderProductsBy]);

  return (
    <View>
      {/* <Text>
        <CartIcon />
      </Text> */}
      <FiltersContainer>
        {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setProductNameFilter(text)}
          placeholder="Nome do Produto..."
          multiline={false}
          value={productNameFilter}
        /> */}
        <View>
          <OrderByMenu
            selectedValue={orderProductsBy}
            onValueChange={(value) => setOrderProducts(value)}
          >
            <Picker.Item label="Selecione um filtro" value={null} />
            <Picker.Item label="Preço" value="price" />
            <Picker.Item label="Popularidade" value="popularity" />
            <Picker.Item label="A -> Z" value="alphabetically" />
          </OrderByMenu>
          <ArrowDownIcon name="down" size={30} />
        </View>
      </FiltersContainer>
      {filteredProducts && (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        />
      )}
    </View>
  );
};

export default Home;
