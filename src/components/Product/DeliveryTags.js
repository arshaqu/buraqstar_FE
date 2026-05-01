import React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import {
  LocalShipping as DeliveryIcon,
  Verified as QualityIcon,
  Replay as ReturnIcon,
  Feedback as FeedbackIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function DeliveryTags() {
    const { t } = useTranslation(); // Hook for translations
  const tags = [
    {
      title: t("delivery_tags.free_title"),
      description: t("delivery_tags.free_description"),
      icon: <DeliveryIcon sx={{ fontSize: 28, color: "#2858A4" }} />,
    },
    {
      title: t("delivery_tags.best_title"),
      description: t("delivery_tags.best_description"),
      icon: <QualityIcon sx={{ fontSize: 24, color: "#2858A4" }} />,
    },
    {
      title: t("delivery_tags.return_title"),
      description: t("delivery_tags.return_description"),
      icon: <ReturnIcon sx={{ fontSize: 24, color: "#2858A4" }} />,
    },
    {
      title: t("delivery_tags.feedback_title"),
      description: t("delivery_tags.feedback_description"),
      icon: <FeedbackIcon sx={{ fontSize: 24, color: "#2858A4" }} />,
    },
    {
      title: t("delivery_tags.payment_title"),
      description: t("delivery_tags.payment_description"),
      icon: <PaymentIcon sx={{ fontSize: 24, color: "#2858A4" }} />,
    },
  ];

  return (
    <Box
      sx={{
        border: "2px solid #d3d3d3",
        borderRadius: "12px",
        px: { xs: 2, sm: 3, md: 4 },
        py: 3,
        mx: "auto",
        maxWidth: "1800px", // center container
        mt: 4,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
      >
        {tags.map((tag, index) => (
          <Grid
            item
            xs={12}     // mobile: 1 per row
            sm={6}      // tablet: 2 per row
            md={2.4}    // desktop: 5 in one row
            key={index}
            sx={{
              display: "flex",
              alignItems: "top",
              justifyContent: { xs: "flex-start", md: "center" },
              textAlign: "left",
              py: { xs: 1.5, md: 0 },
            }}
          >
            {/* Icon */}
            {tag.icon}

            {/* Text */}
            <Box sx={{ ml: 1.5 }}>
              <Typography
                className="poppins"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "14px", md: "15px" },
                  color: "#111",
                }}
              >
                {tag.title}
              </Typography>

              <Typography
                className="poppins"
                sx={{
                  fontSize: { xs: "12px", md: "13px" },
                  color: "#6b7280",
                }}
              >
                {tag.description}
              </Typography>
            </Box>

            {/* Divider (only desktop) */}
      {index !== tags.length - 1 && (
  <Divider
    orientation="vertical"
    sx={{
      height: "50px", // 👈 set your fixed height
      alignSelf: "center", // keeps it centered vertically
      mx: 4,
      display: { xs: "none", md: "block" },
    }}
  />
)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DeliveryTags;