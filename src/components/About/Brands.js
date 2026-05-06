import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import novex from "../../assets/novex.png";
import zilco from "../../assets/zilco.png";
import cavil from "../../assets/cavil.png";
import buraq from "../../assets/buraq.png";
import { useNavigate } from "react-router-dom";   
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import BrandsScroll from "../Layout/BrandsScroll";


const paragraphStyle = { hyphens: "auto", wordBreak: "break-word" };

const Brands = ({ t }) => {
  const navigate = useNavigate();
  const logos = [
    { src: novex, alt: "Novex" },
    { src: cavil, alt: "Cavil" },
    { src: buraq, alt: "Buraq" },
    { src: zilco, alt: "Zilco" },
  ];

  const data = [
    {
      image: novex,
      title: "NOVEX" , 
      desc: "A renowned UK-origin brand with a strong legact, offering an extensive range of electrical accessories, tools , fans, lighting solutions, water heaters, and plubing essentials — engineered for quality and durability." ,
      // desc: t("novex_description"),
      className: "h-10 w-auto",
      links: '/brand/novex'
    },
    {
      image: zilco,
      title: "ZILCO",
      // desc: t("zilco_description"),
      desc: "A specilaist in switchgear and protection systems, recognized for safety, reliability, and modern design. Products include MCB, MCCB, ELCB, RCBO, isolators, enclosures, and distribution systems." ,
      className: "h-11 w-auto",
      links: '/brand/zilco'

    },
    {
      image: cavil,
      title: "CAVIL",
      // desc: t("cavil_description"),
      desc: "An Italian-origin brand known for innovation in residential and commercial applications, air circulation solutions, extractor fans, LED lighting, and premium sanitary fittings." ,
      className: "h-10 w-auto",
      links: '/brand/cavil'
    },
    {
      image: buraq,
      title: "BURAQ",
      // desc: t("buraq_description"),
      desc: "A performance-driven brand specializing in ventilation systems and water pumps, designed for comfort, efficienct, and reliability in both residential and commercial spaces." ,
      className: "h-9 w-auto",
      links: '/brand/buraq'
    },
  ];



  return (
    <Box className="w-full py-10  bg-gray-100 p-2 ">
      {/* Header */}
      <BrandsScroll/>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:p-16 gap-6 mx-auto">
        {data.map((item, index) => (
          <Box
            key={index}
            className="bg-white rounded-2xl md:p-16 sm:p-4 p-6  shadow-sm flex flex-col items-left"
          >
       
            {/* CONTENT (left aligned but centered block) */}
            <div className="w-full max-w-2xl text-left">
              <Typography className="text-2xl font-semibold text-[#2E2E2E] mb-3 poppins">
                {item.title}
              </Typography>

              <Typography className="text-gray-500 text-md mt-5 text-base leading-relaxed poppins ">
                {item.desc}
              </Typography>
            </div>
                
           <div className="mt-6">
        <button
          onClick={() => navigate(item.links)}
          className="px-6 py-2 text-gray-800 border border-gray-800 hover:bg-gray-900 hover:text-white rounded-lg  transition"
        >
          View {item.title}<CallMadeOutlinedIcon className="text-md mb-1 ml-2"/>
        </button>
      </div>


          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Brands;
