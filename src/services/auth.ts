import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi, loginUserApi, TLoginData } from '@api';
import { TUser } from '@utils-types';

export const loginUser = createAsyncThunk('loginUserApi', (data: TLoginData) =>
  loginUserApi(data)
);
export const getUser = createAsyncThunk('getUserApi', () => getUserApi());

const initialState: {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
} = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  selectors: {
    isAuthChecked: (state) => state.isAuthChecked,
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, () => {})
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
    builder
      .addCase(getUser.pending, () => {})
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  }
});

export default {
  reducer: authSlice.reducer,
  ...authSlice.selectors
};
