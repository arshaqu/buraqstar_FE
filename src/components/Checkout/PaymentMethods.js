import React, { useState } from "react";
import { Box, Radio, FormControlLabel, RadioGroup } from "@mui/material";
import NetworkLogo from "../../assets/Network-payment-method.svg";

const PaymentMethods = ({ paymentType, setPaymentType, t }) => {

  const handleMethodChange = (event) => {
    setPaymentType(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: "#fff",
        borderRadius: '4px',
        marginBottom: '16px',
        paddingBottom: '15px'
      }}
      role="presentation"
    >
      <Box className="px-5 pt-5 pb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p className="poppins" style={{ fontWeight: 600, fontSize: '16px' }}>{t('checkout.payment_methods')}</p>
      </Box>
      <RadioGroup
        value={paymentType}
        onChange={handleMethodChange}
      >
        <Box className="px-5 " style={{ height: '50px', width: 'auto', display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            value="cash_on_delivery"
            control={<Radio />}
            label={t('checkout.cash_on_delivery')}
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Poppins'
              }
            }}
          />
        </Box>
        <Box className="px-5" style={{ height: '50px', width: 'auto', display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            value="network_payment"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={NetworkLogo} alt="Network Payment" style={{ height: '24px', width: 'auto', marginLeft: '8px' }} />
              </Box>
            }
          />
        </Box>
      </RadioGroup>
    </Box>
  );
};

export default PaymentMethods;
