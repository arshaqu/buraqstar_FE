import React from 'react';
import { Box, Grid, Typography, Skeleton } from '@mui/material';

const SkeletonGridBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#e0e0e0',
        padding: '20px',
        height: '100%',
        marginTop: '2rem',
        borderRadius: '12px',
        overflow: 'hidden',
        marginLeft: '5rem',
        marginRight: '5rem',
        marginBottom: '2rem'
      }}
    >
      <Grid container spacing={2}>
        {/* Flash Sale Section */}
        <Grid item xs={6}>
          <Box>
            <Typography component="div" variant="h4" color="textPrimary">
              <Skeleton animation="wave" width="30%" height={80} />
            </Typography>
            <Typography component="div" variant="body1" color="textPrimary" sx={{ marginTop: '10px' }}>
              <Skeleton animation="wave" width="80%" height={20} />
            </Typography>
            <Box display="flex" justifyContent="" alignItems="center">
              <Skeleton variant="text" width={50} height={60} sx={{ mx: 1 }} />
              <Typography variant="h3" component="span" mx={1}>
                :
              </Typography>
              <Skeleton variant="text" width={50} height={60} sx={{ mx: 1 }} />
              <Typography variant="h3" component="span" mx={1}>
                :
              </Typography>
              <Skeleton variant="text" width={50} height={60} sx={{ mx: 1 }} />
              <Typography variant="h3" component="span" mx={1}>
                :
              </Typography>
              <Skeleton variant="text" width={50} height={60} sx={{ mx: 1 }} />
            </Box>
          </Box>
        </Grid>

        {/* Product Cards */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={100} sx={{ borderRadius: '8px' }} />
                  </Grid>
                  <Grid item xs={8}>
                    <Skeleton animation="wave" width="80%" height={20} />
                    <Skeleton animation="wave" width="60%" height={20} sx={{ marginTop: '10px' }} />
                    <Skeleton animation="wave" width="40%" height={20} sx={{ marginTop: '10px' }} />
                    <Skeleton animation="wave" width="80%" height={10} sx={{ marginTop: '20px' }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Skeleton animation="wave" variant="rectangular" width="100%" height={100} sx={{ borderRadius: '8px' }} />
                  </Grid>
                  <Grid item xs={8}>
                    <Skeleton animation="wave" width="80%" height={20} />
                    <Skeleton animation="wave" width="60%" height={20} sx={{ marginTop: '10px' }} />
                    <Skeleton animation="wave" width="40%" height={20} sx={{ marginTop: '10px' }} />
                    <Skeleton animation="wave" width="80%" height={10} sx={{ marginTop: '20px' }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SkeletonGridBanner;
