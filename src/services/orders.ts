import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { TIngredient, TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('getFeedsApi', () => getFeedsApi());
export const getOrders = createAsyncThunk('getOrdersApi', () => getOrdersApi());
export const getOrderByNumber = createAsyncThunk(
  'getOrderByNumberApi',
  (number: number) => getOrderByNumberApi(number)
);
export const orderBurger = createAsyncThunk(
  'orderBurgerApi',
  (data: string[], { dispatch }) =>
    orderBurgerApi(data).finally(() => {
      dispatch(getFeeds());
      dispatch(getOrders());
    })
);

const initialState: {
  myOrders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: Record<string, TOrder>;
  feed: {
    total: number;
    totalToday: number;
  };
  isFeedLoading: boolean;
  order: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
} = {
  myOrders: [],
  orderRequest: false,
  orderModalData: null,
  orders: {},
  feed: {
    total: 0,
    totalToday: 0
  },
  isFeedLoading: false,
  order: {
    bun: null,
    ingredients: []
  }
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addIngredient: (state, { payload }: { payload: TIngredient }) => {
      state.order = {
        ...state.order
      };
      if (payload.type === 'bun') {
        state.order.bun = payload;
        return;
      }

      state.order.ingredients.push(payload);
    },
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    order: (state, number: string) => state.orders[number],
    orders: (state) => Object.values(state.orders),
    feed: (state) => state.feed,
    isFeedLoading: (state) => state.isFeedLoading,
    myOrders: (state) => Object.values(state.myOrders),
    myOrder: (state) => state.order,
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData
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
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.order = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const { addIngredient, clearOrderModalData } = ordersSlice.actions;

export default {
  reducer: ordersSlice.reducer,
  ...ordersSlice.selectors
};
