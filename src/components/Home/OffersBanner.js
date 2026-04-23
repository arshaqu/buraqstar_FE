import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import bg from "../../assets/offerbg.jpg";
import { useTranslation } from "react-i18next"; // Import i18next

const OffersBanner = () => {
  const { t } = useTranslation(); // Hook for translations
  const navigate = useNavigate();

  const handleExploreNow = () => {
    navigate('/category?type=all');
  };

  return (
    <Box className="w-full h-screen px-5 sm:px-20 py-8 ">
      <Box
        className="rounded-xl bg-no-repeat bg-cover bg-center h-full w-full flex flex-col mt-10 items-center sm:items-start sm:justify-center justify-start ps-10"
        sx={{
          backgroundImage: `url(${bg})`,
        }}
      >
        {/* <Typography className="text-3xl md:text-4xl mt-32 sm:mt-0 xl:text-6xl font-semibold text-white poppins capitalize">
          {t("offers_banner.top_offers")}
        </Typography> */}
        <Typography className="text-3xl md:text-4xl xl:text-6xl font-semibold text-white poppins capitalize">
          {t("offers_banner.no1_brand")}
        </Typography>
        <Button
          onClick={handleExploreNow}
          className="uppercase text-white bg-[#02ADEC] p-4 rounded-lg w-fit text-xs poppins font-semibold px-12 mt-6"
        >
          {t("offers_banner.explore_now")}
        </Button>
      </Box>
    </Box>
  );
};

export default OffersBanner;