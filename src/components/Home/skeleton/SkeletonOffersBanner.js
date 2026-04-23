// SkeletonOffersBanner.js
import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonOffersBanner = () => {
  return (
    <Box className="w-full h-screen px-5 sm:px-20 py-8">
      <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
    </Box>
  );
};

export default SkeletonOffersBanner;
