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
    <Box className="h-full w-full px-0 sm:px-10">
      <Box className="flex items-start justify-between mb-2">
        <Box className="w-fit border border-[#FF3030] px-1.5 poppins text-xs text-[#FF3030] uppercase bg-transparent">
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
      <Typography className="poppins text-3xl font-bold w-full sm:w-3/4 text-[#2E2E2E] capitalize py-2">
        {getName(product, i18n.language)}
      </Typography>
      <Typography className="poppins text-xs text-[#02ADEC] capitalize py-1.5 font-bold">
        {t("product.by")} {product.brand}
      </Typography>
      <Typography className="poppins text-xs text-[#1E55AC] capitalize py-1.5">
        {product.code}
      </Typography>
      <Typography className="poppins text-sm text-[#5D5D5D] capitalize py-1.5">
        <span className="pe-1 font-bold">{t("product.availability")}: </span>
        <span className="bg-[#16A34A] px-3 py-1.5 rounded-md font-bold text-white text-sm">
          {product.stocks} {t("product.available_in_stock")}
        </span>
      </Typography>
      <Divider className="bg-[#eff0f0] mt-6 mb-4" />
      <Box className="flex">
        <Typography className="poppins text-sm text-[#2E2E2E] capitalize py-1.5 pe-2">
          {t("product.tag")}:
        </Typography>
        <Typography className="poppins text-sm text-[#5D5D5D] capitalize py-1.5">
          {product.tags}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5}>
          <Box className="flex items-center">
            <Typography className="poppins text-sm sm:text-base text-[#2E2E2E] capitalize py-1.5 pe-2">
              {t("product.choose_quantity")}:
            </Typography>
            <Box className="flex items-center justify-between bg-transparent border rounded-md px-3 py-1.5">
              <IconButton size="small" className="">
                <Remove className="text-sm text-black" onClick={() => (quantity !== 1) && setQuantity(quantity - 1)} />
              </IconButton>
              <span className="px-4">{quantity}</span>
              <IconButton size="small" className="">
                <Add className="text-sm text-black" onClick={() => (quantity !== product.stocks) && setQuantity(quantity + 1)} />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* change grid layout of add to cart and bulk inquiry buttons for mobile */}
        <Grid item xs={12} sm={4}  >
          <AddToCart
            className="bg-[#1E55AC] w-full sm:w-auto  py-2.5 px-16 text-white poppins capitalize "
            quantity={quantity}
            product={product}
          />
        </Grid>

        <Grid item xs={12} sm={3} >
          <Button variant="contained"
            component={Link}
            to="/contact"
            className="bg-[#1E55AC] w-full sm:w-auto py-2.5 px-8 text-white poppins capitalize">
            {t("product.bulk_inquiry")}
          </Button>
        </Grid>
      </Grid>
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
      <Typography 
        className="poppins text-sm text-[#5D5D5D] py-1.5"
        style={{ 
          textAlign: 'justify',
          textJustify: 'inter-word',
          wordSpacing: '0.05em',
          lineHeight: '1.6'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: getDescription(product, i18n.language) }} />
      </Typography>
      <SocialShare product={product} />
    </Box>
  );
};

export default Content;