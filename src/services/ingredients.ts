import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('getIngredientsApi', async () =>
  getIngredientsApi()
);

const initialState: {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isIngredientsLoading: boolean;
} = {
  buns: [],
  mains: [],
  sauces: [],
  isIngredientsLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    buns: (state) => state.buns,
    mains: (state) => state.mains,
    sauces: (state) => state.sauces,
    isIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.buns = action.payload.filter((x) => x.type === 'bun');
        state.mains = action.payload.filter((x) => x.type === 'main');
        state.sauces = action.payload.filter((x) => x.type === 'sauce');
        state.isIngredientsLoading = false;
      });
  }
});

export default {
  reducer: ingredientsSlice.reducer,
  ...ingredientsSlice.selectors
};
