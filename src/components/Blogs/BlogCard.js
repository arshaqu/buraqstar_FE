import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {

  const navigate = useNavigate();

  return (
    <Box className="h-fit w-full relative flex flex-col"  onClick={() => navigate('/blog/' + blog.slug)}>
      {/* <img src={blog.banner} alt={blog.name} className="w-full h-full object-cover" /> */}
      <img src={blog.banner} alt={blog.name} className="w-full" style={{ float: 'left', height: '350px', objectFit: 'cover' }} />
      <Typography className="text-xl pt-3 capitalize font-semibold text-black poppins">
        {blog.title}
      </Typography>
      <Typography className="text-xs pt-3 text-black poppins" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {blog.short_description}
      </Typography>
      <Button className="poppins text-xs capitalize w-fit pt-5 text-[#02ADEC] p-0"  onClick={() => navigate('/blog/' + blog.slug)}>
        Read More
      </Button>
    </Box>
  );
};

export default BlogCard;
