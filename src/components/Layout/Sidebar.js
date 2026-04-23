import React, { useState } from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useLocation } from 'react-router-dom';
import { routes } from './../../utils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ user, isOpen, handleLogout, setIsOpen }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { text: t('dashboard_sidebar.dashboard'), icon: <DashboardIcon className="text-white" />, route: routes.dashboard },
    { text: t('dashboard_sidebar.my_order'), icon: <ShoppingBagIcon className="text-white" />, route: routes.myOrder },
    { text: t('dashboard_sidebar.my_wishlist'), icon: <FavoriteIcon className="text-white" />, route: routes.wishlist },
  ];

  const primaryBlue = '#1d3762'; // Primary blue color from the logo
  const activeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const hoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
  };


  return (
    <>
      <div
        className={`${isOpen ? 'w-64 sm:w-72' : 'w-16'} hidden lg:block my-2 p-2 flex flex-col shadow-lg transition-all duration-300 ${isRTL ? 'me-1' : 'ms-1'}`}
        style={{
          backgroundColor: primaryBlue,
          backdropFilter: 'blur(15px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >


        {!isOpen && (

          <div className="flex flex-col items-center mt-5">
            <Avatar
              alt={user.name}
              src={user.avatar}
              className="shadow-xl border-2 border-gray-300 "
              sx={{ width: 40, height: 40 }}
            />
          </div>
        )}
        {isOpen && (
          <div className="flex flex-col items-center justify-center mt-8">
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 100, height: 100 }}
              className="shadow-xl border-2 border-white"

            />
            <h2 className="mt-4 text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-gray-300">{user?.email}</p>
            <Divider
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                mt: 3,
                ml: 'auto',
                mr: 'auto',
                width: 'calc(100% - 70px)',
              }}
            />
          </div>
        )}

        <List className={`mt-4 space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
          {menuItems.map(({ text, icon, route }) => (
            <ListItem
              button
              component={Link}
              to={route}
              sx={{
                ...(isActive(route) ? activeStyle : {}),
                '&:hover': hoverStyle,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
              key={text}
            >
              <ListItemIcon className="text-white" sx={{ minWidth: isRTL ? 56 : 56 }}>{icon}</ListItemIcon>
              <ListItemText primary={text} className="text-white" sx={{ textAlign: isRTL ? 'right' : 'left' }} />
            </ListItem>
          ))}
        </List>
        <div className={`absolute flex flex-col items-center bottom-5 w-full ${isRTL ? 'pl-5' : 'pr-5'} ${isOpen ? 'block' : 'hidden'}`}>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              '&:hover': hoverStyle,
              flexDirection: isRTL ? 'row-reverse' : 'row',
            }}
          >
            <ListItemIcon className="text-white"><PowerSettingsNewIcon /></ListItemIcon>
            <ListItemText primary={t('dashboard_sidebar.logout')} className="text-white" sx={{ textAlign: isRTL ? 'right' : 'left' }} />
          </ListItem>
        </div>

        {!isOpen && (
          <div className="flex flex-col items-center mt-8 space-y-4 ">
            {menuItems.map(({ text, icon, route }) => (
              <IconButton
                component={Link}
                to={route}
                sx={{
                  ...(isActive(route) && hoverStyle),
                  '&:hover': hoverStyle,
                  color: 'white',
                }}
                key={text}
              >
                {icon}
              </IconButton>
            ))}
            <div className="absolute flex flex-col items-center bottom-5 w-full">
              <IconButton
                onClick={handleLogout}
                sx={{ hoverStyle, color: 'white', '&:hover': hoverStyle }}
              >
                <PowerSettingsNewIcon className="text-[#e10000]" />
              </IconButton>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for Mobile and Tablet */}
      <div className='lg:hidden'>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} `}
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`fixed inset-y-0 w-64 lg:w-72 transition-transform duration-300 ease-in-out z-30 lg:relative ${
            isRTL
              ? `right-0 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
              : `left-0 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          }`}
          style={{
            backgroundColor: primaryBlue,
            borderRadius: isRTL ? '25px 0px 0px 25px' : '0px 25px 25px 0px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          <div className="flex justify-between items-center px-4 pt-4 lg:hidden">
            <h2 className="text-xl font-semibold text-white">{t('dashboard_sidebar.menu')}</h2>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>

          {isOpen && (
            <div className="flex flex-col items-center justify-center mt-8">
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
                className="shadow-xl border-2 border-white"
              />
              <h2 className="mt-4 text-xl font-semibold text-white">{user?.name}</h2>
              <p className="text-gray-300">{user?.email}</p>
              <Divider
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  mt: 3,
                  ml: 'auto',
                  mr: 'auto',
                  width: 'calc(100% - 40px)',
                }}
              />
            </div>
          )}

          <List className="mt-4 space-y-2 relative p-4">
            {menuItems.map(({ text, icon, route }) => (
              <ListItem
                button
                component={Link}
                to={route}
                sx={{
                  ...(isActive(route) ? activeStyle : {}),
                  '&:hover': hoverStyle,
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                }}
                key={text}
                onClick={() => setIsOpen(false)}
              >
                <ListItemIcon className="text-white">{icon}</ListItemIcon>
                <ListItemText primary={text} className="text-white" sx={{ textAlign: isRTL ? 'right' : 'left' }} />
              </ListItem>
            ))}
          </List>

          <div className={`absolute flex flex-col items-center mx-12 bottom-5 ${isOpen ? 'block' : 'hidden'}`}>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                backgroundColor: '#ff3939ed',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <ListItemIcon><PowerSettingsNewIcon className="text-white" /></ListItemIcon>
              <ListItemText primary={t('dashboard_sidebar.logout')} className="text-white" sx={{ textAlign: isRTL ? 'right' : 'left' }} />
            </ListItem>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
