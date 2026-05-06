import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid, Divider, Radio, FormControlLabel, Button, Box, CircularProgress } from '@mui/material';
import { LocationOn, LocalShipping, PostAdd, Flag, Place } from '@mui/icons-material';
import axios from 'axios';
import { BASE_URL } from '../../../../constants';
import { useTranslation } from 'react-i18next';

const AddressCard = ({ index, address,fetchAddresses }) => {
  
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleMakeDefault = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/api/v1/user/address/update/${address.id}?make_default=true`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('token')}`
        }
      });

      if (response.status === 200) {
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error making address default:", error);
    } finally {
      setLoading(false);
    }
  };

  const addressFields = [
    { label: t('address_card.address'), value: address.address, icon: <LocationOn fontSize="small" /> },
    { label: t('address_card.city'), value: address.city, icon: <Place fontSize="small" /> },
    { label: t('address_card.state'), value: address.state, icon: <PostAdd fontSize="small" /> },
    { label: t('address_card.country'), value: address.country, icon: <Flag fontSize="small" /> },
    { label: t('address_card.postal_code'), value: address.postal_code, icon: <LocalShipping fontSize="small" /> },
    { label: t('address_card.default_shipping'), value: address.default_shipping ? t('address_card.yes') : t('address_card.no'), icon: <LocalShipping fontSize="small" /> },
  ];

  return (
    <Box 
      sx={{ 
        border:  '1px solid', 
        borderColor:  'grey.300', 
        borderRadius: 3, 
        p: 3, 
        mb: 4, 
   
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        }
      }}
    
    >
      <CardContent sx={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {!address.default_shipping && (
                <Button 
                variant="contained" 
                className='poppins'
                onClick={(e) => {
                  e.stopPropagation();
                  handleMakeDefault();
                }}
                sx={{ 
                  textTransform: 'capitalize', 
                  padding: '6px 16px', 
                  fontWeight: 500, 
                  borderRadius: 2,
                  minWidth: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2858a3', // Custom color
                  '&:hover': {
                    backgroundColor: '#1e4691', // Slightly darker shade for hover effect
                  },
                  color: '#ffffff', // Ensure text is white for readability
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : t('address_card.set_as_default')}
              </Button>
              
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {addressFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box display="flex" alignItems="center">
                {field.icon}
                <Typography variant="subtitle2" className='poppins' color="textSecondary" sx={{ ml: 1 , fontWeight: 600 , fontSize: {xs: '8px', sm: '10px',md: '12px'}  }}>
                  {field.label}:
                </Typography>
              </Box>
              <Typography variant="body1" className='poppins' sx={{ fontWeight: 500, ml: 3 , fontSize: {xs: '8px', sm: '10px',md: '14px'}  }}>
                {field.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Box>
  );
};

export default AddressCard;
