import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        backgroundColor: "#fafafa",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Gradient Background Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(221, 102, 177, 0.1) 100%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 206, 84, 0.15) 0%, rgba(120, 219, 226, 0.1) 100%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Main Content Card */}
      <Paper
        elevation={8}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "600px",
          width: "100%",
          padding: { xs: 4, sm: 6, md: 8 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Emoji Icon */}
        <Typography
          sx={{
            fontSize: { xs: "80px", sm: "100px", md: "120px" },
            mb: 2,
            lineHeight: 1,
          }}
        >
          😕
        </Typography>

        {/* 404 Number */}
        <Typography
          variant="h1"
          className="poppins"
          sx={{
            fontSize: { xs: "100px", sm: "120px", md: "140px" },
            fontWeight: 900,
            color: "#2858a3",
            mb: 2,
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        {/* Main Message */}
        <Typography
          variant="h4"
          className="poppins"
          sx={{
            color: "#25252A",
            mb: 2,
            textAlign: "center",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          }}
        >
          {t('not_found.message')}
        </Typography>

        {/* Secondary Message */}
        <Typography
          variant="body1"
          className="poppins"
          sx={{
            color: "#666",
            mb: 4,
            textAlign: "center",
            fontSize: { xs: "0.95rem", sm: "1rem" },
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          {t('not_found.sub_message')}
        </Typography>

        {/* Action Button */}
        <Button
          variant="contained"
          className="poppins"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#2858a3",
            textTransform: "capitalize",
            padding: "14px 40px",
            fontSize: "16px",
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(40, 88, 163, 0.3)",
            "&:hover": {
              backgroundColor: "#1e4691",
              boxShadow: "0 6px 16px rgba(40, 88, 163, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {t('not_found.back_to_home')}
        </Button>
      </Paper>

      {/* Additional Help Text */}
      <Typography
        variant="body2"
        className="poppins"
        sx={{
          position: "relative",
          zIndex: 1,
          color: "#555",
          mt: 4,
          textAlign: "center",
          maxWidth: "600px",
          fontSize: { xs: "0.85rem", sm: "0.9rem" },
          px: 2,
        }}
      >
        {t('not_found.help_text')}{" "}
        <Box
          component="span"
          onClick={() => navigate("/")}
          sx={{
            color: "#27AE60",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": {
              color: "#229954",
            },
          }}
        >
          {t('not_found.home_page')}
        </Box>{" "}
        {t('not_found.help_text_suffix')}
      </Typography>
    </Box>
  );
};

export default NotFound;

