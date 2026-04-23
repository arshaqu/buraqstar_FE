import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import bg from "../../assets/banner-bg.jpg";

const Banner = () => {
  const tags = [
    {
      title: "People",
      subtitle:
        "We care deeply about people, our partners, customers and the communities to which we belong.",
    },
    {
      title: "Passion",
      subtitle:
        "Passion is the fuel that drives our culture, it differs our mindset and energises our business.",
    },
    {
      title: "Place",
      subtitle:
        "We take our responsibility to the environment through our actions, we contribute towards creating a better place for future generations",
    },
  ];
  return (
    <Box
      sx={{ backgroundImage: `url(${bg})` }}
      className="w-full h-fit sm:h-[300px] bg-cover bg-no-repeat bg-center px-10 md:px-12 lg:px-24 py-8 sm:py-0"
    >
      <Grid container className="h-full flex items-center">
        {tags.map((tag, i) => (
          <Grid item xs={12} sm={4} key={i} className="py-4 pr-5">
            <Typography className="nunito uppercase text-2xl font-bold text-white pb-2">
              {tag.title}
            </Typography>
            <Typography className="nunito text-sm text-white">
              {tag.subtitle}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Banner;
