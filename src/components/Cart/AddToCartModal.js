import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import ImageSlider from './ModalContents/ImageSlider';
import Contents from './ModalContents/Contents';

import './../../addtoCartModal.css';
import { useTranslation } from "react-i18next"; // Import i18next

const AddToCartModal = ({ visible, setVisible, product }) => {
    const { t } = useTranslation(); // Hook for translations

    const [quantity, setQuantity] = useState(1);

    return (
        <Rodal
            visible={visible}
            onClose={() => { setVisible(false); setQuantity(1) }}
            width={1000}
            height={window.innerHeight > 590 ? 590 : '90%'}
            measure="px"
            duration={300}
            showMask={true}
            closeOnEsc={true}
            closeMaskOnClick={true}
            customStyles={{ padding: '20px', maxWidth: '100vw', maxHeight: '100vh', color: '#000', borderRadius: '15px' }}
        >
            <div style={{ marginBottom: '20px' }}>
                <Typography variant="h6" className="nunito">
                    <b>{t("cart.add_to_cart")}</b>
                </Typography>
            </div>

            <Grid container className="h-full flex flex-row md:flex-col ">
                <Grid item xs={12} md={4} sx={{ paddingX: 1 }} className='h-[50%] sm:h-[95%]' key='image-section'>
                    <ImageSlider images={product.images} />
                </Grid>

                <Grid item xs={12} md={8} sx={{ paddingX: 1,}} className='h-[40%] sm:h-[95%] overflow-y-auto mb-5' key='content-section'>
                    <Contents product={product} quantity={quantity} setQuantity={setQuantity} />
                </Grid>
            </Grid>
        </Rodal>
    )
}

export default AddToCartModal;