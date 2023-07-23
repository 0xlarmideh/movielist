// src/components/StarRating.js
import React from "react";
import { Box } from "@chakra-ui/react";

const StarRating = ({ rating, onChange }) => {
  const handleRatingChange = (newRating) => {
    onChange(newRating);
  };

  return (
    <Box>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleRatingChange(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </Box>
  );
};

export default StarRating;
