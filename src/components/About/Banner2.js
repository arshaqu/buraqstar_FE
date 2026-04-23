import React from "react";
import { Box, Typography } from "@mui/material";
import bg from "../../assets/banner2bg.jpg";

const Banner2 = () => {
  return (
    <Box
      sx={{ backgroundImage: `url(${bg})` }}
      className="w-full h-fit bg-cover bg-no-repeat bg-center px-7 md:px-12 lg:px-24 py-24"
    >
      <Typography className="poppins text-3xl font-bold text-white capitalize py-2">
        Quality is a trait that we appreciate,
      </Typography>
      <Typography className="poppins text-xs leading-5 font-light text-white pt-5">
        Quality is a trait that we appreciate, we start with quality and ends in
        the Excellence. We know that organization excellence is not about the
        management of quality, it is about the quality of management. Defining
        quality is not easy for everyone. We purely focus on the customer driven
        challanges by proactive, systematic, strategic approaches, integrated
        processes, conformance to specifications through dedicated professional
        team, continuous improvement with the high quality at every level and
        best support services. To fulfil the quality need and cognitive
        satisfaction of customers, we emphasis the structure of on-going
        improvement process with the latest designs and reflective featured
        products. Buraq Star Group of Companies ensures the high standards of
        quality through the Plan, Do, Act, and Check process, by the proper
        utilization of expert's research and development strategies, which is
        vital to the success of all the quality management initiatives. We have
        set hallmark benchmarks through our quality oriented products, locally
        and globally. <br /><br /> OUR TEAM With the concept of “ together every one
        achieve more” Buraq Star is having strong, committed, dedicated and
        diversified professional team. Under the leading supervision of
        Chairman, team has aligned their goals for the collaborative and
        ultimate achievements of Buraq Star. With integrity, peer to peer
        co-ordination concept, management has empowered his dedicated team to
        contribute in the progress through the kaizen process and open
        suggestions to enlighten the vision of the company. Buraq Star Trading
        Co. LLC always promotes the sense of fair equity and flatter structure,
        which are the core essentials to ensure a well balanced work place.
      </Typography>
    </Box>
  );
};

export default Banner2;
