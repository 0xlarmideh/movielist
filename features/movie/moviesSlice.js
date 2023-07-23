import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    watchlist: [],
  },
  reducers: {
    addMovieToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeMovieFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    rateMovie: (state, action) => {
      const { id, rating } = action.payload;
      const movie = state.watchlist.find((movie) => movie.id === id);
      if (movie) {
        movie.rating = rating;
      }
    },
    toggleWatchedStatus: (state, action) => {
      const { id, watched } = action.payload;
      const movie = state.watchlist.find((movie) => movie.id === id);
      if (movie) {
        movie.watched = watched;
      }
    },
  },
});

export const {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  setWatchlist,
  rateMovie,
  toggleWatchedStatus,
} = movieSlice.actions;

export default movieSlice.reducer;
