import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { Hero } from "../components";
import bg from "../assets/policy_banner.jpg";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const PrivacyPolicy = () => {
  const { t } = useTranslation(); // Hook for translations

  const policySections = [
    {
      title: t("information_we_collect"),
      description: t("information_we_collect_description"),
    },
    {
      title: t("how_we_use_your_information"),
      description: t("how_we_use_your_information_description"),
    },
    {
      title: t("sharing_of_information"),
      description: t("sharing_of_information_description"),
    },
    {
      title: t("data_security"),
      description: t("data_security_description"),
    },
    {
      title: t("cookies_and_tracking_technologies"),
      description: t("cookies_and_tracking_technologies_description"),
    },
    {
      title: t("your_rights"),
      description: t("your_rights_description"),
    },
    {
      title: t("third_party_links"),
      description: t("third_party_links_description"),
    },
    {
      title: t("childrens_privacy"),
      description: t("childrens_privacy_description"),
    },
    {
      title: t("changes_to_this_privacy_policy"),
      description: t("changes_to_this_privacy_policy_description"),
    },
    {
      title: t("contact_us"),
      description: t("contact_us_description"),
    },
  ];

  return (
    <Box className="w-full bg-gray-50 min-h-screen">
      <SEO
        title="Privacy Policy | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Review the privacy policy of Buraq Star Trading. Learn how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, personal information, Buraq privacy, electrical products privacy, hardware products privacy, UAE privacy, data security, cookies"
        url="/policy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy",
          "url": `${SITE_URL}/policy`,
          "description": "Privacy policy for Buraq electrical and hardware products",
          "publisher": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
      <Hero bg={bg} title={t("privacy_policy")} />
      <Container maxWidth="lg" className="py-10 px-4 sm:px-6 md:px-8">
        <Paper elevation={3} className="p-6 rounded-lg shadow-md bg-white">
          <Typography variant="subtitle1" className="text-gray-600 text-center mb-6">
            {t("effective_date")}: 2/2/2025
          </Typography>
          <Typography className="text-gray-700 leading-relaxed mb-6">
            {t("privacy_policy_intro")}
          </Typography>
          {policySections.map((section, i) => (
            <Box key={i} className="mb-6">
              <Typography variant="h6" className="text-gray-800 font-bold mb-2">
                {i + 1}. {section.title}
              </Typography>
              <Typography className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.description}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;