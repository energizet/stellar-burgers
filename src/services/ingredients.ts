import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk('getIngredientsApi', async () =>
  getIngredientsApi()
);

const initialState: {
  ingredients: Record<string, TIngredient>;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isIngredientsLoading: boolean;
} = {
  ingredients: {},
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
    ingredients: (state) => state.ingredients,
    ingredient: (state, id: string) => state.ingredients[id],
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
        state.ingredients = Object.fromEntries(
          action.payload.map((x) => [x._id, x])
        );
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
