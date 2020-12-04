import React, { useReducer } from 'react';
import { render } from '@testing-library/react-native';
import { CartProvider } from '../contexts/CartContext';

const AllTheProviders = ({ children }) => {
  const [cartState, dispatch] = useReducer([
    {
      id: 312,
      name: 'Super Mario Odyssey',
      price: 197.88,
      score: 100,
      image: 'super-mario-odyssey.png',
    },
    {
      id: 201,
      name: 'Call Of Duty Infinite Warfare',
      price: 49.99,
      score: 80,
      image: 'call-of-duty-infinite-warfare.png',
    },
    {
      id: 102,
      name: 'The Witcher III Wild Hunt',
      price: 119.5,
      score: 250,
      image: 'the-witcher-iii-wild-hunt.png',
    },
  ]);
  return <CartProvider value={[cartState, dispatch]}>{children}</CartProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
