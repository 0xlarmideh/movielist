import MovieWatchlist from "@/components/MovieWatchList";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Index = () => {
  return (
    <Box p="10px" mx="auto" maxW="900px">
      <Text as="h1" className="text-heading" size="lg" mb={4}>
        Movie Watchlist
      </Text>
      <MovieWatchlist />
    </Box>
  );
};

export default Index;
