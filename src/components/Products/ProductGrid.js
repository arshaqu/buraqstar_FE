import React, { useContext } from 'react'
import { Box, ButtonBase, Grid, Typography } from '@mui/material'
import { ImageURL } from '../../constants'
import { AddToWishlist } from '../index'
import useScrollAnimationProducts from '../../hooks/ScrollAnimationProducts'
import { AuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
import defaultImage from "../../assets/contactsvg.svg"
import { getName } from '../../utils'

const ProductGrid = React.memo(({ sortedProducts, navigate, handleModalClick }) => {
  const { i18n } = useTranslation()
  const [refs, getClass] = useScrollAnimationProducts(
    sortedProducts.length,
    "opacity-10 translate-y-10",
    "opacity-100 translate-y-0 transition-all duration-700 ease-out hover:scale-105 hover:rotate-1"
  )

  const { currency, exchangeRate } = useContext(AuthContext)

  return (
    <>
      {sortedProducts.map((prod, i) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          ref={(el) => refs.current[i] = el}
          className={`px-2.5 ${getClass(i)}`}
          style={{ transition: "transform 0.7s ease-in, opacity 0.7s ease-in" }}
          key={prod.id || i}
        >
          <ButtonBase
            onClick={() => navigate('/product/' + prod.slug)}
            sx={{ width: '100%' }}
          >
            <Box className="w-[41vh] h-96 products-box">
              <Box className="bg-white relative h-[70%] w-full flex justify-center items-center rounded-2xl border-2 border-[#2858a3] hover:border-[#1e4080] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
                <div className="image-div">
                  <img
                    className="h-[75%] w-auto hover-image2"
                    src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
                    alt={prod.name}
                  />
                  <img
                    className="h-[75%] w-auto object-fit hover-img"
                    src={
                      prod.images?.length > 1
                        ? ImageURL + prod.images[1]
                        : prod.images?.length === 1
                          ? ImageURL + prod.images[0]
                          : defaultImage
                    }
                    alt={prod.name}
                  />
                </div>
                <Box className="absolute top-2.5 px-2.5 flex w-full h-fit justify-between">
                  {prod.hot && (
                    <Box className="bg-[#FF0F0F] px-2 py-1 uppercase poppins text-white text-xs h-[24px]">
                      Hot
                    </Box>
                  )}
                  <AddToWishlist
                    product={prod}
                    products={[]}
                    setProducts={() => { }}
                    viaCategory={true}
                    open={false}
                    setOpen={() => { }}
                  />
                </Box>

                <Box className="absolute bottom-2.5 left-0 px-2.5 flex w-full h-fit justify-end">
                  {/* <IconButton onClick={(e) => handleModalClick(e, prod)}>
                    <AddShoppingCartIcon className="text-gray-600 text-xl" />
                  </IconButton> */}
                </Box>
              </Box>
              <Box className="text-center py-6 px-3">
                <Typography className="poppins uppercase text-xs">
                  {getName(prod, i18n.language)}
                </Typography>
                <Box className="flex justify-center gap-x-4 pt-1">
                  {prod.discount_price && (
                    <Typography className="poppins uppercase text-sm text-[#FF0F0F]">
                      {currency} {Math.round(prod.discount_price * exchangeRate * 100) / 100}
                    </Typography>
                  )}
                  <Typography
                    className={`poppins uppercase text-md font-bold ${prod.discount_price && "line-through"}`}
                  >
                    {currency}  {Math.round(prod.price * exchangeRate * 100) / 100}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ButtonBase>
        </Grid>
      ))}
    </>
  )
})

export default ProductGrid

