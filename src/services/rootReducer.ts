import ingredients from './ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import orders from './orders';

export default combineReducers({
  ingredients: ingredients.reducer,
  orders: orders.reducer
});
