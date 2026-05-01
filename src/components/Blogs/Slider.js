import React, { useEffect, useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";

import BlogCard from "./BlogCard";
import ProductSidebar from "../Products/ProductSidebar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ajaxService from "../../services/ajax-service";

const SliderSection = ({
  blogs,
  sideItems = [],
  expandedItems,
  toggleExpand,
  handleParentClick,
  handleChildClick,
  handleSubChildClick,
  sidebarLoading,
  selectedBrands = [],
  handleBrandToggle,
}) => {
  
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  
  const isRTL = i18n.language === "ar" || i18n.language === "ur";
  
  // ✅ BRAND STATE
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  
  // ✅ FETCH BRANDS USING YOUR EXISTING ajaxService
  useEffect(() => {
    const loadBrands = async () => {
      setLoadingBrands(true);
      
      try {
        const res = await ajaxService.get("/all-brands");
        console.log(res,'-----------------------------------');
        
        
        // safe handling of response
        if (res?.success && Array.isArray(res.data)) {
          setBrands(res.data);
        } else if (Array.isArray(res)) {
          setBrands(res);
        } else {
          setBrands([]);
        }
      } catch (err) {
        console.error("Brands load error:", err);
        setBrands([]);
      }
      
      setLoadingBrands(false);
    };
    
    loadBrands();
  }, []);

  return (
    <Box className="w-full flex flex-col lg:flex-row gap-6 px-5 md:px-10 lg:px-20 py-16">

      {/* LEFT SIDE - SLIDER */}
      <Box className="w-full lg:w-[75%]">
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
            480: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Autoplay, Navigation]}
          className="h-full w-full popularSlider relative -mt-14"
        >
          {/* Navigation */}
          <div
            className={`absolute top-10 ${
              isRTL ? "left-20" : "right-20"
            } hidden sm:block`}
          >
            <div className="swiper-button-prev -left-14 bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
              <ChevronLeftIcon className="text-white" />
            </div>
            <div className="swiper-button-next -right-14 bg-[#02adec] w-10 h-10 flex justify-center items-center rounded-full">
              <ChevronRightIcon className="text-white" />
            </div>
          </div>

          {/* Slides */}
          {blogs?.map((blog, i) => (
            <SwiperSlide key={i} className="mt-20 ">
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* RIGHT SIDE */}
  <Box className="w-full lg:w-[25%]">

  {/* CATEGORY SIDEBAR */}
  {sideItems && sideItems.length > 0 ? (
    <ProductSidebar
      sideItems={sideItems}
      expandedItems={expandedItems}
      toggleExpand={toggleExpand}
      handleParentClick={handleParentClick}
      handleChildClick={handleChildClick}
      handleSubChildClick={handleSubChildClick}
      sidebarLoading={sidebarLoading}
      brands={brands}
      selectedBrands={selectedBrands}
      handleBrandToggle={handleBrandToggle}
      mobileDrawerOpen={false}
      setMobileDrawerOpen={() => {}}
    />
  ) : (
    <>
      {/* BRAND ONLY VIEW */}
      <Box className="bg-white rounded-2xl shadow-md  hidden sm:block ">
        <Typography className="text-xl poppins font-semibold border-b p-4 bg-gray-200 border-gray-300 mb-2 rounded-t-2xl">
          All {t("navigation.brands")}
        </Typography>

        {loadingBrands ? (
          <Typography className="text-sm text-gray-500">
            Loading brands...
          </Typography>
        ) : brands.length > 0 ? (
          brands.map((brand, i) => (
            <Box
              key={i}
              onClick={() =>
                navigate(`/brand/${brand.slug || brand.id}`)
              }
              className="flex items-center justify-between  p-4 cursor-pointer hover:bg-gray-50 rounded-md"
            >
              <Typography className="poppins text-xl">
                {brand.name}
              </Typography>

              <ChevronRightIcon className="text-gray-400" fontSize="small" />
            </Box>
          ))
        ) : (
          <Typography className="text-sm text-gray-500">
            No brands available
          </Typography>
        )}
      </Box>

      {/* 🔥 RECENT POSTS SECTION */}
      <Box className="  p-5 mt-5 hidden sm:block">

        <Typography className="text-xl poppins font-semibold  mb-4">
          Recent Posts
        </Typography>

        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((blog, i) => (
            <Box
              key={i}
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-50 px-3 rounded-md"
            >
              {/* thumbnail */}
              <img
                src={blog.banner}
                alt={blog.title}
                className="w-12 h-12 rounded-md object-cover"
              />

              {/* text */}
              <Box className="flex flex-col">
                <Typography className="text-sm font-medium poppins line-clamp-1">
                  {blog.title}
                </Typography>

                <Typography className="text-xs text-gray-500 poppins">
                  {blog.created_at}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography className="text-sm text-gray-500">
            No recent posts
          </Typography>
        )}
      </Box>
    </>
  )}

</Box>
    </Box>
  );
};

export default SliderSection;