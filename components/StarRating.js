// src/components/StarRating.js
import React from "react";
import { Box } from "@chakra-ui/react";

const StarRating = ({ rating, onChange }) => {
  // Function to handle rating change
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
            fontSize: "1.7rem",
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
