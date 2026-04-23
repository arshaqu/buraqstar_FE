import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

const SkeletonSaleSection = () => {
  return (
    <Box className="w-full h-full relative flex flex-col items-center" sx={{
      paddingLeft: '7rem',
      paddingRight: '7rem',
    }}>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, i) => (
          <Grid item xs={12} sm={3} md={3} key={i}>
            <Box
              sx={{
                borderRadius: '8px',
                paddingBottom: 2,
                backgroundColor: '#e0e0e0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%', // Ensure the Box fills the Grid item's height
                minHeight: '750px', // Set a minimum height for each item
              }}
            >
              {/* Placeholder for Sold Out Badge */}
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                sx={{ position: 'absolute', top: 16, right: 16 }}
              />

              {/* Placeholder for Product Image */}
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height="350px"
                sx={{ borderRadius: '4px', mb: 2 }}
              />

              <Box
                sx={{
                  borderRadius: '8px',
                  position: 'relative',
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {/* Placeholder for Product Price */}
                <Skeleton animation="wave" width="60%" height="30px" sx={{ mb: 2 }} />

                {/* Placeholder for Product Title */}
                <Skeleton animation="wave" width="80%" height="20px" sx={{ mb: 1 }} />
                <Skeleton animation="wave" width="70%" height="20px" sx={{ mb: 2 }} />

                {/* Placeholder for Rating */}
                <Skeleton animation="wave" width="50%" height="20px" sx={{ mb: 2 }} />

                {/* Placeholder for Stock Bar */}
                <Skeleton animation="wave" variant="rectangular" width="80%" height="10px" sx={{ mb: 2 }} />

                {/* Placeholder for Stock Text */}
                <Skeleton animation="wave" width="40%" height="15px" sx={{ mb: 2 }} />

                {/* Placeholder for Add to Cart Button */}
                <Skeleton animation="wave" variant="rectangular" width="80%" height="40px" sx={{ borderRadius: '4px' }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonSaleSection;
