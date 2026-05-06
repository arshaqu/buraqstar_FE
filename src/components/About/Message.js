import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ShareLocationOutlinedIcon from "@mui/icons-material/ShareLocationOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import DoneIcon from "@mui/icons-material/Done";
import watermark from "../../assets/watermark.svg";
import profile from "../../assets/profile.jpg";
import signature from "../../assets/signature.svg";
import image1 from "../../assets/ourpromise.png";
import who from "../../assets/servicebg.jpg";
import vision from "../../assets/picture1.jpg";
import mission from "../../assets/picture4.jpg";
import operation from "../../assets/picture5.jpg";
import buraqlog from "../../assets/buraqlog.png";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import UAE from "../../assets/UAE.png";
import Qatar from "../../assets/Qatar.png";
import Oman from "../../assets/Oman.png";
import Bahrain from "../../assets/Bahrain.png";
import Pakisthan from "../../assets/Pakistan.png";
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const paragraphStyle = { hyphens: "auto", wordBreak: "break-word" };

const Message = ({ t }) => {
  const features = [
    {
      title: "Curated Quality Selection",
      desc: "Trade-grade products designed for performance and durability.",
      icon: <VerifiedUserOutlinedIcon fontSize="large" />,
    },
    {
      title: "Trusted Brands Portfolio",
      desc: "NOVEX, ZILCO, BURAQ & CAVIL — proven quality across projects.",
      icon: <HandshakeOutlinedIcon fontSize="large" />,
    },
    {
      title: "Consistent Stock Availability",
      desc: "Key essentials always ready to prevent site delays.",
      icon: <DoneOutlinedIcon fontSize="large" />,
    },
    {
      title: "Project-Friendly Pricing",
      desc: "Best-value rates, value packs, and bulk support for businesses.",
      icon: <PaymentsOutlinedIcon fontSize="large" />,
    },
    {
      title: "Fast Delivery Across UAE",
      desc: "Reliable dispatch backed by a strong distribution network.",
      icon: <LocalShippingOutlinedIcon fontSize="large" />,
    },
    {
      title: "Expert Support",
      desc: "A team that understands technical products and project needs.",
      icon: <VolunteerActivismOutlinedIcon fontSize="large" />,
    },
  ];

  const countries = [
    { name: "UAE", flag: UAE },
    { name: "Qatar", flag: Qatar },
    { name: "Oman", flag: Oman },
    { name: "Bahrain", flag: Bahrain },
    { name: "Pakistan", flag: Pakisthan },
  ];

  return (
    <Grid container className="py-16 relative h-fit">
      {/* <Box className="absolute top-6 right-0">
        <img className="h-[70vh] w-auto" src={watermark} alt="watermark" />
      </Box> */}

      {/* ABOUT BURAQ STAR */}
      <Grid item xs={12} className="pb-6 px-4 sm:px-10 mb-10">
        {/* 
  <Box className="w-full py-10 px-5 sm:px-14 bg-[#F4F6F7]"> */}

        {/* Heading Section */}
        <Box className="flex flex-col items-center justify-center text-center mb-10 ">
          <Typography className="text-4xl font-semibold text-[#2E2E2E] poppins">
            About Buraq Star
          </Typography>

          <Typography className="text-sm sm:text-base md:text-md max-w-xl text-gray-500 mt-2 poppins mx-auto">
            A trusted UAE trading house delivering premium electrical, sanitary,
            hardware, and building essentials since 2002.
          </Typography>
          <div className="flex items-center justify-center gap-4 mb-6 ">
            <div className="w-24 h-[1px] bg-gray-500 rounded-3xl"></div>

            <img
              src={buraqlog}
              alt="Buraq Logo"
              className="w-8 h-8 object-contain"
            />

            <div className="w-24 h-[1px] bg-gray-500 rounded-3xl"></div>
          </div>
        </Box>

        {/* Cards Section */}
        <Grid container spacing={4} className="justify-center ">
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm md:p-6 text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-2 sm:text-p-2 md:p-3">
                  <ShareLocationOutlinedIcon
                    sx={{ fontSize: 44, color: "#2858A4" }}
                  />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                Dubai & Sharjah
              </Typography>
              <Typography className="text-sm sm:text-base md:text-md text-gray-500 md:mt-2 poppins max-w-sm mx-auto p-2 sm:text-p-2 md:p-3">
               Operating from strategic locations with showrooms and warehouses to serve customers efficiently across the UAE.
              </Typography>
            </Box>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm md:p-6 text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-2 sm:text-p-2 md:p-3">
                  <VerifiedUserIcon sx={{ fontSize: 44, color: "#2858A4" }} />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                20+ Years of Experience
              </Typography>
              <Typography className="text-sm sm:text-base md:text-md text-gray-500 md:mt-2 poppins max-w-sm mx-auto p-2 sm:text-p-2 md:p-3">
               Over two decades of delivering quality products, building trust with contractors, retailers, and homeowners across the region.
              </Typography>
            </Box>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm md:p-6 text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-2 sm:text-p-2 md:p-3">
                  <StarBorderIcon sx={{ fontSize: 44, color: "#2858A4" }} />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                GCC Reach
              </Typography>
              <Typography className="text-sm sm:text-base md:text-md text-gray-500 md:mt-2 poppins max-w-sm mx-auto p-2 sm:text-p-2 md:p-3">
                Strong regional presence with supply capabilities extending across the GCC through reliable partnerships and networks.
              </Typography>
            </Box>
          </Grid>

          {/* Card 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm md:p-6 text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-2 sm:text-p-2 md:p-3">
                  <PublicIcon sx={{ fontSize: 44, color: "#2858A4" }} />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                International Distribution
              </Typography>
              <Typography className="text-sm sm:text-base md:text-md text-gray-500 md:mt-2 poppins max-w-sm mx-auto p-2 sm:text-p-2 md:p-3">
               Backed by a global supply chain, enabling consistent sourcing, premium quality, and timely availability of products.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Grid>

      {/* WHO WE ARE */}
    <Grid item xs={12} className="bg-[#F4F6F7]" sx={{ py: { xs: 4, sm: 6, md: 10 }, px: { xs: 2, sm: 4, md: 10 } }}>
  <Box sx={{ width: "100%", py: { xs: 3, sm: 4 }, px: { xs: 2, sm: 4 }, borderRadius: "24px" }}>
    <Grid container sx={{ background: "#fff", borderRadius: "12px", p: { xs: 2, sm: 3, md: 4 }, alignItems: "center" }} spacing={3}>
      
      {/* Left Column: Text Content */}
      <Grid item xs={12} md={8}>
        <Box sx={{ textAlign: { xs: "center", sm: "left" }, px: { xs: 0, sm: 2, lg: 4 } }}>
          <Typography
            className="poppins"
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.8rem", md: "2rem", lg: "2.25rem" },
              fontWeight: 600,
              color: "#2E2E2E",
              lineHeight: 1.3,
              mt: { xs: 2, md: 3 },
              mb: 2,
            }}
          >
            {t("who_we_are")}
          </Typography>

          <Typography
            className="poppins"
            style={paragraphStyle}
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.1rem" },
              color: "#152E3A",
              lineHeight: 1.7,
              mb: 1.5,
              textAlign: { xs: "left", sm: "left" },
              maxWidth: "700px",
              mx: { xs: "auto", sm: 0 },
            }}
          >
            {t("who_we_are_description1")}
          </Typography>

          <Typography
            className="poppins"
            style={paragraphStyle}
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.1rem" },
              color: "#152E3A",
              lineHeight: 1.7,
              mb: 2,
              textAlign: { xs: "left", sm: "left" },
              maxWidth: "700px",
              mx: { xs: "auto", sm: 0 },
            }}
          >
            {t("who_we_are_description2")}
          </Typography>

          {/* Checklist */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 }, mt: 1 }}>
            {[
              "Trusted Since 2002",
              "Premium Brand Portfolio",
              "Professional & Retail Supply",
              "Reliable Delivery Network",
            ].map((item, index) => (
              <Box  key={index} sx={{ display: "flex", alignItems: "left", gap: { xs: 1.5, sm: 2 }, justifyContent: { xs: "left", sm: "flex-start" } }}>
                <Box
                  sx={{
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                    p: "6px",
                    flexShrink: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <DoneIcon sx={{ color: "#2858A4", fontSize: { xs: 16, sm: 18, md: 20 } }} />
                </Box>
                <Typography
                  className="poppins"
                  style={paragraphStyle}
                  
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    color: "#374151",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginTop:1
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>

      {/* Right Column: Image */}
      <Grid item xs={12} md={4}>
        <Box sx={{ display: "flex", justifyContent: "left", mt: { xs: 3, md: 0 } }}>
          <img
            src={who}
            alt="Who we are"
            style={{ width: "100%", height: "auto", borderRadius: "12px", maxWidth: "420px" }}
          />
        </Box>
      </Grid>

    </Grid>
  </Box>
</Grid>

      {/* OUR PROMISES
       */}
      <Grid item xs={12} className="py-4 px-4 md:py-20 md:px-20 ">
        <Box
          className="w-full "
          sx={{
            backgroundImage: `url(${image1})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: { xs: "180px", sm: "180px", md: "150px" },
            display: "flex",
            alignItems: "center",
            px: { xs: 3, sm: 12 },
            py: 2,
          }}
        >
          <Grid container className="items-center" spacing={2}>
            <Grid item xs={12} sm={5}>
              <Typography
                className="poppins font-semibold text-[#152E3A]  sm:mt-5 xs:mt-5"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Our Promise
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography
                className="poppins text-[#4A5568] leading-6 lg:text-lg md:lg:text-lg text:sm"
                sx={{  maxWidth: 700 }}
              >
                We don't just supply products — we support projects. Every item
                we offer is selected and delivered with one goal :{" "}
                <span className="font-semibold text-[#152E3A]">
                  to help our customers build with confidence.
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Box className="w-full bg-[#F4F6F7] py-12 px-4 sm:px-10">
        {/* Header */}
        <Box className="text-center mb-12">
          <Typography className="text-3xl sm:text-4xl font-semibold text-[#2E2E2E] poppins">
            Why Buraq Star
          </Typography>
          <Typography className="text-gray-500 mt-2 max-w-xl mx-auto poppins">
            Premium-grade essentials, built for professionals who don’t
            compromise on quality.
          </Typography>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-20 h-[1px] bg-gray-400"></div>
            <img
              src={buraqlog}
              alt="Buraq Logo"
              className="w-8 h-8 object-contain"
              loading="lazy"
            />
            <div className="w-20 h-[1px] bg-gray-400"></div>
          </div>
        </Box>

        {/* Cards */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {features.map((item, index) => (
            <Box
              key={index}
              className="bg-white rounded-2xl md:p-16 p-5 shadow-sm flex flex-col items-left"
            >
              {/* ICON (centered) */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-[#2858A4] mb-6 text-4xl">
                {item.icon}
              </div>

              {/* CONTENT (left aligned but centered block) */}
              <div className="w-full max-w-md text-left">
                <Typography className="lg:text-2xl md:lg:2xl text-lg text:sm font-semibold text-[#2E2E2E] text-md sm:text-base md:mb-2 mb-3 poppins">
                  {item.title}
                </Typography>

                <Typography className="text-gray-500 text-sm sm:text-base md:text-md lg:mt-10 text-base leading-relaxed poppins ">
                  {item.desc}
                </Typography>
              </div>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="w-full h-fit py-6 px-5 sm:px-14 bg-white mt-7">
        {/* Parent Grid container with vertical centering */}
        <Grid container className="pb-10 items-center">
          {/* Right Column: Image  */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            className="flex justify-center order-1 md:order-1"
          >
            <img
              className="w-full h-auto relative rounded-2xl"
              src={operation}
              alt="Profile"
            />
          </Grid>

          {/* Left Column: Mission Text  change order for shw text after image in mobile and before in desktop*/}

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            className="px-0 sm:px-8  order-2 md:order-2 space-y-3"
          >
            <Typography className="text-4xl font-semibold text-[#2E2E2E] poppins mt-8">
              {t("our_operations")}
            </Typography>
            <div className="flex items-center  gap-4 mb-6 ">
              <div className="w-24 h-[1px] bg-gray-500 rounded-3xl"></div>
              <img
                src={buraqlog}
                alt="Buraq Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="w-24 h-[1px] bg-gray-500 rounded-3xl"></div>
            </div>
            <Typography
              className="text-md text-[#152E3A] poppins leading-6 text-justify md:text-left"
              style={paragraphStyle}
            >
              {t("our_operations_description_1")}
            </Typography>
            <Typography
              className="text-md text-[#152E3A] poppins leading-6 text-justify sm:text-left"
              style={paragraphStyle}
            >
              {t("our_operations_description_2")}
            </Typography>
            <div className="flex flex-col  ">
              {[
                "Showrooms in Duvai & Sharjah",
                "Large Storage Capacity Warehouses",
                "UAE-Wide Delivery Coverage",
                "Regional Presence Across GCC & Beyond",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-5 ">
                  <div className="rounded-full bg-gray-200 flex items-center justify-center shadow-sm p-2 shrink-0 mt-5">
                    <DoneIcon
                      className=""
                      sx={{ color: "#2858A4", fontSize: 20 }}
                    />
                  </div>
                  <Typography
                    className="text-md text-gray-600 poppins font-semibold leading-6 mt-5"
                    style={paragraphStyle}
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Box>

                  {/* {FLAG SECTION} */}
      <Box className="w-full py-10 px-4 sm:px-10 bg-[#F4F6F7] mt-10">
        {/* Header */}
        <Box className="text-center mb-10">
          <Typography className="text-3xl sm:text-4xl font-semibold text-[#2E2E2E] poppins">
            Our Regional Presence
          </Typography>
          <Typography className="text-gray-500 mt-2 max-w-xl mx-auto poppins">
            With strong roots in the UAE and partnerships across the region, we
            proudly serve customers in
          </Typography>
          <div className="flex items-center justify-center gap-4 mt-4">
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
        {/* Countries Row */}
        <Box className="mx-auto bg-white rounded-xl overflow-hidden border-2 border-gray-100 grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-5">
          {countries.map((country, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center h-[101px] border-r last:border-r-0 border-gray-200 group cursor-pointer overflow-hidden"
            >
              {/* Flag Background */}
              <img
                src={country.flag}
                alt={country.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-300 z-0"
              />
              {/* Dark overlay (for readability) */}
              <div className="absolute group-hover:opacity-100 transition duration-300 z-10"></div>
              {/* Country Name */}
              <span className="relative z-20 text-gray-700 group-hover:text-white font-semibold text-xl poppins transition duration-300">
                {country.name}
              </span>
            </div>
          ))}
        </Box>
      </Box>


            {/* {Mission and Vision} */}
      <Box className="w-full py-10 px-4 sm:px-10  mt-10">
            <Box className="text-center mb-10">
          <Typography className="text-3xl sm:text-4xl font-semibold text-[#2E2E2E] poppins">
           Mission & Vision
          </Typography>
          <div className="flex items-center justify-center gap-4 mt-4">
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

           <Grid container spacing={4} className="justify-center ">
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-3">
                  <TrackChangesOutlinedIcon
                    sx={{ fontSize: 44, color: "#2858A4" }}
                    />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                    {/* {t("mission")} */}
                Our Mission
              </Typography>
              <Typography className="text-md text-gray-500 mt-2 poppins max-w-lg mx-auto p-3">
                  {/* {t("mission_description")} */}
               To Create World-class products under our brands — Buraq, Novex, Zilco, and Cavil — combining functionality and aesthetics to deliver exceptional value.
              </Typography>
            </Box>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box className="bg-gray-100 rounded-xl shadow-sm text-center h-full">
              <div className="flex justify-center mb-3 p-6">
                <div className="rounded-full bg-white flex items-center justify-center shadow-sm p-3">
                  <LightbulbOutlinedIcon  sx={{ fontSize: 44, color: "#2858A4" }} />
                </div>
              </div>
              <Typography className="font-semibold text-xl text-[#2E2E2E] poppins p-1">
                Our Vision
                {/* {t("vision")} */}
              </Typography>
              <Typography className="text-md text-gray-500 mt-2 poppins max-w-lg mx-auto p-3">
               To be a global leader in innovative , high—quality products that enrich lives and set new standards of excellence.
                {/* {t("vision_description")} */}
              </Typography>
            </Box>
          </Grid>
          </Grid>
      </Box>

            


  
    </Grid>
  );
};

export default Message;
