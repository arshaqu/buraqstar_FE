import React from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

import bg from "../../assets/sliderbg.jpg";
import { novexProducts } from "../../data";

const MobilePopularSlider = () => {
  return (
    <Box className="pt-4 pb-8 px-5 md:px-[4%] lg:px-[8%] block sm:hidden">
      <Box
        className="h-[50vh] w-full rounded-lg bg-cover bg-no-repeat bg-center p-12"
        sx={{ backgroundImage: `url(${bg})` }}
      >
        <Typography className="text-3xl text-white poppins font-semibold w-3/4">
          Popular Novex Products
        </Typography>
        <Button className="text-white rounded-md bg-[#FF3030] uppercase poppins py-2.5 px-5 mt-5 cursor-pointer text-[10px]">
          View New Products
        </Button>
      </Box>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="popularSlider mt-12 h-[80vh]"
        style={{
          "--swiper-pagination-color": "#2858a3",
          "--swiper-pagination-bullet-inactive-color": "transparent",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        
        }}
      >
        {novexProducts.slice(0, 6).map((product, i) => (
          <SwiperSlide className="h-fit ">
            <Grid item xs={12} sm={3} key={i}>
              {/* <Box className="h-[70vh] w-full relative bg-white border rounded-lg flex flex-col items-center py-5">
                <IconButton className="absolute top-3 right-3">
                  <FavoriteBorderIcon className="text-2xl text-[#cccccc]" />
                </IconButton>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-1/2 w-auto"
                />
                <Box className="h-1/2 w-full flex flex-col justify-between p-2.5 pt-2.5 sm:pt-2.5 lg:pt-8">
                  <Typography className="text-sm sm:text-base lg:text-lg text-left text-black poppins">
                    {product.name}
                  </Typography>
                  <Box>
                    <Box className="flex justify-between px-2 md:px-2 lg:px-5 items-center w-full pb-3">
                      <Typography className="text-lg font-semibold text-left text-[#FF3030] poppins">
                        AED {product.price}
                      </Typography>
                      <Typography className="text-sm line-through text-left text-[#818181] poppins">
                        AED {product.discount}
                      </Typography>
                    </Box>
                    <Box className="flex items-center w-full px-2 md:px-2 lg:px-5">
                      <StarIcon className="text-base text-[#2858a3]" />
                      <Typography className="text-xs  text-black poppins">
                        {product.rating}
                      </Typography>
                      <Typography className="text-[10px] ps-2 text-[#818181] poppins">
                        ( {product.reviews} Reviews )
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box> */}
              <Box className="h-[70vh] w-full relative bg-white border rounded-lg flex flex-col items-center py-5">
                <IconButton className="absolute top-3 right-3">
                  <FavoriteBorderIcon className="text-2xl text-[#cccccc]" />
                </IconButton>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[60%] w-auto"
                />
                <Box className="h-[40%] w-full flex flex-col justify-between p-2.5 pt-2.5 sm:pt-2.5 lg:pt-8">
                  <Typography className="text-lg sm:text-lg lg:text-lg xl:text-2xl text-center w-full px-1 text-black poppins">
                    {product.name}
                  </Typography>
                  <Box>
                    <Box className="flex justify-between px-2 md:px-2 lg:px-5 items-center w-full pb-3">
                      <Typography className="text-lg sm:text-xl xl:text-2xl font-semibold text-left text-[#FF3030] poppins">
                        AED {product.price}
                      </Typography>
                      <Typography className="text-sm sm:text-base xl:text-lg line-through text-left text-[#818181] poppins">
                        AED {product.discount}
                      </Typography>
                    </Box>
                    <Box className="flex items-center w-full px-2 md:px-2 lg:px-5">
                      <StarIcon className="text-base text-[#2858a3]" />
                      <Typography className="text-sm  text-black poppins">
                        {product.rating}
                      </Typography>
                      <Typography className="text-xs ps-2 text-[#818181] poppins">
                        ( {product.reviews} Reviews )
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MobilePopularSlider;
