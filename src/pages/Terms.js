import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { Hero } from "../components";
import bg from "../assets/policy_banner.jpg";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const TermsAndConditions = () => {
  const { t } = useTranslation(); // Hook for translations

  const termsSections = [
    {
      title: t("general_information"),
      description: t("general_information_description"),
    },
    {
      title: t("account_registration"),
      description: t("account_registration_description"),
    },
    {
      title: t("product_information_and_availability"),
      description: t("product_information_and_availability_description"),
    },
    {
      title: t("orders_and_payment"),
      description: t("orders_and_payment_description"),
    },
    {
      title: t("shipping_and_delivery"),
      description: t("shipping_and_delivery_description"),
    },
    {
      title: t("cancellation_and_returns"),
      description: t("cancellation_and_returns_description"),
    },
    {
      title: t("user_conduct"),
      description: t("user_conduct_description"),
    },
    {
      title: t("intellectual_property"),
      description: t("intellectual_property_description"),
    },
    {
      title: t("limitation_of_liability"),
      description: t("limitation_of_liability_description"),
    },
    {
      title: t("privacy_and_data_protection"),
      description: t("privacy_and_data_protection_description"),
    },
    {
      title: t("modifications"),
      description: t("modifications_description"),
    },
    {
      title: t("governing_law_and_dispute_resolution"),
      description: t("governing_law_and_dispute_resolution_description"),
    },
    {
      title: t("contact_us"),
      description: t("contact_us_description"),
    },
  ];

  return (
    <Box className="w-full bg-gray-50 min-h-screen">
      <SEO
        title="Terms of Use | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Read the terms of use for Buraq Star Trading. Understand the rules and guidelines for using our website and services safely."
        keywords="terms and conditions, legal terms, Buraq terms, electrical products terms, hardware products terms, UAE terms, order terms, payment terms, shipping terms"
        url="/terms"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms and Conditions",
          "url": `${SITE_URL}/terms`,
          "description": "Terms and conditions for Buraq electrical and hardware products",
          "publisher": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />

       <Typography className="text-gray-600 leading-relaxed mb-6 ml-10 p-5 poppins text-sm md:text-lg">
        {t('dashboard_sidebar.home')} &nbsp; &gt; &nbsp; <span className="text-[#2858A3] ">{t('terms_and_conditions')}</span>
      </Typography>

        <Container maxWidth="lg" className=" sm:px-6 md:px-8">
            <Paper elevation={3} className="md:p-14 lg: lg:p-16 sm:p-5 p-5 rounded-lg shadow-md bg-gray-100">
        
              <Typography className="text-gray-600 leading-relaxed mb-6 poppins text-xs md:text-lg">
                {t("welcome_message")}
              </Typography>
              {termsSections.map((section, i) => (
                <Box key={i} className="mb-6">
                  <Typography variant="h6" className="text-gray-800 font-semibold mb-2 poppins text-sm md:text-xl">
                    {i + 1}. {section.title}
                  </Typography>
                  <Typography className="text-gray-600 leading-relaxed whitespace-pre-line poppins text-xs md:text-lg">
                    {section.description}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Container>
    </Box>
  );
};

export default TermsAndConditions;