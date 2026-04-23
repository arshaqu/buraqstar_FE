
import React, { useContext } from "react";
import { Badge, Box, Button, Divider, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { ImageURL } from "../../constants";
import defaultImage from "../../assets/contactsvg.svg";
import { useCart } from "react-use-cart";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AuthContext } from "../../AuthContext";
import routes, { getName } from "../../utils";
import { useTranslation } from "react-i18next";
// import { Add, Remove } from "@mui/icons-material";
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartReview = ({ t: propT, isMobile = false }) => {
    const { t, i18n } = useTranslation(); // Hook for translations
    const { currency, exchangeRate } = useContext(AuthContext);

    const { items, totalUniqueItems, removeItem, updateItemQuantity } = useCart();

    const ImageWithBadges = styled(Box)({
        position: 'relative',
        display: 'inline-block',
    });

    const IconLeft = styled(Box)({
        position: 'absolute',
        top: '0',
        left: '0',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
    });

    const BadgeRight = styled(Badge)({
        position: 'absolute',
        top: '0',
        right: '0',
        transform: 'translate(50%, -50%)',
    });

    const ImageComponent = ({ row }) => (
        <ImageWithBadges>
            <IconLeft onClick={() => removeItem(row?.id)}>
                <DeleteOutlineIcon style={{ fontSize: '1.25rem', color: "#909090" }} />
            </IconLeft>
            <Box
                component="img"
                src={row?.img ? `${ImageURL}${row.img}` : defaultImage}
                alt="product"
                sx={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'contain',
                    display: 'block'
                }}
            />
            <BadgeRight badgeContent={row.quantity} color="primary">
                <Box component="span" />
            </BadgeRight>
        </ImageWithBadges>
    );

    const Header = (
        <>
            <Box 
                className={`${isMobile ? 'p-3' : 'p-5'}`} 
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Box style={{ display: 'flex' }}>
                    <p style={{ 
                        fontWeight: 900, 
                        fontSize: isMobile ? '14px' : '16px' 
                    }}>
                        {t('checkout.review_your_order')} ({totalUniqueItems})
                    </p>
                </Box>
            </Box>
        </>
    )

    const Footer = (
        <Box 
            className={`${isMobile ? 'p-3' : 'p-5'}`} 
            style={{ display: 'flex', justifyContent: 'space-between' }}
        >
            <Button 
                component={Link} 
                to={routes.category + '?type=all'} 
                variant='contained' 
                className="w-[100%]" 
                size={isMobile ? "small" : "medium"}
                style={{ 
                    textTransform: "capitalize", 
                    background: '#2858A3', 
                    fontWeight: 800,
                    fontSize: isMobile ? '12px' : '14px'
                }}
            >
                {t('checkout.continue_shopping')}
            </Button>
        </Box>
    )

    const content = (
        <>
            {
                items.map((row, index) => (
                    <>
                        <Box 
                            key={`box-${index}`} 
                            style={{ 
                                padding: isMobile ? '10px 15px' : '15px', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                flexWrap: isMobile ? 'wrap' : 'nowrap',
                                gap: isMobile ? '8px' : '0'
                            }}
                        >
                            {/* Quantity Controls */}
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    order: isMobile ? 1 : 0,
                                    width: isMobile ? '100%' : 'auto',
                                    justifyContent: isMobile ? 'space-between' : 'flex-start'
                                }}
                            >
                                <IconButton 
                                    size="small" 
                                    className="bg-[#2858A3]" 
                                    onClick={() => updateItemQuantity(row.id, row.quantity - 1)}
                                    sx={{ 
                                        width: isMobile ? '32px' : '40px',
                                        height: isMobile ? '32px' : '40px'
                                    }}
                                >
                                    <Remove sx={{ fontSize: isMobile ? '16px' : '20px' }} className="text-white" />
                                </IconButton>

                                {/* Image Component */}
                                <Box sx={{ mx: isMobile ? 2 : 1 }}>
                                    <ImageComponent row={row} />
                                </Box>

                                <IconButton 
                                    size="small" 
                                    className="bg-[#2858A3]" 
                                    onClick={() => updateItemQuantity(row.id, (row.quantity + 1) > row.stocks ? row.stocks : (row.quantity + 1))}
                                    sx={{ 
                                        width: isMobile ? '32px' : '40px',
                                        height: isMobile ? '32px' : '40px'
                                    }}
                                >
                                    <Add sx={{ fontSize: isMobile ? '16px' : '20px' }} className="text-white" />
                                </IconButton>
                            </Box>

                            {/* Product Details */}
                            <Box 
                                sx={{ 
                                    order: isMobile ? 2 : 0,
                                    width: isMobile ? '100%' : 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Box sx={{ flex: 1, mr: 2 }}>
                                    <p 
                                        className={isMobile ? "text-[11px]" : "text-[12px]"} 
                                        style={{ 
                                            textOverflow: "ellipsis", 
                                            overflow: "hidden", 
                                            width: isMobile ? "200px" : "150px", 
                                            whiteSpace: "nowrap" 
                                        }}
                                    >
                                        {getName(row, i18n.language)}
                                    </p>
                                </Box>
                                
                                <Box className={isMobile ? "text-[13px]" : "text-[14px]"}>
                                    <p className="text-[#2858A3] font-semibold">
                                        {Math.round(row.itemTotal * exchangeRate * 100) / 100} {currency}
                                    </p>
                                </Box>
                            </Box>
                        </Box>
                        <Divider />
                    </>
                ))
            }
        </>
    )

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                background: "#fff",
                borderRadius: '4px',
                boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                marginBottom: isMobile ? '16px' : '0',
                border: isMobile ? '1px solid #e0e0e0' : 'none'
            }}
            role="presentation"
        >
            {Header}
            <Box 
                sx={{ 
                    flex: '1 1 auto', 
                    overflow: 'auto', 
                    paddingX: 0,
                    maxHeight: isMobile ? '300px' : 'none'
                }}
            >
                {content}
            </Box>
            {Footer}
        </Box>
    )
}

export default CartReview