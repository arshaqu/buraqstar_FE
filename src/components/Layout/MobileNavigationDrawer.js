import React, { useState, useEffect } from "react";
import {
    Box,
    Drawer,
    Typography,
    Divider,
    Collapse,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    ExpandLess,
    ExpandMore,
    Home,
    StorefrontOutlined,
    PersonOutlineOutlined,
    SpaceDashboardOutlined,
} from "@mui/icons-material";
import { routes } from "../../data";
import ajaxService from "../../services/ajax-service";
import { createSlug, getCategoryName } from "../../utils";
import logo from "../../assets/burraqstar.svg";

const MobileNavigationDrawer = ({ open, onClose }) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [deals, setDeals] = useState([]);
    const [shopOpen, setShopOpen] = useState(false);
    const [brandsOpen, setBrandsOpen] = useState(false);

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('token') !== null;

    // Check if current language is RTL
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

    // Load categories
    const loadCategories = async () => {
        const { success, data } = await ajaxService.get("/all-categories");
        if (success) {
            setCategories(data);
        }
    };

    // Load brands
    const loadBrands = async () => {
        const { success, data } = await ajaxService.get("/all-brands");
        if (success) {
            setBrands(data);
        }
    };

    // Load deals
    const loadDeals = async () => {
        const { success, data } = await ajaxService.get("/all-deals");
        if (success) {
            setDeals(data.filter(deal => deal.name.toUpperCase() !== "ON LINE"));
        }
    };

    useEffect(() => {
        if (open) {
            loadCategories();
            loadBrands();
            loadDeals();
        }
    }, [open]);

    const handleDrawerClose = () => {
        setShopOpen(false);
        setBrandsOpen(false);
        onClose();
    };

    const handleLogoClick = (e) => {
        handleDrawerClose();
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Navigate will happen via Link, then scroll to top
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const DrawerContent = (
        <Box
            sx={{
                width: 250,
                direction: isRTL ? 'rtl' : 'ltr',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}
            role='presentation'
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Fixed Logo Section - This will not scroll */}
            <Box
                className='px-5 pt-8 pb-4'
                sx={{
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1
                }}
            >
                <Link to={'/'} onClick={handleLogoClick}>
                    <img
                        src={logo}
                        className='h-[54px] md:h-[62px] lg:h-[70px] w-auto'
                        alt='burraq star logo'
                    />
                </Link>
            </Box>

            {/* Scrollable Content Section */}
            <Box
                className='px-5'
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#2858A3',
                        borderRadius: '2px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1e4a8c',
                    },
                }}
            >
                <Link
                    to={isLoggedIn ? '/user/dashboard' : '/user/login'}
                    className='flex items-center'
                    onClick={handleDrawerClose}
                >
                    <span className='text-lg text-[#2858A3] -mt-1 pe-4'>
                        {isLoggedIn ? <SpaceDashboardOutlined /> : <PersonOutlineOutlined />}
                    </span>
                    <Typography className='poppins text-base text-black'>
                        {isLoggedIn ? t('header.dashboard') : t('header.login')}
                    </Typography>
                </Link>
                <Divider className='my-4' />

                {/* Home Link */}
                <Link to='/' className='flex items-center' onClick={handleDrawerClose}>
                    <span className='text-lg text-[#2858A3] -mt-1 pe-4'>
                        <Home />
                    </span>
                    <Typography className='poppins text-base text-black'>
                        {t("navigation.home")}
                    </Typography>
                </Link>
                <Divider className='my-4' />

                {/* Categories - Updated with dropdown functionality */}
                <Box>
                    <Box
                        className='flex items-center cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation();
                            setShopOpen(!shopOpen);
                        }}
                    >
                        <span className='text-lg text-[#2858A3] -mt-1 pe-4'>
                            <StorefrontOutlined />
                        </span>
                        <Typography className='poppins text-base text-black'>
                            {t("header_categories.shop")}
                        </Typography>
                        <span className='ml-auto'>
                            {shopOpen ? <ExpandLess /> : <ExpandMore />}
                        </span>
                    </Box>
                    <Collapse in={shopOpen} timeout="auto" unmountOnExit>
                        <Box className={`${isRTL ? 'mr-6 pr-2 border-r-2' : 'ml-6 pl-2 border-l-2'} mt-3 mb-2 border-gray-200`}>
                            {/* All Categories Link */}
                            <Link to={`/category`} className='flex items-center mb-3 p-2 rounded hover:bg-gray-50 transition-colors' onClick={handleDrawerClose}>
                                <Typography className='poppins text-sm text-gray-700 font-medium'>
                                    {t("header_categories.view_all_items")}
                                </Typography>
                            </Link>
                            {/* Individual Categories */}
                            {categories.map((category, index) => {
                                const categorySlug = category.slug || createSlug(category.name);
                                return (
                                    <Link
                                        key={index}
                                        to={`/category/${categorySlug}`}
                                        className='flex items-center mb-2 p-2 rounded hover:bg-gray-50 transition-colors'
                                        onClick={handleDrawerClose}
                                    >
                                        <Typography className='poppins text-sm text-gray-600'>
                                            {getCategoryName(category, i18n.language)}
                                        </Typography>
                                    </Link>
                                );
                            })}

                            {/* Deals Section */}
                            {deals.length > 0 && (
                                <>
                                    <Divider className='my-3' />
                                    <Typography className='poppins text-xs text-gray-500 font-semibold mb-2 px-2 uppercase'>
                                        {t("header_categories.deals", "Deals")}
                                    </Typography>
                                    {deals.map((deal, index) => {
                                        const dealSlug = deal.slug || createSlug(deal.name);
                                        return (
                                            <Link
                                                key={index}
                                                to={`/deals/${dealSlug}`}
                                                className='flex items-center mb-2 p-2 rounded hover:bg-gray-50 transition-colors'
                                                onClick={handleDrawerClose}
                                            >
                                                <Typography className='poppins text-sm text-gray-600'>
                                                    {getCategoryName(deal, i18n.language)}
                                                </Typography>
                                            </Link>
                                        );
                                    })}
                                </>
                            )}
                        </Box>
                    </Collapse>
                </Box>
                <Divider className='my-4' />

                {/* Regular Routes with Enhanced Brands */}
                {routes.map((route, i) => {
                    let link = route.link;
                    let label = route.title;
                    let icon = route.mobIcon;

                    switch (route.title) {
                        case "brands":
                            return (
                                <React.Fragment key={i}>
                                    <Box>
                                        <Box
                                            className='flex items-center cursor-pointer'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setBrandsOpen(!brandsOpen);
                                            }}
                                        >
                                            <span className='text-lg text-[#2858A3] -mt-1 pe-4'>
                                                {icon}
                                            </span>
                                            <Typography className='poppins text-base text-black'>
                                                {t("navigation.brands")}
                                            </Typography>
                                            <span className='ml-auto'>
                                                {brandsOpen ? <ExpandLess /> : <ExpandMore />}
                                            </span>
                                        </Box>
                                        <Collapse in={brandsOpen} timeout="auto" unmountOnExit>
                                            <Box className={`${isRTL ? 'mr-6 pr-2 border-r-2' : 'ml-6 pl-2 border-l-2'} mt-3 mb-2 border-gray-200`}>
                                                {brands.map((brand, brandIndex) => {
                                                    const brandSlug = brand.slug || createSlug(brand.name);
                                                    return (
                                                        <Link
                                                            key={brandIndex}
                                                            to={`/brand/${brandSlug}`}
                                                            className='flex items-center mb-2 p-2 rounded hover:bg-gray-50 transition-colors'
                                                            onClick={handleDrawerClose}
                                                        >
                                                            <Typography className='poppins text-sm text-gray-600'>
                                                                {t(`brands.${brand.name}`, brand.name)}
                                                            </Typography>
                                                        </Link>
                                                    );
                                                })}
                                            </Box>
                                        </Collapse>
                                    </Box>
                                    <Divider className='my-4' />
                                </React.Fragment>
                            );

                        case "best_deals":
                            return null; // Currently disabled

                        default:
                            return (
                                <React.Fragment key={i}>
                                    <Link to={link} className='flex items-center' onClick={handleDrawerClose}>
                                        {icon && (
                                            <span className='text-lg text-[#2858A3] -mt-1 pe-4'>
                                                {icon}
                                            </span>
                                        )}
                                        <Typography className='poppins text-base text-black'>
                                            {
                                                label === "partner" ? t("partner_with_us") : t(`navigation.${label.toLowerCase().replace(/\s+/g, "_")}`, label)
                                            }
                                        </Typography>
                                    </Link>
                                    <Divider className='my-4' />
                                </React.Fragment>
                            );
                    }
                })}

                {/* Add some bottom padding so last item doesn't get cut off */}
                <Box sx={{ height: '20px' }} />
            </Box>
        </Box>
    );

    return (
        <Drawer
            anchor={isRTL ? 'right' : 'left'}
            open={open}
            onClose={handleDrawerClose}
            sx={{
                '& .MuiDrawer-paper': {
                    direction: isRTL ? 'rtl' : 'ltr',
                }
            }}
        >
            {DrawerContent}
        </Drawer>
    );
};

export default MobileNavigationDrawer;