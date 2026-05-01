import React from "react";
import { Box, Radio, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DeliveryOptions = ({ deliveryType, setDeliveryType, deliveryOptions, currency, exchangeRate }) => {
  const { t } = useTranslation();

  const getLabel = (type) => {
    const key = `checkout.${type}_delivery`;
    const translated = t(key);
    return translated !== key ? translated : type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  };
  const getDescription = (type) => {
    const key = `checkout.${type}_delivery_description`;
    const translated = t(key);
    return translated !== key ? translated : null;
  };

  const handleDeliveryTypeChange = (event) => {
    setDeliveryType(event.target.value);
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
        <p style={{ fontWeight: 600, fontSize: '16px' }}>{t('checkout.delivery_options')}</p>
      </Box>
      <RadioGroup
        value={deliveryType}
        onChange={handleDeliveryTypeChange}
      >
        {deliveryOptions && deliveryOptions.length > 0 ? (
          deliveryOptions.map((option) => {
            const description = getDescription(option.type);
            return (
            <Box 
              key={option.type} 
              className="px-5" 
              style={{ 
                height: 'auto', 
                width: 'auto', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                paddingBottom: '8px'
              }}
            >
              <FormControlLabel
                value={option.type}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography className="poppins" variant="body1" sx={{ fontWeight: 500 }}>
                      {getLabel(option.type)}
                    </Typography>
                    {description && (
                      <Typography className="poppins" variant="caption" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                        {description}
                      </Typography>
                    )}
                  </Box>
                }
              />
              <Typography className="poppins"  variant="body1" sx={{ fontWeight: 600, marginLeft: '16px' , }}>
                {currency} {Math.round((option.cost || 0) * exchangeRate * 100) / 100}
              </Typography>
            </Box>
          ); })
        ) : (
          <Box className="px-5" style={{ height: '50px', width: 'auto', display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              value="standard"
              control={<Radio />}
              label={t('checkout.standard_delivery')}
            />
          </Box>
        )}
      </RadioGroup>
    </Box>
  );
};

export default DeliveryOptions;

