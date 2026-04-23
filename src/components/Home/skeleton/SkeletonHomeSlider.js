import React from 'react';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const SkeletonHomeSlider = () => {
  return (
    <Box sx={{ height: '60rem', width: '100%' }}>
      <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />

      <Box display="flex" justifyContent="center" mt={-4}>
        {[...Array(4)].map((_, i) => (
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

export default SkeletonHomeSlider;
