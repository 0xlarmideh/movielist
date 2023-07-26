// src/components/MovieSearch.js
import React, { useEffect, useState } from "react";
import {
  Input,
  VStack,
  Text,
  Flex,
  IconButton,
  Box,
  Image,
  Grid,
  Heading,
  Wrap,
  Button,
  Center,
  Spinner,
  useToast,
  border,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import fetchMoviesByTitle from "@/features/movie/movieApi";
import { addMovieToWatchlist } from "@/features/movie/moviesSlice";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

const MovieSearch = () => {
  // Variables and state values
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(5);
  const [searchResults, setSearchResults] = useState([]);
  const watchlist = useSelector((state) => state.movies.watchlist);
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);
  const toast = useToast();

  // Check if movie is already in watchlist
  const isMovieInWatchlist = (movie) => {
    return watchlist.some((item) => item.id === movie.id);
  };

  // Function to fetch movies by title
  const handleSearch = async () => {
    setIsLoading(true);
    // Fetch movies by title
    const results = await fetchMoviesByTitle(searchTerm);
    setSearchResults(results);
    setIsLoading(false);
  };

  // Load more movies (5 at a time) - Lazy loading implementation
  const handleLoadMore = () => {
    setLoadMore(loadMore + 5);
  };

  // Image URL for movie posters
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  // Border style for movie cards
  const borderStyle = isDark ? "2px solid gainsboro" : "2px solid black";

  // Function to add movie to watchlist
  const handleAddToWatchlist = (movie) => {
    // Check if movie is already in watchlist
    if (!isMovieInWatchlist(movie)) {
      dispatch(addMovieToWatchlist(movie));
      toast({
        title: `${movie.title} (
                ${
                  movie?.release_date && movie?.release_date.slice(0, 4)
                }) added to your watchlist`,
        description:
          "You can view your watchlist by clicking on the watchlist tab",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: `${movie.title} (
                ${
                  movie?.release_date && movie?.release_date.slice(0, 4)
                }) is already in your watchlist.`,
        description: "Please add another movie",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "top",

      });
    }
  };

  return (
    <Box>
      <Text className="text-heading" as="h1" size="lg" mb={4}>
        Search for your{" "}
        <Text className="text-heading" color="#188B8C" as="span">
          favourite movie
        </Text>
      </Text>
      <Flex mb={8} gap={4} w="100%">
        <Input
          type="text"
          placeholder="Search movies by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            // If enter key is pressed, search for movies
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          maxWidth="350px"
        />
        <IconButton
          onClick={handleSearch}
          aria-label="Search"
          icon={<SearchIcon />}
          color="white"
          width="60px"
          bg={"#188B8C"}
          borderRight={borderStyle}
          borderBottom={borderStyle}
        />
      </Flex>
      <Center>
      {/* Spinner to indicate loading */}
        {isLoading && <Spinner size="xl" color={isDark ? "white" : "black"} />}{" "}
      </Center>
      {/* Display search results */}
      {!isLoading && searchResults.length > 0 ? (
        <Grid
          rowGap={12}
          gap={4}
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          w="100%"
          mt={2}
        >
          {/* // Display search results in a grid with Lazy loading */}
          {searchResults.slice(0, loadMore).map(
            (movie, index) =>
              // Hide movies without posters
              movie?.poster_path && (
                <Box position="relative" key={index}>
                  <Box
                    border={borderStyle}
                    _hover={{
                      transform: "translateY(-20px)",
                      transition: "0.3s all ease-in",
                    }}
                    p="10px"
                    w="100%"
                    overflow="hidden"
                  >
                    <Image
                      src={`${IMAGE_URL}${movie?.poster_path}`}
                      w="100%"
                      h={{ base: "100%", md: "350px" }}
                      objectFit="cover"
                      alt={movie?.title}
                    />
                    <Flex align="center" justify="space-between">
                      <HStack
                        mt="10px"
                        display={"inline-flex"}
                        bg="#F5A541"
                        border={borderStyle}
                        borderLeft="none"
                        borderTop={"none"}
                        borderRadius="8px"
                        spacing={4}
                        px="5px"
                        py="4px"
                        fontSize="12px"
                        fontWeight="600"
                        color="black"
                      >
                        <Text>IMDB</Text>
                        <Text>
                          {parseFloat(movie?.vote_average).toFixed(1)}
                        </Text>
                      </HStack>
                      <button
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "white",
                          background: "#188B8C",
                          marginTop: "10px",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          borderRight: borderStyle,
                          borderBottom: borderStyle,
                        }}
                        // Add movie to watchlist
                        onClick={() => handleAddToWatchlist(movie)}
                      >
                        Add to watchlist
                      </button>
                    </Flex>

                    <Text
                      key={movie?.id}
                      fontWeight="500"
                      fontSize="16px"
                      my="10px"
                      textTransform="uppercase"
                      className="oswald"
                    >
                      {movie?.title}
                    </Text>
                    <Flex fontSize="12px" fontWeight="500" gap="3px">
                      <Text
                        my="auto"
                        px="10px"
                        borderRadius="full"
                        border={borderStyle}
                      >
                        {movie?.release_date && movie?.release_date.slice(0, 4)}
                      </Text>
                      <Text
                        my="auto"
                        px="10px"
                        borderRadius="full"
                        border={borderStyle}
                      >
                        {movie?.adult ? "18+" : "PG-13"}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              )
          )}
        </Grid>
      ) : null}
      
      {/* Load more button */}
      {searchResults.length > 0 && (
        <Button
          disabled={searchResults.length === loadMore}
          _active={{ opacity: 0.8 }}
          _hover={{ opacity: 0.8 }}
          _focus={{ opacity: 0.8 }}
          onClick={() => handleLoadMore()}
          bg="#188B8C"
          color="white"
          border={borderStyle}
          borderLeft="none"
          borderTop={"none"}
          borderRadius="8px"
          space={4}
          px="5px"
          py="4px"
          my="30px"
          mx="auto"
          display="block"
          fontSize="14px"
          fontWeight="600"
          w="150px"
        >
          Load more
        </Button>
      )}
    </Box>
  );
};

export default MovieSearch;
