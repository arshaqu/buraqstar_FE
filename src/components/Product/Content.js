import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getName, getDescription } from "../../utils";
import { Box, Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import AddToCart from "../AddToCart";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../AuthContext";
import SocialShare from "./SocialShare";
import { AddToWishlist } from "../AddToWishlist";

const Content = ({ product, setProduct, t, wishlistNotify, setWishlistNotify }) => {
  const [quantity, setQuantity] = useState(1)
  const { currency, exchangeRate } = useContext(AuthContext);
  const { i18n } = useTranslation();

  return (
    <Box className="h-full w-full px-0 sm:px-10 mt-8 md:pl-10">
      <Box className="flex items-start justify-between ">
      <Typography className="poppins text-lg  capitalize py-1.5">
         {product.code}
      </Typography>
        <Box className="w-fit bg-[#aaf9d6] px-2 pr-2 poppins text-sm rounded-2xl text-[#0F804D] bg-transparent">
          {product.stocks > 0 ? t("product.stock_availability") : t("product.stock_unavailability")}
        </Box>
        <AddToWishlist
          product={product}
          products={[product]}
          setProducts={(updatedProducts) => {
            if (updatedProducts.length > 0 && setProduct) {
              setProduct(updatedProducts[0]);
            }
          }}
          viaCategory={false}
          open={wishlistNotify}
          setOpen={setWishlistNotify}
        />
      </Box>
      <Typography className="poppins text-4xl font-semibold w-full sm:w-3/4 text-[#2E2E2E] capitalize py-2">
        {getName(product, i18n.language)}
      </Typography>
      <Typography className="poppins text-sm text-[#02ADEC] capitalize py-1.5 font-bold">
      {t("product.by")} {product.brand}
      </Typography>
      <Typography className="poppins text-sm text-[#5D5D5D] capitalize py-1.5">
        <span className="pe-1 font-bold">{t("product.availability")}: </span>
        <span className="bg-[#16A34A] px-3 py-1.5 rounded-md font-bold text-white text-sm">
          {product.stocks} {t("product.available_in_stock")}
        </span>
      </Typography>
     
      <Box className="flex">
        <Typography className="poppins text-sm text-[#2E2E2E] capitalize py-1.5 pe-2">
          {t("product.tag")}:
        </Typography>
        <Typography className="poppins text-sm text-[#5D5D5D] capitalize py-1.5">
          {product.tags}
        </Typography>
      </Box>
 
      <Box className="flex items-center gap-x-3 my-3">
        {product.discount_percentage &&
          <Box className="">
            <Box className="bg-[#FF3030] px-3 py-1.5 rounded-md mb-2">
              <Typography className="poppins text-sm font-bold text-white uppercase">
                {product.discount_percentage}% {t("product.off")}
              </Typography>
            </Box>
            <Typography className="poppins text-base line-through text-[#FF3030] capitalize">
              {Math.round(product.price * exchangeRate * 100) / 100} {currency}
            </Typography>
          </Box>
        }
        <Typography className="poppins text-4xl font-bold text-[#1E55AC] uppercase py-1.5">
          {currency} {Math.round((product.discount_price ?? product.price) * exchangeRate * 100) / 100}
        </Typography>
        {/* <Typography className="poppins text-sm text-[#9AA5B3] capitalize">
          (05) {t("product.reviews")}
        </Typography> */}
      </Box>

      <SocialShare product={product} />



      <Typography 
        className="poppins text-md text-[#5D5D5D] "
        style={{ 
          textAlign: 'justify',
          textJustify: 'inter-word',
          wordSpacing: '0.05em',
          lineHeight: '1.6'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: getDescription(product, i18n.language) }} />
      </Typography>

           <Grid className="mt-2" container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box className="flex items-center">
            <Typography className="poppins text-sm sm:text-base text-[#2E2E2E] capitalize py-1.5 pe-2">
              {t("product.choose_quantity")}:
            </Typography>
            <Box className="flex items-center justify-between bg-transparent border rounded-3xl ">
              <IconButton size="small" className="p-2 ml-1 bg-[#E9E9E9] text-black rounded-3xl ">
                <Remove className="text-xl " onClick={() => (quantity !== 1) && setQuantity(quantity - 1)} />
              </IconButton>
              <span className="px-4 font-bold text-[#2858A4]">{quantity}</span>
              <IconButton size="small" className="p-2 m-1 bg-[#E9E9E9] text-black  rounded-3xl ">
                <Add className="text-xl" onClick={() => (quantity !== product.stocks) && setQuantity(quantity + 1)} />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* change grid layout of add to cart and bulk inquiry buttons for mobile */}
        <Grid item xs={12} sm={3.2}  >
          <AddToCart
            className="bg-[#1E1E1E] w-full sm:w-auto rounded-3xl py-2.5 px-16 text-white poppins capitalize hover:bg-[#02AFF3] transition-colors duration-200"
            quantity={quantity}
            product={product}
          />
        </Grid>

        <Grid item xs={12} sm={3} >
          <Button variant="contained"
            component={Link}
            to="/contact"
            className="bg-[#02AFF3] w-full sm:w-auto rounded-3xl py-2.5 px-14 text-white poppins capitalize hover:bg-[#1E1E1E] transition-colors duration-200">
            {t("product.bulk_inquiry")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;