import React from 'react';
import { Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton
          key={value}
          onClick={() => onRatingChange(value)}
          size="small"
        >
          {value <= rating ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorderIcon color="primary" />
          )}
        </IconButton>
      ))}
    </Box>
  );
};

export default StarRating; 