import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import i18next
import defaultImage from "../../assets/dummy.png";
import electricalImage from "../../assets/category/electrical.jpeg";
import hardwareImage from "../../assets/category/Hardware.jpeg";
import sanitaryImage from "../../assets/category/Sanitary.jpeg";
import toolsImage from "../../assets/category/Tools.jpeg";
import allItems from "../../assets/allitems.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { createSlug } from "../../utils";

const categoryBackgrounds = [
  { name: "Electrical", src: electricalImage },
  { name: "Hardware", src: hardwareImage },
  { name: "Sanitary", src: sanitaryImage },
  { name: "Tools", src: toolsImage },
];

const CategorySlider = ({ categories }) => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <Box className="h-auto w-full pb-0 p-6 sm:p-6 md:pt-0 md:pb-0 md:px-8 lg:pt-0 lg:pb-0 lg:px-16 xl:px-24 overflow-hidden category-slider-container">
      <Box className="w-full overflow-hidden">
      <style>{`
        .categories-pagination {
          bottom: -10px !important;
        }
        @media (min-width: 414px) and (max-width: 440px) {
          .categories-pagination {
            bottom: -30px !important;
          }
          .category-slider-container {
            padding-bottom: 24px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .categories-pagination {
            bottom: 100px !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          .categories-pagination {
            bottom: 150px !important;
          }
        }
        @media (min-width: 1280px) {
          .categories-pagination {
            bottom: 75px !important;
          }
        }
        .categories-slide.no-hover-overlay::before,
        .categories-slide.no-hover-overlay:hover::before {
          background-color: transparent !important;
        }
      `}</style>
      <Swiper
        className={`h-80 sm:h-96 md:h-[28rem] lg:h-128 categorySlider ${isRTL ? 'rtl' : ''}`}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          900: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          width: '100%',
          "--swiper-pagination-color": "#2858a3",
          "--swiper-pagination-bullet-inactive-color": "transparent",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "4px",
          direction: isRTL ? 'rtl' : 'ltr'
        }}
        onSwiper={(swiper) => {
          if (swiper?.el) {
            swiper.el.querySelector(".swiper-pagination")?.classList.add("categories-pagination");
          }
        }}
      >
        {categories.map((val, i) => {
          // Find the background image based on category name
          const categoryBg = categoryBackgrounds.find(
            (cat) => cat.name.toLowerCase() === val.name.toLowerCase()
          );

          // Determine the final background image to use
          const backgroundImage =
            val.id > 0
              ? val.image && val.image !== ""
                ? val.image
                : categoryBg && categoryBg.src
                  ? categoryBg.src
                  : defaultImage
              : allItems;

          return (
            <SwiperSlide
              key={i}
              className="categories-slide no-hover-overlay flex flex-col items-center justify-start h-auto px-2 sm:px-4 space-y-3"
            >
              {/* Image with white border similar to product cards */}
              <div className="w-full flex justify-center">
                <div
                  className="relative flex justify-center items-center rounded-2xl border-4 border-[#2858a3] transition-all duration-300 w-full overflow-hidden max-w-full"
                  style={{
                    boxShadow:
                      hoveredIndex === i
                        ? "0 0 32px rgba(40, 88, 163, 0.85)"
                        : "0 12px 28px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <img
                    src={backgroundImage}
                    alt={val.name}
                    className="w-full h-auto max-h-64 object-contain bg-transparent"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>

              {/* Category Name */}
              <Typography className="text-base sm:text-lg md:text-xl text-center text-gray-800 capitalize font-semibold poppins px-2 mt-2">
                {t(`categories.${val.name}`, val.name)}
              </Typography>

              {/* Shop Now Button */}
              <Button
                component={Link}
                to={
                  val.id > 0
                    ? "/category/" + (val.slug || createSlug(val.name))
                    : "/category"
                }
                className="text-white rounded-md bg-[#2858a3] hover:bg-[#1e4080] uppercase poppins py-2 px-6 font-semibold text-xs sm:text-sm transition-colors duration-300"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {t("categories.shop_now")}
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>
      </Box>
    </Box>
  );
};

export default CategorySlider;
