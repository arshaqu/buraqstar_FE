import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonPopularSlider = () => {
  return (
    <Box sx={{   backgroundColor: '#e0e0e0', padding: '60px 0', position: 'relative', marginTop:'50px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Skeleton
            variant="rounded"
            width={350}
            height={200}
            sx={{
              backgroundColor: '#BDBDBD',
              margin: '0 auto',
              position: 'relative',
              marginTop: '-150px'  // Moves the skeleton half out from the top
            }}
          />
          <Skeleton
            variant="text"
            width={150}
            height={40}
            sx={{ backgroundColor: '#BDBDBD', margin: '20px auto' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="space-between" textAlign="center" sx={{ marginTop: 4 }}>
        <Grid item xs={3} textAlign="center">
          <Skeleton
            variant="rounded"
            width={200}
            height={50}
            sx={{ backgroundColor: '#BDBDBD', margin: '0 auto' }}
          />
        </Grid>
        <Grid item xs={3} textAlign="center">
          <Skeleton
            variant="rounded"
            width={200}
            height={50}
            sx={{ backgroundColor: '#BDBDBD', margin: '0 auto' }}
          />
        </Grid>
        <Grid item xs={3} textAlign="center">
          <Skeleton
            variant="rounded"
            width={200}
            height={50}
            sx={{ backgroundColor: '#BDBDBD', margin: '0 auto' }}
          />
        </Grid>
        <Grid item xs={3} textAlign="center">
          <Skeleton
            variant="rounded"
            width={200}
            height={50}
            sx={{ backgroundColor: '#BDBDBD', margin: '0 auto' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonPopularSlider;
