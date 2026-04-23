import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Import i18next

const accessToken = "IGAAZAHBPYTBB1BZAE0zODVqS0dXQ3NfOGU4cEFfRU1JNmE1d3g1NWFjLUxfVVdxX0N1OUY1ME1fS0pEaktJb21Vd2FGMDNDWXFNYWNWaUJXVHExWDZAyMFpCd1B3a0ZAkdnd6cjZAfeEZAqbnJ1aW02WU1pbHRhS24tS0hWS0pWOVVNOAZDZD";

const SEOInstagram = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const [followers, setFollowers] = useState(0);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  useEffect(() => {
    const fetchInstagramData = async () => {
      try {
        const userResponse = await axios.get(
          `https://graph.instagram.com/me?fields=followers_count&access_token=${accessToken}`
        );
        setFollowers(userResponse.data.followers_count);
      } catch (error) {
        console.error("Error fetching Instagram user data", error);
      }
    };

    fetchInstagramData();
  }, []);

  return (
    <>
      <Box className="w-full flex flex-col items-center ">
        {/* Main SEO Text Section */}
        <Box className="w-full pt-10 pb-10 px-8 sm:pt-0 sm:pb-10 sm:px-28 text-justify sm:text-left">
          <Typography className="text-sm sm:text-xl pb-4 poppins text-[#141516] uppercase font-semibold">
            {t("seo_instagram.title")}
          </Typography>

          <Box style={{ textAlign: "justify", textJustify: "inter-word" }} className="text-justify sm:text-left">
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph1")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph2")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph3")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph4")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph5")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph6")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph7")}
            </Typography>
            <Typography
              className="text-sm leading-6 poppins text-[#5D5D5D] mt-3 text-justify sm:text-left"
              style={{ hyphens: "auto", wordBreak: "break-word" }}
            >
              {t("seo_instagram.paragraph8")}
            </Typography>
          </Box>
        </Box>

        <Divider className="bg-[#CCCCCC] my-4 w-[90%]" />

        {/* Instagram Stats */}
        {/* <Box className="flex flex-wrap  justify-center md:justify-between items-center  px-8 sm:px-28 w-full pt-16 pb-4">
          <Typography className="text-3xl pb-4 poppins  text-[#141516] capitalize font-semibold flex items-center  gap-x-2">
            <InstagramIcon className="text-4xl" />
            {t("seo_instagram.instagram_feed")}
          </Typography>

          <Box className="flex items-center gap-x-3">
            <Typography className="sm:text-lg text-sm poppins text-[#02ADEC] flex items-center gap-x-1">
              <PersonOutlineOutlinedIcon />
              {followers} {t("seo_instagram.followers")}
            </Typography>
            <Typography className="sm:text-lg text-sm poppins text-[#02ADEC] flex items-center gap-x-1">
              <FavoriteBorderOutlinedIcon />
              5k {t("seo_instagram.likes")}
            </Typography>
            <Typography className="sm:text-lg text-sm poppins text-[#02ADEC] flex items-center gap-x-1">
              <QuestionAnswerOutlinedIcon />
              5k {t("seo_instagram.comments")}
            </Typography>
          </Box>
        </Box> */}
      </Box>

      {/* The Swiper with IG images */}
      {/* <Box className="w-full">
        <Slider />
      </Box> */}
    </>
  );
};

export default SEOInstagram;

// Slider component for IG media
const Slider = () => {
  const { i18n } = useTranslation();
  const [images, setImages] = useState([]);

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  useEffect(() => {
    const fetchInstagramImages = async () => {
      try {
        const response = await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type&access_token=${accessToken}`
        );
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching Instagram images", error);
      }
    };

    fetchInstagramImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      className={`w-full pb-6 mb-10 ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }}
    >
      {images.map((media) => (
        <SwiperSlide key={media.id} className="relative group rounded-md overflow-hidden">
          <a href={media.permalink} target="_blank" rel="noopener noreferrer" className="block w-full">
            {/* Image or Video depending on media_type */}
            {media.media_type === "VIDEO" ? (
              <video
                src={media.media_url}
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={media.media_url}
                alt={media.caption}
                className="w-full h-auto object-cover"
              />
            )}

            {/* Hover Overlay */}
            <Box className="absolute inset-0 hidden group-hover:flex cursor-pointer bg-black bg-opacity-40 justify-center items-center flex-col gap-y-1">
              <InstagramIcon className="text-6xl text-white" />
              {media.caption && (
                <Typography className="text-base text-white text-center px-2">
                  {media.caption}
                </Typography>
              )}
            </Box>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};