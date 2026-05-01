import React from "react";
import { Box } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";

import blogImage from "../../assets/Blogspost.png";
import BlogCard from "./BlogCard";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SliderTwo = ({ blogs }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  return (
    <Box className="flex flex-col lg:flex-row w-full mb-14 gap-6">

      {/* LEFT SIDE - Slider */}
      <Box className="w-full lg:w-[75%] bg-transparent px-4 md:px-10 lg:px-20">
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
            0: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
          }}
          modules={[Autoplay, Navigation]}
          className="h-full w-full popularSlider relative mt-0 lg:-mt-14"
        >
          <div
            className={`absolute bottom-3 ${
              isRTL ? "left-10" : "left-[50%]"
            } hidden sm:block`}
          >
            <div className="swiper-button-prev -left-12 bg-[#02adec] w-8 h-8 flex justify-center items-center rounded-full">
              <ChevronLeftIcon className="text-white" />
            </div>
            <div className="swiper-button-next -right-12 bg-[#02adec] w-8 h-8 flex justify-center items-center rounded-full">
              <ChevronRightIcon className="text-white" />
            </div>
          </div>

          {blogs.map((blog, i) => (
            <SwiperSlide key={i} className="pb-5">
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* RIGHT SIDE - Image */}
      <Box  onClick={() => navigate("/category")} className="w-full lg:w-[25%] flex justify-center lg:justify-end p-8 mr-16">
       
        <img
        
          src={blogImage}
          alt="Blog Banner"
          className="w-full max-w-[320px] lg:max-w-full cursor-pointer h-auto object-cover rounded-xl"
        />
      </Box>

    </Box>
  );
};

export default SliderTwo;