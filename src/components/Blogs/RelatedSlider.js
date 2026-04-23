import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import blogImage from "../../assets/blog.jpg";
import BlogCard from "./BlogCard";
import { useTranslation } from "react-i18next";

const RelatedSlider = () => {
  const { i18n } = useTranslation();
  
  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  
  const blog = {
    image: blogImage,
    title: "the Best Sanitary Items",
    caption:
      "Novex is a British brand in which we produce Electrical products. these products ",
  };
  
  return (
    <Box className="bg-transparent h-fit w-full py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <Typography className="poppins text-4xl font-semibold text-black">
        Related Blogs
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
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className={`absolute top-10 hidden sm:block ${isRTL ? 'left-20' : 'right-20'}`}>
          <div className="swiper-button-next bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
            {isRTL ? <ChevronLeftIcon className="text-sm text-white" /> : <ChevronRightIcon className="text-sm text-white" />}
          </div>
          <div className="swiper-button-prev bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
            {isRTL ? <ChevronRightIcon className="text-sm text-white" /> : <ChevronLeftIcon className="text-sm text-white" />}
          </div>
        </div>
        {[1, 2, 3, 4, 5, 6, 7].map((product, i) => (
          <SwiperSlide key={i} className="mt-20 pb-2">
            <BlogCard blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RelatedSlider;
