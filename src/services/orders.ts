import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('getFeedsApi', () => getFeedsApi());
export const getOrders = createAsyncThunk('getOrdersApi', () => getOrdersApi());
export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumberApi',
  (number: number) => getOrderByNumberApi(number)
);

const initialState: {
  myOrders: TOrder[];
  orders: Record<string, TOrder>;
  feed: {
    total: number;
    totalToday: number;
  };
  isFeedLoading: boolean;
} = {
  myOrders: [],
  orders: {},
  feed: {
    total: 0,
    totalToday: 0
  },
  isFeedLoading: false
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    order: (state, number: string) => state.orders[number],
    orders: (state) => Object.values(state.orders),
    feed: (state) => state.feed,
    isFeedLoading: (state) => state.isFeedLoading,
    myOrders: (state) => Object.values(state.myOrders)
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isFeedLoading = true;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isFeedLoading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = Object.fromEntries(
          action.payload.orders.map((x) => [x.number.toString(), x])
        );
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
        state.isFeedLoading = false;
      });
    builder
      .addCase(getOrders.pending, () => {})
      .addCase(getOrders.rejected, () => {})
      .addCase(getOrders.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      });
  }
});

export default {
  reducer: ordersSlice.reducer,
  ...ordersSlice.selectors
};
