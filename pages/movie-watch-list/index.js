import MovieWatchlist from "@/components/MovieWatchList";
import { Heading } from "@chakra-ui/react";
import React from "react";

const Index = () => {
  return (
    <div>
      <Heading as="h1">My Watch List</Heading>
      <MovieWatchlist />
    </div>
  );
};

export default Index;
