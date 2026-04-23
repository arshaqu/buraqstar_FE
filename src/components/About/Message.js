import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import watermark from "../../assets/watermark.svg";
import profile from "../../assets/profile.jpg";
import signature from "../../assets/signature.svg";
import who from "../../assets/servicebg.jpg";
import vision from "../../assets/picture1.jpg";
import mission from "../../assets/picture4.jpg";
import operation from "../../assets/picture5.jpg";

const paragraphStyle = { hyphens: "auto", wordBreak: "break-word" };

const Message = ({t}) => {

  return (
    <Grid
      container
      className="py-16 px-4 sm:py-[70px] sm:ps-[70px] sm:pe-10 relative h-fit"
    >
      <Box className="absolute top-6 right-0">
        <img className="h-[70vh] w-auto" src={watermark} alt="watermark" />
      </Box>

      {/* WHO WE ARE */}
      <Grid item xs={12} className="pb-6 px-4 sm:px-10 ">
        <Box className="flex justify-center bg-[#fff] ">
          <Divider className="bg-[#CCCCCC] w-[90%] mb-10" />
        </Box>

        <Box className="w-full h-fit py-6 px-5 sm:px-14 bg-[#F4F6F7]">
          {/* Parent Grid container with vertical centering */}
          <Grid container className="pb-10 items-center">

            {/* Left Column: Who we are Image */}
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="flex justify-center"
            >
              <span className="before:block before:absolute before:-inset-1 before:translate-x-6 before:translate-y-0 before:-scale-y-[.85] before:-scale-x-95 before:bg-[#02ADEC] relative inline-block">
                <img className="w-full h-auto relative" src={who} alt="Profile" />
              </span>
            </Grid>

            {/* Right Column: who we are text */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className="px-0 sm:px-8 lg:ps-20 md:text-left text-center space-y-3"
            >
              <Typography className="poppins capitalize text-3xl font-bold w-full text-[#2E2E2E] text-justify sm:text-left leading-snug">
                {t("who_we_are")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("who_we_are_description")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* OUR OPERATIONS */}
      <Grid item xs={12}   className="py-4 px-4 sm:px-10  "  >
        <Box className="flex justify-center bg-[#fff] pt-6">
          <Divider className="bg-[#CCCCCC] w-[90%] mb-10" />
        </Box>
        <Box className="w-full h-fit py-6 px-5 sm:px-14 bg-[#F4F6F7]">
          {/* Parent Grid container with vertical centering */}
          <Grid container className="pb-10 items-center">

          

            {/* Left Column: Mission Text  change order for shw text after image in mobile and before in desktop*/}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className="px-0 sm:px-8 lg:ps-20 md:text-left text-center order-2 md:order-1 space-y-3"
            >
              <Typography className="poppins capitalize text-3xl font-bold w-full text-[#2E2E2E] text-justify sm:text-left leading-snug">
                {t("our_operations")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("our_operations_description_1")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("our_operations_description_2")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("our_operations_description_3")}
              </Typography>
            </Grid>

              {/* Right Column: Image  */}
              <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="flex justify-center order-1 md:order-2"
            >
              <span className="before:block before:absolute before:-inset-1 before:translate-x-6 before:translate-y-0 before:-scale-y-[.85] before:-scale-x-95 before:bg-[#02ADEC] relative inline-block">
                <img className="w-full h-auto relative" src={operation} alt="Profile" />
              </span>
            </Grid>

            
          </Grid>
        </Box>
      </Grid>

      {/* VISION */}
      <Grid item xs={12} className="py-4 px-4 sm:px-10">
        <Box className="flex justify-center bg-[#fff] pt-6">
          <Divider className="bg-[#CCCCCC] w-[90%] mb-10" />
        </Box>
        <Box className="w-full h-fit py-6 px-5 sm:px-14 bg-[#F4F6F7]">
          {/* Parent Grid container with vertical centering */}
          <Grid container className="pb-10 items-center">

            {/* Left Column: */}
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="flex justify-center "
            >
              <span className="before:block before:absolute before:-inset-1 before:translate-x-6 before:translate-y-0 before:-scale-y-[.85] before:-scale-x-95 before:bg-[#02ADEC] relative inline-block">
                <img className="w-full h-auto relative" src={vision} alt="Profile" />
              </span>
            </Grid>

            {/* Right Column: Image */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className="px-0 sm:px-8 lg:ps-20 text-center md:text-left space-y-3"
            >
              <Typography className="poppins capitalize text-3xl font-bold w-full text-[#2E2E2E] text-justify sm:text-left leading-snug">
                {t("vision")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("vision_description")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* MISSION */}
      <Grid item xs={12} className="py-4 px-4 sm:px-10">
        <Box className="flex justify-center bg-[#fff] pt-6">
          <Divider className="bg-[#CCCCCC] w-[90%] mb-10" />
        </Box>
        <Box className="w-full h-fit py-6 px-5 sm:px-14 bg-[#F4F6F7]">
          {/* Parent Grid container with vertical centering */}
          <Grid container className="pb-10 items-center">

            {/* Left Column: Mission Text change order here also as above inn operations */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              className="px-0 sm:px-8 lg:ps-20 text-center md:text-left order-2 md:order-1 space-y-3"
            >
              <Typography className="poppins capitalize text-3xl font-bold w-full text-[#2E2E2E] text-justify sm:text-left leading-snug">
                {t("mission")}
              </Typography>
              <Typography className="text-sm text-[#152E3A] poppins leading-6 text-justify sm:text-left" style={paragraphStyle}>
                {t("mission_description")}
              </Typography>
            </Grid>

            {/* Right Column: Image */}
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              className="flex justify-center order-1 md:order-2"
            >
              <span className="before:block before:absolute before:-inset-1 before:translate-x-6 before:translate-y-0 before:-scale-y-[.85] before:-scale-x-95 before:bg-[#02ADEC] relative inline-block">
                <img className="w-full h-auto relative" src={mission} alt="Profile" />
              </span>
            </Grid>
          </Grid>
        </Box>

        <Box className="flex justify-center bg-[#fff] mt-10">
          <Divider className="bg-[#CCCCCC] w-[100%] " />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Message;