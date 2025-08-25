import React from 'react';
import { Box, LinearProgress } from '@mui/material';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <LinearProgress variant="determinate" value={progress * 100} />
    </Box>
  );
};

export default ProgressBar; 