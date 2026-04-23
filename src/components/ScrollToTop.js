import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Box sx={{ display: 'none' }}>
      {/* Optionally add a CircularProgress or other UI elements if needed */}
      <CircularProgress />
    </Box>
  );
};

export default ScrollToTop;
