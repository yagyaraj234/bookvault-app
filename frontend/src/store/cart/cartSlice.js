import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  cartValue: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.item.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (id) {
        const updatedItems = state.item.filter((item) => item.id !== id);
        state.item = updatedItems;
      } else {
        state.item = [];
      }
    },
    setCartValue: (state, action) => {
      state.cartValue = action.payload;
    },
  },
});

export const { removeFromCart, addToCart, setCartValue } = cartSlice.actions;
export default cartSlice.reducer;
