import { combineReducers } from '@reduxjs/toolkit';
import { ConfigReducer } from './modules/config';
import { MovieReducer } from './modules/movie';

export const rootReducer = combineReducers({
  config: ConfigReducer,
  movie: MovieReducer,
});
