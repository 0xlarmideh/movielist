import React, { useEffect } from "react";
import { VStack, Checkbox, Box, Image, Text, Button, Grid, Flex, Wrap } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import StarRating from "./StarRating";
import {
  rateMovie,
  removeMovieFromWatchlist,
  setWatchlist,
  toggleWatchedStatus,
} from "@/features/movie/moviesSlice";
import Link from "next/link";
import FilterWatchlist from "./filter";

const MovieWatchlist = () => {
  // Image URL for movie posters
  const IMAGE_URL = "https://image.tmdb.org/t/p/original";

  // Variables and state values
  const {watchlist} = useSelector((state) => state.movies);
  const [filter, setFilter] = React.useState("all");
  const { isDark } = useSelector((state) => state.theme);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(0);
  const borderStyle = isDark ? "2px solid gainsboro" : "2px solid black";
  const dispatch = useDispatch();

  // Load watchlist from local storage
  useEffect(() => {
    let savedWatchlist;

    // Check if window is defined (for server side rendering)
    if (typeof window !== undefined) {
      savedWatchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    }
    dispatch(setWatchlist(savedWatchlist));
  }, [dispatch]);

  // Function to handle rating change
  const handleRatingChange = (id, rating) => {
    dispatch(rateMovie({ id, rating }));
  };

  // Function to handle watched status toggle
  const handleWatchedToggle = (id, watched) => {
    dispatch(toggleWatchedStatus({ id, watched }));
  };

  // Function to handle remove movie from watchlist
  const handleRemoveMovie = (id) => {
    dispatch(removeMovieFromWatchlist(id));
  };

  // Filter data array
  const filterData = ['all', 'watched']
  
  // Filter watchlist based on filter
  const filteredWatchlist =
    filter === "watched"
      ? watchlist.filter((movie) => movie.watched)
      : watchlist;

  return (
    <>
      <Flex align="center" mb={8} gap={4} w="100%">
        <Text>Filter Watchlist</Text>
        <FilterWatchlist
          data={filterData}
          isDark={isDark}
          selectedFilterIndex={selectedFilterIndex}
          setSelectedFilterIndex={setSelectedFilterIndex}
          setFilter={setFilter}
        />
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
                  <Text className="oswald" fontWeight="500" fontSize="18px">
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
      
      {/* // If watchlist is empty */}
      {watchlist?.length <= 0 && (
        <>
          <Text fontSize={'21px'}>No movies in the watchlist</Text>
          <Link href="/">
            <Button mt='14px' display='block' fontSize='21px' mx='auto' bg={"#188B8C"} color='white' borderBottom={borderStyle} borderRight={borderStyle}>Go to movies</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default MovieWatchlist;
