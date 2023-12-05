import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import authService from '../../../appwrite/auth.services';

export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (payload, {rejectWithValue}) => {
    const loggedUser = await authService.getCurrentUser();
    if (loggedUser) {
      return loggedUser;
    } else {
      return rejectWithValue('Unauthorized, Login again...');
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const res = await AsyncStorage.removeItem('loggedUser');
  return res;
});
