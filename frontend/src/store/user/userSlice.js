import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  orders: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    // setOrders: (state, action) => {
    //   const id = action.payload;
    //   if (id) {
    //     const updatedItems = state.item.filter((item) => item.id !== id);
    //     state.item = updatedItems;
    //   } else {
    //     state.item = [];
    //   }
    // },
    // setCartValue: (state, action) => {
    //   state.cartValue = action.payload;
    // },
  },
});

export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
