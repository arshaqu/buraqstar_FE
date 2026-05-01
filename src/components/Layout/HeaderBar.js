import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Box, Divider, Drawer, IconButton, ListItem, ListItemButton, Typography, debounce, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useCart } from "react-use-cart";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';

import logo from "./../../assets/buraq_logo.jpg";
import { routes } from "../../data";

import ajaxService from "../../services/ajax-service";
import { ImageURL } from "../../constants";
import { AuthContext } from "../../AuthContext";
import { useTranslation } from "react-i18next";
import defaultImage from "../../assets/contactsvg.svg";
import { IoSearch } from "react-icons/io5";
import MobileNavigationDrawer from "./MobileNavigationDrawer";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { FiSearch } from "react-icons/fi";




const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid white`,
    padding: "0 4px"
  }
}));

const HeaderBar = () => {
  const { t, i18n } = useTranslation(); // Hook for translations
  const { logout, CartId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Add this line

  // Check if current language is RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('token') !== null ? true : false
  // const { totalUniqueItems } = useCart()
  const { totalUniqueItems } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [totalItems, setTotalItems] = useState(0);

  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  // Drawer state for mobile navigation
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  // products
  const [products, setProducts] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const itemRefs = useRef([]);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileSearchIconRef = useRef(null);


    const handleNavigate = () => {
    navigate(localStorage.getItem("token") ? "/user/wishlists" : "/user/login");
  };

  // Clear search when navigating to different pages
  useEffect(() => {
    setSearch('');
    setProducts([]);
    setSearchOpen(false);
    setHighlightedIndex(-1);
  }, [location.pathname]);

  const handleLogout = async () => {
    ajaxService.get('/auth/logout', 0, true)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expires_at')
    logout()
    navigate('/')
  }

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate will happen via Link, then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }

  const handleProductClick = async slug => {
    ajaxService.get('/product/search-log/' + slug)
    // Close search when product is clicked
    setSearch('');
    setProducts([]);
    setHighlightedIndex(-1);
    setSearchOpen(false);
    navigate('/product/' + slug)
  }

  // const loadProducts = async () => {
  //   const response = await ajaxService.get(
  //     `/category/products?category_id=0&type=${CATEGORIES.ALL}`
  //   )
  //   const { success, data } = response
  //   if (success) {
  //     setProducts(data)
  //   }
  // }


  // Function to handle API call
  const fetchProducts = async (query) => {
    if (!query) {
      setProducts([]);
      setHighlightedIndex(-1);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await ajaxService.get(
        `/product-search?q=${query}`
      )

      setProducts(response);
      setHighlightedIndex(response?.length ? 0 : -1);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of fetchProducts to optimize API calls
  const debouncedFetchProducts = debounce((query) => fetchProducts(query), 500);

  // Handle input changes and trigger the debounced search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    debouncedFetchProducts(query);
    if (!query) {
      setHighlightedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!products.length) return;
      setHighlightedIndex((prev) => {
        if (prev < products.length - 1) {
          return prev + 1;
        }
        return products.length - 1;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!products.length) return;
      setHighlightedIndex((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && products[highlightedIndex]?.slug) {
        handleProductClick(products[highlightedIndex].slug);
      }
    } else if (e.key === "Escape") {
      setSearch('');
      setProducts([]);
      setHighlightedIndex(-1);
      setSearchOpen(false); // Close mobile search overlay on Escape
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex].scrollIntoView({
        block: "nearest"
      });
    }
  }, [highlightedIndex]);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop search dropdown when clicking outside
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) {
        if (search && window.innerWidth >= 640) { // sm breakpoint
          setSearch('');
          setProducts([]);
          setHighlightedIndex(-1);
        }
      }

      // Close mobile search overlay when clicking outside
      if (searchOpen && mobileSearchRef.current) {
        const isClickInsideMobileSearch = mobileSearchRef.current.contains(event.target);
        const isClickOnSearchIcon = mobileSearchIconRef.current && mobileSearchIconRef.current.contains(event.target);
        
        if (!isClickInsideMobileSearch && !isClickOnSearchIcon) {
          setSearchOpen(false);
          setSearch('');
          setProducts([]);
          setHighlightedIndex(-1);
        }
      }
    };

    // Add event listener when search is active
    if (search || searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [search, searchOpen]);


  // useEffect(() => {
  //   loadProducts()
  // }, [])

  //   useEffect(()=> {
  //     axios.post(`${BASE_URL}/api/v1/carts`, {
  //         cart_id: CartId,
  //         type: ''
  //     },{
  //         headers: {
  //             Authorization: `Bearer ${localStorage?.getItem('token')}`
  //         },
  //     })
  //     .then((res) => {
  //         const products = res?.data?.cart_items.map((item) => {
  //             return {
  //                 cart_id: item?.id
  //             };
  //         });
  //         setTotalItems(products?.length)
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [CartId])

  return (
    <Box className='h-20 sm:h-28 w-full relative top-0 bg-white flex items-center justify-between px-2.5 sm:px-4 sm:py-5'>
     <Box className='flex items-center'>
  <IconButton
    className='p-0 mr-1 sm:mr-2 block sm:block lg:hidden'
    onClick={() => setMobileDrawerOpen(true)}
  >
    <MenuIcon className='text-2xl sm:text-3xl text-[#2858A3]' />
  </IconButton>

  <MobileNavigationDrawer
    open={mobileDrawerOpen}
    onClose={() => setMobileDrawerOpen(false)}
  />

  <Link to='/' onClick={handleLogoClick} className="ml-0">
    <img
      src={logo}
      className='h-[38px] sm:h-[54px] md:h-[62px] lg:h-[70px] w-auto object-contain'
      alt='burraq star logo'
    />
  </Link>
</Box>

      {/* Desktop Search Bar */}
    <Box
  ref={desktopSearchRef}
  className="relative w-[50%] h-[75%] bg-gray-100 rounded-3xl hidden sm:flex items-center px-4 py-4 mx-8 border border-gray-200"
>
  <input
    className="flex-1 bg-transparent outline-none text-[#2858A3] "
    placeholder={t('header.search_placeholder')}
    value={search}
    onChange={handleSearchChange}
    onKeyDown={handleKeyDown}
  />
  
  <Box style={isRTL ? { marginLeft: '-9px' } : { marginRight: '-9px' }} className='  border border-[#2858A3] rounded-3xl p-1.5 bg-[#2858A3]'>
    <FiSearch className="text-3xl text-white cursor-pointer" />

  </Box>

        {/* Dropdown */}
        {search && (
          <Box
            className="absolute top-full mt-2 left-0 rounded-lg z-[1050] w-full max-h-[50vh] overflow-y-auto bg-white shadow-lg"
          >
            {loading && (
              <Typography className="text-center text-gray-500 p-4">
                {t('header.searching')}
              </Typography>
            )}

            {products.length > 0 ? (
              products.map((product, i) => {
                const isHighlighted = highlightedIndex === i;
                return (
                  <ListItem
                    key={product.slug || `key-${i}`}
                    disablePadding
                    onClick={() => handleProductClick(product.slug)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  >
                    <ListItemButton className={`rounded ${isHighlighted ? "bg-[#e6f0fb]" : ""}`}>
                      <Box className="flex w-full h-fit">
                        <img
                          src={product.images?.length > 0 ? ImageURL + product.images[0] : defaultImage}
                          alt={product.name}
                          className="h-10 w-10"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-image.jpg";
                          }}
                        />
                        <Typography className="text-xs ps-3 text-black poppins">
                          {product.name}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              !loading && (
                <Typography className="text-center text-gray-500 p-4">
                  {t('header.no_products_found')}
                </Typography>
              )
            )}
          </Box>
        )}
      </Box>

      <Box className='flex items-center gap-x-1 sm:gap-x-2 lg:gap-x-5'>
        <Box ref={mobileSearchIconRef} className='block sm:hidden'>
          <SearchIcon
            className='cursor-pointer text-xl sm:text-2xl text-[#2858A3]'
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (!searchOpen) {
                // Clear search when opening
                setSearch('');
                setProducts([]);
                setHighlightedIndex(-1);
              }
            }}
          />
        </Box>

   
        {/* <Box className='hidden lg:flex items-center ml-2'>
          <Link
            to={isLoggedIn ? '/user/dashboard' : '/user/login'}
            className='h-full flex items-center '
          >
            <Typography className='poppins font-semibold'>
              {isLoggedIn ? t('header.dashboard') : t('header.login')}
            </Typography>
          </Link>
          <Typography className='poppins mx-4'>
            {t('header.or')}
          </Typography>
          {isLoggedIn ? (
            <Typography
              className='poppins font-semibold h-full flex items-center cursor-pointer'
              onClick={handleLogout}
            >
              {t('header.logout')}
            </Typography>
          ) : (
            <Link to='/user/registration' className='h-full flex items-center'>
              <Typography className='poppins font-semibold'>
                {t('header.signup')}
              </Typography>
            </Link>
          )}
        </Box> */}
                <Box className="flex gap-x-2 cursor-pointer items-center " onClick={handleNavigate}>
                  <FavoriteBorderOutlined className="text-3xl" />
                  <Typography className="capitalize text-xs poppins"></Typography>
                </Box>


           <Link to='/checkout'>
          <IconButton className='p-1 sm:p-2' >
            <StyledBadge badgeContent={totalUniqueItems} color='primary'>
              <ShoppingCartIcon className='text-[#2858A3] text-xl sm:text-2xl lg:text-4xl' />
            </StyledBadge>
          </IconButton>
        </Link>
      </Box>





      {/* Mobile Search */}
      {searchOpen && (
        <Box ref={mobileSearchRef} className='w-full z-50 absolute -bottom-[60px] left-0 sm:hidden p-3 bg-white border-t border-gray-200 shadow-md'>
          <Box className='w-full bg-[#f0f0f0] rounded-lg flex items-center px-4 py-3.5 min-h-[48px]'>
            <input
              className='w-full bg-transparent outline-none text-[#2858A3] text-base placeholder:text-[#2858A3] placeholder:opacity-60'
              placeholder={t('header.search_placeholder')}
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </Box>
          {search.length > 0 && (
            <Box className='absolute top-[68px] left-3 right-3 rounded-lg z-50 max-h-[40vh] overflow-y-auto bg-white border border-gray-200 shadow-lg'>
              {products
                .filter(prod =>
                  prod.name.toLowerCase().includes(search?.toLowerCase())
                )
                .map((product, i) => {
                  const productIndex = products.findIndex((p) => p.slug === product.slug);
                  const isHighlighted = highlightedIndex === productIndex;
                  return (
                    <ListItem
                      key={product.slug || `mobile-${i}`}
                      disablePadding
                      onClick={() => handleProductClick(product.slug)}
                      onMouseEnter={() => setHighlightedIndex(productIndex)}
                      ref={(el) => {
                        if (productIndex > -1) {
                          itemRefs.current[productIndex] = el;
                        }
                      }}
                    >
                      <ListItemButton className={`rounded p-2 ${isHighlighted ? "bg-[#e6f0fb]" : ""}`}>
                        <Box className='flex w-full items-center gap-2'>
                          <img
                            src={product?.images?.[0] ? ImageURL + product.images[0] : defaultImage}
                            alt={product.name}
                            className='h-8 w-8 rounded'
                          />
                          <Typography className='text-xs text-black poppins flex-1'>
                            {product.name}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default HeaderBar
