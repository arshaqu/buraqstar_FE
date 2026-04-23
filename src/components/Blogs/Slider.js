import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import BlogCard from "./BlogCard";
import { useTranslation } from "react-i18next"; // Import i18next

const Slider = ({ blogs }) => {
  const { t, i18n } = useTranslation(); // Hook for translations
  
  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <Box className="bg-transparent h-fit w-full py-16 px-5 md:px-10 lg:p-20">
      <Typography className="poppins text-4xl font-semibold text-black">
        {t("slider.check_our_blogs")}
      </Typography>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="h-full w-full popularSlider relative -mt-14"
      >
        <div className={`absolute top-10 ${isRTL ? 'left-20' : 'right-20'} hidden sm:block`}>
          <div className="swiper-button-prev -left-14 bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
            <ChevronLeftIcon className="text-sm text-white" />
          </div>
          <div className="swiper-button-next -right-14  bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
            <ChevronRightIcon className="text-sm text-white" />
          </div>
        </div>
        {blogs.map((blog, i) => (
          <SwiperSlide key={i} className="mt-20 pb-2">
            <BlogCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Slider;
