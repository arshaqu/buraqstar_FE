import React, { useContext } from "react";
import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { ImageURL } from "../../constants";
import { AddToCart, AddToWishlist } from "../index";
import useScrollAnimationProducts from "../../hooks/ScrollAnimationProducts";
import { AuthContext } from "../../AuthContext";
import { useTranslation } from "react-i18next";
import defaultImage from "../../assets/contactsvg.svg";
import { getName } from "../../utils";

const ProductGrid = React.memo(({ sortedProducts, navigate }) => {
  const { i18n } = useTranslation();

  const [refs, getClass] = useScrollAnimationProducts(
    sortedProducts.length,
    "opacity-10 translate-y-10",
    "opacity-100 translate-y-0 transition-all duration-700 ease-out",
  );

  const { currency, exchangeRate } = useContext(AuthContext);

  return (
    <Box className="border-2 border-gray-300 p-1 rounded-xl overflow-hidden">
      <Grid container spacing={2} justifyContent="flex-start">
        {sortedProducts.map((prod, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={prod.id || i}
            ref={(el) => (refs.current[i] = el)}
            className={`${getClass(i)}`}
            sx={{
              display: "flex",
              // ✅ Remove fixed minWidth/maxWidth that broke mobile layout
              // On xs (mobile): full width, centered with padding
              width: "100%",
              px: { xs: 2, sm: 0 }, // horizontal padding on mobile only
            }}
          >
            <ButtonBase
              onClick={() => {
                const stored =
                  JSON.parse(localStorage.getItem("recentProducts")) || [];

                const productData = {
                  id: prod.id,
                  name: prod.name,
                  image:
                    prod.images?.length > 0
                      ? ImageURL + prod.images[0]
                      : defaultImage,
                  price: prod.discount_price || prod.price,
                  slug: prod.slug,
                  code: prod.item_code,
                };

                const updated = [
                  productData,
                  ...stored.filter((item) => item.id !== prod.id),
                ].slice(0, 7);

                localStorage.setItem("recentProducts", JSON.stringify(updated));

                navigate("/product/" + prod.slug);
              }}
              sx={{
                width: "100%",
                textAlign: "left",
                alignItems: "stretch",
              }}
            >
              <Box className="group bg-white border-r border-b p-3 hover:shadow-md transition-all duration-300 flex flex-col w-full h-full">
                {/* IMAGE */}
                <Box className="relative w-full aspect-square rounded-md overflow-hidden flex items-center justify-center">
                  <img
                    loading="lazy"
                    src={
                      prod.images?.length > 0
                        ? ImageURL + prod.images[0]
                        : defaultImage
                    }
                    alt={prod.name}
                    className="w-full h-full object-contain p-2"
                  />

                  {/* LEFT BADGES */}
                  <Box className="absolute top-2 left-2 flex flex-col gap-1">
                    {prod.is_new && (
                      <span className="bg-gray-200 text-xs font-semibold px-3 py-1 rounded">
                        NEW
                      </span>
                    )}
                    {prod.hot && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded">
                        HOT
                      </span>
                    )}
                  </Box>

                  <Box
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 
                              flex flex-col items-center gap-1
                              opacity-0 translate-y-6
                              group-hover:opacity-100 group-hover:translate-y-0
                              transition-all duration-400 ease-out"
                  >
                    <Box onClick={(e) => e.stopPropagation()}>
                      <AddToCart
                        product={prod}
                        quantity={1}
                        className="poppins text-sm
                          w-60 h-11 
                          flex items-center justify-center 
                          bg-[#1E55AC] 
                          text-white 
                          rounded-full 
                          font-semibold 
                          shadow-md 
                          hover:bg-[#02AFF3] 
                          transition-all duration-200"
                      />
                    </Box>
                  </Box>

                  {/* RIGHT BADGES */}
                  <Box className="
                    absolute top-2 right-2
                    flex flex-col items-end gap-1
                    opacity-0 translate-x-6
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300 ease-out
                  ">
                    {/* WISHLIST */}
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-full shadow"
                    >
                      <AddToWishlist
                        product={prod}
                        products={[]}
                        setProducts={() => {}}
                        viaCategory={true}
                        open={false}
                        setOpen={() => {}}
                      />
                    </Box>

                    {/* DISCOUNT */}
                    {prod.discount_price && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        -
                        {Math.round(
                          ((prod.price - prod.discount_price) / prod.price) *
                            100,
                        )}
                        %
                      </span>
                    )}
                  </Box>
                </Box>

                {/* CONTENT */}
                <Box className="pt-3 flex flex-col flex-grow p-4">
                  <Box className="flex items-center gap-1 text-gray-700 text-md">
                    {prod.stocks}
                    <span className="text-gray-500 ml-1 poppins">Stocks</span>
                  </Box>

                  <Typography className="text-gray-400 text-md mt-1 poppins">
                    {prod.item_code}
                  </Typography>

                  <Typography className="text-lg text-[#2858A3] mt-1 hover:underline line-clamp-2 min-h-[40px] poppins">
                    {getName(prod, i18n.language)}
                  </Typography>

                  <Box className="flex items-center gap-2 mt-auto">
                    <Typography className="font-semibold text-xl poppins">
                      {currency}{" "}
                      {Math.round(
                        (prod.discount_price || prod.price) * exchangeRate,
                      )}
                    </Typography>

                    {prod.discount_price && (
                      <Typography className="text-gray-400 line-through text-xl">
                        {currency} {Math.round(prod.price * exchangeRate)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default ProductGrid;