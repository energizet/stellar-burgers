import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'registerUserApi',
  (data: TRegisterData) => registerUserApi(data)
);
export const loginUser = createAsyncThunk('loginUserApi', (data: TLoginData) =>
  loginUserApi(data)
);
export const getUser = createAsyncThunk('getUserApi', () => getUserApi());
export const logout = createAsyncThunk('logoutApi', () => logoutApi());

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
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  }
});

export default {
  reducer: authSlice.reducer,
  ...authSlice.selectors
};
