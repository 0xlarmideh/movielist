import { createSlice } from "@reduxjs/toolkit";

// RTK Slice to manage the watchlist
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    watchlist: [],
  },
  reducers: {
    
    // Function to add a movie to the watchlist
    addMovieToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },

    // Function to remove a movie from the watchlist
    removeMovieFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },

    // Function to set the watchlist
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },

    // Function to rate a movie
    rateMovie: (state, action) => {
      const { id, rating } = action.payload;
      const movie = state.watchlist.find((movie) => movie.id === id);
      if (movie) {
        movie.rating = rating;
      }
    },

    // Function to toggle the watched status of a movie
    toggleWatchedStatus: (state, action) => {
      const { id, watched } = action.payload;
      const movie = state.watchlist.find((movie) => movie.id === id);
      if (movie) {
        movie.watched = watched;
      }
    },
  },
});

// Export the actions from the slice to be used in other components
export const {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  setWatchlist,
  rateMovie,
  toggleWatchedStatus,
} = movieSlice.actions;

// Export the reducer from the slice to be used in the store
export default movieSlice.reducer;
