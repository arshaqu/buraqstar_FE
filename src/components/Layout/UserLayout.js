import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import ScrollToTop from '../ScrollToTop';
import FloatingCart from '../Cart/FloatingCart';
import Footer from './Footer';
import ComingSoon from '../../pages/ComingSoon';

const UserLayout = ({ children }) => {
  const location = useLocation();
  // const storedTestMode = true;
  // // const storedTestMode = localStorage.getItem('test_mode');
  // const testMode = storedTestMode === 'true';

  // if (!testMode) {
  //   return <ComingSoon />
  // }

  // Array of paths where FloatingCart should not be displayed
  const noFloatingCartPaths = ["/cart", "/checkout"];

  // Determine if FloatingCart should be displayed
  const showFloatingCart = !noFloatingCartPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
      {showFloatingCart && <FloatingCart />}
    </>
  );
};

export default UserLayout;