import React, { useContext } from 'react'
import { Box, ButtonBase, Grid, Typography } from '@mui/material'
import { ImageURL } from '../../constants'
import { AddToWishlist } from '../index'
import useScrollAnimationProducts from '../../hooks/ScrollAnimationProducts'
import { AuthContext } from '../../AuthContext'
import { useTranslation } from 'react-i18next'
import defaultImage from "../../assets/contactsvg.svg"
import { getName } from '../../utils'

const ProductList = React.memo(({ sortedProducts, navigate, handleModalClick }) => {
  const { i18n } = useTranslation()
  const [refs, getClass] = useScrollAnimationProducts(
    sortedProducts.length,
    "opacity-10 translate-y-10",
    "opacity-100 translate-y-0 transition-transform transition-opacity duration-700 ease-out"
  )
  const { currency, exchangeRate } = useContext(AuthContext)

  return (
    <>
      {sortedProducts.map((prod, i) => (
        <Grid
          item
          xs={12}
          ref={(el) => refs.current[i] = el}
          className={`${getClass(i)} mb-4`}
          style={{ transition: "transform 0.7s ease-out, opacity 0.7s ease-out" }}
          key={prod.id || i}
        >
          <ButtonBase
            onClick={() => navigate('/product/' + prod.slug)}
            sx={{ width: '100%' }}
          >
            <Box className="flex items-center p-4 border-2 border-[#2858a3] hover:border-[#1e4080] rounded-lg justify-between w-full min-w-0 text-left hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] ">
              <Box className="flex-shrink-0 w-24 h-24">
                <div className="relative w-full h-full">
                  <img
                    className="w-full h-full object-cover rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
                    src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
                    alt={prod.name}
                  />
                  <img
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100"
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
              </Box>
              <Box className="ml-4 flex-grow min-w-0 overflow-hidden">
                <Typography className="poppins font-semibold text-sm sm:text-lg text-gray-800">
                  {getName(prod, i18n.language)}
                </Typography>
                <Box className="flex justify-between items-center mt-2">
                  <Box className="flex flex-col">
                    {prod.discount_price && (
                      <Typography className="poppins text-sm text-red-600">
                        {currency} {Math.round(prod.discount_price * exchangeRate * 100) / 100}
                      </Typography>
                    )}
                    <Typography
                      className={`poppins text-sm ${prod.discount_price ? "line-through text-gray-500" : "text-black"}`}
                    >
                      {currency} {Math.round(prod.price * exchangeRate * 100) / 100}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="sm:ml-auto flex flex-col sm:flex-row ml-2 sm:ml-6 items-center space-x-0 sm:space-x-4 space-y-3 sm:space-y-0 flex-shrink-0">
                {prod.hot && (
                  <Box className="bg-red-600 px-2 sm:px-3 py-1 uppercase poppins text-white text-xs rounded-full self-center sm:self-auto">
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
                {/* <IconButton onClick={(e) => handleModalClick(e, prod)}>
                  <AddShoppingCartIcon className="text-gray-600 cursor-pointer hover:text-gray-800" />
                </IconButton> */}
              </Box>
            </Box>
          </ButtonBase>
        </Grid>
      ))}
    </>
  )
})

export default ProductList

