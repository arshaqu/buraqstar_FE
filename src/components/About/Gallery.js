import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import picture1 from "../../assets/picture1.jpg";
import picture2 from "../../assets/picture2.jpg";
import picture3 from "../../assets/picture3.jpg";
import picture4 from "../../assets/picture4.jpg";
import picture5 from "../../assets/picture5.jpg";

const Gallery = () => {
  const images = [picture1, picture2, picture3, picture4, picture5];
  return (
    <Box className="w-full h-fit pt-20 px-5 sm:px-10 pb-6">
      <Typography className="poppins text-center capitalize text-3xl font-bold w-full text-[#2E2E2E] pb-5 sm:pb-14">
        Picture Gallery
      </Typography>

      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation]}
        className="h-[40vh] sm:h-[76vh] w-full popularSlider"
      >
        <div className="swiper-button-next absolute top-[45%] bg-[#02adec] w-10 h-10 rounded-sm flex items-center justify-center">
          <ChevronRightIcon className="text-[10px] text-white" />
        </div>
        <div className="swiper-button-prev absolute top-[45%] bg-[#02adec] w-10 h-10 rounded-sm flex items-center justify-center">
          <ChevronLeftIcon className="text-[10px] text-white" />
        </div>
        {images?.map((image, i) => (
          <SwiperSlide
            key={i}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundOrigin: "content-box",
              cursor: "pointer",
              height: "85%",
            }}
          />
        ))}
      </Swiper>
      {images?.length > 1 && (
        <Grid
          container
          sx={{
            height: {
              xs: "24vh",
              sm:"28vh",
              md: "40vh",
            },
            width: "100%",
            marginTop: "10px",
            overflow: "hidden",
          }}
        >
          {images?.slice(1, 5).map((image, i) => (
            <Grid item xs={3}>
              <img
                src={image}
                loading="lazy"
                alt={`Product${i}`}
                style={{
                  height: "fit-content",
                  width: "100%",
                  margin: "10px",
                  cursor: "pointer",
                }}
                key={i}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Box className="w-full flex justify-center mt-0 sm:mt-10">
        <Button className="bg-[#1E55AC] py-4 px-14 text-lg font-semibold text-white poppins capitalize">
          View All
        </Button>
      </Box>
    </Box>
  );
};

export default Gallery;
