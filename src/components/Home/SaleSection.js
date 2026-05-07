import React, { useState, useContext } from "react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { ImageURL } from "../../constants";
import AddToCartModal from "../Cart/AddToCartModal";
import defaultImage from "../../assets/contactsvg.svg";
import { AuthContext } from "../../AuthContext";
import { getName } from "../../utils";
import { AddToCart, AddToWishlist } from "../index";

const SaleSection = ({ products, onLoadMore, isLoading, hasMore, sectionType = "hot_sale" }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  return (
    <Box
      className="w-full h-fit relative flex flex-col"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ direction: isRTL ? "rtl" : "ltr", background: "#fff" }}
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

  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  const goToPrev = () => { if (swiperInstance) swiperInstance.slidePrev(); };
  const goToNext = () => { if (swiperInstance) swiperInstance.slideNext(); };

  return (
    <Box>
      {/* ── Section Header ── */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1.05px solid #e9e9e9",
            mt: 4,
          }}
        >
          {(() => {
            const label =
              sectionType === "new_arrival"
                ? t("sale_section.new_arrival") === "sale_section.new_arrival" ? "New Arrival" : t("sale_section.new_arrival")
                : sectionType === "flash_sale"
                ? t("sale_section.flash_sale") === "sale_section.flash_sale" ? "Flash Sale" : t("sale_section.flash_sale")
                : t("sale_section.hot_sale") === "sale_section.hot_sale" ? "Hot Sale" : t("sale_section.hot_sale");
            const words = label.trim().split(" ");
            const first = words[0];
            const rest = words.slice(1).join(" ");
            return (
              <Typography className="poppins" sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, fontWeight: 400 }}>
                {first}
                {rest ? (
                  <>
                    {" "}
                    <Box component="span" sx={{ fontWeight: 600, color: "#2858A3" }}>
                      {rest}
                    </Box>
                  </>
                ) : null}
              </Typography>
            );
          })()}

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={goToPrev}
              sx={{
                minWidth: 36, width: 36, height: 36,
                backgroundColor: "#fff", color: "#374151", p: 0,
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              {isRTL ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </Button>
            <Button
              onClick={goToNext}
              sx={{
                minWidth: 36, width: 36, height: 36,
                backgroundColor: "#fff", color: "#374151", p: 0,
                "&:hover": { backgroundColor: "#f3f4f6" },
              }}
            >
              {isRTL ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Swiper ── */}
      <Box className="mt-6" sx={{ px: { xs: 1, sm: 3, md: 4 }, overflow: "hidden" }}>
        <Swiper
          autoHeight={true}
            style={{
    height: "auto",
    paddingBottom: "0px",
  }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            if (swiper.activeIndex >= products.length - 5 && hasMore && !isLoading && onLoadMore) {
              onLoadMore();
            }
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          dir={isRTL ? "rtl" : "ltr"}
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 8 },
            480:  { slidesPerView: 2.2, spaceBetween: 8 },
            768:  { slidesPerView: 3.2, spaceBetween: 8 },
            1024: { slidesPerView: 4.2, spaceBetween: 8 },
            1280: { slidesPerView: 5.2, spaceBetween: 8 },
            1536: { slidesPerView: 6,   spaceBetween: 8 },
          }}
          modules={[Autoplay, Navigation]}
          style={{ direction: isRTL ? "rtl" : "ltr", paddingBottom: "8px" }}
          centeredSlides={false}
        >
          {products.map((product, i) => {
            
            const imageUrl = product?.images?.[0] ? ImageURL + product.images[0] : defaultImage;
            const productName = getName(product, i18n.language) || product?.name || "—";
            const item_code = product?.item_code?.name || product?.item_code || "";
            const price = Number(product?.price) || 0;
            const discountPrice = product?.discount_price ? Number(product.discount_price) : null;
            const finalPrice = discountPrice ?? price;
            const discountPct =
              discountPrice && price > 0
                ? Math.round(((price - discountPrice) / price) * 100)
                : null;
            const isOutOfStock = product?.stocks === 0;

            const cartProduct = {
              id: product.id,
              name: product.name,
              name_ar: product.name_ar || product.name,
              name_ur: product.name_ur || product.name,
              slug: product.slug,
              item_code: product.item_code || product.code,
              price: product.price,
              discount_price: product.discount_price || null,
              stocks: product.stocks ?? 1,
              tax: product.tax || 0,
              images: product.images || [],
            };

            return (
              <SwiperSlide
                key={i}
                style={{
                  height: "auto",        // ✅ let card define its own height
                  
                  display: "flex",       // ✅ so inner Box fills the slide
                }}
              >
                <Box
                  className="group"
                  sx={{
                       position: "relative",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "0.5px solid",
                        borderColor: "divider",
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: "#fff",
                    transition: "box-shadow 0.18s",
                    cursor: "pointer",
                    "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.10)" },
                    "&:hover .sale-cart-overlay": { opacity: 1, transform: "translateY(0)" },
                    "&:hover .sale-wishlist-overlay": { opacity: 1, transform: "translateX(0)" },
                  }}
                  onClick={() => navigate("/product/" + product.slug)}
                >
                  {/* Badges */}
                  <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 10, display: "flex", flexDirection: "column", gap: "4px" }}>
                    {sectionType === "hot_sale" && (
                      <Box sx={{ background: "#ef4444", color: "#fff", fontSize: "0.65rem", fontWeight: 700, fontFamily: '"Poppins", sans-serif', px: 1.2, py: 0.4, borderRadius: "4px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        🔥 HOT
                      </Box>
                    )}
                    {sectionType === "new_arrival" && (
                      <Box sx={{ background: "#f3f4f6", color: "#374151", fontSize: "0.65rem", fontWeight: 700, fontFamily: '"Poppins", sans-serif', px: 1.2, py: 0.4, borderRadius: "4px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        NEW
                      </Box>
                    )}
                    {discountPct && (
                      <Box sx={{ background: "#22c55e", color: "#fff", fontSize: "0.65rem", fontWeight: 700, fontFamily: '"Poppins", sans-serif', px: 1.2, py: 0.4, borderRadius: "4px" }}>
                        -{discountPct}%
                      </Box>
                    )}
                  </Box>

                  {/* Sold Out Badge */}
                  {isOutOfStock && (
                    <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10, background: "#ef4444", color: "#fff", fontSize: "0.6rem", fontWeight: 700, fontFamily: '"Poppins", sans-serif', px: 1, py: 0.4, borderRadius: "4px", textTransform: "uppercase" }}>
                      {t("sale_section.sold_out") || "Sold Out"}
                    </Box>
                  )}

                  {/* ── Image Area ── */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      // ✅ aspect-ratio instead of fixed height — no dead space on any screen
                      aspectRatio: "1 / 1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                      borderBottom: "1px solid #e9e9e9",
                      p: { xs: 1.5, sm: 2 },   // ✅ tighter padding on mobile
                      overflow: "hidden",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={productName}
                      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      onError={(e) => { e.currentTarget.src = defaultImage; }}
                    />

                    {/* Add to Cart Overlay */}
                    <Box
                      className="sale-cart-overlay"
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        transform: "translateY(16px)",
                        opacity: 0,
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        zIndex: 10,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AddToCart
                        product={cartProduct}
                        quantity={1}
                        className="poppins text-sm w-48 h-10 flex items-center justify-center bg-[#1E55AC] text-white rounded-full font-semibold shadow-md hover:bg-[#02AFF3] transition-all duration-200"
                      />
                    </Box>

                    {/* Wishlist Overlay */}
                    <Box
                      className="sale-wishlist-overlay"
                      sx={{
                        position: "absolute",
                        top: 8, right: 8,
                        display: "flex", flexDirection: "column",
                        alignItems: "flex-end", gap: "4px",
                        opacity: 0,
                        transform: "translateX(16px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        zIndex: 10,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Box className="bg-white rounded-full shadow">
                        <AddToWishlist
                          product={cartProduct}
                          products={[]}
                          setProducts={() => {}}
                          viaCategory={true}
                          open={false}
                          setOpen={() => {}}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* ── Product Info ── */}
                 <Box
                    sx={{
                      p: "12px 14px 14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                      <Typography className="poppins" sx={{ fontSize: 12, color: "text.secondary", mb: "4px" }}>
                      {item_code}
                    </Typography>
            
                    <Typography
                      className="poppins font-semibold"
                      sx={{
                        fontSize: 14, color: "#2858A3", mb: "8px",
                        lineHeight: 1.3,
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}
                    >
                      {productName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", mt: "auto" }}>
                      <Typography className="poppins" sx={{ fontSize: 14, fontWeight: 600 }}>
                        {currency} {(Math.round(finalPrice * (exchangeRate || 1) * 100) / 100).toFixed(2)}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: discountPrice ? "text.secondary" : "transparent",
                          textDecoration: "line-through", userSelect: "none",
                        }}
                      >
                        {currency} {(Math.round(price * (exchangeRate || 1) * 100) / 100).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}

          {isLoading && (
            <SwiperSlide>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 320, color: "#9ca3af" }}>
                <Typography sx={{ fontFamily: '"Poppins", sans-serif', fontSize: "0.85rem" }}>
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

          