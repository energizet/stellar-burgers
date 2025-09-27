import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('getFeedsApi', async () =>
  getFeedsApi()
);

const initialState: {
  orders: TOrder[];
} = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    orders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {})
      .addCase(getFeeds.rejected, (state) => {})
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  }
});

export default {
  reducer: ordersSlice.reducer,
  ...ordersSlice.selectors
};
