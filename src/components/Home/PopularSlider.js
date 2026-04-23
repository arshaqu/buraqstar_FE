import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, ButtonBase, Grid, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import bg from "../../assets/sliderbg.jpg";
import { ImageURL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { AddToWishlist } from "../AddToWishlist";
import defaultImage from "../../assets/contactsvg.svg";
// import { novexProducts } from "../../data";

export default function PopularSlider({ novexProducts, setNovexProducts, wishlistNotify, setWishlistNotify }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <Swiper
      className={`h-auto w-full popularSlider relative mb-10 hidden sm:block ${isRTL ? 'rtl' : ''}`}
      modules={[Pagination, Autoplay, Navigation]}
      navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        "--swiper-pagination-color": "#2858a3",
        "--swiper-pagination-bullet-inactive-color": "transparent",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "16px",
        "--swiper-pagination-bullet-horizontal-gap": "6px",
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      {/* Next Prev Buttons */}
      <div className="absolute top-10  right-20">
        <div className="swiper-button-prev -left-10">
          <ChevronLeftIcon className="text-sm text-[#5D5D5D]" />
        </div>
        <div className="swiper-button-next -right-10">
          <ChevronRightIcon className="text-sm text-[#5D5D5D]" />
        </div>
      </div>

      {/* Novex slide 1 */}
      {novexProducts.reduce((acc, curr, i) => {
        if (i === 0) {
          acc.push(novexProducts.slice(i, i + 6)); // Push first 6 products to the first slide
        } else if ((i - 6) % 8 === 0) {
          acc.push(novexProducts.slice(i, i + 8)); // Push 8 products to subsequent slides
        }
        return acc;
      }, []).map((productsChunk, index) => (
        <SwiperSlide key={index} className="pt-16 pb-8 px-5 md:px-[4%] lg:px-[8%]">
          <Grid container>
            {index === 0 && (
              <Grid item xs={12} sm={6} className="pe-4 pb-8">
                <Box
                  className="h-[55vh] w-full rounded-2xl bg-cover bg-no-repeat bg-center p-12"
                  sx={{ backgroundImage: `url(${bg})` }}
                >
                  <Typography className="text-3xl text-white poppins font-semibold w-3/4">
                    Popular Novex Products
                  </Typography>
                  <Button className="text-white rounded-md bg-[#FF3030] uppercase poppins py-2.5 px-5 mt-5 cursor-pointer text-[10px]">
                    View New Products
                  </Button>
                </Box>
              </Grid>
            )}

            {productsChunk?.map((product, i) => (
              <Grid item xs={12} sm={3} className="pe-4 pb-8" key={i}>
                <ButtonBase onClick={() => navigate('/product/' + product.id)}>
                  <Box className="h-[55vh] w-[42vh] relative bg-white border rounded-2xl flex flex-col items-center py-5 novex-products">

                    <Box className="absolute top-2.5 px-2.5 flex w-full h-fit justify-between">
                      {product.hot ? (
                        <Box className="bg-[#FF0F0F] px-2 py-1 uppercase poppins text-white text-xs h-[24px]">
                          Hot
                        </Box>
                      ) : (
                        <div />
                      )}
                      {/* <FavoriteBorderIcon className="text-[#FF0F0F] text-lg cursor-pointer" /> */}
                      <AddToWishlist
                        product={product}
                        products={novexProducts}
                        setProducts={setNovexProducts}
                        open={wishlistNotify}
                        setOpen={setWishlistNotify}
                      />
                    </Box>

                    <img
                      src={product?.images?.[0] ? ImageURL + product.images[0] : defaultImage}
                      alt={product.name}
                      className="h-1/2 w-auto"
                    />
                    <Box className="h-1/2 w-full flex flex-col justify-between p-2.5 pt-2.5 sm:pt-2.5 lg:pt-8">
                      <Typography className="text-sm sm:text-lg lg:text-lg  text-center w-full px-1 poppins">
                        {product.name}
                      </Typography>
                      <Box>
                        <Box className="flex justify-between px-2 md:px-2 lg:px-5 items-center w-full pb-3">
                          {product.discount_price &&
                            <Typography className="text-lg sm:text-xl xl:text-2xl font-semibold text-left text-[#FF3030] poppins">
                              {product.currency} {product.discount_price}
                            </Typography>
                          }

                          <Typography className={`text-sm sm:text-base xl:text-lg ${product.discount_price && 'line-through'} text-left poppins`} id="text">
                            {product.currency} {product.price}
                          </Typography>
                        </Box>

                        <Box className="flex justify-between w-full px-2 md:px-2 lg:px-5">

                          <Typography className="text-xs poppins" id="text">
                            {product.stocks} left stock
                          </Typography>

                          <StarIcon className="text-base text-[#2858a3]" />
                          <Typography className="text-sm poppins" id="text">
                            {product.rating}
                          </Typography>
                          <Typography className="text-xs ps-2 poppins" id="text">
                            ( {product.reviews} Reviews )
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ButtonBase>
              </Grid>
            ))}

          </Grid>
        </SwiperSlide>
      ))}
    </Swiper >
  );
}
