import {createSlice} from '@reduxjs/toolkit';
import {getOrders} from './order.actions';

const orderSlice = createSlice({
  name: 'order',
  initialState: {orders: []},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrders.fulfilled, (state, {payload}) => {
      state.orders = payload.documents;
    });
  },
});

export default orderSlice.reducer;
