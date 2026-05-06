import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import bg from "../assets/contact.jpg";
import watermark from "../assets/contactsvg.svg";
import logomini from '../assets/buraqlog.png';
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Hero, BrandBanner } from "../components";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import ajaxService from "../services/ajax-service";
import RecentlyView from "../components/RecentlyView";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ur";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = t("please_enter_your_name");
    if (!formData.lastName) tempErrors.lastName = t("please_enter_your_name");
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
        const response = await ajaxService.post("/quote-request", {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        });

        if (response.success) {
          setSuccessMessage(response.message || t("quote_request_success"));
          setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
          setErrors({});
        } else {
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
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const officeCards = [
    {
      title: t("sharjah_office"),
      address: t("sharjah_office_address"),
      tel: t("sharjah_office_tel"),
      href: "tel:+97165616976",
    },
    {
      title: t("showroom"),
      address: t("showroom_address"),
      tel: t("showroom_tel"),
      href: "tel:+97142248520",
    },
    {
      title: t("warehouse"),
      address: t("warehouse_address"),
      tel: t("warehouse_tel"),
      href: "tel:+97165313787",
    },
  ];

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none poppins placeholder-gray-400 focus:border-[#2858a3] transition-colors duration-200";

  const labelClass = "block poppins text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide";

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
          name: "Contact Buraq",
          description: "Contact Buraq for all your electrical and hardware needs in the UAE",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: "Buraq",
            telephone: "800-NOVEX",
            email: "ecommerce@buraqstar.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sharjah",
              addressCountry: "UAE",
            },
          },
        }}
      />

      <Hero bg={bg} title={t("contact_us")} color={"#fff"} />

      {/* ── MAIN SECTION ── */}
      <Box
        className="w-full px-4 sm:px-8 md:px-14 lg:px-24 xl:px-32 py-10 md:py-16"
       
      >
        <Grid container spacing={{ xs: 4, md: 2 }} alignItems="stretch">
          {/* ── LEFT: FORM ── */}
          <Grid className="" item xs={12} md={6}>
            <Box
              className="bg-white rounded-2xl h-full"
              sx={{
                border: "1.5px dashed #d1d5db",
                p: { xs: "24px", sm: "32px", md: "40px" },
              }}
            >
              {/* Form heading */}
              <Typography
                className="poppins font-semibold text-gray-900"
                sx={{ fontSize: { xs: 22, sm: 26, md: 30 }, mb: 0.5 }}
              >
                Send us a message
              </Typography>
              <Typography className="poppins text-gray-500 text-sm" sx={{ mb: 1 }}>
                Do you have a question? A Complaint? Or need any help to choose the right product from{" "}
                <span className="text-[#2858a3] font-semibold">BuraqStar</span>. Feel free to contact us
              </Typography>

              {/* Divider with watermark icon */}
              <Box className="flex items-center gap-2 mb-6">
                <Box className="h-px bg-gray-300 flex-1" />
                <img src={logomini} alt="" style={{ width: 28, height: 22, opacity: 5 }} />
                <Box className="h-px bg-gray-300 flex-1" />
              </Box>

              {/* First Name + Last Name */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <label className={labelClass}>Your First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <Typography className="poppins text-xs text-red-500 mt-1">{errors.firstName}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className={labelClass}>Your Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <Typography className="poppins text-xs text-red-500 mt-1">{errors.lastName}</Typography>
                  )}
                </Grid>
              </Grid>

              {/* Email + Phone */}
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <Typography className="poppins text-xs text-red-500 mt-1">{errors.email}</Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <Typography className="poppins text-xs text-red-500 mt-1">{errors.phone}</Typography>
                  )}
                </Grid>
              </Grid>

              {/* Message */}
              <Box sx={{ mb: 3 }}>
                <label className={labelClass}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your message here"
                  rows={5}
                  style={{ resize: "vertical" }}
                />
                {errors.message && (
                  <Typography className="poppins text-xs text-red-500 mt-1">{errors.message}</Typography>
                )}
              </Box>

              {errors.form && (
                <Typography className="poppins text-xs text-red-500 mb-3">{errors.form}</Typography>
              )}
              {successMessage && (
                <Typography className="poppins text-xs text-green-600 mb-3">{successMessage}</Typography>
              )}

              {/* Submit button */}
              <Box className="flex justify-center">
                <button
                  onClick={handleRequestQuote}
                  className="poppins font-semibold text-white text-sm px-10 py-3 rounded-full transition-all duration-200 hover:opacity-90 hover:shadow-lg "
                  style={{
                    background: "linear-gradient(135deg, #1E55AC 0%, #2858a3 100%)",
                    boxShadow: "0 4px 15px rgba(171, 171, 171, 0.35)",
                    border:'2px solid #bfbfbf33'
                  }}
                >
                  Send A Message
                </button>
              </Box>
            </Box>
          </Grid>

          {/* ── RIGHT: OFFICE CARDS ── */}
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-4 h-full bg-[#1A408A] md:p-10 lg:p-10 p-5 rounded-3xl">
             <img
                src={watermark}
                alt=""
                className="absolute bottom-2 right-2 w-24 sm:w-32 md:w-40 lg:w-52 opacity-50 pointer-events-none"
              />
              {officeCards.map((office, idx) => (
                <Box
                key={idx}
                sx={{
                  background: "#0D2D61",
                  borderRadius: "16px",
                  p: { xs: "14px 16px", md: "24px 32px" },
                  position: "relative",
                  overflow: "hidden",
                  flex: 1,
                }}
                >
                {/* ✅ Watermark */}

                {/* Content */}
                <Typography
                  className="poppins font-semibold text-white"
                  sx={{ fontSize: { xs: 15, md: 17 }, mb: 0.75, position: "relative", zIndex: 1 }}
                >
                  {office.title}
                </Typography>

                <Typography
                  className="poppins text-white"
                  sx={{ fontSize: { xs: 12, md: 13 }, mb: 1.5, position: "relative", zIndex: 1 }}
                >
                  {office.address}
                </Typography>

                <Box
                  className="flex items-center gap-2 mb-2"
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Box
                    className="flex items-center justify-center rounded-full"
                    sx={{
                      width: 34,
                      height: 34,
                      background: "rgba(255,255,255,0.15)",
                      flexShrink: 0,
                    }}
                  >
                    <LocalPhoneOutlinedIcon sx={{ color: "#fff", fontSize: 17 }} />
                  </Box>

                  <a
                    href={office.href}
                    className="poppins font-medium text-white hover:opacity-80  transition-opacity"
                    style={{ fontSize: 12, textDecoration: "none" }}
                  >
                    {office.tel}
                  </a>
                </Box>
              </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ── CONTACT INFORMATION SECTION ── */}
        <Typography
          className="poppins text-center font-normal text-gray-900"
          sx={{ fontSize: { xs: 22, md: 28 }, mb: 1 }}
        >
          Contact Information
        </Typography>

        {/* Divider with watermark */}
        <Box className="flex items-center justify-center gap-3 ">
          <Box className="h-[1px] bg-gray-800 rounded-xl" sx={{ width: 80 }} />
          <img src={logomini} alt="" style={{ width: 26, height: 20}} />
          <Box className="h-[1px] bg-gray-800 rounded-xl" sx={{ width: 80 }} />
        </Box>
        <Box className='p-8'>
          <Box 
        className="w-full p-5"
        sx={{ border: "1.5px solid #e5e7eb", borderRadius: "10px", mb: 4, width: "auto" }}
      >

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <Box className="flex items-center gap-4">
              <Box
                className="flex items-center justify-center rounded-full flex-shrink-0"
                sx={{
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  background: "linear-gradient(135deg, #02AFF3, #02AFF3)",
                  boxShadow: "0 4px 14px rgba(40,88,163,0.3)",
                }}
              >
                <LocalPhoneOutlinedIcon sx={{ color: "#fff", fontSize: { xs: 22, md: 26 } }} />
              </Box>
              <Box>
                <Typography className="poppins font-semibold text-gray-700" sx={{ fontSize: { xs: 14, md: 16 } }}>
                  Phone Number
                </Typography>
                <a
                  href="tel:80066839"
                  className="poppins font-semibold text-[#2858a3] hover:opacity-75 transition-opacity "
                   sx={{ fontSize: { xs: 10, sm: 12, md: 14 } , textDecoration:'none' }}
                >
                  800-NOVEX (66839)
                </a>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Box className="flex items-center gap-4">
              <Box
                className="flex items-center justify-center rounded-full flex-shrink-0"
                sx={{
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  background: "linear-gradient(135deg, #02AFF3, #02AFF3)",
                  boxShadow: "0 4px 14px rgba(40,88,163,0.3)",
                }}
              >
                <EmailOutlinedIcon sx={{ color: "#fff", fontSize: { xs: 22, md: 26 } }} />
              </Box>
             <Box className="min-w-0">
  <Typography
    className="poppins font-semibold text-gray-700"
    sx={{ fontSize: { xs: 13, sm: 14, md: 16 } }}
  >
    Email
  </Typography>

  <a
    href="mailto:ecommerce@buraqstar.com"
    className="poppins font-semibold text-[#2858a3] hover:opacity-75 transition-opacity break-all"
    sx={{ fontSize: { xs: 10, sm: 12, md: 14 } , textDecoration:'none' }}
  >
    ecommerce@buraqstar.com
  </a>
</Box>  
            </Box>
          </Grid>
        </Grid>
    </Box>
                </Box>

      <Box className="-mt-4 sm:-mt-7 mb-10">
        <RecentlyView />
      </Box>
    </Box>
  );
};

export default Contact;