import React from "react";
import { Box, Typography } from "@mui/material";
import feed from "../../assets/feed.jpg";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const NewArrivals = () => {
  const { i18n } = useTranslation();

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <>
      <Box className="flex justify-between px-8 sm:px-28 w-full pt-16 pb-4">
        <Typography className="text-3xl pb-4 poppins text-[#141516] capitalize font-semibold">
          New Arrivals
        </Typography>
      </Box>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className={`h-72 w-full pb-6 mb-10 ${isRTL ? 'rtl' : ''}`}
        modules={[Autoplay]}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
        <SwiperSlide
          className="rounded-md bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${feed})` }}
        />
      </Swiper>
    </>
  );
};

export default NewArrivals;
