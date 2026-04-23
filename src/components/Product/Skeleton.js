// Import necessary modules
import React from 'react';
import { Grid, Skeleton, Divider, Box, Button } from '@mui/material';

const ProductViewSkeleton = () => {
    return (
        <Grid container className="pt-16 px-5 sm:p-16 sm:pb-0" spacing={2}>
            {/* ProductSlider Skeleton */}
            <Grid item sm={4} xs={12}>
                <Skeleton variant="rectangular" width="100%" height={400} />
            </Grid>

            {/* Content Skeleton */}
            <Grid item sm={7} xs={12} className="pt-6 sm:pt-0">
                <Skeleton variant="text" width="15%" height={30} />
                <Skeleton variant="text" width="60%" height={50} />
                <Skeleton variant="text" width="5%" />
                <Skeleton variant="text" width="10%" />
                <Skeleton variant="text" width="25%" />
                <Divider className="bg-[#eff0f0] mt-6 mb-4" />
                <Skeleton variant="text" width="10%" />


                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">

                    <Grid item sm={2} xs={12}>
                        <Skeleton variant="text" width="95%" height={30} />
                    </Grid>

                    <Box display="flex" alignItems="center" ml={2} border="1px solid #ccc" borderRadius="4px" padding="4px 8px" marginLeft="16px">
                        <Skeleton variant="rectangular" width={20} height={30} />
                        <Skeleton variant="text" width={20} height={30} style={{ margin: '0 10px' }} />
                        <Skeleton variant="rectangular" width={20} height={30} />
                    </Box>

                    <Grid item sm={2} xs={12}>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <Box display="flex" alignItems="center" ml={4} marginLeft="32px">
                            <Skeleton variant="rectangular" width={300} height={40} style={{ marginRight: '16px' }} />
                            <Skeleton variant="rectangular" width={200} height={40} />
                        </Box>
                    </Grid>
                </Grid>


                <Skeleton variant="rectangular" width="20%" height={40} style={{ marginTop: '16px' }} />
                <Skeleton variant="text" width="100%" style={{ marginTop: '16px' }} />
                <Skeleton variant="text" width="100%"  />
                <Skeleton variant="text" width="80%"  />
            </Grid>

            {/* Description Skeleton */}
            <Grid item xs={12} className="mt-10">
                <Box className="w-full h-fit">
                    <Skeleton variant="rectangular" width="100%" height={40} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={7} className="mt-10">
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="rectangular" width="100%" height={100} style={{ marginTop: '16px' }} />
                <Skeleton variant="rectangular" width="100%" height={40} style={{ marginTop: '16px' }} />
            </Grid>
            <Grid item xs={12} sm={5} className="mt-5">
                <Box className="mt-6">
                    <Skeleton variant="rectangular" width="100%" height={20} />
                    <Skeleton variant="rectangular" width="100%" height={20} style={{ marginTop: '16px' }} />
                </Box>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
                <Divider className="bg-black mt-16" />
            </Grid>
        </Grid>
    );
};

export default ProductViewSkeleton;
