import React, { useState } from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Typography, } from '@mui/material';
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
    { text: t('dashboard_sidebar.dashboard'), icon: <DashboardIcon className="text-gray-600" />, route: routes.dashboard },
    { text: t('dashboard_sidebar.my_order'), icon: <ShoppingBagIcon className="text-gray-600" />, route: routes.myOrder },
    { text: t('dashboard_sidebar.my_wishlist'), icon: <FavoriteIcon className="text-gray-600" />, route: routes.wishlist },
    { text: t('dashboard_sidebar.addres'), icon: <FavoriteIcon className="text-gray-600" />, route: routes.addresses },
    { text: t('Account Details'), icon: <FavoriteIcon className="text-gray-600" />, route: routes.myProfile },
    { text: t('Shop'), icon: <FavoriteIcon className="text-gray-600" />, route: routes.category },
  ];

  const primaryBlue = '#1d3762';

  const activeStyle = {
    backgroundColor: '#c4daff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderLeft: `3px solid #2858A3`,
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    color: '#2858A3',
  };

  const hoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    borderLeft: `3px solid #2858A3`,
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`${isOpen ? 'w-82 sm:w-82' : 'w-26'} hidden lg:flex lg:flex-col min-h-full my-2 bg-gray-100 border-r m-5 p-5 transition-all duration-300 ${isRTL ? 'me-1' : 'ms-1'}`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        {!isOpen && (
          <div className="flex flex-col items-center mt-5">
            <Avatar
              alt={user.name}
              src={user.avatar}
              className="shadow-xl border-2 border-gray-300"
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
              className="shadow-xl border-2 border-gray-600"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-600">{user?.name}</h2>
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

        {/* Menu Items */}
        <List className={`mt-4 space-y-2 ${isOpen ? 'flex flex-col' : 'hidden'}`}>
          {menuItems.map(({ text, icon, route }) => (
            <ListItem
              className='poppins font-bold'
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
              <ListItemText
                primaryTypographyProps={{ className: 'poppins font-semibold' }}
                primary={text}
                className="text-gray-600"
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </ListItem>
          ))}
        </List>

        {/* Collapsed Icon Menu */}
        {!isOpen && (
          <div className="flex flex-col items-center mt-8 space-y-4 flex-1">
            {menuItems.map(({ text, icon, route }) => (
              <IconButton
                component={Link}
                to={route}
                sx={{
                  ...(isActive(route) && hoverStyle),
                  '&:hover': hoverStyle,
                  color: 'gray-600',
                }}
                key={text}
              >
                {icon}
              </IconButton>
            ))}
            {/* Collapsed Logout */}
            <div className="mt-auto pt-4">
              <IconButton
                onClick={handleLogout}
                sx={{ color: 'gray-600', '&:hover': hoverStyle }}
              >
                <PowerSettingsNewIcon className="text-[#e10000]" />
              </IconButton>
            </div>
          </div>
        )}

        {/* Expanded Logout */}
        {isOpen && (
          <div className={`mt-auto flex flex-col items-center w-full ${isRTL ? 'pl-5' : 'pr-5'}`}>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                '&:hover': hoverStyle,
                flexDirection: isRTL ? 'row-reverse' : 'row',
              }}
            >
              <ListItemIcon className="text-gray-600"><PowerSettingsNewIcon /></ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ className: 'poppins font-semibold' }}
                primary={t('dashboard_sidebar.logout')}
                className="text-gray-600"
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </ListItem>
          </div>
        )}
      </div>

      {/* Overlay for Mobile and Tablet */}
      <div className='lg:hidden'>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div
          className={`fixed inset-y-0 w-64 lg:w-72 flex flex-col transition-transform duration-300 ease-in-out z-30 lg:relative ${
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
            <h2 className="text-xl font-semibold text-gray-600">{t('dashboard_sidebar.menu')}</h2>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon className="text-black" />
            </IconButton>
          </div>

          {isOpen && (
            <div className="flex flex-col items-center justify-center mt-8">
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
                className="shadow-xl border-2 border-gray-600"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-600">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
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

          <List className="mt-4 space-y-2 p-4">
            {menuItems.map(({ text, icon, route }) => (
              <ListItem
                className='poppins font-bold'
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
                <ListItemIcon className="text-gray-600">{icon}</ListItemIcon>
                <ListItemText
                  primary={text}
                  className="text-gray-600"
                  sx={{ textAlign: isRTL ? 'right' : 'left' }}
                />
              </ListItem>
            ))}
          </List>

          {/* Mobile Logout - pushed to bottom */}
          <div className="mt-auto flex flex-col items-center mx-12 pb-5">
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
              <ListItemIcon><PowerSettingsNewIcon className="text-gray-600" /></ListItemIcon>
              <ListItemText
                primary={t('dashboard_sidebar.logout')}
                className="text-gray-600"
                sx={{ textAlign: isRTL ? 'right' : 'left' }}
              />
            </ListItem>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;