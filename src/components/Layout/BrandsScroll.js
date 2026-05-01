import React from 'react'
import { Box, Grid, Typography } from "@mui/material";
import novex from "../../assets/novex.png";
import zilco from "../../assets/zilco.png";
import cavil from "../../assets/cavil.png";
import buraq from "../../assets/buraq.png";
import buraqlog from "../../assets/buraqlog.png";
import { useTranslation } from "react-i18next"; // Import i18next



function BrandsScroll() {
     const { t } = useTranslation();
      const logos = [
        { src: novex, alt: "Novex" },
        { src: cavil, alt: "Cavil" },
        { src: buraq, alt: "Buraq" },
        { src: zilco, alt: "Zilco" },
      ];


  return (
    <div>
         <Box className="text-center mb-10 mt-10 ">
        <Typography className="text-3xl sm:text-4xl font-semibold text-[#2E2E2E] poppins">
          {t("our_brands")}
        </Typography>

        <Typography className="text-gray-500 mt-2 max-w-xl mx-auto poppins">
          A portfolio built on performance, durability , and design
        </Typography>

        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-[1px] bg-gray-400"></div>
          <img
            src={buraqlog}
            alt="logo"
            className="w-8 h-8 object-contain"
            loading="lazy"
          />
          <div className="w-20 h-[1px] bg-gray-400"></div>
        </div>
      </Box>

      {/* ✅ Rotating Logo Strip */}
      <Box className="w-full overflow-hidden bg-white py-6 relative mb-2">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex whitespace-nowrap animate-scroll">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="mx-10 h-12 object-contain"
            />
          ))}
        </div>
      </Box>
    </div>
  )
}

export default BrandsScroll
