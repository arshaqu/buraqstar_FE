import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
// import axios from "axios";
// import { BASE_URL } from "../../constants";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CheckoutForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  setShippingCost,
  setDeliveryOptions,
  setDeliveryType,
  t
}) => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const { isLoggedIn } = useContext(AuthContext)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear previous error message when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Helper function to validate phone number length (8-12 digits excluding country code)
  const validatePhoneNumber = (phoneValue) => {
    if (!phoneValue || !phoneValue.trim()) {
      return "Phone number is required";
    }
    
    // Extract phone number without country code
    // Remove + if present and get only digits
    const phoneDigitsOnly = phoneValue.toString().replace(/\D/g, '');
    
    // Detect country code length based on common patterns
    let countryCodeLength = 0;
    if (phoneDigitsOnly.startsWith('971')) {
      countryCodeLength = 3; // UAE
    } else if (phoneDigitsOnly.startsWith('1')) {
      countryCodeLength = 1; // US/Canada
    } else if (phoneDigitsOnly.startsWith('44') || phoneDigitsOnly.startsWith('91') || 
               phoneDigitsOnly.startsWith('86') || phoneDigitsOnly.startsWith('81') ||
               phoneDigitsOnly.startsWith('49') || phoneDigitsOnly.startsWith('33')) {
      countryCodeLength = 2; // UK, India, China, Japan, Germany, France
    } else if (phoneDigitsOnly.startsWith('7')) {
      countryCodeLength = 1; // Russia
    } else {
      // Default: try to detect based on length
      if (phoneDigitsOnly.length > 12) {
        countryCodeLength = 3;
      } else if (phoneDigitsOnly.length > 10) {
        countryCodeLength = 2;
      } else {
        countryCodeLength = 1;
      }
    }
    
    const phoneNumberOnly = phoneDigitsOnly.substring(countryCodeLength);
    const phoneLength = phoneNumberOnly.length;
    
    if (phoneLength < 8 || phoneLength > 12) {
      return "Please enter a valid phone number";
    }
    
    return null; // No error
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    setFormData({
      ...formData,
      phone: value.startsWith('+') ? value : `+${value}`,
    });
    // Clear phone error when user starts typing
    setErrors({
      ...errors,
      phone: "",
    });
  };

  const handlePhoneBlur = () => {
    // Validate phone number when user leaves the field
    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      setErrors({
        ...errors,
        phone: phoneError,
      });
    }
  };

  const handleChangeLocation = (event, field) => {
    const { id, name } = event;
    if (field === "country") {
      setFormData({ ...formData, country: name, state: '', city: '' });
    } else if (field === "state") {
      setFormData({ ...formData, state: name, city: '' });
    } else if (field === "city") {
      axios.post(`${BASE_URL}/api/v1/checkout/get-shipping-cost`, {
        city: event
      })
        .then((res) => {
          // Process delivery options from API response (store only type + cost; labels translated at render so language switch works)
          const options = [];
          if (res.data.standard_delivery_cost !== undefined) {
            options.push({ type: 'standard', cost: res.data.standard_delivery_cost });
          }
          if (res.data.express_delivery_cost !== undefined) {
            options.push({ type: 'express', cost: res.data.express_delivery_cost });
          }
          
          if (setDeliveryOptions) {
            setDeliveryOptions(options);
          }
          if (options.length > 0) {
            if (setDeliveryType) {
              setDeliveryType(options[0].type);
            }
            setShippingCost(options[0].cost);
          } else {
            setShippingCost(res.data.standard_delivery_cost || 0);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setFormData({ ...formData, city: name });
    }
  };

  // useEffect(()=> {
  //   axios.get(`${BASE_URL}/api/v1/all-countries`, {},{
  //       headers: {
  //           Authorization: `Bearer ${localStorage?.getItem('token')}`
  //       },
  //   })
//   .then((res) => {
//       // Debugging removed for production
//   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  // }, [])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "4px",
        marginBottom: "12px",
        paddingBottom: "15px",
      }}
      role="presentation"
    >
      <Box
        className="p-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p style={{ fontWeight: 900, fontSize: "16px" }}>{t('checkout.delivery_address')}</p>
      </Box>
      {/* <Divider /> */}

      <Box className="w-full h-fit p-5 mt-8 sm:mt-0 rounded-md flex flex-col items-center gap-4">
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.first_name')}<span className="text-[red]">*</span>
          </Typography>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder={t('checkout.enter_first_name')}
            required
          />
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.last_name')}<span className="text-[red]">*</span>
          </Typography>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder={t('checkout.enter_last_name')}
            required
          />
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.email')}<span className="text-[red]">*</span>
          </Typography>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder={t('checkout.enter_email')}
            required
          />
        </Box>
        {!isLoggedIn ? <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            Password<span className="text-[red]">*</span>
          </Typography>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder="Enter your password"
          />
        </Box> : null}


        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.phone')}<span className="text-[red]">*</span>
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
              <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5, ml: 1, display: 'block', fontSize: '0.75rem' }}>
                {errors.phone}
              </Typography>
            )}
          </Box>
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.address')}<span className="text-[red]">*</span>
          </Typography>
          <input
            type="text"
            id="delivery_address"
            name="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder={t('checkout.enter_address')}
          />
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.country')}<span className="text-[red]">*</span>
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
              placeHolder="Select Country"
              className="w-[100%]"
            />
          </Box>
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.state')}<span className="text-[red]">*</span>
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
              placeHolder="Select State"
              className="w-[100%]"
            />
          </Box>
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.city')}<span className="text-[red]">*</span>
          </Typography>
          <Box className="w-full">
            <CitySelect
              id="state"
              name="state"
              stateid={stateid}
              countryid={countryid}
              onChange={(e) => {
                handleChangeLocation(e, "city");
              }}
              placeHolder="Select City"
              className="w-[100%]"
            />
          </Box>
        </Box>
        <Box className="flex flex-col items-start w-full gap-1">
          <Typography className="poppins font-semibold uppercase text-xs text-black">
            {t('checkout.zip_code')}
          </Typography>
          <input
            type="text"
            id="zip_code"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            className="text-black bg-white rounded-md w-full text-[14px] outline-none poppins px-3 py-2.5 border border-[#cccccc]"
            placeholder={t('checkout.enter_zip')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
