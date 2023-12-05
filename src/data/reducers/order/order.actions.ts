import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import orderService from '../../../appwrite/order.services';

export const getOrders = createAsyncThunk(
  'product/getOrders',
  async (payload, {rejectWithValue}) => {
    const products = await orderService.getOrders(payload);
    if (products) {
      return products;
    } else {
      return rejectWithValue('Unauthorized, Login again...');
    }
  },
);
