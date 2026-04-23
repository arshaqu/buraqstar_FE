import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { Hero } from "../components";
import bg from "../assets/policy_banner.jpg";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const ShippingPolicy = () => {
  const { t } = useTranslation(); // Hook for translations

  const shippingSections = [
    {
      title: t("shipping_locations"),
      description: t("shipping_locations_description"),
    },
    {
      title: t("delivery_process"),
      description: t("delivery_process_description"),
    },
    {
      title: t("shipping_timeframes"),
      description: t("shipping_timeframes_description"),
    },
    {
      title: t("shipping_charges"),
      description: t("shipping_charges_description"),
    },
    {
      title: t("order_tracking"),
      description: t("order_tracking_description"),
    },
    {
      title: t("delivery_issues"),
      description: t("delivery_issues_description"),
    },
    {
      title: t("return_and_refund_policy"),
      description: t("return_and_refund_policy_description"),
    },
  ];

  return (
    <Box className="w-full bg-gray-50 min-h-screen">
      <SEO
        title="Shipping Policy | Buraq Star Trading"
        description="Learn about the shipping policy at Buraq Star Trading. Get details on delivery times, shipping charges, and order tracking."
        keywords="shipping policy, delivery information, Buraq shipping, electrical products delivery, hardware products delivery, UAE shipping, delivery timeframes, shipping charges, order tracking"
        url="/shipping-policy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Shipping Policy",
          "url": `${SITE_URL}/shipping-policy`,
          "description": "Shipping and delivery policy for Buraq electrical and hardware products",
          "publisher": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
      <Hero bg={bg} title={t("shipping_policy")} />
      <Container maxWidth="lg" className="py-10 px-4 sm:px-6 lg:px-10">
        <Paper elevation={3} className="p-6 sm:p-8 rounded-lg shadow-md bg-white">
          <Typography className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
            {t("shipping_policy_intro")}
          </Typography>
          {shippingSections.map((section, i) => (
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

export default ShippingPolicy;