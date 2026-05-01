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
  const { t, i18n } = useTranslation();
  const { currency, exchangeRate } = useContext(AuthContext);
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <Box
      className="w-full h-fit relative flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ direction: isRTL ? 'rtl' : 'ltr', background: '#fff',  px: { xs: 0, sm: 2, md: 4, lg: 6 } }}
    >
      <ProductsSlider
        products={products}
        onLoadMore={onLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
        sectionType={sectionType}
      />
    </Box>
  );
};

const ProductsSlider = ({ products, onLoadMore, isLoading, hasMore, sectionType }) => {
  const { t, i18n } = useTranslation();
  const { currency, exchangeRate } = useContext(AuthContext);
  const navigate = useNavigate();

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [cartModal, setCartModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const goToPrev = () => { if (swiperInstance) swiperInstance.slidePrev(); };
  const goToNext = () => { if (swiperInstance) swiperInstance.slideNext(); };

  const handleClick = (e, product) => {
    e.stopPropagation();
    setCartModal(true);
    setModalProduct(product);
  };

  return (
    <Box>
      {/* ── Section Header — has side padding ── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 }  }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1.05px solid #e9e9e9',
            mt: 4,
          }}
        >
          {/* Title */}
          {(() => {
            const label =
              sectionType === 'new_arrival'
                ? (t('sale_section.new_arrival') === 'sale_section.new_arrival' ? 'New Arrival' : t('sale_section.new_arrival'))
                : sectionType === 'flash_sale'
                ? (t('sale_section.flash_sale') === 'sale_section.flash_sale' ? 'Flash Sale' : t('sale_section.flash_sale'))
                : (t('sale_section.hot_sale') === 'sale_section.hot_sale' ? 'Hot Sale' : t('sale_section.hot_sale'));
            const words = label.trim().split(' ');
            const first = words[0];
            const rest  = words.slice(1).join(' ');
            return (
              <Typography className="poppins" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, fontWeight: 400 }}>
                {first}{rest ? <> <Box component="span" sx={{ fontWeight: 600, color: '#2858A3' }}>{rest}</Box></> : null}
              </Typography>
            );
          })()}

          {/* Navigation Arrows */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={goToPrev}
              sx={{
                minWidth: 36, width: 36, height: 36,
                backgroundColor: '#fff', color: '#374151', p: 0,
                '&:hover': { backgroundColor: '#f3f4f6', borderColor: '#9ca3af' },
              }}
            >
              {isRTL ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </Button>
            <Button
              onClick={goToNext}
              sx={{
                minWidth: 36, width: 36, height: 36,
                backgroundColor: '#fff', color: '#374151', p: 0,
                '&:hover': { backgroundColor: '#f3f4f6', borderColor: '#9ca3af' },
              }}
            >
              {isRTL ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Swiper wrapper — NO px on mobile + overflow hidden clips next card ── */}
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
       
        }}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex >= products.length - 5 && hasMore && !isLoading && onLoadMore) {
              onLoadMore();
            }
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          dir={isRTL ? 'rtl' : 'ltr'}
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 8 },
            480:  { slidesPerView: 2.2, spaceBetween: 8 },
            768:  { slidesPerView: 3.2, spaceBetween: 8 },
            1024: { slidesPerView: 4.2, spaceBetween: 8 },
            1280: { slidesPerView: 5.2, spaceBetween: 8 },
            1536: { slidesPerView: 6,   spaceBetween: 8 },
          }}
          modules={[Autoplay, Navigation]}
          style={{ direction: isRTL ? 'rtl' : 'ltr', paddingBottom: '8px' }}
          centeredSlides={false}
        >
          {products.map((product, i) => {
            const imageUrl = product?.images?.[0] ? ImageURL + product.images[0] : defaultImage;
            const productName = getName(product, i18n.language) || product?.name || '—';
            const categoryName = product?.category?.name || product?.category || '';
            const rating = Number(product?.rating) || 0;
            const reviewsCount = Number(product?.reviews_count) || 0;
            const price = Number(product?.price) || 0;
            const discountPrice = product?.discount_price ? Number(product.discount_price) : null;
            const finalPrice = discountPrice ?? price;
            const discountPct = discountPrice && price > 0
              ? Math.round(((price - discountPrice) / price) * 100)
              : null;
            const isOutOfStock = product?.stocks === 0;

            return (
              <SwiperSlide key={i} style={{ height: 'auto', alignSelf: 'stretch' }}>
                <ButtonBase
                  onClick={() => navigate('/product/' + product.slug)}
                  sx={{
                    width: '100%', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'stretch', textAlign: 'left',
                    borderRadius: '12px',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative', width: '100%',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'stretch', textAlign: 'left',
                      border: '0.5px solid', borderColor: 'divider',
                      borderRadius: '12px', overflow: 'hidden',
                      background: '#fff', transition: 'box-shadow 0.18s',
                      '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.10)' },
                    }}
                  >
                    {/* Badges */}
                    <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {sectionType === 'hot_sale' && (
                        <Box sx={{
                          background: '#ef4444', color: '#fff',
                          fontSize: '0.65rem', fontWeight: 700,
                          fontFamily: '"Poppins", sans-serif',
                          px: 1.2, py: 0.4, borderRadius: '4px',
                          letterSpacing: '0.04em', textTransform: 'uppercase',
                        }}>🔥 HOT</Box>
                      )}
                      {sectionType === 'new_arrival' && (
                        <Box sx={{
                          background: '#f3f4f6', color: '#374151',
                          fontSize: '0.65rem', fontWeight: 700,
                          fontFamily: '"Poppins", sans-serif',
                          px: 1.2, py: 0.4, borderRadius: '4px',
                          letterSpacing: '0.05em', textTransform: 'uppercase',
                        }}>NEW</Box>
                      )}
                      {discountPct && (
                        <Box sx={{
                          background: '#22c55e', color: '#fff',
                          fontSize: '0.65rem', fontWeight: 700,
                          fontFamily: '"Poppins", sans-serif',
                          px: 1.2, py: 0.4, borderRadius: '4px',
                        }}>-{discountPct}%</Box>
                      )}
                    </Box>

                    {/* Sold Out Badge */}
                    {isOutOfStock && (
                      <Box sx={{
                        position: 'absolute', top: 10, right: 10, zIndex: 10,
                        background: '#ef4444', color: '#fff',
                        fontSize: '0.6rem', fontWeight: 700,
                        fontFamily: '"Poppins", sans-serif',
                        px: 1, py: 0.4, borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}>
                        {t("sale_section.sold_out") || 'Sold Out'}
                      </Box>
                    )}

                    {/* Product Image */}
                    <Box sx={{
                      position: 'relative', width: '100%',
                      height: { xs: 180, sm: 200, md: 220, lg: 260 },
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#ffffff', borderBottom: '1px solid #e9e9e9',
                      p: 2, overflow: 'hidden', boxSizing: 'border-box',
                    }}>
                      <img
                        src={imageUrl}
                        alt={productName}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.src = defaultImage; }}
                      />
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ p: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography className="poppins" sx={{ fontSize: 11, color: 'text.secondary', mb: '2px', minHeight: '1.4em' }}>
                        {categoryName}
                      </Typography>
                      <Typography
                        className="poppins font-semibold"
                        sx={{
                          fontSize: 14, color: '#2858A3', mb: '8px',
                          lineHeight: 1.3, height: `${2 * 1.3 * 14}px`,
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}
                      >
                        {productName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Typography className="poppins" sx={{ fontSize: 14, fontWeight: 600 }}>
                          {currency} {(Math.round(finalPrice * (exchangeRate || 1) * 100) / 100).toFixed(2)}
                        </Typography>
                        <Typography sx={{
                          fontSize: 12,
                          color: discountPrice ? 'text.secondary' : 'transparent',
                          textDecoration: 'line-through', userSelect: 'none',
                        }}>
                          {currency} {(Math.round(price * (exchangeRate || 1) * 100) / 100).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </ButtonBase>
              </SwiperSlide>
            );
          })}

          {isLoading && (
            <SwiperSlide>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 320, color: '#9ca3af' }}>
                <Typography sx={{ fontFamily: '"Poppins", sans-serif', fontSize: '0.85rem' }}>
                  Loading more products...
                </Typography>
              </Box>
            </SwiperSlide>
          )}
        </Swiper>
      </Box>

      {cartModal && (
        <AddToCartModal
          open={cartModal}
          onClose={() => setCartModal(false)}
          product={modalProduct}
        />
      )}
    </Box>
  );
};

export default SaleSection;