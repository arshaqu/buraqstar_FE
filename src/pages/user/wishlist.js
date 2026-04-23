import { useEffect, useState } from "react"
import ajaxService from "../../services/ajax-service"
import bg from "./../../assets/category_hero.jpg";
import { AddToWishlist, Hero } from "../../components";
import { Box, ButtonBase, CircularProgress, Fade, Grid, IconButton, Typography } from "@mui/material";
import { ImageURL } from "../../constants";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/contactsvg.svg";

const Wishlist = () => {

    const navigate = useNavigate();

    const [wishlists, setWishlists] = useState([]);
    const [productID, setProductID] = useState(0)

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const initialize = async () => {
        setLoading(true)
        const { success, data } = await ajaxService.get('/user/wishlists', 0, true);
        if (success) {
            setLoading(false)
            setWishlists(data)
        }
    }

    useEffect(() => {
        initialize()
    }, [])

    if (productID > 0) {
        setProductID(0)
        setTimeout(() => {
            setWishlists((prev) => prev.filter(i => i.id !== productID));
        }, 1000);
    }

    const RenderWishlists = () => (
        <>
            {wishlists.map((prod, i) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    // style={{ transitionDelay: `${i * 0.1}s` }}
                    style={{ transition: "transform 0.7s ease-in, opacity 0.7s ease-in" }}

                    key={prod.id || i}
                >
                    <ButtonBase
                        onClick={() => navigate('/product/' + prod.slug)}
                        sx={{ width: '100%' }}
                    >
                        <Box className="w-full max-w-[360px] lg:max-w-[41vh] mx-auto products-box">
                            <Box className="bg-white relative h-[260px] sm:h-[320px] w-full flex justify-center items-center rounded-2xl">
                                <div className="image-div">
                                    <img
                                        className="max-h-[70%] w-auto hover-image2 object-contain"
                                        src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
                                        alt={prod.name}
                                    />
                                    <img
                                        className="max-h-[70%] w-auto object-contain hover-img"
                                        src={prod.images?.[1] ? ImageURL + prod.images[1] : (prod.images?.[0] ? ImageURL + prod.images[0] : defaultImage)}
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
                                        products={wishlists}
                                        setProducts={setWishlists}
                                        viaCategory={true}
                                        open={open}
                                        setOpen={setOpen}
                                        setProductID={setProductID}
                                    />
                                </Box>


                            </Box>
                            <Box className="text-center py-6 px-3">
                                <Typography className="poppins uppercase text-xs">
                                    {prod.name}
                                </Typography>
                                <Box className="flex justify-center gap-x-4 pt-1">
                                    {prod.discount_price && (
                                        <Typography className="poppins uppercase text-sm text-[#FF0F0F]">
                                            {prod.currency} {prod.discount_price}
                                        </Typography>
                                    )}
                                    <Typography
                                        className={`poppins uppercase text-md font-bold ${prod.discount_price && "line-through"}`}
                                    >
                                        {prod.currency} {prod.price}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </ButtonBase>
                </Grid>
            ))}
        </>
    )



    return (
        <>
            {/* Loader */}
            <Grid item xs={12} className="px-2.5 mb-5" style={{ textAlign: 'center' }} >
                <Fade
                    in={loading}
                    style={{
                        transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Grid>

            <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                className="px-2.5"
            >
                {wishlists.length === 0 && !loading ? (
                    <Grid item xs={12} className="mb-5 text-center">
                        No product wishlisted
                    </Grid>
                ) : (
                    <RenderWishlists />
                )}
            </Grid>
        </>
    )
}

export default Wishlist