import React from 'react';
import { render } from './test-utils';
import ProductCard from '../components/ProductCard';

test('should render Home Component', () => {
  const product = {
    id: 102,
    name: 'The Witcher III Wild Hunt',
    price: 119.5,
    score: 250,
    image: 'the-witcher-iii-wild-hunt.png',
  };
  render(<ProductCard product={product} />);
});
