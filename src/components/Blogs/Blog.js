import React from "react";
import { Typography } from "@mui/material";
import DOMPurify from 'dompurify';
import '../../App.css'; // Import your Tailwind CSS styles

const BlogLayout = ({ blog }) => {
  // Early return if blog is not loaded yet
  if (!blog) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Sanitize HTML content
  const sanitizedDescription = DOMPurify.sanitize(blog?.description || '');

  // Render HTML content directly
  const renderHTML = () => {
    if (!sanitizedDescription || sanitizedDescription.trim() === '') {
      return (
        <Typography variant="body1" className="poppins text-base mt-2 mb-2 text-gray-500">
          No content available.
        </Typography>
      );
    }

    // Use dangerouslySetInnerHTML to render the sanitized HTML directly
    // This preserves all HTML structure including nested elements, links, formatting, etc.
    return (
      <div 
        className="blog-content poppins text-base"
        style={{
          textAlign: 'justify',
          textJustify: 'inter-word',
          wordSpacing: '0.05em',
          lineHeight: '1.8'
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
    );
  };

  return (
    <>
      <Typography className="poppins font-normal capitalize text-4xl text-[#25252A] pb-8">
        {blog?.title}
      </Typography>
      <img className="w-full h-auto" src={blog?.banner} alt="blog bg" />
      <Typography className="poppins text-base text-black py-6">
        {blog?.created_at}
      </Typography>
      {renderHTML()}
    </>
  );
};

export default BlogLayout;
