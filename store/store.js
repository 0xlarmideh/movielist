import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "@/features/movie/moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

// Save the watchlist to local storage and get it back when the app loads, also subscribe to the store to save the watchlist to local storage whenever it changes

store.subscribe(() => {
  const { watchlist } = store.getState().movies;
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
});

export default store;
