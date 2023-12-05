import {createAsyncThunk} from '@reduxjs/toolkit';
import cartService from '../../../appwrite/cart.services';

export const getProductsInCart = createAsyncThunk(
  'product/getProductsInCart',
  async (payload, {rejectWithValue}) => {
    const products = await cartService.getProductsInCart(payload);
    if (products) {
      return products;
    } else {
      return rejectWithValue('Unauthorized, Login again...');
    }
  },
);
