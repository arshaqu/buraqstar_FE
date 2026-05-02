

import { Typography, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../utils';
import {
  ShoppingBag, LocationOn, AccountCircle, Logout,
  LocalShipping, Favorite
} from '@mui/icons-material';
import { AuthContext } from '../../../AuthContext';
import { useContext } from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { PiClipboardText } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";
import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuHeart } from "react-icons/lu";

const actionCards = (t, navigate, handleLogout) => [
  {
    label: t('dashboard_sidebar.my_order') || 'Orders',
    icon: <PiClipboardText size={42} sx={{ fontSize: 200, color: '#9ca3af' }} />,
    onClick: () => navigate(routes.myOrder),
  },
  {
    label: t('dashboard_sidebar.my_wishlist') || 'My Wishlist',
    icon: <LuHeart size={42} sx={{ fontSize: 40, color: '#9ca3af' }} />,
    onClick: () => navigate(routes.wishlist),
  },
  {
    label: t('dashboard_sidebar.my_profile') || 'Account Details',
    icon: <CgProfile size={42} sx={{ fontSize: 40, color: '#9ca3af' }} />,
    onClick: () => navigate(routes.myProfile),
  },
  {
    label: t('dashboard_sidebar.addresses') || 'Addresses',
    icon: <GrMapLocation size={42} />,
    onClick: () => navigate(routes.addresses),
  },
  {
    label: t('Shop') || 'Shop',
    icon: <GiShoppingCart size={42} sx={{ fontSize: 40, color: '#9ca3af' }} />,
    onClick: () => navigate(routes.category),
  },
  {
    label: t('dashboard_sidebar.logout') || 'Logout',
    icon: <IoIosLogOut size={42} sx={{ fontSize: 40, color: '#9ca3af' }} />,
    onClick: handleLogout,
  },
];

const DashboardComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout , user  } = useContext(AuthContext);
  const { totalUniqueItems } = useCart();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage?.getItem('token')}` },
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
    logout();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => { loadData(); }, []);

  const cards = actionCards(t, navigate, handleLogout);

  return (
    <div className="bg-gray-50 p-6">
      {/* Welcome Message */}
      
      <p className="text-lg text-gray-900 mb-6 leading-10">
        {loading ? (
          <Skeleton width={300} height={20} />
        ) : (
          <>
            Hello <span className='font-semibold'>{user?.name}</span>{' '}
            (not <span className='font-semibold'>{user?.name}</span>?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline m-2"
              onClick={handleLogout}
            >
              Log out
            </span>
            )
            <br />
              From your account dashboard you can view your{' '}
            <span className='font-semibold'>recent orders</span>, manage your{' '}
            <span className='font-semibold'>shipping and billing addresses</span>, and{' '}
            <span className='font-semibold'>edit your password and account details</span>.
          </>
        )}
      </p>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 poppins">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={card.onClick}
            className="flex flex-col items-center justify-center gap-3 p-10 border-2 border-gray-300 rounded-2xl hover:border-[#2858A3] hover:shadow-md transition-all duration-200 bg-white cursor-pointer group"
          >
            <span className="group-hover:scale-110 transition-transform duration-200">
              {card.icon}
            </span>
            <Typography
              variant="body2"
              className='poppins font-semibold'
              sx={{ fontWeight: 500, color: '#374151', fontSize: '1.5rem',padding: 2, textAlign: 'center' }}
            >
              {card.label}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;