// src/components/MovieSearch.js
import React, { useEffect, useState } from "react";
import { Input, VStack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import fetchMoviesByTitle from "@/features/movie/movieApi";
import { addMovieToWatchlist } from "@/features/movie/moviesSlice";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = async () => {
    const results = await fetchMoviesByTitle(searchTerm);
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  const handleAddToWatchlist = (movie) => {
    dispatch(addMovieToWatchlist(movie));
  };

  return (
    <VStack>
      <Input
        type="text"
        placeholder="Search movies by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
      />
      {searchResults.length > 0 ? (
        <VStack align="left" w="100%" mt={2}>
          {searchResults.map((movie) => (
            <Text
              key={movie?.id}
              onClick={() => handleAddToWatchlist(movie)}
              cursor="pointer"
            >
              {movie?.title}
            </Text>
          ))}
        </VStack>
      ) : null}
    </VStack>
  );
};

export default MovieSearch;
