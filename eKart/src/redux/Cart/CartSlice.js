import { createSlice } from "@reduxjs/toolkit";

const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      console.log(state);
      const itemIndex = state.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize,
      );
      // const itemExists = state.some((item) => item.id === newItem.id);
      console.log(itemIndex);
      if (itemIndex >= 0) {
        // Item already exists, update the quantity
        state[itemIndex].selectedQuantity = newItem.selectedQuantity;
      } else {
        // Item does not exist, add to cart
        state.push(newItem);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedList = state.filter(
        (item) =>
          item.product.id !== action.payload &&
          item.selectedSize !== action.payload.selectedSize,
      );
      localStorage.setItem("cart", JSON.stringify(updatedList));
      return updatedList;
    },
    updateCartItem: (state, action) => {
      const { id, size, updates } = action.payload;
      const itemIndex = state.findIndex(
        (item) => item.id === id && item.size === size,
      );

      if (itemIndex >= 0) {
        state[itemIndex] = { ...state[itemIndex], ...updates };
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartItem } =
  cartSlice.actions;

export const selectedCartList = (state) => state.cart;
export const selectedCartCount = (state) => {
  return Array.isArray(state.cart) ? state.cart.length : 0;
};

export default cartSlice.reducer;
