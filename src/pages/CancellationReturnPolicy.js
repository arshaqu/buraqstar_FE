import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { Hero } from "../components";
import bg from "../assets/policy_banner.jpg";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const CancellationReturnPolicy = () => {
  const { t } = useTranslation(); // Hook for translations

  const policySections = [
    {
      title: t("order_cancellation_before_dispatch"),
      description: t("order_cancellation_before_dispatch_description"),
    },
    {
      title: t("cancellation_after_dispatch"),
      description: t("cancellation_after_dispatch_description"),
    },
    {
      title: t("non_cancellable_orders"),
      description: t("non_cancellable_orders_description"),
    },
    {
      title: t("refunds_for_canceled_orders"),
      description: t("refunds_for_canceled_orders_description"),
    },
    {
      title: t("how_to_cancel_an_order"),
      description: t("how_to_cancel_an_order_description"),
    },
    {
      title: t("exceptions_to_cancellation"),
      description: t("exceptions_to_cancellation_description"),
    },
    {
      title: t("return_window"),
      description: t("return_window_description"),
    },
    {
      title: t("condition_of_returned_items"),
      description: t("condition_of_returned_items_description"),
    },
    {
      title: t("non_returnable_items"),
      description: t("non_returnable_items_description"),
    },
    {
      title: t("refund_policy"),
      description: t("refund_policy_description"),
    },
    {
      title: t("return_process"),
      description: t("return_process_description"),
    },
    {
      title: t("return_shipping_costs"),
      description: t("return_shipping_costs_description"),
    },
    {
      title: t("inspection_and_approval"),
      description: t("inspection_and_approval_description"),
    },
    {
      title: t("changes_to_the_policy"),
      description: t("changes_to_the_policy_description"),
    },
    {
      title: t("contact_us"),
      description: t("contact_us_description"),
    },
  ];

  return (
    <Box className="w-full bg-gray-50 min-h-screen">
      <SEO
        title="Return Policy | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Discover the return policy at Buraq Star Trading. Easy and hassle-free returns for products purchased online or in-store."
        keywords="cancellation policy, return policy, refund policy, order cancellation, Buraq returns, electrical products returns, hardware products returns, UAE returns, exchange policy, refund process"
        url="/cancellation-return-policy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Order Cancellation & Return Policy",
          "url": `${SITE_URL}/cancellation-return-policy`,
          "description": "Cancellation and return policy for Buraq electrical and hardware products",
          "publisher": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
         <Typography className="text-gray-700 leading-relaxed mb-6 ml-10 p-5 poppins text-sm md:text-lg">
        {t('dashboard_sidebar.home')} &nbsp; &gt; &nbsp; <span className="text-[#2858A3] ">{t('order_cancellation_return_policy')}</span>
      </Typography>
         <Container maxWidth="lg" className=" sm:px-6 md:px-8">
            <Paper elevation={3} className="md:p-14 lg: lg:p-16 sm:p-5 p-5 rounded-lg shadow-md bg-gray-100">
        
              <Typography className="text-gray-700 leading-relaxed mb-6 poppins text-xs md:text-lg">
                {t("order_cancellation_return_policy")}
              </Typography>
              {policySections.map((section, i) => (
                <Box key={i} className="mb-6">
                  <Typography  variant="h6" className="text-gray-800 font-semibold mb-2 poppins text-sm md:text-xl">
                    {i + 1}. {section.title}
                  </Typography>
                  <Typography className="text-gray-700 leading-relaxed whitespace-pre-line poppins text-xs md:text-lg">
                    {section.description}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Container>
    </Box>
  );
};

export default CancellationReturnPolicy;