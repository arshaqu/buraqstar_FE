// SkeletonSEOInstagram.js
import React from 'react';
import { Box, Skeleton, Grid, Divider } from '@mui/material';

const SkeletonSEOInstagram = () => {
  return (
    <Box className="w-full h-fit flex flex-col items-center mb-5">
      <Box className="w-full h-fit py-10 px-8 sm:px-28">
        <Skeleton animation="wave" width="70%" height="30px" />
        {[...Array(6)].map((_, i) => (
          <Skeleton animation="wave" key={i} width="100%" height="20px" sx={{ mt: 2 }} />
        ))}
      </Box>
      <Divider className="bg-[#CCCCCC] my-4 w-[90%]" />
      <Box className="flex justify-between px-8 sm:px-28 w-full pt-16 pb-4">
        <Skeleton animation="wave" width="30%" height="40px" />
        <Box className="flex items-center gap-x-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton animation="wave" key={i} variant="circular" width="40px" height="40px" />
          ))}
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2, px: 8 }}>
        {[...Array(4)].map((_, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height="150px" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonSEOInstagram;
