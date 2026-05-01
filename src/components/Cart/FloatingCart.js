import React, { useContext, useState, useEffect } from "react";
import { Box, Fab, Drawer } from "@mui/material";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { AuthContext } from "../../AuthContext";
import DrawerContent from "./DrawerContent";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";

const FloatingCart = () => {
    const { t, i18n } = useTranslation();
    const { currency, exchangeRate } = useContext(AuthContext);
    const [CartTotal, setCartTotal] = useState(0);
    const { totalUniqueItems, cartTotal } = useCart();
    const [showFloat, setShowFloat] = useState(true);

    // Check if current language is RTL
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    // set a function to hide float button on darwer open
    const floatButtonCLick = () => {
        setOpen(true)
        setShowFloat(false)
    }

    // useEffect(()=> {
    //     axios.post(`${BASE_URL}/api/v1/carts`, {
    //         cart_id: CartId,
    //         type: ''
    //     },{
    //         headers: {
    //             Authorization: `Bearer ${localStorage?.getItem('token')}`
    //         },
    //     })
    //     .then((res) => {
    //         const products = res?.data?.cart_items.map((item) => {
    //             return {
    //                 cart_id: item?.id,
    //                 product: item?.product,
    //                 quantity: item?.quantity
    //             };
    //         });
    //         setItems(products);
    //         setTotalItems(products?.length)
    //         CalcTotal(products)
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }, [CartId])

    const CalcTotal = (items) => {
        const total = items?.reduce((acc, item) => {
            const quantity = Number(item.quantity);
            const price = item?.product?.price || 0;
            return acc + (quantity * price);
        }, 0);
        setCartTotal(total)
    }


    const FloatingButton = (
        <Fab
            variant="extended"
            color="primary"
            onClick={() => floatButtonCLick()}
            sx={{
                padding: { xs: '8px 12px', sm: '1px' },
                position: 'fixed',
                bottom: { xs: '20px', sm: '50%' },
                ...(isRTL ? { left: { xs: '50%', sm: 0 } } : { right: { xs: '50%', sm: 0 } }),
                transform: { xs: 'translateX(-50%)', sm: 'none' },
                background: '#2858a3',
                borderRadius: { 
                    xs: isRTL ? '8px 0px 0px 8px' : '0px 8px 8px 0px', 
                    sm: isRTL ? '0px 10px 10px 0px' : '10px 0px 0px 10px' 
                },
                height: { xs: '50px', sm: '90px' },
                width: { xs: 'auto', sm: '120px' },
                minWidth: { xs: '140px', sm: '120px' },
                color: '#fff',
                zIndex: 1300,
                boxShadow: { 
                    xs: '0 4px 20px rgba(40, 88, 163, 0.4)', 
                    sm: '0 2px 10px rgba(0,0,0,0.2)' 
                },
                '&:hover': {
                    background: '#1e4080',
                    transform: { 
                        xs: 'translateX(-50%) scale(1.05)', 
                        sm: 'scale(1.02)' 
                    },
                },
                transition: 'all 0.3s ease-in-out'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'column' },
                    alignItems: 'center',
                    gap: { xs: 1, sm: 0 },
                    textAlign: 'center'
                }}
            >
                {/* Mobile Layout */}
                <Box
                    sx={{
                        display: { xs: 'flex', sm: 'none' },
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <ShoppingCartCheckoutIcon sx={{ fontSize: '20px' }} />
                    <Box>
                        <Box sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                            {totalUniqueItems} {totalUniqueItems === 1 ? t('floating_cart.item') : t('floating_cart.items_plural')}
                        </Box>
                        <Box sx={{ fontSize: '11px', opacity: 0.9 }}>
                            {currency} {Math.round(cartTotal * exchangeRate * 100) / 100}
                        </Box>
                    </Box>
                </Box>

                {/* Desktop Layout */}
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    <p style={{ fontSize: '.75rem', margin: 0 }}>
                        <ShoppingCartCheckoutIcon /> 
                        <span className="poppins font-semibold">{totalUniqueItems} {totalUniqueItems === 1 ? t('floating_cart.item') : t('floating_cart.items_plural')}</span>
                    </p>
                    <Box 
                        className='bg-[#fff] text-[#2858a3] p-1.5 mt-1.5 poppins font-semibold' 
                        style={{ fontSize: '12px', borderRadius: '4px' }}
                    > 
                        {currency} {Math.round(cartTotal * exchangeRate * 100) / 100}
                    </Box>
                </Box>
            </Box>
        </Fab>
    )

    const CartDrawer = (
        <Drawer
            anchor={isRTL ? 'left' : 'right'}
            open={open}
            onClose={() => toggleDrawer(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    direction: isRTL ? 'rtl' : 'ltr',
                }
            }}
        >
            <DrawerContent setOpen={setOpen} setShowFloat={setShowFloat} />
        </Drawer>
    )

    return (
        <>
            {/* {isLoggedIn && */}
            <>
                {showFloat ? FloatingButton : ''}
                {CartDrawer}
            </>
            {/* } */}
        </>
    )
}

export default FloatingCart