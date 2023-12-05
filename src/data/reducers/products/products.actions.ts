import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import authService from '../../../appwrite/auth.services';
import productService from '../../../appwrite/product.services';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (payload, {rejectWithValue}) => {
    const products = await productService.getProducts();
    console.log(products, 'products');
    if (products) {
      return products;
    } else {
      return rejectWithValue('Unauthorized, Login again...');
    }
  },
);

export const getMyProducts = createAsyncThunk(
  'product/getMyProducts',
  async (payload, {rejectWithValue}) => {
    const products = await productService.getMyProducts(payload);
    console.log(products, 'products');
    if (products) {
      return products;
    } else {
      return rejectWithValue('Unauthorized, Login again...');
    }
  },
);
