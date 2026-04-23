import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Grid, Divider, Radio, FormControlLabel, Box, Button, CircularProgress } from '@mui/material';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";

const AddressForm = ({ formData, handleChangeLocation, errors, handleChange, setstateid, setCountryid, countryid, stateid, generalError, handleAddAddress, loading }) => {
    const { t } = useTranslation();

    return (
        <Box className="p-5 flex flex-col gap-4 bg-white">
            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    {t('delivery_address.title')}<span className="text-[red]">*</span>
                </Typography>
                <input
                    id="delivery_address"
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
                    placeholder={t('delivery_address.address_placeholder')}
                    error={!!errors.delivery_address}
                    helperText={errors.delivery_address}
                />
                {errors.delivery_address && (
                    <Typography variant="body2" color="error">
                        {errors.delivery_address}
                    </Typography>
                )}
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    {t('delivery_address.country')}<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full">
                    <CountrySelect
                        id="country"
                        name="country"
                        countryid={countryid}
                        onChange={(e) => {
                            setCountryid(e.id);
                            handleChangeLocation(e, "country");
                        }}
                        placeHolder={t('delivery_address.select_country')}
                        className="w-[100%]"
                        error={!!errors.country}
                    />
                    {errors.country && (
                        <Typography variant="body2" color="error">
                            {errors.country}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    {t('delivery_address.state')}<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full">
                    <StateSelect
                        id="state"
                        name="state"
                        countryid={countryid}
                        onChange={(e) => {
                            setstateid(e.id);
                            handleChangeLocation(e, "state");
                        }}
                        placeHolder={t('delivery_address.select_state')}
                        className="w-[100%]"
                        error={!!errors.state}
                    />
                    {errors.state && (
                        <Typography variant="body2" color="error">
                            {errors.state}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    {t('delivery_address.city')}<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full">
                    <CitySelect
                        id="city"
                        name="city"
                        stateid={stateid}
                        countryid={countryid}
                        onChange={(e) => {
                            handleChangeLocation(e, "city");
                        }}
                        placeHolder={t('delivery_address.select_city')}
                        className="w-[100%]"
                        error={!!errors.city}
                    />
                    {errors.city && (
                        <Typography variant="body2" color="error">
                            {errors.city}
                        </Typography>
                    )}
                </Box>
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    {t('delivery_address.post_code')}
                </Typography>
                <input
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
                    placeholder={t('delivery_address.postcode_placeholder')}
                    error={!!errors.zip_code}
                    helperText={errors.zip_code}
                />
                {errors.zip_code && (
                    <Typography variant="body2" color="error">
                        {errors.zip_code}
                    </Typography>
                )}
            </Box>

            {generalError && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    {generalError}
                </Typography>
            )}


            <Button
                variant="contained"
                className="poppins"
                onClick={handleAddAddress}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : t('delivery_address.add_address')}
            </Button>

        </Box>
    );
};

export default AddressForm;
