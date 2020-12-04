import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newItem = action.product;
      newItem.qty = 1;
      return [...state, newItem];
    }
    case 'REMOVE':
      return state.filter((product) => product.id !== action.product.id);
    case 'ADD_QTY': {
      const updatedCart = state.map((item) =>
        item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
      );
      return [...updatedCart];
    }
    case 'REMOVE_QTY': {
      const updatedCart = state.map((item) =>
        item.id === action.product.id ? { ...item, qty: item.qty - 1 } : item,
      );
      return [...updatedCart];
    }
    case 'RESET':
      return [];
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
