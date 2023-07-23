// src/components/MovieWatchlist.js
import React, { useEffect } from "react";
import { VStack, Checkbox, Box, Text, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import StarRating from "./StarRating";
import {
  addMovieToWatchlist,
  rateMovie,
  removeMovieFromWatchlist,
  setWatchlist,
  toggleWatchedStatus,
} from "@/features/movie/moviesSlice";
import Link from "next/link";

const MovieWatchlist = () => {
  const watchlist = useSelector((state) => state.movies.watchlist);
  const dispatch = useDispatch();
  useEffect(() => {
    let savedWatchlist;
    if (typeof window !== undefined) {
      savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    }
    dispatch(setWatchlist(savedWatchlist));
  }, [dispatch]);

  const handleRatingChange = (id, rating) => {
    dispatch(rateMovie({ id, rating }));
  };

  const handleWatchedToggle = (id, watched) => {
    dispatch(toggleWatchedStatus({ id, watched }));
  };

  const handleRemoveMovie = (id) => {
    dispatch(removeMovieFromWatchlist(id));
  };

  return (
    <VStack align="left" spacing={4}>
      <Link href="/">
        <Button>Homepage</Button>
      </Link>
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
          <Box key={movie?.id}>
            <Checkbox
              isChecked={movie.watched}
              onChange={() => handleWatchedToggle(movie?.id, !movie?.watched)}
            >
              {movie?.title} (
              {movie?.release_date && movie?.release_date.slice(0, 4)})
            </Checkbox>
            <StarRating
              rating={movie.rating}
              onChange={(rating) => handleRatingChange(movie?.id, rating)}
            />
            <Text
              onClick={() => handleRemoveMovie(movie?.id)}
              cursor="pointer"
              color="red.500"
            >
              Remove
            </Text>
          </Box>
        ))
      ) : (
        <Text>No movies in the watchlist</Text>
      )}
    </VStack>
  );
};

export default MovieWatchlist;
