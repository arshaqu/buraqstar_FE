import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ajaxService from "../services/ajax-service";
import { BRANDS, CATEGORIES } from "../constants";
import { Notification } from "../components/AddToWishlist";
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
  OffersBanner,
  SEOInstagram
} from "../components";

const Home = () => {

  const [wishlistNotify, setWishlistNotify] = useState(false)

  const [flashProducts, setFlashProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [novexProducts, setNovexProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

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
    const response = await ajaxService.get(`/category/products?category_id=0&type=${CATEGORIES.ALL}${localStorage.getItem('token') && user ? "&user_id=" + JSON.parse(user).id : ''}`);
    const { success, data } = response;
    if (success) {
      setFlashProducts(data.filter(i => i.flash));
      setNovexProducts(data.filter(i => i.brand === BRANDS.NOVEX));
      setHotProducts(data.filter(i => i.hot))
    }
  }

  useEffect(() => {
    loadCategories()
    loadProducts();
    loadBrands();
  }, [])

  return (
    <>
      <Box className="w-full h-auto m-0 p-0">
        <HomeSlider />
        <CategorySlider categories={categories} />
        <Qualities />
        <BrandBanner />
        <PopularSlider novexProducts={novexProducts} setNovexProducts={setNovexProducts} wishlistNotify={wishlistNotify} setWishlistNotify={setWishlistNotify} />
        <MobilePopularSlider />
        <BrandsBanner brands={brands} />
        <SaleSection hotProducts={hotProducts} flashProducts={flashProducts} />
        <Popular />
        <OffersBanner />
        <SEOInstagram />
      </Box>

      <Notification open={wishlistNotify} setOpen={setWishlistNotify} />
    </>
  );
};

export default Home;
