import React, { useEffect, useState, useRef } from "react";
import { Grid, Box, IconButton, Modal, Typography, Backdrop } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ProductSlider({ images }) {
  const { t, i18n } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoomModal, setZoomModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const mainSwiperRef = useRef(null);
  const zoomImageRef = useRef(null);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Limit images to 5 maximum (1 main + 4 thumbnails)
  const displayImages = images?.slice(0, 16) || [];

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [images]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setZoomModal(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleNextImage = () => {
    if (displayImages && displayImages.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handlePrevImage = () => {
    if (displayImages && displayImages.length > 1) {
      setCurrentImageIndex(prev => (prev - 1 + displayImages.length) % displayImages.length);
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleSlideChange = (swiper) => {
    setCurrentImageIndex(swiper.activeIndex);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#2858a3] border-t-transparent rounded-full animate-spin"></div>
          <Typography className="text-gray-600 poppins">{t('product_slider.loading_images')}</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full space-y-1 mb-0">
      {/* Main Image Slider */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl overflow-hidden  border border-gray-100/50">
        <Swiper
          ref={mainSwiperRef}
          modules={[Navigation, Thumbs, EffectFade]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          onSlideChange={handleSlideChange}
          className={`w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] ${isRTL ? 'rtl' : ''}`}
          style={{
            direction: isRTL ? 'rtl' : 'ltr'
          }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {displayImages.map((image, i) => (
            <SwiperSlide
              key={i}
              className="w-full flex items-center justify-center cursor-pointer group relative"
              onClick={() => handleImageClick(i)}
            >
              <img
                src={image}
                alt={`Product image ${i + 1}`}
                className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/90 backdrop-blur-sm text-[#2858a3] px-4 py-2 rounded-full font-semibold poppins text-sm flex items-center gap-2 shadow-[0_8px_32px_-8px_rgba(40,88,163,0.3)]">
                    <FullscreenIcon fontSize="small" />
                    {t('product_slider.click_to_zoom')}
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm poppins">
                {i + 1} / {displayImages.length}
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          {displayImages.length > 1 && (
            <>
              <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white/95 rounded-full flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_32px_-8px_rgba(40,88,163,0.25)] group">
                  <ChevronLeftIcon className="text-[#2858a3] text-xl group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-md hover:bg-white/95 rounded-full flex items-center justify-center shadow-[0_8px_24px_-6px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_32px_-8px_rgba(40,88,163,0.25)] group">
                  <ChevronRightIcon className="text-[#2858a3] text-xl group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </>
          )}
        </Swiper>
      </div>

      {/* Thumbnail Slider - Horizontal Scrollable */}
      {displayImages.length > 1 && (
        <div className="px-2 relative mt-1 mb-0 pb-0 h-16">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs]}
            spaceBetween={12}
            slidesPerView="auto"
            watchSlidesProgress
            freeMode={true}
            grabCursor={true}
            navigation={{
              nextEl: '.thumb-button-next',
              prevEl: '.thumb-button-prev',
            }}
            className={`thumbnail-swiper ${isRTL ? 'rtl' : ''} !mb-0 !pb-0`}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            dir={isRTL ? 'rtl' : 'ltr'}
            breakpoints={{
              0: {
                slidesPerView: 3.5,
                spaceBetween: 8
              },
              640: {
                slidesPerView: 4.5,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 12
              }
            }}
          >
            {displayImages.map((image, i) => (
              <SwiperSlide key={i} className="!w-auto cursor-pointer">
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 border-2 ${i === currentImageIndex
                    ? 'border-[#2858a3] shadow-[0_8px_24px_-4px_rgba(40,88,163,0.4)]'
                    : 'border-gray-200/80 hover:border-[#2858a3]/50 hover:shadow-[0_4px_16px_-2px_rgba(40,88,163,0.2)]'
                    }`}
                  onClick={() => {
                    mainSwiperRef.current?.swiper?.slideTo(i);
                    setCurrentImageIndex(i);
                  }}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {i === currentImageIndex && (
                    <div className="absolute inset-0 bg-[#2858a3] bg-opacity-20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#2858a3] rounded-full"></div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Navigation Arrows */}
          {displayImages.length > 4 && (
            <>
              <div className="thumb-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_-4px_rgba(40,88,163,0.3)]">
                  <ChevronLeftIcon className="text-[#2858a3] text-sm" />
                </div>
              </div>
              <div className="thumb-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_16px_-4px_rgba(40,88,163,0.3)]">
                  <ChevronRightIcon className="text-[#2858a3] text-sm" />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Zoom Modal */}
      <Modal
        open={zoomModal}
        onClose={() => setZoomModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
        }}
      >
        <div className="flex items-center justify-center h-full w-full p-4">
          <Box
            className="relative w-full h-full flex items-center justify-center max-w-7xl max-h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Close Button */}
            <IconButton
              onClick={() => setZoomModal(false)}
              className="absolute top-4 right-4 text-white z-30 hover:scale-110 transition-transform"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
              <IconButton
                onClick={handleZoomIn}
                className="text-white hover:scale-110 transition-transform"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                }}
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                onClick={handleZoomOut}
                className="text-white hover:scale-110 transition-transform"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                }}
              >
                <ZoomOutIcon />
              </IconButton>
              <IconButton
                onClick={resetZoom}
                className="text-white hover:scale-110 transition-transform"
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </div>

            {/* Image Navigation */}
            {displayImages.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-30 hover:scale-110 transition-transform"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                  }}
                >
                  <NavigateBeforeIcon fontSize="large" />
                </IconButton>
                <IconButton
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-30 hover:scale-110 transition-transform"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                  }}
                >
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
              </>
            )}

            {/* Zoomed Image */}
            <img
              ref={zoomImageRef}
              src={displayImages[currentImageIndex]}
              alt={`Product image ${currentImageIndex + 1}`}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ${zoomLevel > 1 ? 'cursor-move' : 'cursor-zoom-in'
                }`}
              style={{
                transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease'
              }}
              onClick={zoomLevel === 1 ? handleZoomIn : undefined}
            />

            {/* Bottom Info Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
              {/* Image Counter */}
              {displayImages.length > 1 && (
                <div className="text-white bg-black bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Typography variant="body2" className="poppins font-medium">
                    {currentImageIndex + 1} of {displayImages.length}
                  </Typography>
                </div>
              )}

              {/* Zoom Level */}
              <div className="text-white bg-black bg-opacity-70 backdrop-blur-sm px-4 py-2 rounded-full">
                <Typography variant="body2" className="poppins font-medium">
                  {Math.round(zoomLevel * 100)}%
                </Typography>
              </div>
            </div>
          </Box>
        </div>
      </Modal>

      <style jsx>{`
        .thumbnail-swiper .swiper-slide {
          width: auto !important;
        }
        .thumbnail-swiper {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        .thumbnail-swiper::-webkit-scrollbar {
          display: none;
        }
        .thumbnail-swiper .swiper-wrapper {
          transition-timing-function: ease-out;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
      `}</style>
    </div>
  );
}
