import React, { useEffect, useRef, useState } from "react";
import { Box, ButtonBase, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next"; // Import i18next
import brandslogo from "../../assets/brandslogo.png";
import brandbg from "../../assets/brandbg.png";
import novex from "../../assets/Novexlogowhite.png";
import cavil from "../../assets/cavillogowhite.png";
import buraq from "../../assets/Buraqlogowhite.png";
import zilco from "../../assets/zilcologowhite.png";
import novexorange from "../../assets/novexlogored.png";
import cavilyellow from "../../assets/cavillogoyellow.png";
import buraqgreen from "../../assets/buraqlogogreen.png";
import zilcoblue from "../../assets/zilcologowhite.png";
import { useNavigate } from "react-router-dom";
import { BRANDS } from "../../constants";
import { createSlug } from "../../utils";

const brandLogos = [
  { name: BRANDS.NOVEX, src: [novex, novexorange], className: "h-16", hoverClassName: "h-20" },
  { name: BRANDS.CAVIL, src: [cavil, cavilyellow], className: "h-16 -mt-1", hoverClassName: "h-20 -mt-1" },
  { name: BRANDS.BURAQ, src: [buraq, buraqgreen], className: "h-16", hoverClassName: "h-20" },
  { name: BRANDS.ZILCO, src: [zilco, zilcoblue], className: "h-16 -mt-3", hoverClassName: "h-20 -mt-3" },
];

const BrandsBanner = ({ brands }) => {
  const { t } = useTranslation(); // Hook for translations
  const navigate = useNavigate();

  // Measure the desktop row height so the center badge can match it exactly
  const desktopRowRef = useRef(null);
  const [desktopRowHeight, setDesktopRowHeight] = useState(0);
  const [logoAnimationState, setLogoAnimationState] = useState('hidden'); // 'hidden', 'appearing', 'visible', 'disappearing'

  useEffect(() => {
    const measure = () => {
      if (desktopRowRef.current) {
        setDesktopRowHeight(desktopRowRef.current.clientHeight || 0);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animation loop with faster cadence
  useEffect(() => {
    const timeoutsRef = { current: [] };

    // Define the loop function first
    const startLoop = () => {
      setLogoAnimationState('appearing');
      
      // After appearing completes, show visible
      const appearDuration = 900;
      const visibleDuration = 800;
      const disappearDuration = 500;
      const hiddenDelay = 10;

      const visibleTimeout = setTimeout(() => {
        setLogoAnimationState('visible');
        
        // Stay visible briefly, then start disappearing
        const disappearTimeout = setTimeout(() => {
          setLogoAnimationState('disappearing');
          
          // After disappearing completes, loop back to hidden
          const hiddenTimeout = setTimeout(() => {
            setLogoAnimationState('hidden');
            
            // Restart the loop after short delay
            const restartTimeout = setTimeout(() => {
              startLoop();
            }, hiddenDelay);
            
            timeoutsRef.current.push(restartTimeout);
          }, disappearDuration);
          
          timeoutsRef.current.push(hiddenTimeout);
        }, visibleDuration);
        
        timeoutsRef.current.push(disappearTimeout);
      }, appearDuration);
      
      timeoutsRef.current.push(visibleTimeout);
    };

    // Initial short delay, then start the loop
    const initialDelay = setTimeout(() => {
      startLoop();
    }, 500);
    
    timeoutsRef.current.push(initialDelay);

    // Cleanup
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <Box className="w-full">
      {/* Local keyframes for bottom-to-top reveal with blue glow on the central brand badge */}
      <style>{`
        @keyframes brandBottomReveal {
          0% { opacity: 0; clip-path: inset(100% 0 0 0); }
          100% { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        @keyframes brandBottomHide {
          0% { opacity: 1; clip-path: inset(0 0 0 0); }
          100% { opacity: 0; clip-path: inset(100% 0 0 0); }
        }
        @keyframes brandBlueGlow {
          0% { opacity: 0; transform: scale(0.9); }
          40% { opacity: 0.6; }
          100% { opacity: 0; transform: scale(1.05); }
        }
        .brand-logo-container { position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden; width: 100%; height: 100%; border-radius: 50%; clip-path: circle(50% at 50% 50%); }
        .brand-blue-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle at 50% 70%, rgba(40, 88, 163, 0.5), rgba(40, 88, 163, 0.3) 45%, rgba(40, 88, 163, 0) 75%); animation: brandBlueGlow 950ms cubic-bezier(0.22, 1, 0.36, 1) 250ms both; }
        /* Responsive banner row height */
        .brands-row { height: 140px; }
        .mobile-brands-container { height: 200px; overflow: hidden; }
        .mobile-brand-item { position: relative; height: 60px; display: flex; align-items: center; justify-content: center; }
        .mobile-brand-hover { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; pointer-events: none; }
        @media (min-width: 640px) { /* sm */
          .brands-row { height: 180px; }
        }
        @media (min-width: 768px) and (max-width: 1023px) { /* iPad */
          .brands-row { height: 140px !important; }
          .brand-logo-ipad { height: 3.5rem !important; max-width: 120px; object-fit: contain; }
          .brand-logo-ipad-hover { height: 4.5rem !important; max-width: 150px; object-fit: contain; }
          .brand-logo-container { max-width: 120px !important; max-height: 120px !important; }
        }
        @media (min-width: 1024px) { /* lg */
          .brands-row { height: 150px; }
        }
      `}</style>
      {/* Background with brandbg.png */}
      <Box 
        className="w-full py-0 px-4 sm:px-8 lg:px-12 mt-0 mb-0 relative"
        style={{
          backgroundImage: `url(${brandbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Mobile: brandslogo.png positioned to overlap blue background */}
        <Box className="flex sm:hidden justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="brand-logo-container" 
            style={{ 
              width: '7rem', 
              height: '7rem',
              opacity: logoAnimationState === 'hidden' ? 0 : logoAnimationState === 'visible' ? 1 : undefined,
              animation: logoAnimationState === 'appearing' 
                ? 'brandBottomReveal 1500ms cubic-bezier(0.22, 1, 0.36, 1) both' 
                : logoAnimationState === 'disappearing'
                ? 'brandBottomHide 1200ms cubic-bezier(0.22, 1, 0.36, 1) both'
                : 'none'
            }}
          >
            {logoAnimationState === 'appearing' && <div className="brand-blue-glow" />}
            <img 
              src={brandslogo} 
              alt="Top Brands" 
              className="block w-auto object-contain"
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </Box>
        {/* Desktop: Horizontal Layout: NOVEX → CAVIL → brandslogo.svg → BURAQ → ZILCO */}
        <Box ref={desktopRowRef} className="hidden sm:flex items-center justify-between w-full brands-row">
          {/* NOVEX */}
          <ButtonBase 
            onClick={() => {
              const brand = brands.find((brand) => brand.name === BRANDS.NOVEX);
              if (brand) {
                const brandSlug = brand.slug || createSlug(brand.name);
                navigate(`/brand/${brandSlug}`);
              }
            }}
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 flex-1"
          >
            <Box className="text-white">
              <img
                src={brandLogos[0].src[0]}
                alt="NOVEX"
                className={`${brandLogos[0].className} brand-logo-ipad block group-hover:hidden`}
              />
              <img
                src={brandLogos[0].src[1]}
                alt="NOVEX"
                className={`${brandLogos[0].hoverClassName} brand-logo-ipad-hover hidden group-hover:block`}
              />
            </Box>
          </ButtonBase>

          {/* CAVIL */}
          <ButtonBase 
            onClick={() => {
              const brand = brands.find((brand) => brand.name === BRANDS.CAVIL);
              if (brand) {
                const brandSlug = brand.slug || createSlug(brand.name);
                navigate(`/brand/${brandSlug}`);
              }
            }}
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 flex-1"
          >
            <Box className="text-white">
              <img
                src={brandLogos[1].src[0]}
                alt="CAVIL"
                className={`${brandLogos[1].className} brand-logo-ipad block group-hover:hidden`}
              />
              <img
                src={brandLogos[1].src[1]}
                alt="CAVIL"
                className={`${brandLogos[1].hoverClassName} brand-logo-ipad-hover hidden group-hover:block`}
              />
            </Box>
          </ButtonBase>

          {/* Central brandslogo with synchronized smoke reveal (desktop) */}
          <Box className="flex flex-col items-center flex-1">
            <div 
              className="brand-logo-container" 
              style={{ 
                height: desktopRowHeight ? `${desktopRowHeight}px` : '100%', 
                width: desktopRowHeight ? `${desktopRowHeight}px` : 'auto',
                opacity: logoAnimationState === 'hidden' ? 0 : logoAnimationState === 'visible' ? 1 : undefined,
                animation: logoAnimationState === 'appearing' 
                  ? 'brandBottomReveal 1500ms cubic-bezier(0.22, 1, 0.36, 1) both' 
                  : logoAnimationState === 'disappearing'
                  ? 'brandBottomHide 1200ms cubic-bezier(0.22, 1, 0.36, 1) both'
                  : 'none'
              }}
            >
              {logoAnimationState === 'appearing' && <div className="brand-blue-glow" />}
              <img 
                src={brandslogo} 
                alt="Top Brands" 
                className="block w-auto object-contain"
                style={{ height: '100%', width: '100%' }}
              />
            </div>
          </Box>

          {/* BURAQ */}
          <ButtonBase 
            onClick={() => {
              const brand = brands.find((brand) => brand.name === BRANDS.BURAQ);
              if (brand) {
                const brandSlug = brand.slug || createSlug(brand.name);
                navigate(`/brand/${brandSlug}`);
              }
            }}
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 flex-1"
          >
            <Box className="text-white">
              <img
                src={brandLogos[2].src[0]}
                alt="BURAQ"
                className={`${brandLogos[2].className} brand-logo-ipad block group-hover:hidden`}
              />
              <img
                src={brandLogos[2].src[1]}
                alt="BURAQ"
                className={`${brandLogos[2].hoverClassName} brand-logo-ipad-hover hidden group-hover:block`}
              />
            </Box>
          </ButtonBase>

          {/* ZILCO */}
          <ButtonBase 
            onClick={() => {
              const brand = brands.find((brand) => brand.name === BRANDS.ZILCO);
              if (brand) {
                const brandSlug = brand.slug || createSlug(brand.name);
                navigate(`/brand/${brandSlug}`);
              }
            }}
            className="flex flex-col items-center group transition-all duration-300 hover:scale-105 flex-1"
          >
            <Box className="text-white">
              <img
                src={brandLogos[3].src[0]}
                alt="ZILCO"
                className={`${brandLogos[3].className} brand-logo-ipad block group-hover:hidden`}
              />
              <img
                src={brandLogos[3].src[1]}
                alt="ZILCO"
                className={`${brandLogos[3].hoverClassName} brand-logo-ipad-hover hidden group-hover:block`}
              />
            </Box>
          </ButtonBase>
        </Box>

        {/* Mobile: Grid Layout */}
        <Box className="flex sm:hidden flex-col items-center justify-center w-full pt-12 pb-4 mobile-brands-container">
          {/* 2x2 Grid */}
          <Box className="grid grid-cols-2 gap-5 w-full max-w-xs mt-4">
            {/* Row 1: NOVEX and CAVIL */}
                  <ButtonBase
                    onClick={() => {
                      const brand = brands.find((brand) => brand.name === BRANDS.NOVEX);
                      if (brand) {
                        const brandSlug = brand.slug || createSlug(brand.name);
                        navigate(`/brand/${brandSlug}`);
                      }
                    }}
                    className="flex flex-col items-center group transition-all duration-300 hover:scale-105 mobile-brand-item"
                  >
                    <Box className="text-white">
                      <img
                        src={brandLogos[0].src[0]}
                        alt="NOVEX"
                        className="h-12 block group-hover:hidden"
                      />
                      <img
                        src={brandLogos[0].src[1]}
                        alt="NOVEX"
                        className="h-16 hidden group-hover:block mobile-brand-hover"
                      />
                    </Box>
                  </ButtonBase>

            <ButtonBase 
              onClick={() => {
                const brand = brands.find((brand) => brand.name === BRANDS.BURAQ);
                if (brand) {
                  const brandSlug = brand.slug || createSlug(brand.name);
                  navigate(`/brand/${brandSlug}`);
                }
              }}
              className="flex flex-col items-center group transition-all duration-300 hover:scale-105 mobile-brand-item"
            >
              <Box className="text-white">
                <img
                  src={brandLogos[2].src[0]}
                  alt="BURAQ"
                  className="h-12 block group-hover:hidden"
                />
                <img
                  src={brandLogos[2].src[1]}
                  alt="BURAQ"
                  className="h-16 hidden group-hover:block mobile-brand-hover"
                />
              </Box>
            </ButtonBase>

            {/* Row 2: ZILCO and BURAQ */}
            <ButtonBase 
              onClick={() => {
                const brand = brands.find((brand) => brand.name === BRANDS.ZILCO);
                if (brand) {
                  const brandSlug = brand.slug || createSlug(brand.name);
                  navigate(`/brand/${brandSlug}`);
                }
              }}
              className="flex flex-col items-center group transition-all duration-300 hover:scale-105 mobile-brand-item"
            >
              <Box className="text-white">
                <img
                  src={brandLogos[3].src[0]}
                  alt="ZILCO"
                  className="h-12 -mt-4 block group-hover:hidden"
                />
                <img
                  src={brandLogos[3].src[1]}
                  alt="ZILCO"
                  className="h-16 -mt-4 hidden group-hover:block mobile-brand-hover"
                />
              </Box>
            </ButtonBase>

            <ButtonBase 
              onClick={() => {
                const brand = brands.find((brand) => brand.name === BRANDS.CAVIL);
                if (brand) {
                  const brandSlug = brand.slug || createSlug(brand.name);
                  navigate(`/brand/${brandSlug}`);
                }
              }}
              className="flex flex-col items-center group transition-all duration-300 hover:scale-105 mobile-brand-item"
            >
              <Box className="text-white">
                <img
                  src={brandLogos[1].src[0]}
                  alt="CAVIL"
                  className="h-12 -mt-2 block group-hover:hidden"
                />
                <img
                  src={brandLogos[1].src[1]}
                  alt="CAVIL"
                  className="h-16 -mt-2 hidden group-hover:block mobile-brand-hover"
                />
              </Box>
            </ButtonBase>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BrandsBanner;
