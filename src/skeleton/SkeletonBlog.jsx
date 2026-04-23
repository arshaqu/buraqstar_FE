import React from "react";

const SkeletonBlog = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg p-4 m-5  mb-4 bg-white">
      {/* Image Skeleton */}
      <div className="animate-pulse relative">
        <div className="h-80 bg-gray-400 rounded w-full"></div>
      </div>
      {/* Text Skeleton */}
      <div className="animate-pulse flex space-x-4 mt-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBlog;
