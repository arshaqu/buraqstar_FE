// FadeTransition.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FadeTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [renderChildren, setRenderChildren] = useState(children);

  useEffect(() => {
    if (location.pathname !== currentPath) {
      // Trigger fade-out when location changes
      setIsFadingOut(true);

      // Delay the navigation until fade-out is complete
      const timeoutId = setTimeout(() => {
        setCurrentPath(location.pathname); // Update the current path after fade-out
        setRenderChildren(children); // Set the new children after navigation
        setIsFadingOut(false); // End fade-out
        setIsFadingIn(true); // Trigger fade-in
      }, 300); // Match this duration with Tailwind's duration-500

      return () => clearTimeout(timeoutId);
    } else {
      // Handle direct URL access or page refresh
      setRenderChildren(children); // Immediately render the current route's children
      setIsFadingIn(true); // Fade in directly for initial load or refresh
    }
  }, [location, currentPath, children]);

  useEffect(() => {
    if (isFadingIn) {
      const timeoutId = setTimeout(() => {
        setIsFadingIn(false); // End fade-in after the animation
      }, 500); // Match this duration with Tailwind's duration-500

      return () => clearTimeout(timeoutId);
    }
  }, [isFadingIn]);

  return (
    <div
      className={`transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : isFadingIn ? 'opacity-100' : ''}`}
    >
      {renderChildren}
    </div>
  );
};

export default FadeTransition;
