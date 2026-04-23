import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { RelatedSlider, BlogLayout, Aside } from "../components";
import ajaxService from "../services/ajax-service";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { i18n } = useTranslation();
  const { slug } = useParams()
  const location = useLocation()

  const [blog, setBlog] = useState();
  const [recent, setRecent] = useState();

  const loadData = async () => {
    const currentLang = i18n.language || 'en';
    const response = await ajaxService.get(`/blog/details/${slug}?lang=${currentLang}`);
    const { success, data, recentBlogs } = response;
    if (success) {
      setRecent(recentBlogs.data)
      setBlog(data);
    }
  }

  useEffect(() => {
    loadData();
  }, [location.pathname, i18n.language]) // Re-fetch when language changes

  return (
    <Box className="w-full h-auto m-0 py-16 px-5 sm:p-16  bg-white">
      <Grid container>
        <Grid item xs={12} sm={8}>
          <BlogLayout blog={blog} />
        </Grid>
        <Grid item xs={12} sm={4} className="mt-10 sm:mt-0">
          <Aside latest={recent} />
        </Grid>
        {/* <Grid item xs={12}>
          <RelatedSlider />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Blog;
