import { TouchableOpacity, ScrollView, View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import ProductCard from '../components/ProductCard';
import * as data from '../../products.json';
import { globalStyles } from '../../Styles';
import { CartContext } from '../contexts/CartContext';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState(null);
  const [cartState, dispatch] = useContext(CartContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: 3,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon
            style={{ marginRight: 15 }}
            color="#fff"
            name="shoppingcart"
            size={30}
          />
          {cartState && (
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
  }, [navigation]);
  useEffect(() => {
    setProducts(data.default);
  }, []);

  return (
    <ScrollView style={globalStyles.container}>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ScrollView>
  );
};

export default Home;
