import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import certificate1 from "../../assets/certificate1.jpg";
import certificate2 from "../../assets/certificate2.jpg";
import certificate3 from "../../assets/certificate3.jpg";
import certificate4 from "../../assets/certificate4.jpg";
import certificate5 from "../../assets/certificate5.jpg";

const Certifications = () => {
  const certificates = [
    certificate1,
    certificate2,
    certificate3,
    certificate4,
    certificate5,
  ];
  return (
    <Box className="w-full h-fit pb-16">
      <Typography className="poppins text-center capitalize text-3xl font-bold w-full text-[#2E2E2E] mb-5 sm:mb-10 py-2">
        Our Certifications
      </Typography>
      <Grid container className="px-5 sm:px-10 flex justify-center">
        {certificates.map((cert, i) => (
          <Grid item xs={12} sm={4} key={i} className="p-2.5">
            <Box className="w-full h-fit bg-[#e8f8fd]">
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
