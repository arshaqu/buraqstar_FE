import React, { useEffect, useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next"; // Import i18next
import { useNavigate } from "react-router-dom";
import { BRANDS } from "../../constants";
// import ajaxService from "../../services/ajax-service";

const BrandBanner = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const navigate = useNavigate();

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  const [brands, setBrands] = useState([]);

  const loadBrands = async () => {
    // const { success, data } = await ajaxService.get('/all-brands');
    // if (success) {
    //   setBrands(data);
    // }
  };

  // Banner images for web and mobile
  const webBanners = [
    require("../../assets/banner/web/drive-download-20250924T124736Z-1-001/1629x218pixel-01.jpg"),
    require("../../assets/banner/web/drive-download-20250924T124736Z-1-001/1629x218pixel-02.jpg"),
    require("../../assets/banner/web/drive-download-20250924T124736Z-1-001/1629x218pixel-03.jpg"),
    require("../../assets/banner/web/drive-download-20250924T124736Z-1-001/1629x218pixel-04.jpg"),
  ];


  const mobileBanners = [
    require("../../assets/banner/mob/1080x320pixel_mobile-01.jpg"),
    require("../../assets/banner/mob/1080x320pixel_mobile-02.jpg"),
    require("../../assets/banner/mob/1080x320pixel_mobile-03.jpg"),
    require("../../assets/banner/mob/1080x320pixel_mobile-04.jpg"),
  ];

  const brandRoutes = ['/brand/novex', '/brand/cavil', '/brand/buraq', '/brand/zilco'];

  const banners = [
    {
      id: brands.find((i) => i.name === BRANDS.BURAQ)?.id ?? 0,
      webBanner: webBanners[0],
      mobileBanner: mobileBanners[0],
      route: brandRoutes[0],
    },
    {
      id: brands.find((i) => i.name === BRANDS.CAVIL)?.id ?? 0,
      webBanner: webBanners[1],
      mobileBanner: mobileBanners[1],
      route: brandRoutes[1],
    },
    {
      id: brands.find((i) => i.name === BRANDS.NOVEX)?.id ?? 0,
      webBanner: webBanners[2],
      mobileBanner: mobileBanners[2],
      route: brandRoutes[2],
    },
    {
      id: brands.find((i) => i.name === BRANDS.ZILCO)?.id ?? 0,
      webBanner: webBanners[3],
      mobileBanner: mobileBanners[3],
      route: brandRoutes[3],
    },
  ];

  useEffect(() => {
    loadBrands();
  }, []);

  return (
    <Box className="w-full px-5 md:px-[4%] lg:px-[8%] pt-12 mt-0 -mb-14 sm:pt-0 sm:mt-20 md:-mb-2 lg:mb-14 brand-banner-container">
      <style>{`
        @media (min-width: 412px) and (max-width: 440px) {
          .brand-banner-container {
            padding-bottom: 20px !important;
          }
        }
      `}</style>
      <Swiper
        className={`brand-banner-swiper brand-banner-mobile ${isRTL ? 'rtl' : ''}`}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          "--swiper-pagination-color": "#2858a3",
          "--swiper-pagination-bullet-inactive-color": "transparent",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          direction: isRTL ? 'rtl' : 'ltr',
          height: 'auto',
          minHeight: '200px'
        }}
      >
        {banners.map((val, i) => (
          <SwiperSlide key={i} style={{ height: 'auto' }}>
            <ButtonBase
              onClick={() => navigate(val.route)}
              className="w-full rounded-lg relative overflow-hidden block"
              sx={{
                aspectRatio: { xs: '1080/320', sm: '1629/218' },
                width: '100%',
                display: 'block'
              }}
            >
              {/* Mobile Banner - Shows on mobile, hidden on desktop */}
              <img
                src={val.mobileBanner}
                alt="Brand Banner"
                className="w-full h-full object-contain object-center sm:hidden"
              />
              {/* Web Banner - Hidden on mobile, shows on desktop */}
              <img
                src={val.webBanner}
                alt="Brand Banner"
                className="w-full h-full object-contain object-center hidden sm:block"
              />

              {/* Content Overlay */}
              {/* <Box className="relative z-10 flex items-center justify-center w-full h-full">
                <Typography className="poppins text-lg sm:text-2xl lg:text-3xl text-center px-4 font-semibold text-white drop-shadow-lg">
                  {t("brand_banner.avail_supreme_deals")}
                </Typography>
              </Box> */}
            </ButtonBase>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BrandBanner;

