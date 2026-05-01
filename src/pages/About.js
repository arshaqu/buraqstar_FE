import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import bg from "../assets/about_hero.jpg";
import { Banner, Banner2, Brands, Certifications, Gallery, Hero, Message, Wrapper } from "../components";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import ReadyBanner from "../components/Layout/ReadyBanner";

const About = () => {
  const { t } = useTranslation(); // Hook for translations
  return (
    <Box className="w-full h-auto bg-white m-0 p-0">
      <SEO
        title="About Us | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Learn about Buraq Star Trading. Discover our mission, vision, and commitment to delivering high-quality electrical, sanitary, and hardware products."
        keywords="about Buraq, electrical company, hardware company, electrical solutions provider, hardware solutions provider, company history, electrical industry, hardware industry"
        url="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Buraq",
          "description": "Learn about Buraq's commitment to providing premium electrical and hardware solutions in the UAE",
                "url": `${SITE_URL}/about`,
          "mainEntity": {
            "@type": "Organization",
            "name": "Buraq",
            "description": "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO."
          }
        }}
      />
      <Hero bg={bg} title={t('about_us.title')} color={"#fff"} />
      {/* <Box
        sx={{
          position: "relative",
          color: "white",
          textAlign: "center",
          pb: 8,
          background: "linear-gradient(90deg, #2858a3 0%, #2858a3 100%)",
        }}
        className=""
      >
        <Box sx={{ py: 6, position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            className="poppins font-bold"
            sx={{ color: "#fff", mb: 1 }}
          >
            About Us
          </Typography>
        
        </Box>

        <Box
          component="svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
          }}
        >
          <path
            d="M0,49.98 C150,150 350,-50 500,49.98 L500,150 L0,150 Z"
            fill="#fff"
          />
        </Box>
      </Box> */}


      <Message t={t} />
      {/* <Banner /> */}

      <Brands t={t} />
      {/* <Box className="flex justify-center">
        <Divider className="bg-[#CCCCCC] w-[90%] my-16" />
      </Box> */}
      <Certifications />
      {/* <Banner2 /> */}
      {/* <Gallery /> */}
      {/* <Box className="flex justify-center bg-[#F4F6F7] pt-6">
        <Divider className="bg-[#CCCCCC] w-[90%] mb-10" />
      </Box> */}
      {/* <Wrapper /> */}
      <ReadyBanner/>
    </Box>
  );
};

export default About;
