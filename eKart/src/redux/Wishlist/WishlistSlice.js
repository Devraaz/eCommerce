import { createSlice } from "@reduxjs/toolkit";

const initialwlist = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialwlist,
  reducers: {
    addToWishList: (state, action) => {
      const newItem = action.payload;
      const itemExists = state.some((item) => item.id === newItem.id);

      if (!itemExists) {
        state.push(newItem);
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    removeFromWishList: (state, action) => {
      const updatedList = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updatedList));
      return updatedList;
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;

export const selectedWishList = (state) => state.wishlist;
export const selectedWishListCount = (state) => {
  return Array.isArray(state.wishlist) ? state.wishlist.length : 0;
};

export default wishlistSlice.reducer;
