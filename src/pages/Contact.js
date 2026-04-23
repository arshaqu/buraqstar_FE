import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import bg from "../assets/contactbg.jpg";
import watermark from "../assets/contactsvg.svg";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Hero, BrandBanner } from "../components";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import ajaxService from "../services/ajax-service";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = t("please_enter_your_name");
    if (!formData.email) {
      tempErrors.email = t("please_enter_your_email");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t("please_enter_valid_email");
    }
    if (!formData.phone) tempErrors.phone = t("please_enter_your_phone");
    if (!formData.message) tempErrors.message = t("please_enter_your_message");
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRequestQuote = async () => {
    if (validate()) {
      try {
        const response = await ajaxService.post('/quote-request', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        });

        if (response.success) {
          setSuccessMessage(response.message || t("quote_request_success"));
          setFormData({ name: "", email: "", phone: "", message: "" });
          setErrors({});
        } else {
          // Handle validation errors from backend
          if (response.errors) {
            setErrors(response.errors);
          } else {
            setErrors({ form: response.message || t("quote_request_error") });
          }
        }
      } catch (error) {
        console.error("Quote request error:", error);
        setErrors({ form: t("quote_request_error") });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <Box className="w-full h-auto bg-white m-0 p-0">
      <SEO
        title="Contact Us | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Reach out to Buraq Star Trading. Contact our team for inquiries, support, or assistance with products and services."
        keywords="contact Buraq, electrical support, hardware support, customer service, quote request, Sharjah office, electrical consultation, hardware consultation"
        url="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Buraq",
          "description": "Contact Buraq for all your electrical and hardware needs in the UAE",
                "url": `${SITE_URL}/contact`,
          "mainEntity": {
            "@type": "Organization",
            "name": "Buraq",
            "telephone": "800-NOVEX",
            "email": "ecommerce@buraqstar.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sharjah",
              "addressCountry": "UAE"
            }
          }
        }}
      />
      <Hero bg={bg} title={t("contact_us")} color={"#fff"} />
      <Grid
        className="w-full h-fit pt-8 pb-10 px-5 md:py-4 md:px-14 sm:pb-10 lg:px-32 bg-no-repeat bg-center"
        container
        sx={{
          backgroundImage: `url(${watermark})`,
          backgroundSize: {
            md: "30%",
            sm: "40%",
            xs: "0",
          },
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          className={`bg-no-repeat bg-center text-center ${isRTL ? "sm:text-right" : "sm:text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
          sx={{
            backgroundImage: `url(${watermark})`,
            backgroundSize: {
              md: "0",
              sm: "0",
              xs: "70%",
            },
          }}
        >
          <Box className="py-7 me-0 md:me-[20%] lg:me-[30%] border-b-2 border-dashed  ">
            <Typography className="poppins text-base sm:text-lg uppercase font-semibold text-[#2858a3]">
              {t("sharjah_office")}
            </Typography>
            <Typography className="poppins text-base capitalize font-medium text-[#25252A] w-full">
              {t("sharjah_office_address")}
            </Typography>
            <Typography className="poppins text-base sm:text-lg font-medium capitalize text-[#25252A] w-full">
              <a href="tel:+97165616976" className="hover:text-[#2858a3] transition-colors">
                {t("sharjah_office_tel")}
              </a>
            </Typography>
          </Box>
          <Box className="py-7 me-0 md:me-[20%] lg:me-[30%] border-b-2 border-dashed">
            <Typography className="poppins text-base sm:text-lg uppercase font-semibold text-[#2858a3]">
              {t("showroom")}
            </Typography>
            <Typography className="poppins text-base capitalize font-medium text-[#25252A] w-full">
              {t("showroom_address")}
            </Typography>
            <Typography className="poppins text-base sm:text-lg font-medium capitalize text-[#25252A] w-full">
              <a href="tel:+97142248520" className="hover:text-[#2858a3] transition-colors">
                {t("showroom_tel")}
              </a>
            </Typography>
          </Box>
          <Box className="py-7 me-0 md:me-[20%] lg:me-[30%] border-b-2 border-dashed">
            <Typography className="poppins text-base sm:text-lg uppercase font-semibold text-[#2858a3]">
              {t("warehouse")}
            </Typography>
            <Typography className="poppins text-base capitalize font-medium text-[#25252A] w-full">
              {t("warehouse_address")}
            </Typography>
            <Typography className="poppins text-base sm:text-lg font-medium capitalize text-[#25252A] w-full">
              <a href="tel:+97165313787" className="hover:text-[#2858a3] transition-colors">
                {t("warehouse_tel")}
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className="w-full h-fit py-10 px-5 md:py-10 md:px-5 lg:p-10 mt-8 sm:mt-0 bg-[#F4F6F7] rounded-md flex flex-col items-center"
        >
          <Typography className="poppins text-3xl md:px-3 px-0 lg:px-0 text-black">
            {t("request_quote_today")}
          </Typography>

          <Box className="flex flex-col items-start w-full px-0 sm:px-5 pt-8">
            <Typography className="poppins font-semibold uppercase text-xs text-black">
              {t("your_name")}
            </Typography>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-black bg-white rounded-md w-full text-xs outline-none poppins p-4"
              placeholder={t("enter_your_name")}
            />
            {errors.name && (
              <Typography className="poppins text-xs text-red-500">
                {errors.name}
              </Typography>
            )}
          </Box>

          <Box className="flex flex-col items-start w-full px-0 sm:px-5 pt-3">
            <Typography className="poppins font-semibold uppercase text-xs text-black">
              {t("email_address")}
            </Typography>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-black bg-white rounded-md w-full text-xs outline-none poppins p-4"
              placeholder={t("enter_your_email")}
            />
            {errors.email && (
              <Typography className="poppins text-xs text-red-500">
                {errors.email}
              </Typography>
            )}
          </Box>

          <Box className="flex flex-col items-start w-full px-0 sm:px-5 pt-3">
            <Typography className="poppins font-semibold uppercase text-xs text-black">
              {t("phone")}
            </Typography>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-black bg-white rounded-md w-full text-xs outline-none poppins p-4"
              placeholder={t("enter_your_phone")}
            />
            {errors.phone && (
              <Typography className="poppins text-xs text-red-500">
                {errors.phone}
              </Typography>
            )}
          </Box>

          <Box className="flex flex-col items-start w-full px-0 sm:px-5 pt-3">
            <Typography className="poppins font-semibold uppercase text-xs text-black">
              {t("message")}
            </Typography>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="text-black bg-white rounded-md w-full text-xs outline-none poppins p-4"
              placeholder={t("enter_your_message")}
              rows="4"
            />
            {errors.message && (
              <Typography className="poppins text-xs text-red-500">
                {errors.message}
              </Typography>
            )}
          </Box>

          {errors.form && (
            <Typography className="poppins text-xs text-red-500 mt-3">
              {errors.form}
            </Typography>
          )}

          {successMessage && (
            <Typography className="poppins text-xs text-green-500 mt-3">
              {successMessage}
            </Typography>
          )}

          <Box className="flex flex-col items-start w-full px-0 sm:px-5 pt-3">
            <Button
              onClick={handleRequestQuote}
              className="bg-[#2858a3] text-white rounded-sm text-xs poppins py-2.5 px-8"
            >
              {t("submit")}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container className="w-full h-fit px-5 md:px-10 lg:px-32 mb-0 sm:mb-0">
        <Grid item xs={12} sm={6} className="mt-0 sm:mt-12">
          <Box className="w-full h-fit flex">
            <Box className="flex justify-center items-center h-14 sm:h-20 w-14 sm:w-20 rounded-lg bg-[#2858a3]">
              <LocalPhoneOutlinedIcon className="text-white text-2xl sm:text-4xl" />
            </Box>
            <Box className="ps-3 h-14 sm:h-20 flex flex-col justify-center">
              <Typography className="poppins text-base text-[#2858a3] font-semibold">
                {t("phone")}
              </Typography>
              <Typography className="poppins text-base text-black">
                <a href="tel:80066839" className="hover:text-[#2858a3] transition-colors">
                  800-NOVEX (66839)
                </a>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className="mt-4 sm:mt-12">
          <Box className="w-full h-fit flex">
            <Box className="flex justify-center items-center h-14 sm:h-20 w-14 sm:w-20 rounded-lg bg-[#2858a3]">
              <ChatBubbleOutlineOutlinedIcon className="text-white text-2xl sm:text-4xl" />
            </Box>
            <Box className="ps-3 h-14 sm:h-20 flex flex-col justify-center">
              <Typography className="poppins text-base text-[#2858a3] font-semibold">
                {t("email")}
              </Typography>
              <Typography className="poppins text-sm sm:text-base text-black">
                <a href="mailto:ecommerce@buraqstar.com" className="hover:text-[#2858a3] transition-colors">
                  ecommerce@buraqstar.com
                </a>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box className="-mt-4 sm:-mt-7">
        <BrandBanner />
      </Box>
    </Box>
  );
};

export default Contact;