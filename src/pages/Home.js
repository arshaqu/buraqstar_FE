import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ajaxService from "../services/ajax-service";
import { BRANDS, CATEGORIES } from "../constants";
import { Notification } from "../components/AddToWishlist";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import {
  HomeSlider,
  CategorySlider,
  Qualities,
  BrandBanner,
  PopularSlider,
  BrandsBanner,
  MobilePopularSlider,
  SaleSection,
  Popular,
  // OffersBanner,  // <-- Comment this line
  SEOInstagram
} from "../components";

import SkeletonHomeSlider from "../components/Home/skeleton/SkeletonHomeSlider";
import SkeletonCategorySlider from "../components/Home/skeleton/SkeletonCategorySlider";
import SkeletonBrandBanner from "../components/Home/skeleton/SkeletonBrandBanner";
import SkeletonPopularSlider from "../components/Home/skeleton/SkeletonPopularSlider";
import SkeletonBrandsBanner from "../components/Home/skeleton/SkeletonBrandsBanner";
import SkeletonSaleSection from "../components/Home/skeleton/SkeletonSaleSection";
import SkeletonPopular from "../components/Home/skeleton/SkeletonPopular";
import SkeletonOffersBanner from "../components/Home/skeleton/SkeletonOffersBanner";
import SkeletonSEOInstagram from "../components/Home/skeleton/SkeletonSEOInstagram";
import useScrollAnimation from "../hooks/ScrollAnimation";
import { Height } from "@mui/icons-material";



const Home = () => {
  const { t } = useTranslation();
  const [wishlistNotify, setWishlistNotify] = useState(false)

  const [flashProducts, setFlashProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [novexProducts, setNovexProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add these new state variables for hot sale pagination
  const [hotSaleOffset, setHotSaleOffset] = useState(0);
  const [hotSaleLoading, setHotSaleLoading] = useState(false);
  const [hasMoreHotProducts, setHasMoreHotProducts] = useState(true);

  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [newArrivalOffset, setNewArrivalOffset] = useState(0);
  const [flashSaleOffset, setFlashSaleOffset] = useState(0);
  const [newArrivalLoading, setNewArrivalLoading] = useState(false);
  const [flashSaleLoading, setFlashSaleLoading] = useState(false);
  const [hasMoreNewArrival, setHasMoreNewArrival] = useState(true);
  const [hasMoreFlashSale, setHasMoreFlashSale] = useState(true);

  const [homeSliderRef, homeSliderClass] = useScrollAnimation(
    "opacity-0 translate-y-10",
    "opacity-100 translate-y-0 transition duration-700 ease-in-out",
    !loading
  );

  const [categorySliderRef, categorySliderClass] = useScrollAnimation(
    "opacity-0 translate-x-10",
    "opacity-100 translate-x-0 transition duration-700 ease-in-out",
    !loading
  );

  const [qualitiesRef, qualitiesClass] = useScrollAnimation(
    "opacity-0 scale-75",
    "opacity-100 scale-100 transition duration-700 ease-in-out",
    !loading
  );

  const [brandBannerRef, brandBannerClass] = useScrollAnimation(
    "opacity-0 -translate-x-10",
    "opacity-100 translate-x-0 transition duration-700 ease-in-out",
    !loading
  );

  const [popularSliderRef, popularSliderClass] = useScrollAnimation(
    "opacity-0 translate-y-10",
    "opacity-100 translate-y-0 transition duration-700 ease-in-out",
    !loading
  );

  const [mobilePopularSliderRef, mobilePopularSliderClass] = useScrollAnimation(
    "opacity-0 translate-x-10",
    "opacity-100 translate-x-0 transition duration-700 ease-in-out",
    !loading
  );

  const [brandsBannerRef, brandsBannerClass] = useScrollAnimation(
    "opacity-0 scale-75",
    "opacity-100 scale-100 transition duration-700 ease-in-out",
    !loading
  );

  const [saleSectionRef, saleSectionClass] = useScrollAnimation(
    "opacity-0 translate-y-10",
    "opacity-100 translate-y-0 transition duration-700 ease-in-out",
    !loading
  );

  const [popularRef, popularClass] = useScrollAnimation(
    "opacity-0 translate-x-10",
    "opacity-100 translate-x-0 transition duration-700 ease-in-out",
    !loading
  );

  const [offersBannerRef, offersBannerClass] = useScrollAnimation(
    "opacity-0 -translate-y-10",
    "opacity-100 translate-y-0 transition duration-700 ease-in-out",
    !loading
  );

  const [seoInstagramRef, seoInstagramClass] = useScrollAnimation(
    "opacity-0 scale-75",
    "opacity-100 scale-100 transition duration-700 ease-in-out",
    !loading,
    // dynamic threshold value for seo instagram
    0.1
  );

  


  const loadBrands = async () => {
    const { success, data } = await ajaxService.get('/all-brands');
    if (success) {
      setBrands(data)
    }
  }

  const loadCategories = async () => {
    const response = await ajaxService.get('/all-categories');
    if (response.success) {
      setCategories([{ id: 0, name: 'View All Items' }, ...response.data])
    }
  }

  const loadProducts = async () => {
    const user = localStorage.getItem('user') ?? null;
    
    // Load all products for flash and novex (keep existing logic)
    const allProductsResponse = await ajaxService.get(`/category/products?category_id=0&type=${CATEGORIES.ALL}${localStorage.getItem('token') && user ? "&user_id=" + JSON.parse(user).id : ''}`);
    
    if (allProductsResponse.success) {
      setFlashProducts(allProductsResponse.data.filter(i => i.flash));
      setNovexProducts(allProductsResponse.data.filter(i => i.brand === BRANDS.NOVEX));
    }
    
    // Load initial hot-selling products
    await loadHotProducts(0);
  }

  // Simplified loadHotProducts function
  const loadHotProducts = async (offset = 0, append = false) => {
    if (hotSaleLoading) return;
    
    setHotSaleLoading(true);
    
    const user = localStorage.getItem('user') ?? null;
    
    const hotSellingParams = new URLSearchParams({
      category_id: 0,
      type: 'all',
      offset: offset,
      brand_id: 0,
      new_arrival: false,
      product_type: 'hot-selling'
    });
    
    if (localStorage.getItem('token') && user) {
      hotSellingParams.append('user_id', JSON.parse(user).id);
    }
    
    try {
      const hotSellingResponse = await ajaxService.get(`/category/products?${hotSellingParams.toString()}`);
      
      if (hotSellingResponse && hotSellingResponse.data) {
        if (append) {
          setHotProducts(prev => {
            const newProducts = [...prev, ...hotSellingResponse.data];
            return newProducts;
          });
        } else {
          setHotProducts(hotSellingResponse.data);
        }
        
        const hasMore = hotSellingResponse.data.length === 15;
        setHasMoreHotProducts(hasMore);
        setHotSaleOffset(offset + 15);
      }
    } catch (error) {
      console.error('Error loading hot products:', error);
    } finally {
      setHotSaleLoading(false);
    }
  }

  // Load New Arrival Products
  const loadNewArrivalProducts = async (offset = 0, append = false) => {
    if (newArrivalLoading) return;
    
    setNewArrivalLoading(true);
    
    const user = localStorage.getItem('user') ?? null;
    
    const newArrivalParams = new URLSearchParams({
      category_id: 0,
      type: 'all',
      offset: offset,
      brand_id: 0,
      new_arrival: false,
      product_type: 'new-arrival'
    });
    
    if (localStorage.getItem('token') && user) {
      newArrivalParams.append('user_id', JSON.parse(user).id);
    }
    
    try {
      const newArrivalResponse = await ajaxService.get(`/category/products?${newArrivalParams.toString()}`);
      
      if (newArrivalResponse && newArrivalResponse.data) {
        if (append) {
          setNewArrivalProducts(prev => {
            const newProducts = [...prev, ...newArrivalResponse.data];
            return newProducts;
          });
        } else {
          setNewArrivalProducts(newArrivalResponse.data);
        }
        
        const hasMore = newArrivalResponse.data.length === 15;
        setHasMoreNewArrival(hasMore);
        setNewArrivalOffset(offset + 15);
      }
    } catch (error) {
      console.error('Error loading new arrival products:', error);
    } finally {
      setNewArrivalLoading(false);
    }
  }

  // Load Flash Sale Products
  const loadFlashSaleProducts = async (offset = 0, append = false) => {
    if (flashSaleLoading) return;
    
    setFlashSaleLoading(true);
    
    const user = localStorage.getItem('user') ?? null;
    
    const flashSaleParams = new URLSearchParams({
      category_id: 0,
      type: 'all',
      offset: offset,
      brand_id: 0,
      new_arrival: false,
      product_type: 'flash-sale'
    });
    
    if (localStorage.getItem('token') && user) {
      flashSaleParams.append('user_id', JSON.parse(user).id);
    }
    
    try {
      const flashSaleResponse = await ajaxService.get(`/category/products?${flashSaleParams.toString()}`);
      
      if (flashSaleResponse && flashSaleResponse.data) {
        if (append) {
          setFlashSaleProducts(prev => {
            const newProducts = [...prev, ...flashSaleResponse.data];
            return newProducts;
          });
        } else {
          setFlashSaleProducts(flashSaleResponse.data);
        }
        
        const hasMore = flashSaleResponse.data.length === 15;
        setHasMoreFlashSale(hasMore);
        setFlashSaleOffset(offset + 15);
      }
    } catch (error) {
      console.error('Error loading flash sale products:', error);
    } finally {
      setFlashSaleLoading(false);
    }
  }

  // Function to load more hot products (called by navigation)
  const loadMoreHotProducts = () => {
    if (hasMoreHotProducts && !hotSaleLoading) {
      loadHotProducts(hotSaleOffset, true);
    }
  }

  // Function to load more new arrival products
  const loadMoreNewArrivalProducts = () => {
    if (hasMoreNewArrival && !newArrivalLoading) {
      loadNewArrivalProducts(newArrivalOffset, true);
    }
  }

  // Function to load more flash sale products
  const loadMoreFlashSaleProducts = () => {
    if (hasMoreFlashSale && !flashSaleLoading) {
      loadFlashSaleProducts(flashSaleOffset, true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([loadCategories(), loadProducts(), loadBrands()]);
      loadNewArrivalProducts();
      loadFlashSaleProducts();
      setLoading(false); // Set loading to false once all data is loaded
    };

    fetchData();
  }, [])

  return (
    <>
      <SEO
        title="Quality Building, Electrical & Sanitary Supplies | Buraq | Novex  | Cavil | Zilco"
        description="UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO."
        keywords="electrical products, hardware products, electrical solutions, hardware solutions, Buraq, electrical equipment, hardware equipment, electrical supplies, hardware supplies, electrical tools, hardware tools"
        url="/"
        canonical="/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Buraq",
            "url": SITE_URL,
            "logo": `${SITE_URL}/buraqlogo.svg`,
            "description": "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AE"
            },
            "sameAs": [
              "https://www.facebook.com/buraqstartrading",
              "https://www.instagram.com/buraqstar/?next=%2F&hl=en",
              "https://www.youtube.com/channel/UC7jBbp5U9O2PPa99zjGDXtA",
              "https://www.linkedin.com/company/buraq-star-trading-co-llc",
              "https://x.com/BuraqstarUAE",
              "https://www.pinterest.com/buraqstartrading/",
              "https://www.tiktok.com/@buraq.star?lang=en"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Buraq",
            "url": SITE_URL,
            "description": "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      <Box className="w-full h-auto m-0 p-0">

        {loading ? <SkeletonHomeSlider /> : <div ref={homeSliderRef} className={homeSliderClass}><HomeSlider /> </div>}
         

        {loading ? <SkeletonBrandsBanner /> : (
          <div ref={brandsBannerRef} className={brandsBannerClass}>
            <div className="text-center mb-16 sm:mb-12 mt-16 sm:mt-12">
              <h2 className="text-3xl font-bold text-[#000000] poppins">
                {t("navigation.shop_by_brands", "Shop By Brands")}
              </h2>
            </div>
            <BrandsBanner brands={brands} />
          </div>
        )}

        {loading ? <SkeletonCategorySlider /> : (
          <div ref={categorySliderRef} className={categorySliderClass}>
            <div className="text-center mb-4 sm:mb-12 mt-8 sm:mt-12">
              <h2 className="text-3xl font-bold text-[#000000] poppins">
                {t("navigation.shop_by_category", "Shop by Category")}
              </h2>
            </div>
            <CategorySlider categories={categories} />
          </div>
        )}

        {loading ? <SkeletonPopularSlider /> : (
          <div ref={popularSliderRef} className={popularSliderClass}>
            <PopularSlider
              novexProducts={novexProducts}
              setNovexProducts={setNovexProducts}
              wishlistNotify={wishlistNotify}
              setWishlistNotify={setWishlistNotify}
            />
            {/* <div ref={mobilePopularSliderRef} className={mobilePopularSliderClass}>
              <MobilePopularSlider />
            </div> */}
          </div>
        )}


        {/* Flash Sale Section */}
        {loading ? <SkeletonSaleSection /> : (
          <div ref={saleSectionRef} className={saleSectionClass}>
            <div className="text-center mb-10 mt-0 sm:-mt-20 md:-mt-32 lg:-mt-44 xl:-mt-24">
              <h2 className="text-3xl font-bold text-[#000000] poppins flex items-center justify-center gap-3">
                ⚡ {t("navigation.flash_sale", "Flash Sale")}
              </h2>
            </div>
            <SaleSection
              products={flashSaleProducts}
              onLoadMore={loadMoreFlashSaleProducts}
              isLoading={flashSaleLoading}
              hasMore={hasMoreFlashSale}
              sectionType="flash_sale"
            />
          </div>
        )}

        {/* New Arrival Section */}
        <div className="mt-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#000000] poppins flex items-center justify-center gap-3">
              ✨ {t("navigation.new_arrival", "New Arrival")}
            </h2>
          </div>
          <SaleSection
            products={newArrivalProducts}
            onLoadMore={loadMoreNewArrivalProducts}
            isLoading={newArrivalLoading}
            hasMore={hasMoreNewArrival}
            sectionType="new_arrival"
          />
        </div>

        {/* Hot Selling Section */}
        <div className="mt-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#000000] poppins flex items-center justify-center gap-3">
              🔥 {t("navigation.hot_selling", "Hot Selling")}
            </h2>
          </div>
          <SaleSection
            products={hotProducts}
            onLoadMore={loadMoreHotProducts}
            isLoading={hotSaleLoading}
            hasMore={hasMoreHotProducts}
            sectionType="hot_sale"
          />
        </div>
        
        {loading ? <SkeletonBrandBanner /> : <div ref={brandBannerRef} className={brandBannerClass}><BrandBanner /></div>}

        {loading ? <SkeletonPopular /> : <div ref={popularRef} className={popularClass}><Popular />     </div>}

        {/* {loading ? <SkeletonOffersBanner /> :<div ref={offersBannerRef} className={offersBannerClass}> <OffersBanner />   </div>} */}

        {loading ? <SkeletonSEOInstagram /> : <div ref={seoInstagramRef}  className={seoInstagramClass}> <SEOInstagram/></div>}

        <div ref={qualitiesRef} className={qualitiesClass}>
          <Qualities />
        </div>

      </Box>

      <Notification open={wishlistNotify} setOpen={setWishlistNotify} />
    </>
  );
};

export default Home;
