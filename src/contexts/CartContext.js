import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.product];
    case 'REMOVE':
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};
export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={[cartState, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
