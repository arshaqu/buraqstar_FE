import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18next
import { routes } from "../../data";
import { Brands, Categories, Deals } from "./NavigationDropDown";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Home } from "@mui/icons-material";

const NavigationBar = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <Box className="h-12 w-full bg-[#2858a3] flex items-center justify-center gap-x-2 xl:gap-x-6 hidden sm:hidden lg:flex">
      <Link to="/" key="home" className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group">
        <span className="text-lg text-[#FC4747] -mt-1 pe-1.5 transition-transform duration-300 group-hover:scale-110">
          <Home />
        </span>
        <Typography className="poppins text-sm text-white font-medium transition-colors duration-300 group-hover:text-white/90">
          {t("navigation.home")}
        </Typography>
      </Link>

      {/* Categories */}
      <Categories t={t} />

      {/* Other Nav Links */}
      {routes.map((route, i) => {

        switch (route.title) {
          case "brands":
            return <Brands key={i} title={t("navigation.brands")} />;
          case "best_deals":
            return false; // Currently disabled
          default:
            return (
              <Link to={route.link} key={i} className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group">
                {route?.icon && (
                  <span className="text-lg text-[#FC4747] -mt-1 pe-1.5 transition-transform duration-300 group-hover:scale-110">
                    {route?.icon}
                  </span>
                )}
                <Typography className="poppins text-sm text-white font-medium transition-colors duration-300 group-hover:text-white/90">
                  {t(`navigation.${route.title.toLowerCase().replace(/\s+/g, "_")}`, route.title)}
                </Typography>
              </Link>
            );
        }
      })}
    </Box>
  );
};

export default NavigationBar;
