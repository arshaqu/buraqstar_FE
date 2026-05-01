import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import { Box, ButtonBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BRANDS, ImageURL } from "../../constants";
import { createSlug } from "../../utils";
import ajaxService from "../../services/ajax-service";
import { AuthContext } from "../../AuthContext";
import defaultImage from "../../assets/contactsvg.svg";

// ─── Constants ────────────────────────────────────────────────────────────────
const BRAND_TABS = [
  { name: BRANDS.NOVEX, label: "NOVEX" },
  { name: BRANDS.CAVIL, label: "CAVIL" },
  { name: BRANDS.BURAQ, label: "BURAQ" },
  { name: BRANDS.ZILCO, label: "ZILCO" },
];

const PRODUCTS_PER_PAGE = 20;
const GAP = 8;

// ─── Hook: visible count by breakpoint ───────────────────────────────────────
const useVisibleCount = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  if (isXs) return 1;
  if (isSm) return 2;
  if (isMd) return 3;
  return 6;
};

// ─── BadgeChip ────────────────────────────────────────────────────────────────
const BadgeChip = ({ type, text }) => {
  const styles = {
    sale: { background: "#22c55e", color: "#fff" },
    new:  { background: "#fff", color: "#111", border: "0.5px solid #ddd" },
    hot:  { background: "#ef4444", color: "#fff" },
  };
  if (!type || !styles[type]) return null;
  return (
    <Box
      sx={{
        position: "absolute", top: 10, left: 10, zIndex: 2,
        fontSize: 11, fontWeight: 600, px: "8px", py: "3px",
        borderRadius: "4px", lineHeight: 1.4, ...styles[type],
      }}
    >
      {text}
    </Box>
  );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, onClick, cardWidth }) => {
  const { currency, exchangeRate } = useContext(AuthContext);

  const getBadge = () => {
    if (product.hot)                 return { type: "hot",  text: "HOT" };
    if (product.discount_percentage) return { type: "sale", text: `-${product.discount_percentage}%` };
    return null;
  };

  const badge           = getBadge();
  const rawPrice        = parseFloat(product.price || 0);
  const rawDiscountPrice = parseFloat(product.discount_price || 0);
  const hasDiscount     = product.discount_price && rawDiscountPrice !== rawPrice;
  const displayPrice    = Math.round(rawPrice        * exchangeRate * 100) / 100;
  const displayDiscount = Math.round(rawDiscountPrice * exchangeRate * 100) / 100;

  // Same image logic as SaleSection
  const imgSrc = product?.images?.[0] ? ImageURL + product.images[0] : defaultImage;

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        flex: `0 0 ${cardWidth}px`,
        width: `${cardWidth}px`,
        minWidth: 0,
        display: "flex", flexDirection: "column", alignItems: "stretch",
        textAlign: "left", border: "0.5px solid", borderColor: "divider",
        borderRadius: "12px", overflow: "hidden", background: "#fff",
        transition: "box-shadow 0.18s",
        "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.10)" },
      }}
    >
      <Box
        sx={{
          position: "relative", width: "100%",
          height: { xs: 180, sm: 200, md: 220, lg: 260 },
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#ffffff", borderBottom: "1px solid #e9e9e9",
          p: 2, overflow: "hidden", boxSizing: "border-box",
        }}
      >
        {badge && <BadgeChip type={badge.type} text={badge.text} />}
        <img
          src={imgSrc}
          alt={product.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          onError={(e) => { e.target.src = defaultImage; }}
        />
      </Box>

      <Box sx={{ p: "12px 14px 14px", flex: 1 }}>
        <Typography className="poppins" sx={{ fontSize: 11, color: "text.secondary", mb: "2px" }}>
          {product.category_name || product.category}
        </Typography>
        <Typography
          className="poppins font-semibold"
          sx={{
            fontSize: 14, color: "#2858A3", mb: "8px", lineHeight: 1.3,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <Typography className="poppins " sx={{ fontSize: 14, fontWeight: 600 }}>
            {currency} {displayPrice.toFixed(2)}
          </Typography>
          {hasDiscount && (
            <Typography sx={{ fontSize: 12, color: "text.secondary", textDecoration: "line-through" }}>
              {currency} {displayDiscount.toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </ButtonBase>
  );
};

// ─── ArrowButton ──────────────────────────────────────────────────────────────
const ArrowButton = ({ direction, onClick, disabled }) => (
  <ButtonBase
    onClick={onClick}
    disabled={disabled}
    sx={{
      position: "absolute", top: "50%", transform: "translateY(-50%)",
      [direction === "left" ? "left" : "right"]: { xs: -12, md: -17 },
      width: { xs: 28, md: 34 }, height: { xs: 28, md: 34 },
      borderRadius: "50%", background: "#fff", border: "0.5px solid",
      borderColor: "divider", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      opacity: disabled ? 0.3 : 1, transition: "opacity 0.15s, box-shadow 0.15s",
      "&:hover:not(:disabled)": { boxShadow: "0 4px 12px rgba(0,0,0,0.13)" },
    }}
  >
    {direction === "left"
      ? <ChevronLeftIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
      : <ChevronRightIcon sx={{ fontSize: { xs: 16, md: 20 } }} />}
  </ButtonBase>
);

// ─── SkeletonCard ─────────────────────────────────────────────────────────────
const SkeletonCard = ({ cardWidth }) => (
  <Box
    sx={{
      flex: `0 0 ${cardWidth}px`, width: `${cardWidth}px`,
      border: "0.5px solid", borderColor: "divider",
      borderRadius: "12px", overflow: "hidden",
    }}
  >
    <Box sx={{ height: { xs: 180, sm: 200, md: 220, lg: 260 }, background: "#f0f0ee" }} />
    <Box sx={{ p: "12px 14px 14px" }}>
      <Box sx={{ height: 10, background: "#f0f0ee", borderRadius: 1, mb: 1, width: "60%" }} />
      <Box sx={{ height: 10, background: "#f0f0ee", borderRadius: 1, mb: 1, width: "80%" }} />
      <Box sx={{ height: 12, background: "#f0f0ee", borderRadius: 1, mb: 1 }} />
      <Box sx={{ height: 12, background: "#f0f0ee", borderRadius: 1, width: "50%" }} />
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ShopByBrand = ({ brands = [] }) => {
  const navigate     = useNavigate();
  const visibleCount = useVisibleCount();
  const viewportRef  = useRef(null);

  const [activeBrand, setActiveBrand]         = useState(BRAND_TABS[0].name);
  const [productsByBrand, setProductsByBrand] = useState({});
  const [loadingBrand, setLoadingBrand]       = useState(null);
  const [offset, setOffset]                   = useState(0);
  const [viewportWidth, setViewportWidth]     = useState(0);
  const [isPaused, setIsPaused]               = useState(false); // ← pause flag

  // Measure viewport width
  useEffect(() => {
    if (!viewportRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const cardWidth = viewportWidth
    ? Math.floor((viewportWidth - GAP * (visibleCount - 1)) / visibleCount)
    : 0;
  const stepPx    = cardWidth + GAP;

  const fetchBrandProducts = useCallback(
    async (brandName) => {
      const brandObj = brands.find((b) => b.name === brandName);
      if (!brandObj) return;
      setLoadingBrand(brandName);
      try {
        const user  = localStorage.getItem("user") ?? null;
        const token = localStorage.getItem("token");
        const params = new URLSearchParams({
          category_id: 0, type: "all", offset: 0,
          limit: PRODUCTS_PER_PAGE, brand_id: brandObj.id, new_arrival: false,
        });
        if (token && user) params.append("user_id", JSON.parse(user).id);
        const response = await ajaxService.get(`/category/products?${params.toString()}`);
        setProductsByBrand((prev) => ({ ...prev, [brandName]: response?.data || [] }));
      } catch (err) {
        console.error("ShopByBrand fetch error:", err);
      } finally {
        setLoadingBrand(null);
      }
    },
    [brands]
  );

  useEffect(() => {
    if (!brands.length) return;
    BRAND_TABS.forEach(({ name }) => fetchBrandProducts(name));
  }, [brands, fetchBrandProducts]);

  useEffect(() => { setOffset(0); }, [visibleCount, activeBrand]);

  // Auto-slider — stops when isPaused is true
  useEffect(() => {
    const products = productsByBrand[activeBrand] || [];
    if (!products.length || isPaused) return; // ← check isPaused here

    const interval = setInterval(() => {
      setOffset((prev) => {
        const next = prev + 1;
        return next + visibleCount > products.length ? 0 : next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeBrand, productsByBrand, visibleCount, isPaused]); // ← isPaused in deps

  const handleTabClick = (brandName) => {
    setActiveBrand(brandName);
    setOffset(0);
    if (!productsByBrand[brandName]) fetchBrandProducts(brandName);
  };

  const handleViewAll = () => {
    const brandObj = brands.find((b) => b.name === activeBrand);
    if (brandObj) navigate(`/brand/${brandObj.slug || createSlug(brandObj.name)}`);
  };

  const currentProducts = productsByBrand[activeBrand] || [];
  const isLoading       = loadingBrand === activeBrand;
  const canPrev         = offset > 0;
  const canNext         = offset + visibleCount < currentProducts.length;
  const translateX      = -(offset * stepPx);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          background: "#eaeaea",
          p: { xs: "20px 16px", sm: "28px 24px", md: "44px" },
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Tabs row */}
      <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    borderBottom: "1.5px solid",
    borderColor: "divider",
    mb: "20px",
    gap: { xs: 1, sm: 0 },
  }}
>
  {/* TOP ROW (Mobile) / LEFT (Desktop) */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: { xs: "space-between", sm: "flex-start" },
      width: { xs: "100%", sm: "auto" },
    }}
  >
    <Typography
      className="poppins"
      sx={{
        fontSize: { xs: 16, sm: 18, md: 20 },
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      Shop by{" "}
      <Box component="span" sx={{ fontWeight: 600, color: "#2858A3" }}>
        Brand
      </Box>
    </Typography>

    {/* View All (mobile only here) */}
    <ButtonBase
      onClick={handleViewAll}
      sx={{
        display: { xs: "block", sm: "none" },
        fontSize: 12,
        color: "#2858A3",
        px: 1,
        py: 0.5,
        "&:hover": { textDecoration: "underline" },
      }}
    >
      View all
    </ButtonBase>
  </Box>

  {/* CENTER TABS */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: { xs: "flex-start", sm: "center" },
      overflowX: { xs: "auto", sm: "visible" },
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },
      gap: { xs: 1, sm: 0 },
    }}
  >
    {BRAND_TABS.map(({ name, label }) => (
      <ButtonBase
        key={name}
        onClick={() => handleTabClick(name)}
        sx={{
          px: { xs: "12px", md: "24px" },
          py: "8px",
          fontSize: { xs: 12, md: 14 },
          fontWeight: activeBrand === name ? 600 : 400,
          color: activeBrand === name ? "#2858A3" : "text.secondary",
          borderBottom: "2px solid",
          borderColor:
            activeBrand === name ? "#2858A3" : "transparent",
          mb: "-1.5px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {label}
      </ButtonBase>
    ))}
  </Box>

  {/* RIGHT (desktop only) */}
  <ButtonBase
    onClick={handleViewAll}
    sx={{
      display: { xs: "none", sm: "block" },
      fontSize: { sm: 13, md: 14 },
      color: "#2858A3",
      px: 1,
      py: 0.5,
      whiteSpace: "nowrap",
      "&:hover": { textDecoration: "underline" },
    }}
  >
    View all
  </ButtonBase>
</Box>

        {/* Carousel */}
        <Box sx={{ position: "relative", px: { xs: "16px", md: "0px" } }}>
          <ArrowButton
            direction="left"
            onClick={() => setOffset((o) => Math.max(0, o - 1))}
            disabled={!canPrev || isLoading}
          />

          {/* Clipping viewport — mouse enter/leave controls isPaused */}
          <Box
            ref={viewportRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            sx={{ overflow: "hidden", width: "100%", py: "10px" }}
          >
            {/* Sliding track */}
            <Box
              sx={{
                display: "flex",
                gap: `${GAP}px`,
                transform: `translateX(${translateX}px)`,
                transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                willChange: "transform",
              }}
            >
              {isLoading || !cardWidth
                ? Array.from({ length: visibleCount }).map((_, i) => (
                    <SkeletonCard key={i} cardWidth={cardWidth || 200} />
                  ))
                : currentProducts.length > 0
                ? currentProducts.map((product, i) => (
                    <ProductCard
                      key={product.id || i}
                      product={product}
                      cardWidth={cardWidth}
                      onClick={() =>
                        navigate(`/product/${product.slug || createSlug(product.name)}`)
                      }
                    />
                  ))
                : Array.from({ length: visibleCount }).map((_, i) => (
                    <SkeletonCard key={i} cardWidth={cardWidth || 200} />
                  ))}
            </Box>
          </Box>

          <ArrowButton
            direction="right"
            onClick={() => setOffset((o) => o + 1)}
            disabled={!canNext || isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopByBrand;