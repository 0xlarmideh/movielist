import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "@/features/movie/moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

store.subscribe(() => {
  const { watchlist } = store.getState().movies;
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
});

export default store;
