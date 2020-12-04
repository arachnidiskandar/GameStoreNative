import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
// import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import ProductCard from '../components/ProductCard';
import * as data from '../../products.json';
import { globalStyles } from '../Styles';
import { CartContext } from '../contexts/CartContext';

const Home = ({ navigation }) => {
  const products = [...data.default];
  const [cartState] = useContext(CartContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          {/* <Icon
            style={{ marginRight: 15 }}
            color="#fff"
            name="shoppingcart"
            size={30}
          /> */}
          {cartState.length > 0 && (
            <View
              style={{
                backgroundColor: 'red',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                position: 'absolute',
                right: 5,
                top: -5,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {cartState.length}
              </Text>
            </View>
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
    <ScrollView style={globalStyles.container}>
      <View>
        {/* <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setProductNameFilter(text)}
          placeholder="Nome do Produto..."
          multiline={false}
          value={productNameFilter}
        /> */}
        <Picker
          selectedValue={orderProductsBy}
          onValueChange={(value) => setOrderProducts(value)}
        >
          <Picker.Item label="Selecione um filtro" value={null} />
          <Picker.Item label="Preço" value="price" />
          <Picker.Item label="Popularidade" value="popularity" />
          <Picker.Item label="A -> Z" value="alphabetically" />
        </Picker>
      </View>

      {filteredProducts && (
        <View style={{ padding: 10 }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
