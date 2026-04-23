import React, { useState } from 'react';
import { Box, Button, Divider, Grid, IconButton, Rating, Typography } from '@mui/material';
import { AiFillCheckCircle } from "react-icons/ai";
import { Add, Remove } from "@mui/icons-material";

import novexBrand from "../../../assets/novex.jpg"
import { getBrandLogo } from '../../../utils';
import AddToCart from '../../AddToCart';

const highlightColor = "#F5A100";

const Contents = ({ product, quantity, setQuantity }) => {

    return (
        <div style={{ padding: '5px'  }} className='flex flex-col md:block'>

            {/* Heading */}
            <Box sx={{ fontSize: {xs:'16px', md:'21px'} }}  >
                {product.name}
            </Box>

            {/* Ratings */}
            <Box className="my-3 flex-wrap" style={{ display: 'flex',  justifyContent: 'space-between', width: '35%', color: '#b5b5bf', }}>
                <Typography style={{ fontSize: '12' }}>0.00</Typography>
                <Rating
                    name="read-only"
                    className="text-[#FD6C28]"
                    value='0'
                    readOnly
                    size="small"
                />
                <Typography style={{ fontSize: '12px' }}>(0 Rating)</Typography>
            </Box>

            <Divider />

            {/* Brands */}
            <Box style={{ display: 'flex', width: '55%', color: '#b5b5bf' }}>

                <Box className="w-full sm:w-[75%] flex items-center my-4">
                    <Grid xs={6} md={4}>
                        <img src={getBrandLogo(product.brand)} />
                    </Grid>
                    <Grid xs={6} md={8} className='ml-4'>
                        <p style={{ fontSize: '12px' }}>Brand</p>
                        <p style={{ fontWeight: 'bold', color: 'rgb(45,45,45)', fontSize: '14px' }}><b>{product.brand}</b></p>
                        <p style={{ fontSize: '10px' }}>view others products</p>
                    </Grid>
                </Box>

            </Box>

            {/*  Price */}
            <Box className="w-full sm:w-[75%] flex items-center mb-4">
                <Grid xs={6} md={3} className="text-[12px]" style={{ color: '#111723' }}>
                    Price
                </Grid>
                <Grid xs={6} md={8}>
                    <p>
                        <span className={product.discount_percentage ? 'line-through' : ''}>{product.price} {product.currency}</span>
                        {product.discount_percentage && <span className='bg-[#ED2939] text-[11px] px-2 ml-2' style={{ color: '#fff' }}>Off {product.discount_percentage}%</span>}
                    </p>
                </Grid>

            </Box>

            {/* Discount Price */}
            {
                product.discount_percentage &&
                <Box className="w-full sm:w-[75%] flex items-center my-4">
                    <Grid xs={6} md={3} className="text-[12px]" style={{ color: '#111723' }}>
                        Discounted Price
                    </Grid>
                    <Grid xs={6} md={8} style={{ color: highlightColor }}>
                        {product.discount_price} {product.currency}
                    </Grid>
                </Box>
            }

            {/* Shipping */}
            <Box className="my-4 flex-col sm:flex-row w-[80%]" style={{ display: 'flex', justifyContent: 'center-between' }}>
                <Grid xs={12} md={6} className="cart-card mr-6 border-[#F5A100] bg-[rgba(245,161,0,0.15)]">
                    <Box style={{ display: 'flex' }} className="mb-3">
                        <AiFillCheckCircle style={{ color: '#4caf50', fontSize: 19 }} />
                        <p className="ml-3 text-[12px]">In Stock</p>
                    </Box>

                    <Box style={{ display: 'flex' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.994" viewBox="0 0 16 14.994">
                            <g id="Group_22650" data-name="Group 22650" transform="translate(11363.863 11582.499)">
                                <path id="Path_26196" data-name="Path 26196" d="M74.137,7.123v.813a1.064,1.064,0,0,0-.028.134,6.337,6.337,0,0,1-1.656,3.743,8.251,8.251,0,0,1-5.526,2.708,8.546,8.546,0,0,1-3.661-.426.245.245,0,0,0-.262.056,10.229,10.229,0,0,1-1,.711,4.905,4.905,0,0,1-2.434.633.464.464,0,0,1-.445-.658,1.021,1.021,0,0,1,.167-.224,2.793,2.793,0,0,0,.695-2.472.533.533,0,0,0-.119-.243,6.746,6.746,0,0,1-1.4-2.394,6.1,6.1,0,0,1-.152-3.43,6.866,6.866,0,0,1,3.1-4.218A8.509,8.509,0,0,1,67.1.559a8.286,8.286,0,0,1,4.89,2.2A6.588,6.588,0,0,1,74,6.249c.062.288.093.583.139.874m-11.695-1a1.4,1.4,0,1,0,1.382,1.424,1.414,1.414,0,0,0-1.382-1.424m3.749,0a1.4,1.4,0,1,0,1.383,1.423,1.414,1.414,0,0,0-1.383-1.423m5.132,1.428A1.4,1.4,0,1,0,69.9,8.934a1.414,1.414,0,0,0,1.424-1.381" transform="translate(-11422 -11583)" fill="#f5a100" />
                            </g>
                        </svg>
                        <p className="ml-3 text-[12px]" style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: highlightColor }}>Contact Admin</p>
                    </Box>
                </Grid>
                <Grid xs={12} md={6} className="cart-card border-[#e2e8f0] bg-[#eee]">

                    <Box style={{ display: 'flex' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.847" viewBox="0 0 20 19.847" >
                            <g id="Group_1226" data-name="Group 1226" transform="translate(-7 -11)" > <path id="Path_3097" data-name="Path 3097" d="M16.6,44.374a4.283,4.283,0,0,1-2-.723,17.011,17.011,0,0,1-1.733-1.1l-2.451.735a.445.445,0,0,1-.395-.071,9.261,9.261,0,0,1-2.986-3.853.444.444,0,0,1,.381-.614,10.4,10.4,0,0,0,3.718-.941,10.209,10.209,0,0,0,1.178-.647,11.321,11.321,0,0,1,1.654-.962,10.309,10.309,0,0,1,1.092-.4c.033-.009.089-.024.162-.045l.074-.023c.072-.022.138-.043.3-.084s.351-.088.6-.139a5.637,5.637,0,0,1,1.723-.14,3.7,3.7,0,0,1,.763.137c.33.1.625.219.911.335a8.959,8.959,0,0,0,.941.342,4.288,4.288,0,0,0,.845.153c.283.027.636.061.788.435a.886.886,0,0,1-.083.772,1.892,1.892,0,0,1-2.139.971c-.123-.019-.234-.04-.337-.064a4.139,4.139,0,0,0,.479.3,4.183,4.183,0,0,0,2.044.481h1.342a.444.444,0,0,1,.442.4,1.841,1.841,0,0,1-.18,1.047,2.5,2.5,0,0,1-2.672,1.066c-.933.726-1.875,1.408-2.8,2.029a2.986,2.986,0,0,1-1.555.607ZM12.95,41.62a.444.444,0,0,1,.265.088,16.105,16.105,0,0,0,1.813,1.166c1.155.636,1.473.619,1.626.611a2.129,2.129,0,0,0,1.107-.458c.959-.643,1.935-1.353,2.9-2.111a.442.442,0,0,1,.359-.086,1.779,1.779,0,0,0,1.916-.566.784.784,0,0,0,.059-.15h-.862a5.045,5.045,0,0,1-4.245-2.151,4.185,4.185,0,0,0-.571,0c-.08.006-.147.013-.191.018a.444.444,0,1,1-.1-.883c.053-.006.133-.015.232-.021a5.166,5.166,0,0,1,.931.021H18.2a3.4,3.4,0,0,1,.95.265,3.725,3.725,0,0,0,.927.269,1.336,1.336,0,0,0,.487.032,1.232,1.232,0,0,0,.678-.452,5.07,5.07,0,0,1-.955-.178,9.83,9.83,0,0,1-1.031-.373c-.278-.113-.541-.22-.831-.307a2.794,2.794,0,0,0-.581-.1,4.834,4.834,0,0,0-1.472.126c-.23.047-.416.092-.554.128s-.192.053-.253.072l-.085.026c-.085.025-.15.043-.176.05a9.7,9.7,0,0,0-.967.359,10.647,10.647,0,0,0-1.522.889,11.069,11.069,0,0,1-4.7,1.679,8.364,8.364,0,0,0,2.269,2.793l2.444-.733a.443.443,0,0,1,.128-.019Z" transform="translate(0 -13.528)" fill="#b8b8b8" /> <path id="Path_3098" data-name="Path 3098" d="M31,26.555H25.929a.444.444,0,0,1,0-.889h4.627V11.889H15.889V24.831a.444.444,0,1,1-.889,0V11.444A.444.444,0,0,1,15.444,11H31a.444.444,0,0,1,.444.444V26.111A.444.444,0,0,1,31,26.555Z" transform="translate(-4.444)" fill="#b8b8b8" /> <path id="Path_3099" data-name="Path 3099" d="M32.5,15.444H28.944A.444.444,0,0,1,28.5,15V11.444A.444.444,0,0,1,28.944,11H32.5a.444.444,0,0,1,.444.444V15A.444.444,0,0,1,32.5,15.444Zm-3.111-.889h2.667V11.889H29.389Z" transform="translate(-11.944)" fill="#b8b8b8" /> </g>
                        </svg>
                        <p className="ml-3 text-[14px]" style={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>Estimated delivery time</p>
                    </Box>

                    <Typography className='ml-8 text-[12px]'>1 - 5 days</Typography>

                </Grid>
            </Box>

            {/* Quantity */}
            <Box className="w-full sm:w-[75%] flex items-center my-4">
                <Grid xs={6} md={3} className="text-[12px]" style={{ color: '#111723' }}>
                    Quantity
                </Grid>
                <Grid xs={6} md={8}>
                    <Box className="flex items-center justify-between bg-transparent border rounded-md px-3 py-1.5 w-[50%]">
                        <IconButton size="small">
                            <Remove className="text-sm text-black" onClick={() => (quantity !== 1) && setQuantity(quantity - 1)} />
                        </IconButton>
                        <span className="px-4 text-[14px]">{quantity}</span>
                        <IconButton size="small" className="">
                            <Add className="text-sm text-black" onClick={() => setQuantity(quantity + 1)} />
                        </IconButton>
                    </Box>
                </Grid>
            </Box>

            {/* Total Price */}
            <Box className="w-full sm:w-[75%] flex items-center my-4">
                <Grid xs={6} md={3} className="text-[12px]" style={{ color: '#111723' }}>
                    Total Price
                </Grid>
                <Grid xs={6} md={8} style={{ color: highlightColor }}>
                    {((product.discount_percentage ? product.discount_price : product.price) * quantity).toFixed(2)} {product.currency}
                </Grid>
            </Box>

            {/* button */}

            <AddToCart
                className="bg-[#000] w-[100%] poppins"
                quantity={quantity}
                product={product}
            />

            {/* Share
            <Box className="w-full sm:w-[75%] flex items-center my-4">
                <Grid xs={6} md={3} className="text-[12px]" style={{ color: '#111723' }}>
                    Share
                </Grid>
                <Grid xs={6} md={8}>
                    {footerSocials.map((social, i) => (
                        <Link to={social.link} key={i} className="text-sm text-white">
                            {social.icon}
                        </Link>
                    ))}
                </Grid>
            </Box> */}

        </div >
    )
}

export default Contents