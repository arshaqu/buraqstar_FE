import React from 'react';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonCategorySlider = () => {
  return (
    <Box className="h-screen w-full pb-0 p-10 md:py-20 md:px-14 md:pb-0 lg:pb-0 lg:p-24">
      {/* First Row with Button Skeletons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        {[...Array(3)].map((_, i) => (
          <Box key={i} width="30%" position="relative">
            <Skeleton animation="wave" variant="rounded" width="100%" height="40rem" />

            {/* Container for the buttons, using flexbox to center */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              position="absolute"
              width="100%"
              top="80%"
            >
              <Skeleton
                animation="wave"
                ariant="rounded"v
                width="400px"
                height="30px"
                style={{ marginBottom: '20px' }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width="150px"
                height="35px"
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* 3-Dot Skeleton Indicator */}
      <Box display="flex" justifyContent="center" mt={4}>
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

export default SkeletonCategorySlider;
