import React from 'react';
import { render } from './test-utils';
import CartItem from '../components/CartItem';

test('should render Home Component', () => {
  render(<CartItem />);
});
