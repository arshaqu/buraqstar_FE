import React from "react";
import { Box, Typography } from "@mui/material";

import shopBg          from '../../assets/shop2.png';
import hotSellingBanner from '../../assets/Hotselling.png';
import newArrivalsBanner from '../../assets/newarrival.png';
import flashSalesBanner  from '../../assets/flashsale.png';

import buraqban  from '../../assets/buraqban.png';
import cavilban  from '../../assets/cavilban.png';
import zilcoban  from '../../assets/zilcoban.png';
import novexban  from '../../assets/novexban.png';

import electricban from '../../assets/electricban.png'
import hardwareban from '../../assets/hardwareban.png'
import sanitaryban from '../../assets/sanitaryban.png'
import toolsban from '../../assets/toolsban.png'




// ── Add any category/brand banners here ──
// import toolsBanner    from '../../assets/tools.png';
// import lightingBanner from '../../assets/lighting.png';

const BANNER_MAP = {
  "hot selling":  hotSellingBanner,
  "hot-selling":  hotSellingBanner,
  "new arrival":  newArrivalsBanner,
  "new-arrival":  newArrivalsBanner,
  "flash sales":  flashSalesBanner,
  "flash-sales":  flashSalesBanner,
  "flash sale":   flashSalesBanner,

  "buraq":   buraqban,
  "cavil":   cavilban,
  "zilco":   zilcoban,
  "novex":   novexban,

  "electrical" : electricban,
  "hardware" : hardwareban,
  "sanitary" : sanitaryban ,
  "tools" : toolsban



  // "power tools": toolsBanner,
  // "lighting":    lightingBanner,



};



const normalize = (str) => (str ?? "").toLowerCase().trim();

const resolveBanner = (title, bg) => BANNER_MAP[normalize(title)] || bg || shopBg;

// Only used for DEFAULT banner pages (no custom banner)
const DEFAULT_OVERLAY = "rgba(0, 0, 0, 0.40)";

const Hero = ({ bg, title, desc = null }) => {
  const key          = normalize(title);
  const hasCustomBanner = !!BANNER_MAP[key];
  const bannerImage  = resolveBanner(title, bg);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>

      {/* Banner image — fills width, auto height */}
      <img
        src={bannerImage}
        alt={title || "banner"}
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Dark overlay — only on default (no custom banner) pages so text is readable */}
      {!hasCustomBanner && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundColor: DEFAULT_OVERLAY,
          }}
        />
      )}

      {/* Text content — only on default banner pages (custom banners have text baked in) */}
      {!hasCustomBanner && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography className="poppins font-semibold text-3xl sm:text-5xl">
            {title}
          </Typography>

          {desc && (
            <Typography className="poppins mt-2">
              {desc}
            </Typography>
          )}
        </Box>
      )}

    </Box>
  );
};

export default Hero;