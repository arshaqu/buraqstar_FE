import { useState, useEffect } from "react";
import { IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotificationBar from "./NotificationBar";
import ajaxService from "../services/ajax-service";

const AddToWishlist = ({ product, products, setProducts, viaCategory = false, open, setOpen, setProductID }) => {

    const [isWishlisted, setIsWishlisted] = useState(product.wishlisted || false);
    let ajaxQueue = Promise.resolve();

    useEffect(() => {
        setIsWishlisted(product.wishlisted || false);
    }, [product.wishlisted]);

    const handleWishlist = async (e, productID, wishlisted) => {
        e.stopPropagation();

        if (!localStorage.getItem("token")) {
            return setOpen(true);
        }

        // Update local state immediately for instant visual feedback
        setIsWishlisted(wishlisted);

        // for wishlist
        if(setProductID){
            setProductID(productID)
        }

        const index = products.findIndex(i => i.id === productID);

        const updatedProducts = [...products];

        updatedProducts[index] = {
            ...updatedProducts[index],
            wishlisted: wishlisted
        };

        setProducts(updatedProducts);

        apiRequests(wishlisted, productID);
    }

    function apiRequests(wishlisted, productID) {
        ajaxQueue = ajaxQueue.then(async () => {
            let response;

            if (wishlisted) {
                response = await ajaxService.post('/user/wishlists', { product_id: productID });
            } else {
                response = await ajaxService.delete('/user/wishlists/', productID);
            }

            // Revert whishlist after response success is false
            if (!response.success) {
                setIsWishlisted(!wishlisted);
                setProducts(products.map(product => {
                    if (product.id === productID) {
                        return {
                            ...product,
                            wishlisted: !wishlisted
                        };
                    }
                    return product;
                }));
            }
        })
    }

    return (
        <>
            <IconButton onClick={(e) => handleWishlist(e, product.id, !isWishlisted)}>
                {isWishlisted ? <FavoriteIcon className="text-[#FF0F0F] text-xl" /> : <FavoriteBorderIcon className="text-[#FF0F0F] text-xl" />}
            </IconButton>
            {
                viaCategory &&
                <Notification open={open} setOpen={setOpen} />
            }

        </>
    )

}

const Notification = ({ open, setOpen }) => (
    <NotificationBar
        open={open}
        setOpen={setOpen}
        type="error"
        message="Oops! To add products to your wishlist, please log in first."
    />
)

export { AddToWishlist, Notification }