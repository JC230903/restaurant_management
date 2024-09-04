import React, { createContext, useContext, useReducer } from 'react';

// Contexts
const CartContext = createContext();
const CartDispatchContext = createContext();

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE':
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, Qty: item.Qty + 1 };
        }
        return item;
      });
    case 'DROP':
      return [];
    default:
      return state;
  }
};

// ErrorBoundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// CartProvider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ErrorBoundary>
      <CartContext.Provider value={state}>
        <CartDispatchContext.Provider value={dispatch}>
          {children}
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    </ErrorBoundary>
  );
};

// Custom Hooks
export const useCartState = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
export const useCart = () => useContext(CartContext);
