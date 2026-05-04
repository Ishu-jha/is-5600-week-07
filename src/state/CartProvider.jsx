import React, { useReducer, useContext } from 'react';

const CartContext = React.createContext();

const initialState = {
  itemsById: {},
  allItems: [],
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

const getProductId = (product) => product._id || product.id;

const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      const productId = getProductId(payload);

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [productId]: {
            ...payload,
            quantity: state.itemsById[productId]
              ? state.itemsById[productId].quantity + 1
              : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, productId])),
      };
    }

    case REMOVE_ITEM: {
      const productId = getProductId(payload);

      return {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key]) => key !== productId)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {}),
        allItems: state.allItems.filter((itemId) => itemId !== productId),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { productId, quantity } = payload;
      const item = state.itemsById[productId];

      if (!item) return state;

      const newQuantity = item.quantity + quantity;

      if (newQuantity <= 0) {
        return {
          ...state,
          itemsById: Object.entries(state.itemsById)
            .filter(([key]) => key !== productId)
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {}),
          allItems: state.allItems.filter((itemId) => itemId !== productId),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [productId]: {
            ...item,
            quantity: newQuantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { productId, quantity },
    });
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]);
  };

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };