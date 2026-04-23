import React, { useState, useContext, useRef } from "react";
import { Box, Button, ButtonBase, Grid, Rating, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import fire from "../../assets/fire.svg";
import salebackground from "../../assets/salebackground.jpg";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { ImageURL } from "../../constants";
import AddToCartModal from "../Cart/AddToCartModal";
import defaultImage from "../../assets/contactsvg.svg";
import { AuthContext } from "../../AuthContext";
import { getName } from "../../utils";

const SaleSection = ({ products, onLoadMore, isLoading, hasMore, sectionType = 'hot_sale' }) => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const { currency, exchangeRate } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Add these state and ref
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Add these navigation functions
  const goToPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <Box
      className="w-full h-fit relative flex flex-col items-center"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* <Box className="h-56 sm:h-48 w-full bg-transparent" />
      <Box
        className="absolute top-16 w-[85%] h-fit sm:h-56 rounded-2xl bg-no-repeat bg-center bg-cover"
        sx={{ backgroundImage: `url(${salebackground})` }}
        
      >
        <Box className="sale-gradient rounded-2xl h-full  w-full px-5 sm:px-10 py-6">
          <Grid container className="h-full">
            <Grid item md={4} sm={5} xs={12} className="flex flex-col h-full justify-between py-4">
              <Box className="text-center md:text-left">
                <Typography className="text-3xl text-white font-semibold poppins">
                  {t("sale_section.flash_sale")}
                </Typography>
                <Typography className="text-[10px] text-white poppins pt-4 w-full">
                  {t("sale_section.flash_sale_desc")}
                </Typography>
              </Box>
              <Typography className="text-3xl text-white font-semibold poppins text-center md:text-left">
                05 : 42 : 19 : 54
              </Typography>
            </Grid>
            <Grid item md={8} sm={7} xs={12} className="ps-0 sm:ps-8 pt-4 sm:pt-0">
              <Link to='/deals'><Slider flashProducts={flashProducts} /></Link>
            </Grid>
          </Grid>
        </Box>
      </Box> */}
      <Box className="h-fit text-white w-full bg-[#2858a3] pt-2 sm:pt-2 pb-1 px-2 sm:p-1 relative">
        <ProductsSlider 
          products={products} 
          onLoadMore={onLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
          sectionType={sectionType}
        />
      </Box>
    </Box>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#b4c5df",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: "linear-gradient(96.23deg, #1B54AD 12.98%, #02ADEC 86.27%)",
  },
}));

const Slider = ({ flashProducts }) => {
  const { t, i18n } = useTranslation();

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <Swiper
      modules={[Pagination]}
      className={`h-full w-full sale-slider relative ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {flashProducts.map((product, index) => (
        <SwiperSlide key={index}>
          <Box className="w-full h-28 bg-white rounded-lg p-4 flex">
            <img src={product?.images?.[0] ? ImageURL + product.images[0] : defaultImage} className="w-[30%] h-[110%]" alt="image not found" />
            <Box className="flex justify-between flex-col ps-2">
              <Typography className="text-black poppins text-xs font-semibold uppercase w-3/4">
                {product.name}
              </Typography>
              <Typography className="text-[#A7A7A7] poppins text-[10px] w-1/2">
                {t("sale_section.stock_left", { count: product.stocks })}
              </Typography>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
      <Box className="absolute bottom-3 right-0 ">
        <Link to="/deals" className="cursor-pointer">
          <Typography className="text-white border-b-[1.5px] border-white text-[10px] poppins font-semibold cursor-pointer">
            {t("sale_section.view_more")}
          </Typography>
        </Link>
      </Box>
    </Swiper>
  );
};

const ProductsSlider = ({ products, onLoadMore, isLoading, hasMore, sectionType }) => {
  const { t, i18n } = useTranslation();
  const { currency, exchangeRate } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Add these state and ref INSIDE ProductsSlider
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Add these navigation functions INSIDE ProductsSlider
  const goToPrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const [cartModal, setCartModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const handleClick = (e, product) => {
    e.stopPropagation();
    setCartModal(true);
    setModalProduct(product);
  }

  // Handle navigation click to load more products
  const handleNavigationClick = (direction) => {
    if (hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }

  return (
    <>
      {/* Remove this entire title badge section */}
      {/* <div className={`absolute bg-[#FF3030] p-3 sm:p-4 h-12 sm:h-14 md:h-auto w-fit font-semibold rounded-full poppins text-white text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-2 z-20 ${isRTL
        ? 'top-16 sm:top-20 right-1/2 sm:right-6 transform translate-x-1/2 sm:translate-x-0'
        : 'top-16 sm:top-20 left-1/2 sm:left-6 transform -translate-x-1/2 sm:translate-x-0'
        }`}>
        <img src={fire} alt="fire" className="h-5 sm:h-6 md:h-7 w-auto" />
        <span className="whitespace-nowrap">
          {sectionType === 'new_arrival' ? t('sale_section.new_arrival') : 
           sectionType === 'flash_sale' ? t('sale_section.flash_sale') : 
           t('sale_section.hot_sale')}
        </span>
      </div> */}

      <Swiper
        onSwiper={setSwiperInstance} // This captures the Swiper instance
        onSlideChange={(swiper) => {
          // Load more when reaching near the end
          if (swiper.activeIndex >= products.length - 5 && hasMore && !isLoading && onLoadMore) {
            onLoadMore();
          }
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
        className={`h-[50vh] sm:h-[55vh] w-full popularSlider drop-pagination relative px-4 ${isRTL ? 'rtl' : ''}`}
        style={{
          "--swiper-pagination-color": "#2858a3",
          "--swiper-pagination-bullet-inactive-color": "transparent",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i} className="">
            <ButtonBase onClick={() => navigate('/product/' + product.slug)} key={i} className="w-full h-full group">
              <Box className="h-[45vh] sm:h-[50vh] w-full relative bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 rounded-3xl flex flex-col items-center p-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 hover:border-[#2858a3]/30 overflow-hidden">

                {/* Background Glow Effect */}
                <Box className="absolute inset-0 bg-gradient-to-br from-[#2858a3]/5 via-transparent to-[#FF3030]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></Box>

                {/* Stock Status Badge */}
                {product.stocks === 0 && (
                  <Box className="absolute top-3 right-3 px-3 py-1.5 text-xs poppins font-bold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full z-20 shadow-lg animate-pulse">
                    {t("sale_section.sold_out")}
                  </Box>
                )}

                {/* Discount Badge */}
                {product.discount_price && (
                  <Box className="absolute top-3 left-3 px-3 py-1.5 text-xs poppins font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full z-20 shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                    <span className="drop-shadow-sm">
                      {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                    </span>
                  </Box>
                )}

                {/* New/Hot Badge */}
                {!product.discount_price && Math.random() > 0.7 && (
                  <Box className="absolute top-3 left-3 px-3 py-1.5 text-xs poppins font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full z-20 shadow-lg">
                    🔥 HOT
                  </Box>
                )}

                {/* Product Image Container */}
                <Box className="h-[58%] w-full flex items-center justify-center p-3 mb-3 relative">
                  {/* Image Background Glow */}
                  <Box className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></Box>

                <img
                  src={product?.images?.[0] ? ImageURL + product.images[0] : defaultImage}
                  alt={product.name}
                    className="max-h-full max-w-full object-contain rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                  />

                  {/* Floating Elements */}
                  <Box className="absolute top-2 right-2 w-3 h-3 bg-[#2858a3]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200"></Box>
                  <Box className="absolute bottom-2 left-2 w-2 h-2 bg-[#FF3030]/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300"></Box>
                </Box>

                {/* Product Details */}
                <Box className="h-[37%] w-full flex flex-col justify-between items-center text-center relative z-10">

                  {/* Product Name */}
                  <Typography
                    className="text-sm sm:text-base font-bold text-gray-800 poppins leading-tight px-2 line-clamp-2 group-hover:text-[#2858a3] transition-colors duration-300"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: '2.5rem'
                    }}
                  >
                    {getName(product, i18n.language)}
                  </Typography>

                  {/* Middle Section - Stock Info */}
                  <Box className="flex flex-col items-center space-y-2">
                    {product.stocks > 0 && product.stocks <= 10 && (
                      <Box className="flex items-center justify-center space-x-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                        <Box className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></Box>
                        <Typography className="text-xs text-orange-600 poppins font-semibold">
                          {t('sale_section.low_stock_warning', { count: product.stocks })}
                    </Typography>
                      </Box>
                    )}

                    {/* Rating with Stars Animation */}
                    {product.rating && (
                      <Box className="flex items-center justify-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <Rating
                          value={product.rating}
                          readOnly
                          size="small"
                          precision={0.5}
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#fbbf24',
                              filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.3))'
                            }
                          }}
                        />
                        <Typography className="text-xs text-amber-700 poppins font-medium">
                          ({product.reviews_count || 0})
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Bottom Section - Price */}
                  <Box className="flex flex-col items-center w-full px-4">
                    {/* Price Section with Enhanced Design */}
                    <Box className="flex flex-col items-center space-y-1 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 sm:px-4 py-2 rounded-xl sm:rounded-2xl border border-blue-100 w-full">
                      <Typography className="text-sm sm:text-lg md:text-xl font-black text-[#2858a3] poppins drop-shadow-sm text-center">
                        {currency} {Math.round((product.discount_price ?? product.price) * exchangeRate * 100) / 100}
                      </Typography>

                      {product.discount_price && (
                        <Box className="flex flex-col items-center space-y-1">
                          <Typography className="text-xs text-gray-500 line-through poppins text-center">
                            {currency} {Math.round(product.price * exchangeRate * 100) / 100}
                          </Typography>
                          <Typography className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold poppins text-center">
                            Save {currency} {Math.round((product.price - product.discount_price) * exchangeRate * 100) / 100}
                  </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                </Box>

              </Box>
            </ButtonBase>
          </SwiperSlide>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <SwiperSlide className="mt-20 flex items-center justify-center">
            <Typography className="text-center">Loading more products...</Typography>
          </SwiperSlide>
        )}
      </Swiper>
      
      {/* Navigation Buttons */}
      <Box className="flex justify-center items-center gap-4 mt-0">
        <Button
          onClick={goToPrev}
          sx={{
            minWidth: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#2858a3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1e4691',
            },
            transition: 'background-color 0.2s ease',
            boxShadow: '0 4px 12px rgba(40, 88, 163, 0.3)',
          }}
        >
          {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
        
        <Button
          onClick={goToNext}
          sx={{
            minWidth: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#2858a3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1e4691',
            },
            transition: 'background-color 0.2s ease',
            boxShadow: '0 4px 12px rgba(40, 88, 163, 0.3)',
          }}
        >
          {isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
      </Box>
    </>
  );
};

export default SaleSection;