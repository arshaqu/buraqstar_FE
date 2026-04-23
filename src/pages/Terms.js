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
      <Hero bg={bg} title={t("terms_and_conditions")} />
      <Container maxWidth="lg" className="py-10 px-4 sm:px-6 lg:px-10">
        <Paper elevation={3} className="p-6 sm:p-8 rounded-lg shadow-md bg-white">
          <Typography 
            variant="subtitle1" 
            className="text-gray-600 text-center mb-6 text-sm sm:text-base"
          >
            {t("effective_date")}: 2-4-2025
          </Typography>
          <Typography className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
            {t("welcome_message")}
          </Typography>
          {termsSections.map((section, i) => (
            <Box key={i} className="mb-6">
              <Typography 
                variant="h6" 
                className="text-gray-800 font-bold mb-2 text-base sm:text-lg"
              >
                {i + 1}. {section.title}
              </Typography>
              <Typography className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
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