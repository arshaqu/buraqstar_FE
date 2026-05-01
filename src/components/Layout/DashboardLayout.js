// import React, { useContext, useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import AppHeader from './AppHeader';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { AuthContext } from '../../AuthContext';
// import waterMark from './../../assets/watermark_panel.svg'; // Ensure the correct path and import
// import ajaxService from '../../services/ajax-service';
// import { Typography } from '@mui/material';
// import { routes } from '../../utils';

// const DashboardLayout = ({ children, title }) => {
//     const [isOpenSideBar, setIsOpenSideBar] = useState(false);
//     const location = useLocation();
//     const { t, i18n } = useTranslation();
//     const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

//     const pageTitleKeyByPath = {
//         [routes.dashboard]: 'dashboard_sidebar.dashboard',
//         [routes.wishlist]: 'dashboard_sidebar.my_wishlist',
//         [routes.myOrder]: 'dashboard_sidebar.my_order',
//         [routes.myProfile]: 'dashboard_sidebar.my_profile',
//     };
//     const titleKey = pageTitleKeyByPath[location.pathname];
//     const translatedTitle = titleKey ? t(titleKey) : title;
    
//     // Set sidebar to open by default on large screens (desktop)
//     useEffect(() => {
//         const checkScreenSize = () => {
//             if (window.innerWidth >= 1024) { // lg breakpoint
//                 setIsOpenSideBar(true);
//             } else {
//                 setIsOpenSideBar(false);
//             }
//         };
        
//         checkScreenSize();
//         window.addEventListener('resize', checkScreenSize);
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = async () => {
//         try {
//             await ajaxService.get('/auth/logout', 0, true);
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             localStorage.removeItem('expires_at');
//             logout();
//             navigate('/');
//             window.location.reload()
//         } catch (error) {
//             console.error('Logout failed:', error);
//         }
//     };

//     const handleProfile = () => {
//         navigate('/user/profile');
//     };

//     return (
//         <div className="flex flex-col lg:flex-row h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>

//             <Sidebar user={user} isOpen={isOpenSideBar} handleLogout={handleLogout} setIsOpen={setIsOpenSideBar} />
//             <div className="flex-grow flex flex-col">
//                 <AppHeader handleLogout={handleLogout} title={translatedTitle} isOpen={isOpenSideBar} setIsOpen={setIsOpenSideBar} />
//                 <div className="relative flex-grow p-6 h-full overflow-y-auto">
//                     {/* Watermark - position from left in LTR, from right in RTL so it doesn't overlap sidebar */}
//                     <div
//                         className="transition-all duration-300 fixed inset-6 sm:inset-20"
//                         style={{
//                             ...(isRTL
//                                 ? { right: isOpenSideBar ? '24rem' : '11rem', left: '1.5rem' }
//                                 : { left: isOpenSideBar ? '24rem' : '11rem', right: '1.5rem' }
//                             ),
//                             backgroundImage: `url(${waterMark})`,
//                             backgroundPosition: 'center',
//                             backgroundRepeat: 'no-repeat',
//                             backgroundSize: 'contain',
//                             opacity: 0.8,
//                             zIndex: 0,
//                             pointerEvents: 'none',
//                         }}
//                     >
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                         {children}
//                     </div>


//                 </div>
//                 <footer className="text-center sticky bottom-0 ">
//                     <Typography variant="caption" color="textSecondary">
//                         © {new Date().getFullYear()} BuraqStar
//                     </Typography>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;





import React, { useContext, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../AuthContext';
import ajaxService from '../../services/ajax-service';
import { Typography } from '@mui/material';
import { routes } from '../../utils';
import Header from './Header';
import Footer from './Footer';
     // ← your site footer

const DashboardLayout = ({ children, title }) => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const pageTitleKeyByPath = {
    [routes.dashboard]: 'dashboard_sidebar.dashboard',
    [routes.wishlist]: 'dashboard_sidebar.my_wishlist',
    [routes.myOrder]: 'dashboard_sidebar.my_order',
    [routes.myProfile]: 'dashboard_sidebar.my_profile',
    [routes.addresses]: 'dashboard_sidebar.addresses',
};
    const titleKey = pageTitleKeyByPath[location.pathname];
    const translatedTitle = titleKey ? t(titleKey) : title;

    useEffect(() => {
        const checkScreenSize = () => {
            setIsOpenSideBar(window.innerWidth >= 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await ajaxService.get('/auth/logout', 0, true);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expires_at');
            logout();
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Site-wide Header */}
            <Header />
          
                  <Typography className="text-gray-700 leading-relaxed mb-2 ml-10 p-4 poppins text-xl">
              {t('dashboard_sidebar.home')} &nbsp; &gt; &nbsp; <span className="text-[#2858A3] ">Dashboard</span>
            </Typography>

            {/* Dashboard Body */}
            <div className="flex-grow w-full ">
                <div className="flex gap-6 items-stretch">
                    {/* Left Sidebar */}
                    <Sidebar
                        user={user}
                        isOpen={isOpenSideBar}
                        handleLogout={handleLogout}
                        setIsOpen={setIsOpenSideBar}
                    />

                    {/* Main Content */}
                    <div className="flex-grow min-w-0 mb-5">
                        {/* <AppHeader
                            handleLogout={handleLogout}
                            title={translatedTitle}
                            isOpen={isOpenSideBar}
                            setIsOpen={setIsOpenSideBar}
                        /> */}
                        <div className="mt-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* Site-wide Footer */}
            <Footer />
        </div>
    );
};

export default DashboardLayout;
