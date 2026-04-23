import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import i18next
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import ReplayIcon from "@mui/icons-material/Replay";
import ForumIcon from "@mui/icons-material/Forum";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { FREE_DELIVERY_THRESHOLD } from "../../constants";

const Qualities = () => {
  const { t } = useTranslation(); // Hook for translations

  const features = [
    {
      logo: <LocalShippingIcon className="text-6xl" />,
      title: t("qualities.free_delivery"),
      subtitle: t("qualities.free_delivery_sub", { threshold: FREE_DELIVERY_THRESHOLD }),
    },
    {
      logo: <StarIcon className="text-6xl" />,
      title: t("qualities.best_quality"),
      subtitle: t("qualities.best_quality_sub"),
    },
    {
      logo: <ReplayIcon className="text-6xl" />,
      title: t("qualities.one_year"),
      subtitle: t("qualities.one_year_sub"),
    },
    {
      logo: <ForumIcon className="text-6xl" />,
      title: t("qualities.feedback"),
      subtitle: t("qualities.feedback_sub"),
    },
    {
      logo: <CreditScoreIcon className="text-6xl" />,
      title: t("qualities.payment"),
      subtitle: t("qualities.payment_sub"),
    },
  ];

  return (
    <Box className="h-fit w-full p-6 gap-x-10 gap-y-5 flex justify-center items-center flex-wrap my-6">
      {features.map((val, i) => (
        <Box className="flex flex-col items-center group relative" key={i}>
          <Box className="bg-white p-2 mb-2 rounded-xl relative z-10">
            <span className="text-[#2858a3]">{val.logo}</span>
          </Box>
          <Box className="flex justify-center w-32 sm:w-40 items-center flex-col p-5 pt-8  rounded-lg border border-transparent group-hover:border-[#2858a3] group-hover:shadow-lg transition-all duration-300">
            <Typography className="text-base text-center poppins text-black font-semibold">
              {val.title}
            </Typography>
            <Typography className="text-xs text-center poppins text-black">
              {val.subtitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Qualities;
