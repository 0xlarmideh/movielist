// src/components/MovieSearch.js
import React, { useEffect, useState } from "react";
import { Input, VStack, Text, Flex, IconButton, Box, Image, Grid, Heading, Wrap, Button, Center, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import fetchMoviesByTitle from "@/features/movie/movieApi";
import { addMovieToWatchlist } from "@/features/movie/moviesSlice";
import { SearchIcon } from "@chakra-ui/icons";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [searchResults, setSearchResults] = useState([]);
  const watchlist = useSelector((state) => state.movies.watchlist);

  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);
  const isMovieInWatchlist = (movie) => {
    return watchlist.some((item) => item.id === movie.id);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await fetchMoviesByTitle(searchTerm);
    setSearchResults(results);
    setIsLoading(false);
  };
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  const handleAddToWatchlist = (movie) => {
    if (!isMovieInWatchlist(movie)) {
      dispatch(addMovieToWatchlist(movie));
    }
    else {
      alert("Movie already in watchlist");
    }
  };

  return (
    <Box>
      <Text className="text-heading" as="h1" size="lg" mb={4}>
        Search for a movie
      </Text>
      <Flex mb={8} gap={4} w="100%">
        <Input
          type="text"
          placeholder="Search movies by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={"100%"}
        />
        <IconButton
          onClick={handleSearch}
          aria-label="Search"
          icon={<SearchIcon />}
        />
      </Flex>
      <Center>
        {isLoading && <Spinner size="xl" color={isDark ? "black" : "white"} />}{" "}
      </Center>
      {!isLoading && searchResults.length > 0 ? (
        <Grid
          rowGap={12}
          gap={4}
          templateColumns={{ base: "1fr 1fr", md: "repeat(4, 1fr)" }}
          w="100%"
          mt={2}
        >
          {searchResults.map((movie, index) => (
            <Box position="relative" key={index}>
              <Wrap w="100%" overflow="hidden">
                <Image
                  src={`${IMAGE_URL}${movie?.poster_path}`}
                  w={{ base: "90%", md: "100%" }}
                  h={{ base: "450px", md: "300px" }}
                  // objectFit="contain"
                  alt={movie?.title}
                />
                <Button
                  position="absolute"
                  bottom="50px"
                  onClick={() => handleAddToWatchlist(movie)}
                  bg="red"
                  mx="auto"
                  color="white"
                  width={{ base: "90%", md: "100%" }}
                  borderRadius="0"
                >
                  Add to List
                </Button>
              </Wrap>
              <Text
                key={movie?.id}
                mt='14px'
                fontWeight='500'
                fontSize="18px"
              >
                {movie?.title} (
                {movie?.release_date && movie?.release_date.slice(0, 4)})
              </Text>
            </Box>
          ))}
        </Grid>
      ) : null}
    </Box>
  );
};

export default MovieSearch;
