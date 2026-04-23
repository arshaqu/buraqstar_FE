import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import novex from "../../assets/novexabout.png";
import zilco from "../../assets/zilcoabout.png";
import cavil from "../../assets/cavilabout.png";
import buraq from "../../assets/buraqabout.jpg";
import watermark from "../../assets/top-brand.png";

const paragraphStyle = { hyphens: "auto", wordBreak: "break-word" };

const Brands = ({t}) => {

  const data = [
    {
      image: novex,
      desc: t("novex_description"),
      className: "h-10 w-auto",
    },
    {
      image: zilco,
      desc: t("zilco_description"),
      className: "h-11 w-auto",
    },
    {
      image: cavil,
      desc: t("cavil_description"),
      className: "h-10 w-auto",
    },
    {
      image: buraq,
      desc: t("buraq_description"),
      className: "h-9 w-auto",
    },
  ];

  return (
    <>
      <Box  className="absolute sm:left-[37%] left-0">
        <img className="h-auto sm:h-[50vh] w-[100%] sm:w-auto " src={watermark} alt="watermark" />
      </Box>

      <Typography className="poppins text-center capitalize text-3xl font-bold w-full text-[#2E2E2E] mt-0 mb-6">
        {t("our_brands")}
      </Typography>
      <Box className="w-full relative flex justify-center items-center sm:mt-0 sm:h-[35vh] mb-0">
        <Grid
          container
          rowSpacing={{ xs: 3, sm: 4 }}
          columnSpacing={{ sm: 2, md: 3 }}
          className="px-5 sm:px-16"
        >
          {data.map((brand, i) => (
            <Grid item xs={12} sm={6} md={3} key={i} className="flex flex-col items-center sm:items-start text-center md:text-left space-y-4">
              <div className="w-full flex justify-center sm:justify-start items-center h-auto sm:h-16 lg:h-14">
                <img src={brand.image} alt={`brand${i}`} className={`${brand.className}`} />
              </div>
              <Typography className="poppins text-[11px] sm:text-[13px] leading-5 text-[#152E3A] text-justify sm:text-left" style={paragraphStyle}>
                {brand.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Brands;