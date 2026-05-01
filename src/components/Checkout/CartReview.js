import React, { useContext } from "react";
import { Badge, Box, Button, Divider, IconButton, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ImageURL } from "../../constants";
import defaultImage from "../../assets/contactsvg.svg";
import { useCart } from "react-use-cart";
import { Add, Remove } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AuthContext } from "../../AuthContext";
import routes, { getName } from "../../utils";
import { useTranslation } from "react-i18next";

const CartReview = ({ t: propT, isMobile = false }) => {
    const { t, i18n } = useTranslation();
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
                    width: isMobile ? '55px' : '65px',
                    height: isMobile ? '55px' : '65px',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '6px',
                    border: '1px solid #f0f0f0',
                    p: '4px',
                }}
            />
        </ImageWithBadges>
    );

    const Header = (
        <Box
            sx={{
                px: isMobile ? 2 : 2.5,
                py: isMobile ? 1.5 : 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f0f0f0',
            }}
        >
            <Typography className="poppins" sx={{ fontWeight: 500, fontSize: isMobile ? '13px' : '17px', color: '#222' }}>
                {t('checkout.review_your_order')} ({totalUniqueItems})
            </Typography>
        </Box>
    );

    const Footer = (
        <Box sx={{ px: isMobile ? 2 : 2.5, py: isMobile ? 1.5 : 2, borderTop: '1px solid #f0f0f0' }}>
            <Button
            className="poppins"
                component={Link}
                to={routes.category + '?type=all'}
                variant='contained'
                fullWidth
                size={isMobile ? "small" : "medium"}
                sx={{
                    textTransform: "capitalize",
                    background: '#2858A3',
                    fontWeight: 500,
                    fontSize: isMobile ? '12px' : '14px',
                    borderRadius: '50px',
                    py: isMobile ? 0.8 : 1,
                    '&:hover': { background: '#1d3762' },
                }}
            >
                {t('checkout.continue_shopping')}
            </Button>
        </Box>
    );

    const content = (
        <Box>
            {items.map((row, index) => (
                <Box key={`item-${index}`}>
                    <Box
                        sx={{
                            px: isMobile ? 2 : 2.5,
                            py: isMobile ? 1.5 : 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? 1.5 : 2,
                        }}
                    >
                        {/* Product Image */}
                        <Box sx={{ flexShrink: 0 }}>
                            <ImageComponent row={row} />
                        </Box>

                        {/* Product Name + Price */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                            className="poppins"
                                sx={{
                                    fontSize: isMobile ? '12px' : '13px',
                                    color: '#222',
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    mb: 0.5,
                                }}
                            >
                                {getName(row, i18n.language)}
                            </Typography>
                            <Typography
                            className="poppins"
                                sx={{
                                    fontSize: isMobile ? '13px' : '14px',
                                    color: '#2858A3',
                                    fontWeight: 700,
                                }}
                            >
                                {currency} {Math.round(row.itemTotal * exchangeRate * 100) / 100}
                            </Typography>
              <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.3,
                    flexShrink: 0,
                    width: 'fit-content',
                    border: '1px solid #e0e0e0',
                    borderRadius: '50px',
                    px: 0.3,
                    py: 0.3,
                    background: '#fafafa',
                }}
            >
                <IconButton
                    size="small"
                    onClick={() => updateItemQuantity(row.id, row.quantity - 1)}
                    sx={{
                        width: isMobile ? '20px' : '22px',
                        height: isMobile ? '20px' : '22px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '50px',
                        '&:hover': { backgroundColor: '#bdbdbd' },
                    }}
                >
                    <Remove sx={{ fontSize: isMobile ? '12px' : '13px', color: '#555' }} />
                </IconButton>

                <Typography
                className="poppins"
                    sx={{
                        minWidth: isMobile ? '16px' : '18px',
                        textAlign: 'center',
                        fontSize: isMobile ? '12px' : '13px',
                        fontWeight: 700,
                        color: '#222',
                        userSelect: 'none',
                    }}
                >
                    {row.quantity}
                </Typography>

                <IconButton
                    size="small"
                    onClick={() => updateItemQuantity(row.id, (row.quantity + 1) > row.stocks ? row.stocks : (row.quantity + 1))}
                    sx={{
                        width: isMobile ? '20px' : '22px',
                        height: isMobile ? '20px' : '22px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '50px',
                        '&:hover': { backgroundColor: '#bdbdbd' },
                    }}
                >
                    <Add sx={{ fontSize: isMobile ? '12px' : '13px', color: '#555' }} />
                </IconButton>
            </Box>
                        </Box>

                        {/* Quantity Controls: [ - ] [ count ] [ + ] */}
                    </Box>

                    {/* Divider between items, not after last */}
                    {/* {index < items.length - 1 && (
                        <Divider className="m-2" sx={{ mx: isMobile ? 2 : 2.5 }} />
                    )} */}
                </Box>
            ))}
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                background: "#fff",
                borderRadius: '8px',
                boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                border: isMobile ? '1px solid #e0e0e0' : 'none',
                overflow: 'hidden',
            }}
            role="presentation"
        >
            {Header}
            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    maxHeight: isMobile ? '280px' : '420px',
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-track': { background: '#f5f5f5' },
                    '&::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: '4px' },
                }}
            >
                {content}
            </Box>
            {Footer}
        </Box>
    );
};

export default CartReview;