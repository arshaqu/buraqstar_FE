import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from './utils';
import PrivateRoute from './components/PrivateRoute';

// Pages and Components
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Deals from "./pages/Deals";
import Product from "./pages/Product";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/user/auth/Login";
import Registration from "./pages/user/auth/Registration";
import Verify from "./pages/user/auth/Verify";
import Wishlist from "./pages/user/wishlist";
import Checkout from "./pages/Checkout";
import CartPage from "./components/Cart/CartPage";
import DashboardComponent from "./pages/user/panel/Dashboard";
import MyOrder from "./pages/user/panel/MyOrder";
import ThankYouPage from "./pages/Thankyou";
import StoreLocator from "./pages/StoreLocator";
import { AuthContext } from "./AuthContext";
import UserLayout from "./components/Layout/UserLayout";
import DashboardLayout from "./components/Layout/DashboardLayout";
import FadeTransition from "./components/FadeTransition";
import MyProfile from "./pages/user/panel/MyProfile";
import RetailerRegistration from "./pages/Retailer/Register";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import ResetPassword from "./pages/user/auth/ResetPassword";
import Catalogue from "./pages/Catalogue";
import ComingSoon from "./pages/ComingSoon";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationReturnPolicy from "./pages/CancellationReturnPolicy";
import CustomerSupport from "./pages/CustomerSupport";
import NotFound from "./pages/NotFound";
import PaymentFailedPage from "./pages/PaymentFailed";

const AppRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <FadeTransition>
      <Routes location={location}>
        {/* User-facing routes with UserLayout */}
        <Route path={routes.home} element={<UserLayout><Home /></UserLayout>} />
        <Route path={routes.coming_soon} element={<UserLayout><ComingSoon /></UserLayout>} />
        <Route path={routes.thankYou} element={<UserLayout><ThankYouPage /></UserLayout>} />
        <Route path={routes.paymentFailed} element={<UserLayout><PaymentFailedPage /></UserLayout>} />
        <Route path={routes.category} element={<UserLayout><Categories /></UserLayout>} />
        <Route path={routes.checkout} element={<UserLayout><Checkout /></UserLayout>} />
        <Route path={routes.brand} element={<UserLayout><Brands /></UserLayout>} />
        <Route path={routes.deals} element={<UserLayout><Deals /></UserLayout>} />
        <Route path={routes.product} element={<UserLayout><Product /></UserLayout>} />
        <Route path={routes.about} element={<UserLayout><About /></UserLayout>} />
        <Route path={routes.terms} element={<UserLayout><Terms /></UserLayout>} />
        <Route path={routes.policy} element={<UserLayout><Policy /></UserLayout>} />
        <Route path={routes.shipping_policy} element={<UserLayout><ShippingPolicy /></UserLayout>} />
        <Route path={routes.customer_support} element={<UserLayout><CustomerSupport /></UserLayout>} />
        <Route path={routes.return_policy} element={<UserLayout><CancellationReturnPolicy /></UserLayout>} />
        <Route path={routes.blogs} element={<UserLayout><Blogs /></UserLayout>} />
        <Route path={routes.blog} element={<UserLayout><Blog /></UserLayout>} />
        <Route path={routes.contact} element={<UserLayout><Contact /></UserLayout>} />
        <Route path={routes.faq} element={<UserLayout><FAQ /></UserLayout>} />
        <Route path={routes.cart} element={<UserLayout><CartPage /></UserLayout>} />
        <Route path={routes.storeLocator} element={<UserLayout><StoreLocator /></UserLayout>} />
        <Route path={routes.catalogue} element={<UserLayout><Catalogue /></UserLayout>} />

        {/* Authentication Routes */}
        <Route path={routes.login} element={<UserLayout><Login /></UserLayout>} />
        <Route path={routes.registration} element={<UserLayout><Registration /></UserLayout>} />
        <Route path={routes.forgot_password} element={<UserLayout><ForgotPassword /></UserLayout>} />
        <Route path={routes.reset_password} element={<UserLayout><ResetPassword /></UserLayout>} />
        <Route path={routes.retailer_registration} element={<UserLayout><RetailerRegistration /></UserLayout>} />
        <Route path={routes.verify} element={<UserLayout><Verify /></UserLayout>} />

        {/* Dashboard Routes - Protected by verification */}
        <Route path={routes.dashboard} element={
          <PrivateRoute>
            <DashboardLayout title="Dashboard"><DashboardComponent /></DashboardLayout>
          </PrivateRoute>
        } />

        <Route path={routes.wishlist} element={
          <PrivateRoute>
            <DashboardLayout title="Wishlist"><Wishlist /></DashboardLayout>
          </PrivateRoute>
        } />

        <Route path={routes.myOrder} element={
          <PrivateRoute>
            <DashboardLayout title="My Orders"><MyOrder /></DashboardLayout>
          </PrivateRoute>
        } />

        <Route path={routes.myProfile} element={
          <PrivateRoute>
            <DashboardLayout title="My Profile"><MyProfile /></DashboardLayout>
          </PrivateRoute>
        } />

        {/* 404 Not Found - No layout (no header/footer) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FadeTransition>
  );
};

export default AppRoutes;
