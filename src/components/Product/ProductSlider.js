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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ProductSlider({ images }) {
  const { t, i18n } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [zoomModal, setZoomModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const mainSwiperRef = useRef(null);
  const zoomImageRef = useRef(null);
  const displayImages = images?.slice(0, 16) || [];
  
const THUMB_VISIBLE = 5;

const visibleThumbnails = displayImages.slice(
  thumbStartIndex,
  thumbStartIndex + THUMB_VISIBLE
);

const handleThumbNext = () => {
  if (thumbStartIndex + THUMB_VISIBLE < displayImages.length) {
    setThumbStartIndex(prev => prev + 1);
  }
};

const handleThumbPrev = () => {
  if (thumbStartIndex > 0) {
    setThumbStartIndex(prev => prev - 1);
  }
};

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Limit images to 5 maximum (1 main + 4 thumbnails)

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
  {/* Product Image Slider - Responsive Layout */}
<div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start w-full p-10">

  {/* Main Image */}
  <div className="relative w-full md:flex-1 aspect-square bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center ">

    <img
      src={displayImages[currentImageIndex]}
      alt={`Product image ${currentImageIndex + 1}`}
      className="max-w-[100%] max-h-[100%] object-contain transition-opacity duration-300 cursor-pointer"
      onClick={() => handleImageClick(currentImageIndex)}
    />

    {/* Counter */}
    <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
      {currentImageIndex + 1} / {displayImages.length}
    </div>

    {/* Prev / Next */}
    {displayImages.length > 1 && (
      <>
        <button
          onClick={() =>
            setCurrentImageIndex(i =>
              (i - 1 + displayImages.length) % displayImages.length
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110"
        >
          <ChevronLeftIcon className="text-[#2858a3]" fontSize="small" />
        </button>

        <button
          onClick={() =>
            setCurrentImageIndex(i =>
              (i + 1) % displayImages.length
            )
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110"
        >
          <ChevronRightIcon className="text-[#2858a3]" fontSize="small" />
        </button>
      </>
    )}
  </div>

  {/* Thumbnails Section */}
  {displayImages.length > 1 && (
    <div className="
      flex flex-row md:flex-col
      gap-2 md:gap-3
      w-full md:w-24
      overflow-x-auto md:overflow-visible
      flex-shrink-0
    ">

      {/* UP button (desktop only) */}
      {/* <button
        onClick={handleThumbPrev}
        disabled={thumbStartIndex === 0}
        className="hidden md:flex w-8 h-8 rounded-full bg-white shadow border items-center justify-center disabled:opacity-30"
      >
       <ExpandLessIcon />
      </button> */}

      {/* Thumbnails */}
      <div className="
        flex md:flex-col
        gap-2 md:gap-3
        w-full
      ">
        {visibleThumbnails.map((image, i) => {
          const realIndex = thumbStartIndex + i;

          return (
            <div
              key={realIndex}
              onClick={() => setCurrentImageIndex(realIndex)}
              className={`min-w-[100px] md:w-full aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200
                ${realIndex === currentImageIndex
                  ? 'border-[#2858a3] opacity-100'
                  : 'border-gray-200 opacity-80 hover:opacity-50 hover:border-[#2858a3]/50'
                }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${realIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* DOWN button (desktop only) */}
      {/* <button
        onClick={handleThumbNext}
        disabled={thumbStartIndex + THUMB_VISIBLE >= displayImages.length}
        className="hidden md:flex w-8 h-8 rounded-full bg-white shadow border items-center justify-center disabled:opacity-30"
      >
        <ExpandMoreIcon />
      </button> */}

    </div>
  )}
</div>

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
