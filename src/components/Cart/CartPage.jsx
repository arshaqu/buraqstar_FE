import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Divider,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
// import CloseIcon from '@mui/icons-material/Close';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import { CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CartSummary from "./CartSummary";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { BASE_URL, ImageURL } from "../../constants";
import defaultImage from "../../assets/contactsvg.svg";
import { useCart } from "react-use-cart";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { t } = useTranslation(); // Hook for translations
  // const { CartId } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const {
    addItem,
    items,
    cartTotal,
    emptyCart,
    removeItem,
    updateItemQuantity,
  } = useCart();

  // useEffect(()=> {
  //     if(CartId) {
  //         setLoading(true)
  //         axios.post(`${BASE_URL}/api/v1/carts`, {
  //             cart_id: CartId,
  //             type: ''
  //         },{
  //             headers: {
  //                 Authorization: `Bearer ${localStorage?.getItem('token')}`
  //             },
  //         })
  //         .then((res) => {
  //             const products = res?.data?.cart_items.map((item) => {
  //                 return {
  //                     cart_id: item?.id,
  //                     product: item?.product,
  //                     quantity: item?.quantity,
  //                 };
  //             });
  //             setItems(products)
  //             setLoading(false)
  //         })
  //         .catch((error) => {
  //           console.error("Error:", error);
  //           setLoading(false)
  //         });
  //     }

  // }, [CartId])

  // Handlers to update quantities

  // const handleIncrement = (qty, id) => {

  //     axios.post(`${BASE_URL}/api/v1/carts/change-quantity`, {
  //         cart_id: id,
  //         type: 'plus'
  //     },{
  //         headers: {
  //             Authorization: `Bearer ${localStorage?.getItem('token')}`
  //         },
  //     })
  //     .then((res) => {
  //         if(res?.data?.success) {
  //             setItems(prevCartItems =>
  //                 prevCartItems.map(item =>
  //                     item.cart_id === id
  //                         ? { ...item, quantity: (Number(item.quantity) + 1).toString() }
  //                         : item
  //                 )
  //             );
  //         }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // const handleDecrement = (qty, id) => {
  //     if (qty <= 1) return;
  //     axios.post(`${BASE_URL}/api/v1/carts/change-quantity`, {
  //         cart_id: id,
  //         type: 'minus'
  //     },{
  //         headers: {
  //             Authorization: `Bearer ${localStorage?.getItem('token')}`
  //         },
  //     })
  //     .then((res) => {
  //         if(res?.data?.success) {
  //             setItems(prevCartItems =>
  //                 prevCartItems.map(item =>
  //                     item.cart_id === id
  //                         ? { ...item, quantity: (Number(item.quantity) - 1).toString() }
  //                         : item
  //                 )
  //             );
  //         }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  // const handleDeleteItem = (id) => {
  //     axios.post(`${BASE_URL}/api/v1/carts/destroy`, {
  //         cart_id: id,
  //     },{
  //         headers: {
  //             Authorization: `Bearer ${localStorage?.getItem('token')}`
  //         },
  //     })
  //     .then((res) => {
  //         if(res?.data?.success) {
  //             const products = items.filter((item) => item?.cart_id !== id);
  //             setItems(products)
  //         }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  // const CalcTotal = (cartItems) => {
  //     const total = cartItems.reduce((acc, item) => {
  //         const quantity = Number(item.quantity);
  //         const price = item?.product?.price || 0;
  //         return acc + (quantity * price);
  //     }, 0);

  //     setCartTotal(total)
  // }

  // useEffect(()=> {
  //     CalcTotal(items)
  // }, [items])

  const content = (
    <>
      {items.map((row, index) => (
        <>
          <Box
            key={`box-${index}`}
            style={{
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={row?.img ? `${ImageURL}${row.img}` : defaultImage}
              height="70px"
              width="70px"
            />

            <Box>
              <p
                className="text-[12px]"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "126.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {t(`main_products.${row?.name}`, row?.name)}
              </p>

              <Box className="flex items-center justify-between bg-transparent px-3 py-1.5">
                <IconButton
                  size="small"
                  className="bg-[#2858A3]"
                  onClick={() => updateItemQuantity(row.id, row.quantity - 1)}
                >
                  <Remove className="text-sm text-white" />
                </IconButton>
                <span className="px-4">{row?.quantity}</span>
                {/* <span className="px-4">{quantities[index]}</span> */}
                <IconButton
                  size="small"
                  className="bg-[#2858A3]"
                  onClick={() => updateItemQuantity(row.id, row.quantity + 1)}
                >
                  <Add className="text-sm text-white" />
                </IconButton>
              </Box>
            </Box>

            <Box className="text-[14px]">
              {/* <p className="line-through">{row?.product?.price}</p> */}
              <p className="text-[#2858A3]">
                {row?.quantity === 1 ? (
                  <>
                    {row?.price ? row?.price : "0.0"}&nbsp;
                    {row?.currency ? row?.currency : "AED"}
                  </>
                ) : (
                  <>
                    {row?.quantity} * {row?.price ? row?.price : "0.0"} ={" "}
                    {row?.itemTotal.toFixed(2)}{" "}
                    {row?.currency ? row?.currency : "AED"}
                  </>
                )}
              </p>
            </Box>

            <DeleteOutlineIcon
              style={{
                fontSize: "1.25rem",
                color: "#909090",
                position: "relative",
                top: "100%",
                cursor: "pointer",
              }}
              onClick={() => removeItem(row?.id)}
            />
          </Box>

          <Divider />
        </>
      ))}
    </>
  );

  return (
    <Grid className="w-full h-fit py-12 sm:py-16 px-10 sm:px-10 flex flex-col sm:flex-row gap-16">
      <Box className="w-full sm:w-[60%] hidden lg:block">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress size={150} className="text-white" />
          </div>
        ) : !loading && items?.length === 0 ? (
          <Typography className="poppins font-semibold uppercase text-[32px] text-black w-full h-full flex justify-center items-center">
            Your Cart is Empty
          </Typography>
        ) : (
          <> {content} </>
        )}
      </Box>
      <Box className="w-full sm:w-[40%] pt-0 sm:pt-4">
        <CartSummary cartTotal={Number(cartTotal)} />
      </Box>
    </Grid>
  );
};

export default CartPage;

// const Header = (
//     <>
//         <Box className="p-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Box style={{ display: 'flex' }}>
//                 <ShoppingCartCheckoutIcon className='text-[#2858a3]' style={{ fontWeight: 900, fontSize: '2.5em' }} />
//                 <p style={{ fontWeight: 900, fontSize: 'px' }}>{itemsLength} Item(s)</p>
//             </Box>
//             <IconButton onClick={() => setOpen(false)}>
//                 <CloseIcon />
//             </IconButton>
//         </Box>
//         <Divider />
//     </>
// )

// const handleIncrement = (index) => {
//     setQuantities({
//         ...quantities,
//         [index]: quantities[index] + 1,
//     });
// };

// const handleDecrement = (index) => {
//     setQuantities({
//         ...quantities,
//         [index]: Math.max(1, quantities[index] - 1),
//     });
// };

// const rows = [
//     { id: 1, name: "Peter England Men's Slim Fit Formal Shirt", price: '$35.00', img: "https://shop.activeitzone.com/public/uploads/all/dCJrKJkUT3OHDIuXNYLyyKyNg84zGHued37VlrDW.png" },
//     { id: 2, name: "ASUS ROG Phone 5 Dual Sim S888 Phantom", price: '$42.00', img: "https://shop.activeitzone.com/public/uploads/all/VlFKAwBynDPebbSce8FVsMPhfmu7sjSUapp3JIQw.png" },
//     { id: 3, name: 'Lannister', price: '$45.00', img: "https://shop.activeitzone.com/public/uploads/all/5ywHNpwAY6dNOapwWjUgLoeYsm18ZRwdU5PzXqJM.png" },
//     { id: 4, name: "Microsoft Surface Arc Mouse, - CZV-00001", price: '$16.00', img: "https://shop.activeitzone.com/public/uploads/all/brO9DLQukZXwzHMH9vExLST8L8w31nDk0ZqMxe3k.png" },
// ];

// const initialQuantities = rows?.reduce((acc, row, index) => {
//     acc[index] = 1; // Default quantity
//     return acc;
// }, {});

// const [quantities, setQuantities] = useState(initialQuantities);
