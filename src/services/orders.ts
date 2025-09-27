import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('getFeedsApi', async () =>
  getFeedsApi()
);
//export const getOrderByNumber = createAsyncThunk(
//  'getOrderByNumberApi',
//  async (number: number) => getOrderByNumberApi(number)
//);

const initialState: {
  orders: Record<string, TOrder>;
} = {
  orders: {}
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    order: (state, number: string) => state.orders[number],
    orders: (state) => Object.values(state.orders)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, () => {})
      .addCase(getFeeds.rejected, () => {})
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = Object.fromEntries(
          action.payload.orders.map((x) => [x.number.toString(), x])
        );
      });
  }
});

export default {
  reducer: ordersSlice.reducer,
  ...ordersSlice.selectors
};
