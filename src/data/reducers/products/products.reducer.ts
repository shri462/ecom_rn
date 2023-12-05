import {createSlice} from '@reduxjs/toolkit';
import {getMyProducts, getProducts} from './products.actions';

const productSlice = createSlice({
  name: 'product',
  initialState: {products: [], myProducts: []},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, {payload}) => {
      state.products = payload.documents;
    });
    builder.addCase(getMyProducts.fulfilled, (state, {payload}) => {
      state.myProducts = payload.documents;
    });
  },
});

export default productSlice.reducer;
