import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonBrandBanner = () => {
  return (
    <Box className="w-full h-fit sm:h-[26vh] px-5 md:px-[4%] lg:px-[8%]">
      <Skeleton animation="wave" variant="rounded" width="100%" height="160px" />
      <Box display="flex" justifyContent="center" mt={-4}>
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            animation="wave"
            variant="circular"
            width="15px"
            height="15px"
            style={{ margin: '0 5px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonBrandBanner;
