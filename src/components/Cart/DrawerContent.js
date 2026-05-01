import React, { useState, useContext } from "react";
import { Box, Badge, Button, Divider, IconButton, Typography, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useCart } from "react-use-cart";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from "react-i18next";
import { ImageURL } from "../../constants";
import { getName } from "../../utils";
import defaultImage from "../../assets/contactsvg.svg";

const DrawerContent = ({ setOpen, setShowFloat }) => {
    const { t, i18n } = useTranslation(); // Hook for translations
    const [loading, setLoading] = useState(false);
    const { totalUniqueItems, cartTotal, items, updateItemQuantity, emptyCart, isEmpty ,removeItem } = useCart();
    const { currency, exchangeRate } = useContext(AuthContext);

    // Check if current language is RTL
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';


    const toggleDarwer = () => {
        setOpen(false)
        setShowFloat(true)
    }
    const Header = (
        <>
            <Box  className="bg-gray-100 p-5" style={{ display: 'flex', justifyContent: 'space-between', }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <ShoppingCartCheckoutIcon className='text-[#2858a3]' style={{ fontWeight: 900, fontSize: '2.5em' }} />
                    <p className="poppins" style={{ fontWeight: 500, fontSize: '16px' }}>&nbsp; &nbsp;{t("drawer.items")} {totalUniqueItems} </p>
                </Box>
                <IconButton onClick={() => toggleDarwer()}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider className="ml-4 mr-4"  />
        </>
    )

    const Footer = (
        <>
            <Divider className="m-3" />
            <Box className="bg-gray-100" style={{ padding: '15px 15px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}> {t("drawer.sub_total")} </p>
                <p className="text-[14px]"> {currency} {Math.round(cartTotal * exchangeRate * 100) / 100} </p>
            </Box>
            <Divider className="m-3" />
            <Box className="p-5 gap-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button component={Link} to="/cart" onClick={() => setOpen(false)} variant='contained' className="w-[100%] poppins rounded-3xl p-3 hover:bg-[#02AFF3] transition-colors duration-200" style={{ textTransform: "capitalize", background: '#2858A3', fontWeight: 500 }}>
                    {t("drawer.view_cart")}
                </Button>
                  <Button component={Link} to="/checkout" onClick={() => setOpen(false)} variant='contained' className="w-[100%] poppins rounded-3xl p-3" style={{ textTransform: "capitalize", background: '#000000', fontWeight: 500 }}>
                    {t("drawer.checkout")}
                </Button>
            </Box>
        </>
    )

    const content = (
        <>
            {
                items.map((row, index) => (
                    <React.Fragment key={`box-${index}`}>
                        <Box className="bg-gray-100" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
                                <Box
                               
                                    component="img"
                                    src={row?.img ? `${ImageURL}${row.img}` : defaultImage}
                                    alt={row?.name}
                                    sx={{
                                        width: '70px',
                                        height: '70px',
                                        objectFit: 'contain',
                                        display: 'block',
                                        border: '2px solid #E1E1E1',
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        
                                    }}
                                />
                            <Box>
                                <p className="text-[12px] poppins font-semibold" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "150px", whiteSpace: "nowrap" }}>{getName(row, i18n.language)}</p>
                                <p className="text-[#2858A3] poppins font-semibold">{currency} {Math.round(row.itemTotal * exchangeRate * 100) / 100}.00 </p>
                                <Box
                                 sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        bgcolor: '#ffffff',
                                        borderRadius: '999px',
                                        p: '2px',
                                        gap: 0,
                                        }}>
                                        <IconButton
                                        className="bg-gray-200"
                                            size="small"
                                            onClick={() => updateItemQuantity(row.id, row.quantity - 1)}
                                            sx={{
                                            width: 18, height: 18,
                                            borderRadius: '50%',
                                            '&:hover': { bgcolor: '#f0f0f0' },
                                            p: 0,
                                            }}
                                        >
                                            <Remove sx={{ fontSize: 16 }} />
                                        </IconButton>

                                        <Typography sx={{ minWidth: 32, textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
                                            {row.quantity}
                                        </Typography>

                                        <IconButton
                                         className="bg-gray-200"
                                            size="small"
                                            onClick={() => updateItemQuantity(row.id, row.quantity + 1 > row.stocks ? row.stocks : row.quantity + 1)}
                                            sx={{
                                            width: 18, height: 18,
                                            bgcolor: 'white',
                                            borderRadius: '50%',
                                            '&:hover': { bgcolor: '#f0f0f0' },
                                            p: 0,
                                            }}
                                        >
                                            <Add sx={{ fontSize: 16 }} />
                                        </IconButton>
                                        </Box>
                            </Box>
                            <Box className="text-[14px]">
                            </Box>
                                    <IconButton size="small" className="bg-white" sx={{ color: 'error.main' }} onClick={() => removeItem(row.id)}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                        </Box>
                       
                    </React.Fragment>
                ))
            }
            {
                !isEmpty && (
                    <Box sx={{ px: 2, py: 1 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={emptyCart}
                            fullWidth
                            startIcon={<DeleteOutlineIcon />}
                        >
                            {t("drawer.empty_cart")}
                        </Button>
                    </Box>
                )
            }
        </>
    )

    return (
        <Box
        className="bg-gray-100"
            sx={{
                width: { xs: '380px', sm: '430px' }, //set witdh for mobile and desktop
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                direction: isRTL ? 'rtl' : 'ltr',
            }}
            role="presentation"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {Header}

            <Box sx={{ flex: '1 1 auto', overflow: 'auto', paddingX: 2 }}>
                {
                    loading ?
                        <div className="w-full h-full flex justify-center items-center">
                            <CircularProgress size={150} className="text-white" />
                        </div> :
                        !loading && items?.length === 0 ?
                            <Typography className="poppins font-semibold uppercase text-[32px] text-black w-full h-full flex justify-center items-center">
                                {t("drawer.cart_empty")}
                            </Typography> :
                            <> {content} </>
                }
            </Box>
            {
                !isEmpty ? Footer : null
            }
        </Box>
    )
}

export default DrawerContent;