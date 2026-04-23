// Blogs.jsx

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import bg from "../assets/blog-hero.png";
import ajaxService from "../services/ajax-service";
import { BrandBanner, Hero, Slider, SliderTwo } from "../components";
import SkeletonBlog from "../skeleton/SkeletonBlog"; // Import SkeletonBlog component
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state

  const initialize = async () => {
    const currentLang = i18n.language || 'en';
    const response = await ajaxService.get(`/blogs?lang=${currentLang}`);
    const { data, success } = response;
    if (success) {
      setBlogs(data);
    }
    setLoading(false); // Once data is fetched, set loading state to false
  };

  useEffect(() => {
    initialize();
  }, [i18n.language]); // Re-fetch when language changes

  return (
    <Box className="w-full h-auto m-0 p-0">
      <SEO
        title="Blog | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Read the Buraq Star Trading blog. Explore insights, tips, and updates on electrical, sanitary, hardware, and tool products."
        keywords="electrical blog, hardware blog, industry insights, electrical news, hardware news, electrical tips, hardware tips, Buraq blog"
        url="/blogs"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Buraq Blog",
          "description": "Electrical and hardware industry insights and news",
                "url": `${SITE_URL}/blogs`,
          "publisher": {
            "@type": "Organization",
            "name": "Buraq"
          }
        }}
      />
      <Hero bg={bg} title={"Blogs"} />

      {/* Show SkeletonBlog component while loading */}
      {loading ? (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {[...Array(6)].map((_, index) => (
         <div key={index} className="col-span-1">
           <SkeletonBlog />
         </div>
       ))}
     </div>
      ) : (
        <>
          {/* Render actual content once loading is complete */}
          <Slider blogs={blogs} />
          <SliderTwo blogs={blogs} />
          <Box className="mb-20">
            <BrandBanner />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Blogs;
