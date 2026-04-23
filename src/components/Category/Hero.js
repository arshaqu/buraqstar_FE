import React from "react";
import { Box, Typography } from "@mui/material";

const Hero = ({ bg, title, desc = null, color = null }) => {
  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        textAlign: "center",
        background: "linear-gradient(90deg, #2858a3 0%, #2858a3 100%)",
      }}
      className=""
    >
      <Box sx={{ py: 8, position: "relative", zIndex: 2 }}>
        <Typography
          variant="h4"
          className="poppins font-bold justify-center align-middle"
          sx={{ color: "#fff" }}
        >
          {title}
        </Typography>
        {
          !desc ?? <>
            <Typography variant="body1" className="poppins" sx={{ color: "#fefefe" }}>
              Find our nearest stores and visit us today!
            </Typography>
          </>
        }
      </Box>

      {/* Wave SVG at the bottom of the header */}
      {/* <Box
        component="svg"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
        }}
      >
        <path
          d="M0,49.98 C150,150 350,-50 500,49.98 L500,150 L0,150 Z"
          fill={color ? color : '#f7f9fc'}
        />
      </Box> */}
    </Box>


  );
};

{/* <Box
sx={{ backgroundImage: `url(${bg})` }}
className="w-full h-56 bg-cover bg-no-repeat bg-center px-10 sm:px-24 flex items-end pb-14"
>
<Typography className="text-white text-3xl sm:text-6xl font-semibold poppins">
  {title}
</Typography>
</Box> */}

export default Hero;
