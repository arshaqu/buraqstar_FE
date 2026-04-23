import React from 'react'
import { Box, Grid, Skeleton } from '@mui/material'

const ProductLoadingSkeleton = () => {
  return (
    <Grid item xs={12} className="px-2.5 mb-5 text-center">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
        {[...Array(6)].map((_, index) => (
          <Box
            key={index}
            className="flex flex-col items-center"
            style={{
              width: "calc(100% - 8px)",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
            sx={{
              '@media (min-width: 600px)': {
                width: "calc(50% - 12px)",
              },
              '@media (min-width: 960px)': {
                width: "calc(33.333% - 16px)",
              }
            }}
          >
            {/* Heart Icon Placeholder */}
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              style={{
                alignSelf: "flex-start",
                marginBottom: "-24px",
                marginLeft: "8px",
                zIndex: 1
              }}
              sx={{
                '@media (min-width: 600px)': {
                  width: 24,
                  height: 24,
                  marginBottom: "-28px",
                }
              }}
            />
            {/* Product Image Placeholder */}
            <Skeleton
              variant="rectangular"
              width="100%"
              animation="wave"
              height={180}
              style={{
                borderRadius: "8px",
                marginBottom: "12px",
              }}
              sx={{
                '@media (min-width: 600px)': {
                  height: 220,
                  marginBottom: "16px",
                },
                '@media (min-width: 960px)': {
                  height: 240,
                }
              }}
            />
            {/* Cart Icon Placeholder */}
            <Skeleton
              variant="circular"
              width={20}
              height={20}
              style={{
                alignSelf: "flex-end",
                marginTop: "-35px",
                marginRight: "8px",
                marginBottom: "8px",
                zIndex: 1
              }}
              sx={{
                '@media (min-width: 600px)': {
                  width: 24,
                  height: 24,
                  marginTop: "-45px",
                }
              }}
            />
            {/* Product Title Placeholder */}
            <Skeleton
              variant="text"
              width="90%"
              height={16}
              style={{
                borderRadius: "4px",
                marginBottom: "6px",
              }}
              sx={{
                '@media (min-width: 600px)': {
                  width: "80%",
                  height: 20,
                  marginBottom: "8px",
                }
              }}
            />
            {/* Product Price Placeholder */}
            <Skeleton
              variant="text"
              width="50%"
              height={16}
              style={{
                borderRadius: "4px",
                marginBottom: "8px",
              }}
              sx={{
                '@media (min-width: 600px)': {
                  width: "40%",
                  height: 20,
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Grid>
  )
}

export default ProductLoadingSkeleton

