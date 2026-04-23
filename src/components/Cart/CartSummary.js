
import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const CartSummary = ({cartTotal}) => {

    const Header = (
        <>
            <Box className="p-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box style={{ display: 'flex' }}>
                    {/* <ShoppingCartCheckoutIcon className='text-[#2858a3]' style={{ fontWeight: 900, fontSize: '2.5em' }} /> */}
                    <p style={{ fontWeight: 900, fontSize: 'px' }}>Cart Summary</p>
                </Box>
            </Box>
            {/* <Divider /> */}
        </>
    )

    const Footer = (
        <Box className="p-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/checkout" variant='contained' className="w-[100%]" style={{ textTransform: "capitalize", background: '#2858A3', fontWeight: 800 }}>Checkout</Button>
        </Box>
    )


    const content = (
        <>
            <Box style={{ padding: '15px 15px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}> Sub Total </p>
                <p className="text-[14px]"> AED {cartTotal}</p>
            </Box>

            <Box style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}> Shipping </p>
                <p className="text-[14px]"> 0.00 </p>
            </Box>
            <Divider />
            <Box style={{ padding: '15px 15px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>Order Total </p>
                <p className="text-[16px] font-[600]"> AED {cartTotal} </p>
            </Box>
        </>
    )

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: "#fff",
                    borderRadius: '4px'
                }}
                role="presentation"
            >
                {Header}
                    <Box sx={{ flex: '1 1 auto', overflow: 'auto', paddingX: 1 }}>
                        {content}
                    </Box>
                {Footer}
            </Box>
        </>
    )
}

export default CartSummary