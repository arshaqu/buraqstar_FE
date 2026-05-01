import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReadyBan from "../../assets/Readyban.png";

// ─── Constants ───────────────────────────────────────────────────────────────

const BANNER_STYLES = {
  heights: { xs: "260px", sm: "300px", md: "340px" },
  borderRadius: "15px",
  overlayGradient:
    "linear-gradient(135deg, rgba(10,20,80,0.2) 0%, rgba(0,0,0,0.1) 100%)",
};

const CTA_BUTTONS = [
  { label: "Shop Now", primary: true, path: "/category" },
  { label: "Contact Us", primary: false, path: "/contact" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function BannerImage({ src, alt, heights }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      loading="lazy"
      sx={{
        width: "100%",
        height: heights,
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

function BannerOverlay({ gradient }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        background: gradient,
      }}
    />
  );
}

function BannerContent() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 2, sm: 4 },
        gap: 1,
      }}
    >
      <Typography
        className="poppins"
        component="h2"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.85rem", md: "2.5rem" },
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.3,
        }}
      >
        Ready to Build with Confidence?
      </Typography>

      <Typography
        className="poppins max-w-3xl"
        sx={{
          color: "rgba(255,255,255,0.85)",
          fontSize: { xs: "0.82rem", sm: "0.97rem" },
          maxWidth: { xs: "100%", sm: "440px" },
          lineHeight: 1.6,
        }}
      >
        Explore our premium brands and project essentials — delivered across UAE.
      </Typography>

      <BannerActions />
    </Box>
  );
}

function BannerActions() {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ mt: 1, alignItems: "center" }}
    >
      {CTA_BUTTONS.map(({ label, primary, path }) => (
        <Button
          key={label}
          variant={primary ? "contained" : "outlined"}
          onClick={() => navigate(path)}
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            textTransform: "none",
            px: 3,
            py: 0.9,
            minWidth: "140px",
            fontSize: "1rem",
            transition: "all 0.2s ease",
            backgroundColor: "#fff",
            color: "#000000",
            borderColor: "rgba(255,255,255,0.7)",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(2, 0, 0, 0.72)",
              borderColor: "#fff",
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function ReadyBanner() {
  return (
    <Box
      component="section"
      aria-label="Call to action banner"
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: BANNER_STYLES.borderRadius,
          overflow: "hidden",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <BannerImage
          src={ReadyBan}
          alt="Ready to build — premium construction materials across UAE"
          heights={BANNER_STYLES.heights}
        />
        <BannerOverlay gradient={BANNER_STYLES.overlayGradient} />
        <BannerContent />
      </Box>
    </Box>
  );
}

export default ReadyBanner;