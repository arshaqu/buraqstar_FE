import React from "react";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GavelIcon from "@mui/icons-material/Gavel";
import ReplayIcon from "@mui/icons-material/Replay";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next"; // Import i18next
import routes from "../utils";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const supportLinks = [
  {
    title: "terms_conditions",
    description: "terms_conditions_description",
    icon: <GavelIcon className="text-[#2858a3] text-5xl" />,
    link: routes.terms,
  },
  {
    title: "policy",
    description: "policy_description",
    icon: <ReplayIcon className="text-[#2858a3] text-5xl" />,
    link: routes.policy,
  },
  {
    title: "order_cancellation_policy",
    description: "order_cancellation_policy_description",
    icon: <CancelIcon className="text-[#2858a3] text-5xl" />,
    link: routes.return_policy,
  },
  {
    title: "shipping_policy",
    description: "shipping_policy_description",
    icon: <LocalShippingIcon className="text-[#2858a3] text-5xl" />,
    link: routes.shipping_policy,
  },
];

const CustomerSupport = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <Box className="w-full bg-gray-50 min-h-screen">
      <SEO
        title="Customer Support | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Get expert customer support at Buraq Star Trading. Assistance with products, orders, and services to ensure a smooth shopping experience."
        keywords="customer support, help center, electrical support, hardware support, contact Buraq, order support, shipping help, return policy, terms and conditions"
        url="/customer-support"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CustomerService",
          "name": "Buraq Customer Support",
          "description": "Expert customer support for electrical and hardware products",
          "url": `${SITE_URL}/customer-support`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+97165616976",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic"]
          },
          "serviceType": "Customer Support",
          "provider": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
      <Container maxWidth="lg" className="py-10 px-4 sm:px-6 lg:px-10">
        {/* Customer Support Section */}
        <Paper elevation={3} className="p-6 sm:p-8 rounded-lg shadow-md bg-white">
          <Box className="flex flex-col items-center">
            <SupportAgentIcon className="text-[#2858a3] text-6xl mb-4" />
            <Typography
              variant="h4"
              className="font-semibold text-gray-800 mb-2 text-lg sm:text-2xl text-center poppins"
            >
              {t("customer_support")}
            </Typography>
            <Typography className="text-gray-600 text-sm sm:text-base text-center max-w-lg poppins">
              {t("customer_support_description")}
            </Typography>

            {/* A clickable phone icon that calls a dummy number when clicked */}
            <Box className="mt-4 flex flex-col sm:flex-row items-center gap-2 text-[#2858a3] ">
              <SupportAgentIcon className="!text-3xl poppins" /> {/* or use LocalPhoneIcon, PhoneIcon, etc. */}
              {t("call_us_at")}
              <a href="tel:+97165616976" className="hover:text-blue-700">
                <Typography variant="body1" className="underline poppins ">
                  (971) 6 561 6976
                </Typography>
              </a>
              {t("or")}
              <a href="tel:+97142248520" className="hover:text-blue-700">
                <Typography variant="body1" className="underline poppins">
                  (971) 4 224 8520
                </Typography>
              </a>
            </Box>
          </Box>

          {/* Support Links */}
          <Grid container spacing={3} className="mt-6">
            {supportLinks.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Link to={item.link} className="no-underline">
                  <Paper
                    elevation={2}
                    className="p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300 flex flex-col items-center text-center"
                  >
                    {item.icon}
                    <Typography variant="h6" className="text-gray-800 font-medium mt-3 poppins">
                      {t(item.title)}
                    </Typography>
                    <Typography className="text-gray-600 text-sm mt-1 poppins">
                      {t(item.description)}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CustomerSupport;