// src/components/MovieWatchlist.js
import React, { useEffect } from "react";
import { VStack, Checkbox, Box, Image, Text, Button, Grid, Flex, Wrap } from "@chakra-ui/react";
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
import FilterWatchlist from "./filter";

const MovieWatchlist = () => {
    const IMAGE_URL = "https://image.tmdb.org/t/p/original";
  const {watchlist} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    let savedWatchlist;
    if (typeof window !== undefined) {
      savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    }
    dispatch(setWatchlist(savedWatchlist));
  }, [dispatch]);

  const [filter, setFilter] = React.useState("all");
  const { isDark } = useSelector((state) => state.theme);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(0);

  const handleRatingChange = (id, rating) => {
    dispatch(rateMovie({ id, rating }));
  };

  const handleWatchedToggle = (id, watched) => {
    dispatch(toggleWatchedStatus({ id, watched }));
  };

  const handleRemoveMovie = (id) => {
    dispatch(removeMovieFromWatchlist(id));
  };
  const filterData = ['all', 'watched']
  
  const filteredWatchlist =
    filter === "watched"
      ? watchlist.filter((movie) => movie.watched)
      : watchlist;

  return (
    <><Flex align='center' mb={8} gap={4} w="100%">
      <Text>Filter Watchlist</Text>
      <FilterWatchlist data={filterData} isDark={isDark} selectedFilterIndex={selectedFilterIndex} setSelectedFilterIndex={setSelectedFilterIndex} setFilter={setFilter} />
    </Flex>
      <Grid gap={8} templateColumns={{ base: "1fr", md: "1fr 1fr" }}>
        {watchlist.length > 0 &&
          filteredWatchlist.map((movie) => (
            <Flex gap={4} key={movie?.id}>
              <Image
                src={`${IMAGE_URL}${movie?.poster_path}`}
                alt={movie?.title}
                width="150px"
              />
              <Box>
                <Checkbox
                  isChecked={movie.watched}
                  onChange={() =>
                    handleWatchedToggle(movie?.id, !movie?.watched)
                  }
                >
                  <Text fontSize='18px'>
                    {movie?.title} (
                    {movie?.release_date && movie?.release_date.slice(0, 4)})
                  </Text>
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
            </Flex>
          ))}
      </Grid>

      {watchlist?.length < 0 && <Text>No movies in the watchlist</Text>}
    </>
  );
};

export default MovieWatchlist;
