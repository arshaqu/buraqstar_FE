import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ajaxService from "../../services/ajax-service";

const HomeSlider = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [sliderContent, setSliderContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSliderContent = async () => {
    try {
      setIsLoading(true);
      const { success, data } = await ajaxService.get('/get-settings?main_banner=true');
      if (success && Array.isArray(data)) {
        setSliderContent(data);
      }
    } catch (error) {
      console.error('Error fetching slider content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderContent();
  }, [i18n.language]); // Add language as dependency

  if (isLoading || !sliderContent.length) {
    return null; // or a loading spinner
  }

  return (
    <Swiper
      spaceBetween={isMobile ? 10 : 30}
      effect="fade"
      pagination={{ clickable: true }}
      centeredSlides={true}
      autoplay={{ delay: isMobile ? 3000 : 2500, disableOnInteraction: false }}
      modules={[Autoplay, EffectFade, Pagination]}
      className={`slider ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      autoHeight
      style={{
        "--swiper-pagination-color": "#ffffff",
        "--swiper-pagination-bullet-inactive-color": "transparent",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": isMobile ? "12px" : "16px",
        "--swiper-pagination-bullet-horizontal-gap": isMobile ? "4px" : "6px",
        direction: isRTL ? 'rtl' : 'ltr'
      }}
      key={i18n.language} // Add this to force re-render on language change
    >
      {sliderContent.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="relative overflow-hidden"
        >
          <Box className="relative w-full flex justify-center items-center">
            {!isMobile && (
              <Box
                component="img"
                src={slide.image}
                alt={slide.title[i18n.language]}
                className="w-full h-auto object-contain"
                style={{ maxHeight: isTablet ? 360 : 700 }}
              />
            )}
            {isMobile && (
              <Box
                component="img"
                src={slide.image_mobile}
                alt={slide.title[i18n.language]}
                className="w-full h-auto block"
              />
            )}
            <Box
              className={`absolute inset-0 flex flex-col justify-center items-center text-white w-full h-full ${
                isMobile ? "px-3" : "gap-y-4"
              }`}
            >
            <Typography className={`${isMobile ? 'text-xs' : 'text-lg'} font-semibold poppins uppercase text-center leading-tight`}>
              {slide.title[i18n.language]}
            </Typography>
            <Typography className={`${isMobile ? 'text-base sm:text-xl' : 'text-2xl sm:text-5xl'} ${isMobile ? 'w-full ' : 'w-full sm:w-[60%]'} text-center font-semibold poppins uppercase leading-tight`}>
              {slide.description[i18n.language]}
            </Typography>
            {slide.button_text && slide.button_text[i18n.language] && slide.button_text[i18n.language].trim() !== '' && (
              <Button 
                onClick={() => navigate(slide.link)} 
                className={`text-white rounded-lg bg-[#FF3030] uppercase poppinsacha ${isMobile ? 'py-1.5 px-3 text-xs min-h-[36px] mt-1' : 'py-2.5 px-5 text-xs'} ${isMobile ? '' : 'ms-2'}`}
              >
                {slide.button_text[i18n.language]}
              </Button>
            )}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(HomeSlider);
