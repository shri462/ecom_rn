import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from './products.actions';

const productSlice = createSlice({
  name: 'product',
  initialState: {products: []},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, {payload}) => {
      state.products = payload.documents;
    });
  },
});

export default productSlice.reducer;
