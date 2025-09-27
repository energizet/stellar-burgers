import ingredients from './ingredients';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  ingredients: ingredients.reducer
});
