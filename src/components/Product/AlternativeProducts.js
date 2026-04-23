import React, { useContext, useState } from 'react';
import { Box, ButtonBase, Grid, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ImageURL } from '../../constants';
import { AuthContext } from '../../AuthContext';
import { useTranslation } from 'react-i18next';
import { getName } from '../../utils';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import defaultImage from "../../assets/contactsvg.svg";

const AlternativeProducts = ({ alternativeProducts = [] }) => {
  const navigate = useNavigate();
  const { currency, exchangeRate } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 639px)'); // < sm
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)'); // sm..md
  const productsToShow = isMobile ? 1 : isTablet ? 3 : 4;

  if (!alternativeProducts || alternativeProducts.length === 0) {
    return null;
  }

  // Create a circular array for infinite scrolling
  const getVisibleProducts = () => {
    const visibleProducts = [];
    for (let i = 0; i < productsToShow; i++) {
      const productIndex = (currentIndex + i) % alternativeProducts.length;
      visibleProducts.push(alternativeProducts[productIndex]);
    }
    return visibleProducts;
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? alternativeProducts.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % alternativeProducts.length
    );
  };

  const visibleProducts = getVisibleProducts();

  return (
    <Box className="w-full px-5 sm:px-16 pt-6 pb-0">
      <Typography className="text-2xl font-bold text-[#000000] poppins mb-6 text-center">
        {t("product.alternative_products", "Recommended Products")}
      </Typography>
      
      <Box>
        {/* Products Container */}
        <Grid container spacing={3}>
          {visibleProducts.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={`${product.id}-${currentIndex}-${index}`}
            >
              <ButtonBase
                onClick={() => navigate('/product/' + product.slug)}
                sx={{ width: '100%' }}
              >
                <Box className="w-full h-80 products-box rounded-2xl flex flex-col p-4 sm:p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Product Image Container - Fixed Height */}
                  <div className="w-full h-48 sm:h-52 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative border-b-2 border-[#2858a3]">
                    <div className="image-div">
                      <img
                        className="h-[75%] w-auto hover-image2"
                        src={product.images?.length > 0 ? ImageURL + product.images[0] : defaultImage}
                        alt={product.name}
                      />
                      <img
                        className="h-[75%] w-auto object-fit hover-img"
                        src={
                          product.images?.length > 1
                            ? ImageURL + product.images[1]
                            : product.images?.length === 1
                              ? ImageURL + product.images[0]
                              : defaultImage
                        }
                        alt={product.name}
                      />
                    </div>
                    
                    {/* Product badges */}
                    <Box className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.hot && (
                        <Box className="bg-[#FF0F0F] px-2 py-1 uppercase poppins text-white text-xs rounded">
                          Hot
                        </Box>
                      )}
                      {product.discount_price && (
                        <Box className="bg-[#00C851] px-2 py-1 uppercase poppins text-white text-xs rounded">
                          {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                        </Box>
                      )}
                    </Box>
                  </div>
                  
                  {/* Product Name - Fixed Height */}
                  <div className="h-12 mb-3 flex items-center justify-center">
                    <Typography className="text-sm sm:text-base text-center text-gray-800 font-semibold poppins line-clamp-2">
                      {getName(product, i18n.language)}
                    </Typography>
                  </div>
                  
                  {/* Price Section - Fixed Height */}
                  <div className="h-8 flex items-center justify-center">
                    <Box className="flex flex-col items-center">
                      <Typography
                        className={`poppins uppercase text-lg font-bold ${product.discount_price && "line-through text-gray-500"}`}
                      >
                        {currency} {Math.round(product.price * exchangeRate * 100) / 100}
                      </Typography>
                      {product.discount_price && (
                        <Typography className="poppins text-xl font-bold text-[#00C851]">
                          {currency} {Math.round(product.discount_price * exchangeRate * 100) / 100}
                        </Typography>
                      )}
                    </Box>
                  </div>
                </Box>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>

        {/* Navigation Arrows - Below Products */}
        <Box className="flex justify-center items-center mt-4 space-x-4">
          <IconButton
            onClick={goToPrevious}
            className="shadow-lg"
            sx={{
              backgroundColor: '#2858a3',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1e4080',
                color: 'white'
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={goToNext}
            className="shadow-lg"
            sx={{
              backgroundColor: '#2858a3',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1e4080',
                color: 'white'
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default AlternativeProducts;
