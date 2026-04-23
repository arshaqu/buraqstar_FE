// SkeletonPopular.js
import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonPopular = () => {
  return (
    <Box className="bg-transparent h-fit w-full py-16 px-5 md:px-10 lg:p-20">
      <Skeleton animation="wave" width="30%" height="40px" />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Grid item xs={12} sm={6} md={2} key={i}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height="150px" />
            <Skeleton animation="wave" width="60%" height="20px" sx={{ mt: 1 }} />
            <Skeleton animation="wave" width="40%" height="20px" sx={{ mt: 1 }} />
            <Skeleton animation="wave" width="80%" height="20px" sx={{ mt: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonPopular;
