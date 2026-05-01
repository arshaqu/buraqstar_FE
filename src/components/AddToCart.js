import { Button, CircularProgress } from "@mui/material";
import { useState, useContext } from "react";
import { useCart } from "react-use-cart";
import NotificationBar from "./NotificationBar";
import { BASE_URL } from "../constants";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useTranslation } from "react-i18next"; // Import i18next
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const AddToCart = ({ variant = "contained", className, quantity = 1, product }) => {
    const { t } = useTranslation(); // Hook for translations
    const { setCartId } = useContext(AuthContext);
    const { addItem } = useCart();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    const handleClick = (e, product) => {
        e.stopPropagation();

        const data = {
            id: product.id,
            name: product.name,
            name_ar: product.name_ar || product.name,
            name_ur: product.name_ur || product.name,
            stocks: product.stocks,
            price: product.discount_price ?? product.price,
            tax: product.tax || 0,
            quantity: quantity,
            img: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : ""
        };

        setLoading(true);
        if (product.stocks !== 0) {
            addItem(data, quantity);
            setMessage(t('cart.product_added'));
            setOpen(true);
            setLoading(false);
        } else if (product.stocks === 0) {
            setOutOfStock(true);
            setLoading(false);
            setMessage(t('cart.out_of_stock'));
            setOpen(true);
            return;
        }
    };

    return (
        <>
            <Button variant={variant} className={className} onClick={(e) => handleClick(e, product)}>
                {loading && <CircularProgress size={25} className="text-white" />}
                {!loading && t("cart.add_to_cart")}
                          <ShoppingCartOutlinedIcon className="ml-2"/>
                
            </Button>

            <NotificationBar
                open={open}
                setOpen={setOpen}
                type={outOfStock ? "error" : "success"}
                message={message}
            />
        </>
    );
};

export default AddToCart;