import { Box } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import NavigationBar from "./NavigationBar";
import SocialLinkBar from "./SocialLinkBar";
import HeaderBar from "./HeaderBar";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [headerHeight, setHeaderHeight] = useState(130);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isMobile) {
        // Hide header when scrolling down after 100px, show when scrolling up
        setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      } else {
        // Desktop: always keep header visible
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsVisible(true);
      
      // Update header height on resize for both mobile and desktop
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial height calculation for both mobile and desktop
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY, isMobile]);

  // Update header height when components mount
  useEffect(() => {
    if (headerRef.current) {
      const updateHeight = () => {
        setHeaderHeight(headerRef.current.offsetHeight);
      };
      
      // Use setTimeout to ensure components are rendered
      setTimeout(updateHeight, 100);
    }
  }, []);

  // Header styles for both mobile and desktop
  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: 'white',
    boxShadow: isVisible ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
  };

  return (
    <Box className="w-full">
      {/* Sticky Header for both mobile and desktop */}
      <Box ref={headerRef} sx={headerStyles}>
        <SocialLinkBar />
        <HeaderBar />
        <NavigationBar />
      </Box>
      {/* Content Spacer */}
      <Box sx={{ height: `${headerHeight}px` }} />
    </Box>
  );
};

export default Header;
