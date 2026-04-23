import React from "react";
import { Box } from "@mui/material";
import bg from "../assets/policy_banner.jpg";
import { Hero, Faq } from "../components";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation(); // Hook for translations
  
  return (
    <Box className="w-full h-auto bg-white m-0 p-0">
      <SEO
        title="FAQs | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Find answers to frequently asked questions at Buraq Star Trading. Get information about products, orders, shipping, and more."
        keywords="FAQ, frequently asked questions, electrical FAQ, hardware FAQ, Buraq help, customer support, product questions, shipping FAQ"
        url="/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": "Buraq FAQ",
          "description": "Frequently asked questions about Buraq's electrical and hardware products and services",
                "url": `${SITE_URL}/faq`,
          "mainEntity": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
      <Hero bg={bg} title={t("navigation.faqs")} />
      <Box className="w-full h-fit px-5 md:px-10 sm:px-16 pt-10 pb-16">
        <Faq />
      </Box>
    </Box>
  );
};

export default FAQ;
