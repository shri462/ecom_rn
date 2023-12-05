import {createSlice} from '@reduxjs/toolkit';
import {getProductsInCart} from './cart.actions';

const cartSlice = createSlice({
  name: 'product',
  initialState: {cartProducts: []},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProductsInCart.fulfilled, (state, {payload}) => {
      state.cartProducts = payload.documents;
    });
  },
});

export default cartSlice.reducer;
