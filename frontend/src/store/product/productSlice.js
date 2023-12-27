import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    filterProduct: [],
    filterType: "recommended",
  },
  reducers: {
    setProducts: (state, action) => {
      state.product = action.payload;
    },
    setFilterProducts: (state, action) => {
      state.filterProduct = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
});

export const { setProducts, setFilterProducts,setFilterType } = productSlice.actions;
export default productSlice.reducer;
