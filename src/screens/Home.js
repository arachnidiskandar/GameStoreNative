import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import ProductCard from '../components/ProductCard';
import * as data from '../../products.json';
import { globalStyles } from '../../Styles';
import { CartContext } from '../contexts/CartContext';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cartState, dispatch] = useContext(CartContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon
            style={{ marginRight: 15 }}
            color="#fff"
            name="shoppingcart"
            size={30}
          />
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

  const [productNameFilter, setProductNameFilter] = useState('');
  const [filtredProducts, setFiltredProducts] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredProducts = products.filter(
        (product) =>
          !productNameFilter ||
          product.name.includes(productNameFilter.toLocaleLowerCase()),
      );
      setFiltredProducts(filteredProducts);
    }, 300);
    return () => clearTimeout(timer);
  }, [productNameFilter]);

  const [orderProductsBy, setOrderProducts] = useState(null);
  useEffect(() => {
    if (orderProductsBy === null) {
      setProducts(data.default);
    } else if (orderProductsBy === 'price') {
      const sortedArr = products.sort(
        (itemA, itemB) => parseFloat(itemA.price) - parseFloat(itemB.price),
      );
      setProducts(sortedArr);
    } else if (orderProductsBy === 'popularity') {
      const sortedArr = products.sort(
        (itemA, itemB) => parseFloat(itemB.score) - parseFloat(itemA.score),
      );
      setProducts(sortedArr);
    } else {
      const sortedArr = products.sort(
        (itemA, itemB) => itemA.name < itemB.name,
      );
      setProducts(sortedArr);
    }
  }, [orderProductsBy]);

  return (
    <ScrollView style={globalStyles.container}>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setProductNameFilter(text)}
          placeholder="Nome do Produto..."
          multiline={false}
          value={productNameFilter}
        />
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

      {filtredProducts.length === 0 && (
        <View style={{ padding: 10 }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      )}
      {filtredProducts.length > 0 && (
        <View style={{ padding: 10 }}>
          {filtredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
