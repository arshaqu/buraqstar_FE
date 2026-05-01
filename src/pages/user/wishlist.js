import { useEffect, useState } from "react"
import ajaxService from "../../services/ajax-service"
import { AddToWishlist, Hero } from "../../components";
import { Box, CircularProgress, Fade, Grid, ButtonBase, Typography } from "@mui/material";
import { ImageURL } from "../../constants";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/contactsvg.svg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlists, setWishlists] = useState([]);
    const [productID, setProductID] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

const initialize = async () => {
    setLoading(true);

    try {
        const response = await ajaxService.get('/user/wishlists', 0, true);
        console.log("API FULL RESPONSE:", response);

        if (!response) {
            console.error("Response is undefined");
            return;
        }

        const { success, data } = response;

        if (success) {
            setWishlists(data);
        } else {
            console.error("API returned success false");
        }

    } catch (error) {
        console.error("API ERROR:", error);
    }

    setLoading(false);
};

    useEffect(() => { initialize(); }, []);

    if (productID > 0) {
        setProductID(0);
        setTimeout(() => {
            setWishlists((prev) => prev.filter(i => i.id !== productID));
        }, 1000);
    }



    const ProductCard = ({ prod }) => {
        const hasDiscount = prod.discount_price && prod.discount_price < prod.price;
        const discountPercent = hasDiscount
            ? Math.round(((prod.price - prod.discount_price) / prod.price) * 100)
            : null;

        return (
            <Box
                sx={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #efefef",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    cursor: "pointer",
                    position: "relative",
                    "&:hover": {
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                        transform: "translateY(-3px)",
                    },
                }}
            >
                {/* Image area */}
                <Box
                    sx={{
                        position: "relative",
                        background: "#ffffff",
                        height: "220px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderBottom:'1px solid #e6e5e5',

                    }}
                    onClick={() => navigate('/product/' + prod.slug)}
                >
                    {/* Badge */}
                    {discountPercent && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "#2858A3",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 500,
                                fontFamily: "Poppins, sans-serif",
                                borderRadius: "6px",
                                px: "8px",
                                py: "3px",
                                zIndex: 2,
                                letterSpacing: "0.3px",
                            }}
                        >
                            -{discountPercent}%
                        </Box>
                    )}
                    {prod.hot && !discountPercent && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "#1a1a2e",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 500,
                                fontFamily: "Poppins, sans-serif",
                                borderRadius: "6px",
                                px: "8px",
                                py: "3px",
                                zIndex: 2,
                            }}
                        >
                            NEW
                        </Box>
                    )}

                    {/* Wishlist heart button */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 2,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AddToWishlist
                            product={prod}
                            products={wishlists}
                            setProducts={setWishlists}
                            viaCategory={true}
                            open={open}
                            setOpen={setOpen}
                            setProductID={setProductID}
                        />
                    </Box>

                    {/* Product image */}
                    <img
                        src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
                        alt={prod.name}
                        style={{
                            maxHeight: "160px",
                            maxWidth: "80%",
                            objectFit: "contain",
                            transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                </Box>

                {/* Info area */}
                <Box
                    sx={{ p: "14px 16px 18px", cursor: "pointer" }}
                    onClick={() => navigate('/product/' + prod.slug)}
                >
   

                    {/* Category */}
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "11px",
                            color: "#aaa",
                            mt: "6px",
                            textTransform: "capitalize",
                            
                        }}
                    >
                        {prod.item_code || "PRODUCT CODE"}
                    </Typography>

                    {/* Product name */}
                    <Typography
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontSize: "13px",
                            color: "#1d3762",
                            mt: "3px",
                            lineHeight: 1.4,
                            overflow: "hidden",
                            display: "-webkit-box",
                           
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {prod.name}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mt: "8px", flexWrap: "wrap" }}>
                        {hasDiscount ? (
                            <>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: "#1a1a2e",
                                    }}
                                >
                                    {prod.currency} {prod.discount_price}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "13px",
                                        color: "#aaa",
                                        textDecoration: "line-through",
                                    }}
                                >
                                    {prod.currency} {prod.price}
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    color: "#1a1a2e",
                                }}
                            >
                                {prod.currency} {prod.price}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    };

    const RenderWishlists = () => (
        <>
            {wishlists.map((prod, i) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={prod.id || i}
                    style={{ transition: "transform 0.7s ease-in, opacity 0.7s ease-in" }}
                >
                    <ProductCard prod={prod} />
                </Grid>
            ))}
        </>
    );

    return (
        <>
            {/* Loader */}
            <Grid item xs={12} className="px-2.5 mb-5" style={{ textAlign: "center" }}>
                <Fade
                    in={loading}
                    style={{ transitionDelay: loading ? "800ms" : "0ms" }}
                    unmountOnExit
                >
                    <CircularProgress sx={{ color: "#2858A3" }} />
                </Fade>
            </Grid>

            <Grid container spacing={{ xs: 2, sm: 3 }} className="px-2.5">
                {wishlists.length === 0 && !loading ? (
                    <Grid item xs={12} className="mb-5 text-center">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                py: 8,
                                gap: 2,
                            }}
                        >
                            <FavoriteIcon sx={{ fontSize: 56, color: "#e0e0e0" }} />
                            <Typography
                                sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontSize: "16px",
                                    color: "#aaa",
                                    fontWeight: 500,
                                }}
                            >
                                No products wishlisted yet
                            </Typography>
                        </Box>
                    </Grid>
                ) : (
                    <RenderWishlists />
                )}
            </Grid>
        </>
    );
};

export default Wishlist;