import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Divider, Radio, FormControlLabel, Box, Button, CircularProgress, Skeleton } from '@mui/material';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddressForm = ({ formData, handleChangeLocation, errors, handleChange, setstateid, setCountryid, countryid, stateid, generalError, handleAddAddress, loading, isEditMode = false, defaultCountry, defaultState, defaultCity, loadingCities = false, handlePhoneChange, handlePhoneBlur }) => {

    return (
        <Box className="p-5 flex flex-col gap-4 bg-white">
            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    Delivery Address<span className="text-[red]">*</span>
                </Typography>
                <input
                    id="delivery_address"
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
                    placeholder="e.g. Unit 1, 123 Main Street"
                    error={!!errors.delivery_address}
                    helperText={errors.delivery_address}
                />
                {errors.delivery_address && (
                    <Typography variant="body2" className='poppins' color="error">
                        {errors.delivery_address}
                    </Typography>
                )}
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    Country<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full">
                    <CountrySelect
                        id="country"
                        name="country"
                        countryid={countryid}
                        defaultValue={defaultCountry}
                        onChange={(e) => {
                            setCountryid(e.id);
                            handleChangeLocation(e, "country");
                        }}
                        placeHolder="Select Country"
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
                    State<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full">
                    <StateSelect
                        key={`state-${countryid}`}
                        id="state"
                        name="state"
                        countryid={countryid}
                        defaultValue={defaultState}
                        onChange={(e) => {
                            setstateid(e.id);
                            handleChangeLocation(e, "state");
                        }}
                        placeHolder="Select State"
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
                    City<span className="text-[red]">*</span>
                </Typography>
                <Box className="w-full relative">
                    {loadingCities && (
                        <Box 
                            sx={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                right: 0, 
                                bottom: 0, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                zIndex: 10,
                                borderRadius: '4px',
                                pointerEvents: 'none'
                            }}
                        >
                            <CircularProgress size={20} />
                        </Box>
                    )}
                    <CitySelect
                        key={`city-${stateid}-${countryid}`}
                        id="city"
                        name="city"
                        stateid={stateid}
                        countryid={countryid}
                        defaultValue={defaultCity}
                        onChange={(e) => {
                            handleChangeLocation(e, "city");
                        }}
                        placeHolder={loadingCities ? "Loading cities..." : "Select City"}
                        className="w-[100%]"
                        error={!!errors.city}
                        disabled={loadingCities}
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
                    Post Code/Zip code
                </Typography>
                <input
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
                    placeholder="e.g. 12345"
                    error={!!errors.zip_code}
                    helperText={errors.zip_code}
                />
                {errors.zip_code && (
                    <Typography variant="body2" color="error">
                        {errors.zip_code}
                    </Typography>
                )}
            </Box>

            <Box className="flex flex-col items-start w-full gap-1">
                <Typography className="poppins font-semibold uppercase text-xs text-black">
                    Phone
                </Typography>
                <Box className="w-full">
                    <ReactPhoneInput
                        country={'ae'}
                        value={formData.phone ? (formData.phone.startsWith('+') ? formData.phone.substring(1) : formData.phone) : ''}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        inputClass="poppins"
                        buttonClass="poppins"
                        containerClass={errors.phone ? 'phone-input-error' : ''}
                        inputStyle={{
                            width: '100%',
                            height: '42.5px',
                            fontSize: '14px',
                            fontFamily: 'Poppins, sans-serif',
                            backgroundColor: '#ffffff',
                            border: errors.phone ? '1px solid #d32f2f' : '1px solid #cccccc',
                            borderRadius: '6px',
                            paddingLeft: '48px',
                        }}
                        buttonStyle={{
                            backgroundColor: '#ffffff',
                            border: errors.phone ? '1px solid #d32f2f' : '1px solid #cccccc',
                            borderRight: 'none',
                            borderRadius: '6px 0 0 6px',
                            height: '42.5px',
                        }}
                    />
                    {errors.phone && (
                        <Typography variant="caption" className='poppins' sx={{ color: '#d32f2f', mt: 0.5, ml: 1, display: 'block', fontSize: '0.75rem' }}>
                            {errors.phone}
                        </Typography>
                    )}
                </Box>
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
                {loading ? <CircularProgress size={24} color="inherit" /> : isEditMode ? 'Update Address' : 'Add Address'}
            </Button>

        </Box>
    );
};

export default AddressForm;
