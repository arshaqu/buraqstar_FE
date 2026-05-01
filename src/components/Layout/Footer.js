import React, { useState, useContext } from "react";
import { Box, Button, Grid, Typography, Alert, Snackbar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next"; // Import i18next
import { BsArrowUpRight } from "react-icons/bs";
import footer_logo1 from "./../../assets/buraq_logo.jpg";

import { footerLinks, footerSocials } from "../../data";
import footer_payments from "./../../assets/footerpayment.png";
import routes from "../../utils";
import { BASE_URL } from "../../constants";
import { AuthContext } from "../../AuthContext";
// import WhatsApp from "../../assets/whatsapp-img.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Link will handle navigation, then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleSubscription = async () => {
    if (!email.trim()) {
      setShowError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setShowError(true);
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/subscribe`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      // Attempt to parse response, but proceed even if body is empty
      try { await response.json(); } catch (_) {}

      setShowSuccess(true);
      setEmail(""); // Clear email field on success
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
    <Box className='h-auto bg-gray-900 w-full'>
     
 <Box className="flex items-center p-5 ipad-subscribe-container">
      
      {/* Left text */}
      <p className="text-white text-xs md:text-lg">
        {t("footer.discounts_offers")}
      </p>

      {/* Right side (force to end) */}
      <Box className="flex items-center gap-2 ml-auto md:mr-10">
       <input
          type="text"
          className="bg-white py-2.5 px-4 text-sm rounded-3xl min-w-[130px] w-full sm:w-[300px] md:w-[400px] lg:w-[600px]"
          placeholder={t("footer.your_email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          className="text-white bg-[#2858A3] capitalize rounded-3xl poppins py-2.5 px-4 text-sm hover:bg-[#E02828] transition-colors duration-300 disabled:opacity-50"
          onClick={handleSubscription}
          disabled={isSubscribing}
        >
          {isSubscribing
            ? t("footer.subscribing", "Subscribing...")
            : t("footer.subscribe")}
            <BsArrowUpRight />
        </Button>
      </Box>

    </Box>
          

    </Box>
    <Box
    dir={isRTL ? "rtl" : "ltr"}
    className="w-full h-fit bg-cover bg-no-repeat bg-center p-8 md:p-10 lg:p-20 lg:pb-8 md:pb-8 pb-3 bg-white "
    >
      <style>{`
        @media (min-width: 768px) and (max-width: 1024px) {
          .footer-text-ipad {
            font-size: 10px !important;
          }
          .ipad-description {
            width: 65% !important;
            text-align: justify !important;
            font-size: 9.5px !important;
            margin-top: 10px !important;
          }
          .ipad-subscribe-container {
            flex-direction: column !important;
          }
          .ipad-subscribe-container input {
            width: 65% !important;
            margin-bottom: 8px !important;
          }
          .ipad-subscribe-container .ipad-subscribe-button {
            width: 65% !important;
            margin-left: 0 !important;
          }
          .ipad-quick-links {
            margin-left: -32px !important;
          }
          .ipad-last-row {
            padding-top: 4 !important;
            height: auto !important;
            min-height: auto !important;
          }
          .ipad-copyright {
            max-width: 80% !important;
            width: fit-content !important;
          }
          .ipad-social-icons {
            transform: translateX(-30px) !important;
          }
          .ipad-links-text {
            font-size: 11px !important;
          }
          .ipad-links-text .MuiTypography-root {
            transform: translateY(-4px) !important;
          }
        }
      `}</style>
      <Grid container>
        
        <Grid item xs={12} sm={5} className="mb-6 sm:mb-0">
          <Box className="flex justify-center sm:justify-start">
            <Link to="/" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <img
                src={footer_logo1}
                alt="burraq star logo"
                className="h-[8vh] w-auto text-center"
              />
            </Link>
          </Box>
          <Typography className="text-[12px] mt-7 mb-4 w-[95%] text-gray-600 max-w-lg poppins text-center md:text-start footer-text-ipad ipad-description">
            {t("footer.description")}
          </Typography>

              <Grid
              item
              xs={12}
              sm={6}
              className="h-fit sm:h-[10vh] flex flex-col items-center sm:items-start justify-end sm:py-0 ipad-last-row"
            >
              <p className="text-gray-700 mb-2">   {t("footer.weaccept")}</p>

           
               <img
                src={footer_payments}
                className="h-auto w-120"
                alt="footer payments icons"
              />
            </Grid>

          {/* <Box className="flex flex-row ipad-subscribe-container">
            <input
              type="text"
              className="bg-black rounded-md py-2.5 px-4 w-[65%] text-sm footer-text-ipad"
              placeholder={t("footer.your_email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="text-black bg-[#FF3030] capitalize poppins py-2.5 px-4 ms-2 text-sm w-[30%] md:w-[auto] hover:bg-[#E02828] transition-colors duration-300 disabled:opacity-50 footer-text-ipad ipad-subscribe-button"
              onClick={handleSubscription}
              disabled={isSubscribing}
            >
              {isSubscribing ? t("footer.subscribing", "Subscribing...") : t("footer.subscribe")}
            </Button>
          </Box> */}
        </Grid>

        <Grid item xs={12} sm={4} className="flex text-center sm:text-start flex-col sm:flex-row justify-center items-center sm:items-start sm:justify-between mb-2 sm:mb-0">
          {/* Mobile Dropdown Header for Quick Links */}
          <Box className="sm:hidden w-full flex items-center justify-center gap-2 mb-4 ml-8">
            <Typography className="text-2xl text-black poppins footer-text-ipad">
              {t("quick_links.quick_links")}
            </Typography>
            <IconButton
              onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              className="text-black p-0"
              size="small"
            >
              {quickLinksOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          
          {/* Quick Links Content - Hidden on mobile when closed, always visible on desktop */}
          <Box className={`w-full ${quickLinksOpen ? 'flex flex-col' : 'hidden'} sm:flex sm:flex-row sm:justify-between ipad-quick-links`}>
            {footerLinks.map((links, i) => (
              <Box
                className={`w-full sm:w-1/2 text-gray-600 gap-y-4 text-md flex flex-col text-center sm:text-start ${i === 1 && "ps-0 sm:ps-5"} ${i === 1 && "mt-3.5 sm:mt-0"} poppins footer-text-ipad ipad-links-text`}
                key={i}
              >
                <Link to={links.link} className="footer-text-ipad ipad-links-text font-semibold text-lg">
                  {t(`footer_links.${links.title}`)}
                </Link>
                {links.links.map((link, index) => {
                  // Conditionally set the link for "My Account" based on login status
                  const linkPath = link.name === "My Account" 
                    ? (isLoggedIn ? routes.dashboard : routes.login)
                    : link.link;
                  return (
                    <Link key={index} to={linkPath} className="footer-text-ipad ipad-links-text">
                      {t(`footer_links.${link.name}`)}
                    </Link>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className="mb-2 sm:mb-0">
          {/* Mobile Dropdown Header for Contact Us */}
          <Box className="sm:hidden w-full flex items-center justify-center gap-2 mb-4 ml-4">
            <Link to={routes.contact} className="text-2xl text-black poppins font-semibold footer-text-ipad">
              {t("footer.contact_us")}
            </Link>
            <IconButton
              onClick={() => setContactUsOpen(!contactUsOpen)}
              className="text-black p-0"
              size="small"
            >
              {contactUsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* Contact Us Content - Hidden on mobile when closed, always visible on desktop */}
          <Box
            className={`w-full text-gray-600 gap-y-4 text-md flex flex-col justify-center items-center sm:justify-start sm:items-start poppins ${contactUsOpen ? "flex" : "hidden"} sm:flex ipad-links-text`}
          >
            {/* Desktop Contact Us heading */}
            <Link to={routes.contact} className="hidden sm:block text-lg font-semibold footer-text-ipad ipad-links-text">{t("footer.contact_us")}</Link>
            <Link className="flex gap-x-2 items-start footer-text-ipad ipad-links-text" to={routes.storeLocator} style={{ cursor: "pointer" }}>
              <LocationOnOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins text-center md:text-start footer-text-ipad ipad-links-text">
                {t("footer.address")}
              </Typography>
            </Link>
            <a className="flex gap-x-2 items-start footer-text-ipad ipad-links-text" href="tel:80066839">
              <LocalPhoneOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins footer-text-ipad ipad-links-text">
                800-NOVEX (66839)
              </Typography>
            </a>
            <a className="flex gap-x-2 items-start footer-text-ipad ipad-links-text" href="tel:+971565471232">
              <LocalPhoneOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins footer-text-ipad ipad-links-text">
                +971 56547 1232
              </Typography>
            </a>
            <a className="flex gap-x-2 items-start footer-text-ipad ipad-links-text" href="tel:+97165616976">
              <LocalPhoneOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins footer-text-ipad ipad-links-text">
                +971 6 561 6976
              </Typography>
            </a>
            <a className="flex gap-x-2 items-start footer-text-ipad ipad-links-text" href="mailto:ecommerce@buraqstar.com">
              <EmailOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins footer-text-ipad ipad-links-text">
                ecommerce@buraqstar.com
              </Typography>
            </a>
            <Typography className="text-lg poppins font-semibold pt-0 sm:pt-4 footer-text-ipad ipad-links-text">
              {t("footer.service_time")}
            </Typography>
            <Box className="flex gap-x-2 items-start">
              <AccessTimeOutlinedIcon className="text-md footer-text-ipad ipad-links-text shrink-0" />
              <Typography className="text-md poppins footer-text-ipad ipad-links-text">
                {t("footer.timings")}
              </Typography>
            </Box>
          </Box>
            


        </Grid>


      
   



      </Grid>

      {/* Success/Error Messages */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {t("footer.subscription_success", "Thank you for subscribing to our newsletter!")}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {t("footer.subscription_error", "Please enter a valid email address.")}
        </Alert>
      </Snackbar>

    </Box>


<Grid
  container
  className="flex flex-col md:flex-row items-center justify-center md:justify-between px-4 py-2 text-center md:text-left"
>
  {/* Copyright */}
  <Grid item className="w-full md:w-auto">
    <Typography className="text-md text-gray-700 p-2 md:p-5 poppins">
      {t("footer.copyright")}
    </Typography>
  </Grid>

  {/* Social Icons */}
  <Grid item className="flex justify-center md:justify-end gap-3 p-2 md:p-5 w-full md:w-auto">
    {footerSocials.map((social, i) => (
      <Link
        target="_blank"
        to={social.link}
        key={i}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-transform duration-300 hover:scale-110 hover:bg-gray-100 "
      >
        {social.icon}
      </Link>
    ))}
  </Grid>
</Grid>



      <div className="whatsapp">
        <a href="https://api.whatsapp.com/send?phone=+971565471232" target="_blank" rel="noreferrer" className="whatsapp-fixed">
          <svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 32 32" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"></path><path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="black"></path><path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="black"></path><defs><linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse"><stop stop-color="#5BD066"></stop><stop offset="1" stop-color="#27B43E"></stop></linearGradient></defs></g></svg>
        </a>
      </div>


    </>
  );
};

export default Footer;