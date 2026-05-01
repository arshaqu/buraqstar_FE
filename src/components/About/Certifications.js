import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";
import certificate3 from "../../assets/certificate3.jpg";
import certificate4 from "../../assets/certificate4.jpg";
import certificate5 from "../../assets/certificate5.jpg";
import buraqlog from "../../assets/buraqlog.png";


const Certifications = () => {
  const certificates = [
    certificate1,
    certificate2,
    certificate3,
    certificate4,
    certificate5,
  ];
  return (
    <Box className="w-full h-fit ">
           <Box className="text-center mb-10 mt-10">
        <Typography className="text-3xl sm:text-4xl font-semibold text-[#2E2E2E] poppins">
         Our Certificates
        </Typography>

        <Typography className="text-gray-500 mt-2 max-w-xl mx-auto poppins">
         Our standards are supported by certified quality practices and compliance, ensuring reliability across product lines and markets.
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

      
      <Grid container className="px-5 sm:px-10 flex justify-center gap-5" >
        {certificates.map((cert, i) => (
          <Grid item xs={12} sm={2} key={i}>
            <Box className="w-full h-fit  border-[6px] border-gray-50 rounded-lg ">
              <img
                src={cert}
                alt={`certificate${i}`}
                className="w-full h-auto"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Certifications;
