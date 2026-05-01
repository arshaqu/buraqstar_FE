import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { BorderBottom, FavoriteBorderOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LanguageIcon from "@mui/icons-material/Language";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useTranslation } from "react-i18next";  // i18next import
import { HeaderSocials } from "../../data";
import routes from "../../utils";
import "../../i18n";

// Function to get currency symbol
const   getCurrencySymbol = (currency) => {
  switch (currency) {
    case 'AED':
      return 'د.إ';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
};

const SocialLinkBar = () => {
  const navigate = useNavigate();
  const { currency, updateCurrency } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "EN");
  const currencyRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    i18n.changeLanguage(language.toLowerCase()); // Apply saved language
  }, [language, i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        currencyRef.current && !currencyRef.current.contains(event.target) &&
        languageRef.current && !languageRef.current.contains(event.target)
      ) {
        setOpenCurrency(false);
        setOpenLanguage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = () => {
    navigate(localStorage.getItem("token") ? "/user/wishlists" : "/user/login");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
    localStorage.setItem("language", lang);
    setOpenLanguage(false);
  };

  return (
    <Box style={{ borderBottom: "0.3px solid #f1f2f3" }} className="w-full flex justify-center flex-col md:flex-row social-bar md:justify-start items-start text-white  h-fit gap-x-5 gap-y-2 md:gap-y-0 py-3 md:py-0 text-xs md:text-sm md:h-11">
      <style>{`
        @media (min-width: 768px) and (max-width: 1024px) {
          .social-bar {
            overflow-x: visible !important;
            overflow-y: hidden !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
            gap: 0.75rem !important;
          }
          .social-bar > * {
            flex-shrink: 1 !important;
            min-width: 0 !important;
          }
          .ipad-selectors-container {
            gap: 0.5rem !important;
            padding-left: 0.75rem !important;
          }
          .ipad-selectors-container .MuiButton-root {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            min-width: auto !important;
          }
          .ipad-right-section {
            min-width: 0 !important;
            overflow: visible !important;
          }
          .ipad-store-wishlist {
            gap: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
      {/* Left Section (Phone & Email) - Hidden on mobile */}
      <Box  className="hidden md:w-1/2 w-full md:flex gap-x-8 justify-start ml-20 items-center h-full ">
        <Box className="flex gap-x-2 mr-10">
          <HeadsetMicIcon className="text-[15px] text-gray-600" />
          <Typography className=" text-[11px] poppins text-[#2858a3] ">
            <a href="tel:80066839" className="text-inherit  no-underline">
             <span className="text-gray-600">Call us:</span> 800-NOVEX (66839)
            </a>
          </Typography>
        </Box>
        <Box className="flex gap-x-2  text-gray-600">
          <MailOutlinedIcon className="text-[15px]" />
          <Typography className="lowercase text-[11px] poppins">
            <a
              href="mailto:ecommerce@buraqstar.com"
              className="text-inherit no-underline"
            >
              ecommerce@buraqstar.com
            </a>
   
          </Typography>
        </Box>
      </Box>

   <Grid
          item
          xs={12}
          sm={4}

          className="w-full  md:w-auto flex justify-center md:justify-start items-center gap-x-6 h-full "
        >
          {HeaderSocials.map((social, i) => (
            <Link target="_blank" to={social.link} key={i} className="hidden sm:block text-md  text-gray-600 footer-text-ipad">
              {social.icon}
            </Link>
          ))}
        </Grid>


      {/* Right Section (Store Locator, Wishlist, Currency & Language) */}
      <Box className="md:w-1/2 w-full flex justify-center items-center h-full ipad-right-section">

        {/* Store Locator & Wishlist - Hidden on mobile */}
        <Box className="hidden md:flex items-center gap-x-8 border-r-2 border-white md:pe-8 sm:pe-5 pe-0 ipad-store-wishlist text-gray-600">
          <Link to={routes.storeLocator}>
            <Box className="flex gap-x-2 cursor-pointer items-center">
              <LocationOnOutlinedIcon className="text-xl" />
              <Typography className="capitalize text-[11px] poppins">
                {t("store_locations")}
              </Typography>
            </Box>
          </Link>

          <Box className="flex gap-x-2 cursor-pointer items-center " onClick={handleNavigate}>
            <FavoriteBorderOutlined className="text-xl" />
            <Typography className="capitalize text-[11px] poppins">{t("wishlist")}</Typography>
          </Box>
        </Box>

        {/* Mobile & Desktop Selectors Container */}
        <Box className="flex items-center  gap-x-3 md:gap-x-5 md:ps-5 ipad-selectors-container ">
          {/* Currency Selector - Modern Design */}
          <Box className="relative" ref={currencyRef}>
            <Button 
              className="flex items-center text-gray-500 poppins text-xs min-w-0 px-2 md:px-3 py-1 rounded-lg transition-all duration-200 gap-1"
              onClick={() => setOpenCurrency(!openCurrency)}
              sx={{
                backgroundColor: { xs: 'rgba(255,255,255,0.1)', md: 'transparent' },
                backdropFilter: { xs: 'blur(10px)', md: 'none' },
                border: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
                minWidth: { xs: '75px', md: 'auto' }
              }}
            >
              <Typography className="text-[11px] font-medium">{getCurrencySymbol(currency)}</Typography>
              <Typography className="text-[11px] font-medium">{currency}</Typography>
              {openCurrency ? <ArrowDropUpIcon sx={{ fontSize: '16px' }} /> : <ArrowDropDownIcon sx={{ fontSize: '16px' }} />}
            </Button>
            {openCurrency && (
              <Box 
                className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                sx={{
                  minWidth: '90px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                {["AED", "EUR", "USD"].map((curr, i) => (
                  <Box
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer text-[11px] font-medium transition-colors duration-150"
                    onClick={() => {
                      updateCurrency(curr);
                      setOpenCurrency(false);
                    }}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      backgroundColor: curr === currency ? '#e3f2fd' : 'transparent',
                      color: curr === currency ? '#1976d2' : '#333'
                    }}
                  >
                    <Typography className="text-[11px] font-medium">{getCurrencySymbol(curr)}</Typography>
                    <Typography className="text-[11px] font-medium">{curr}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Language Selector - Modern Design */}
          <Box className="relative " ref={languageRef}>
            <Button 
              className="flex items-center  text-gray-600 text-xs min-w-0 px-2 md:px-3 py-1 rounded-lg transition-all duration-200 gap-1" 
              onClick={() => setOpenLanguage(!openLanguage)}
              sx={{
                backgroundColor: { xs: 'rgba(255,255,255,0.1)', md: 'transparent' },
                backdropFilter: { xs: 'blur(10px)', md: 'none' },
                border: { xs: '1px solid rgba(255,255,255,0.2)', md: 'none' },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
                minWidth: { xs: '70px', md: 'auto' }
              }}
            >
              <LanguageIcon sx={{ fontSize: '14px', opacity: 0.8 }} />
              <Typography className="poppins text-[11px] font-medium">{language}</Typography>
              {openLanguage ? <ArrowDropUpIcon sx={{ fontSize: '16px' }} /> : <ArrowDropDownIcon sx={{ fontSize: '16px' }} />}
            </Button>
            {openLanguage && (
              <Box 
                className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                sx={{
                  minWidth: '85px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                {[
                  { code: "EN", name: "English" },
                  { code: "AR", name: "العربية" },
                  { code: "UR", name: "اردو" }
                ].map((lang, i) => (
                  <Box
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer text-xs font-medium transition-colors duration-150"
                    onClick={() => handleLanguageChange(lang.code)}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      backgroundColor: lang.code === language ? '#e3f2fd' : 'transparent',
                      color: lang.code === language ? '#1976d2' : '#333'
                    }}
                  >
                    <LanguageIcon sx={{ fontSize: '12px', opacity: 0.6 }} />
                    <Box className="flex flex-col items-start">
                      <Typography className="text-[11px] font-medium leading-tight">{lang.code}</Typography>
                      <Typography className="text-[10px] opacity-60 leading-tight">{lang.name}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialLinkBar;
