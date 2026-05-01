import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid, Divider, Radio, FormControlLabel, Button, Box, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LocationOn, LocalShipping, PostAdd, Flag, Place, Edit, Delete, Phone } from '@mui/icons-material';
import axios from 'axios';
import { BASE_URL } from "../../constants";

const AddressCard = ({ index, address, selectedAddress, onSelect, fetchAddresses, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (address.default_shipping && !selectedAddress) {
      onSelect(address.id);
    }
  }, [address.default_shipping, selectedAddress, address.id, onSelect]);

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

  const handleDeleteClick = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL}/api/v1/user/address/${address.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('token')}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        fetchAddresses();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert(error.response?.data?.message || "Failed to delete address. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const addressFields = [
    { label: 'Address', value: address.address, icon: <LocationOn fontSize="small" /> },
    { label: 'City', value: address.city, icon: <Place fontSize="small" /> },
    { label: 'State', value: address.state, icon: <PostAdd fontSize="small" /> },
    { label: 'Country', value: address.country, icon: <Flag fontSize="small" /> },
    { label: 'Postal Code', value: address.postal_code || 'N/A', icon: <LocalShipping fontSize="small" /> },
    { label: 'Phone', value: address.phone || 'N/A', icon: <Phone fontSize="small" /> },
    { label: 'Default Shipping', value: address.default_shipping ? 'Yes' : 'No', icon: <LocalShipping fontSize="small" /> },
  ];

  return (
    <Box 
      sx={{ 
        border: selectedAddress === address.id ? '2px solid' : '1px solid', 
        borderColor: selectedAddress === address.id ? 'primary.main' : 'grey.300', 
        borderRadius: 3, 
        p: 3, 
        mb: 4, 
        backgroundColor: selectedAddress === address.id ? '#058af30d' : 'background.paper',
        boxShadow: selectedAddress === address.id ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        }
      }}
      onClick={() => onSelect(address.id)}
    >
      <CardContent sx={{ padding: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={{ xs: 2, sm: 0 }}>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'space-between', sm: 'flex-start' }} gap={1} width={{ xs: '100%', sm: 'auto' }}>
                <FormControlLabel
                  control={
                    <Radio 
                    className='poppins'
                      checked={selectedAddress === address.id}
                      onChange={() => onSelect(address.id)}
                      value={address.id}
                      name="address-radio"
                      color="primary"
                      sx={{
                        transform: 'scale(1.2)',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        }
                      }}
                    />
                  }
                  label="Use this address"
                  sx={{ ml: 0, fontWeight: 600 }}
                />
                <Box display="flex" gap={1} alignItems="center">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEdit) onEdit(address);
                    }}
                    sx={{
                      color: '#000000',
                      '&:hover': {
                        backgroundColor: '#2858a310',
                      }
                    }}
                    size="small"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  {!address.default_shipping && (
                    <IconButton
                    
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDeleteClick(e);
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      sx={{
                        color: '#FF3030',
                        '&:hover': {
                          backgroundColor: '#FF303010',
                        }
                      }}
                      size="small"
                      disabled={deleteLoading}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              {!address.default_shipping && (
                <Button 
                  variant="contained" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMakeDefault();
                  }}
                  className='poppins'
                  sx={{ 
                    textTransform: 'capitalize', 
                    padding: '6px 16px', 
                    fontWeight: 500, 
                    borderRadius: 6,
                    minWidth: '120px',
                    width: { xs: '100%', sm: 'auto' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2858a3',
                    '&:hover': {
                      backgroundColor: '#1e4691',
                    },
                    color: '#ffffff',
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Set as Default'}
                </Button>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Grid>

          {addressFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box display="flex" alignItems="center">
                {field.icon}
                <Typography className='poppins' variant="subtitle2" color="textSecondary" sx={{ fontWeight: 600, ml: 1 }}>
                  {field.label}:
                </Typography>
              </Box>
              <Typography className='poppins' variant="body1" sx={{ fontWeight: 500, ml: 3 }}>
                {field.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={(e) => {
          e?.stopPropagation();
          handleDeleteCancel();
        }}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Address
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this address? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCancel();
            }} 
            color="primary" 
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteConfirm();
            }} 
            color="error" 
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressCard;
