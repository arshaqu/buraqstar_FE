import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxService from "../services/ajax-service";
import { ImageURL, SITE_URL } from "../constants";
import { ProductSlider, Content, Description, Popular, BrandBanner, AlternativeProducts } from "../components";
import ProductViewSkeleton from "../components/Product/Skeleton";
import { useTranslation } from "react-i18next";
import { getDescription } from "../utils";
import SEO from "../components/SEO";
import defaultImage from "../assets/contactsvg.svg";
import { Notification } from "../components/AddToWishlist";

const Product = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [wishlistNotify, setWishlistNotify] = useState(false);
  const { t, i18n } = useTranslation(); // Hook for translations

  // Function to strip HTML tags and decode HTML entities
  const stripHtml = (html) => {
    if (!html) return '';
    // Create a temporary div element
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    // Get text content (automatically strips HTML tags and decodes entities)
    return tmp.textContent || tmp.innerText || '';
  };

  const loadData = async (slug) => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      let url = `/product/single-product/${slug}`;
      
      // If user is authenticated, append user_id parameter to check wishlist status
      if (token && user) {
        const userData = JSON.parse(user);
        url += `?user_id=${userData.id}`;
      }
      
      const response = await ajaxService.get(url);
      if (response.success) {
        setProduct(response.data);
        // Use placeholder image if no images are available
        const productImages = response.data.images && response.data.images.length > 0
          ? response.data.images.map((i) => ImageURL + i)
          : [defaultImage];
        setImages(productImages);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading product data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(slug);
  }, [slug]);

  return (
    <Box className="w-full h-auto bg-white m-0 p-0">
      {!loading && product && Object.keys(product).length > 0 && (
        <SEO
          title={`${product.name} - ${product.brand} | Buraq`}
          description={product.description ? stripHtml(product.description).substring(0, 160) + "..." : `Buy ${product.name} from ${product.brand} at Buraq. Premium quality electrical and hardware products with competitive prices and fast delivery.`}
          keywords={`${product.name}, ${product.brand}, electrical products, hardware products, ${product.category?.name || 'electrical'}, buy online, Buraq`}
          image={product.images && product.images.length > 0 ? ImageURL + product.images[0] : `${SITE_URL}/buraq-banner1.png`}
          url={`/product/${slug}`}
          canonical={`/product/${slug}`}
          type="product"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description ? stripHtml(product.description) : `Premium ${product.name} from ${product.brand}`,
            "image": product.images ? product.images.map(img => ImageURL + img) : [],
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "category": product.category?.name || "Electrical Products",
            "offers": {
              "@type": "Offer",
              "price": product.price || "0",
              "priceCurrency": "USD",
              "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "Buraq"
              }
            },
            "sku": product.sku || product.id,
            "mpn": product.sku || product.id
          }}
        />
      )}
      {loading ? (
        <ProductViewSkeleton />
      ) : (
        <Grid container className="pt-16 px-5 sm:p-16 sm:pb-0">
          <Grid
            item
            sm={4}
            xs={12}
            className="animate-fadeInLeft "
            sx={{
              animationDuration: "0.6s", // Faster
              animationDelay: "0.2s",
              animationFillMode: "forwards",
            }}
          >
            <ProductSlider images={images} />
          </Grid>
          <Grid
            item
            sm={7}
            xs={12}
            className="pt-6 sm:pt-0 animate-fadeInLeft"
            sx={{
              animationDuration: "0.8s", // Medium speed
              animationDelay: "0.4s",
              animationFillMode: "forwards",
            }}
          >
            <Box className="sticky top-5">
              <Content 
                product={product} 
                setProduct={setProduct}
                t={t} 
                wishlistNotify={wishlistNotify}
                setWishlistNotify={setWishlistNotify}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            className="animate-fadeInLeft"
            sx={{
              animationDuration: "1s", // Slower
              animationDelay: "0.6s",
              animationFillMode: "forwards",
            }}
          >
            <Description
              description={getDescription(product, i18n.language)}
              specifications={product?.specifications}
              brand={product?.brand}
              datasheet={product?.datasheet}
              t={t}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className="animate-fadeInLeft"
            sx={{
              animationDuration: "1.2s", // Slowest
              animationDelay: "0.8s",
              animationFillMode: "forwards",
            }}
          >
            <Divider className="bg-black mt-16" />
          </Grid>
        </Grid>
      )}

      {/* Alternative Products Section */}
      {!loading && product.alternative_products && product.alternative_products.data && product.alternative_products.data.length > 0 && (
        <Grid
          item
          xs={12}
          className="animate-fadeInLeft"
          sx={{
            animationDuration: "1s",
            animationDelay: "1s",
            animationFillMode: "forwards",
          }}
        >
          <AlternativeProducts alternativeProducts={product.alternative_products.data} />
        </Grid>
      )}

      <Grid
        item
        xs={12}
        className="animate-fadeInLeft"
        sx={{
          animationDuration: "1s", // Slower for this section
          animationDelay: "1.2s",
          animationFillMode: "forwards",
        }}
      >
        <Popular />
      </Grid>

      <Grid
        item
        xs={12}
        className="animate-fadeInLeft"
        sx={{
          animationDuration: "1.2s", // Slowest for this section
          animationDelay: "1.2s",
          animationFillMode: "forwards",
        }}
      >
        <Box className="-mt-3 sm:-mt-4">
          <BrandBanner />
        </Box>
      </Grid>

      {/* Wishlist Notification - Top Right */}
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Notification open={wishlistNotify} setOpen={setWishlistNotify} />
      </Box>
    </Box>
  );
};

export default Product;
