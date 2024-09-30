import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Cart/CartSlice";
import wishlistSliceReducer from "./Wishlist/WishlistSlice";

export default configureStore({
  reducer: {
    cart: cartSliceReducer,
    wishlist: wishlistSliceReducer,
  },
});
