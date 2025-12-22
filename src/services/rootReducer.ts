import ingredients from './ingredients';
import { combineReducers } from '@reduxjs/toolkit';
import orders from './orders';
import auth from './auth';

export default combineReducers({
  ingredients: ingredients.reducer,
  orders: orders.reducer,
  auth: auth.reducer
});
