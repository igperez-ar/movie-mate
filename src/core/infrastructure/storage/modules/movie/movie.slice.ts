import { Movie } from '@core/capabilities/movies';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type MovieWatchlisted = Pick<Movie, 'id' | 'title' | 'poster_path'>;

export type MovieState = {
  watchlist: MovieWatchlisted[];
};

const initialState: MovieState = {
  watchlist: [],
};

export const movieState = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addWatchlist: (state, action: PayloadAction<MovieWatchlisted>) => {
      state.watchlist = [...state.watchlist, action.payload];
    },
    removeWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addWatchlist, removeWatchlist } = movieState.actions;

export const MovieReducer = movieState.reducer;
