import React, { useContext, useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "../../data";
import { AuthContext } from "../../AuthContext";
import { Brands, Categories } from "./NavigationDropDown";
import ajaxService from "../../services/ajax-service";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";

const NavigationBar = () => {
  const { logout, CartId } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn =
    localStorage.getItem("token") && localStorage.getItem("token") !== null;

  // Get user data from localStorage (same pattern as Sidebar uses via props)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = async () => {
    ajaxService.get("/auth/logout", 0, true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expires_at");
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box className="w-full h-20 bg-black flex items-center justify-between px-4 lg:px-24 hidden sm:hidden md:flex">

      {/* Left links */}
      <Box className="flex items-center gap-x-3 lg:gap-x-6">
        {/* Home */}
        <Link
          to="/"
          key="home"
          className="flex items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
        >
          <Typography className="poppins text-lg text-white transition-colors duration-300 group-hover:text-white/90">
            {t("navigation.home")}
          </Typography>
        </Link>
        <Box className="w-[2px] h-7 bg-gray-800" />

        <Categories t={t} />
        <Box className="w-[2px] h-7 bg-gray-800" />

        {routes.map((route, i) => {
          if (route.title === "brands")
            return (
              <React.Fragment key={i}>
                <Brands title={t("navigation.brands")} />
                <Box className="w-[2px] h-7 bg-gray-800" />
              </React.Fragment>
            );

          if (route.title === "best_deals") return null;

          return (
            <React.Fragment key={i}>
              <Link
                to={route.link}
                className="flex items-center px-8 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
              >
                <Typography className="poppins text-md text-white transition-colors duration-300 group-hover:text-white/90">
                  {t(
                    `navigation.${route.title.toLowerCase().replace(/\s+/g, "_")}`,
                    route.title
                  )}
                </Typography>
              </Link>
              <Box className="w-[2px] h-7 bg-gray-800" />
            </React.Fragment>
          );
        })}
      </Box>

      {/* Right — Login/Signup OR User Avatar Dropdown */}
      <Box>
        {!isLoggedIn ? (
          /* ── Not logged in: show Login / Signup button ── */
          <Button
            variant="contained"
            size="small"
            className="bg-[#2858A3] hover:bg-blue-700 text-lg p-3 text-white normal-case"
          >
            <Box className="hidden lg:flex items-center gap-x-1">
              <Link to="/user/login" className="h-full flex items-center">
                <Typography className="poppins font-semibold">
                  {t("header.login")}
                </Typography>
              </Link>
              <Typography className="poppins px-1">\</Typography>
              <Link to="/user/registration" className="h-full flex items-center">
                <Typography className="poppins font-semibold">
                  {t("header.signup")}
                </Typography>
              </Link>
            </Box>
          </Button>
        ) : (
          /* ── Logged in: show avatar + name + dropdown ── */
          <Box ref={dropdownRef} className="relative">
            {/* Trigger */}
            <Box
              className="flex items-center gap-x-2 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <Avatar
                alt={user?.name}
                src={user?.avatar}
                sx={{ width: 36, height: 36 }}
                className="border-2 border-[#2858A3]"
              >
                {/* Fallback initial if no avatar */}
                {!user?.avatar && user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : null}
              </Avatar>
              <Typography className="poppins font-semibold text-white text-sm hidden lg:block">
                {user?.name?.split(" ")[0] || t("header.dashboard")}
              </Typography>
              {/* Chevron */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <Box
                className="absolute right-0 mt-2 z-50"
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  minWidth: "220px",
                  overflow: "hidden",
                  border: "1px solid #e8eef6",
                }}
              >
                {/* User info header */}
                <Box
                  className="flex items-center gap-x-3 px-4 py-4"
                  style={{ borderBottom: "1px solid #f0f4fa" }}
                >
                  <Avatar
                    alt={user?.name}
                    src={user?.avatar}
                    sx={{ width: 44, height: 44 }}
                    className="border-2 border-[#2858A3]"
                  >
                    {!user?.avatar && user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : null}
                  </Avatar>
                  <Box>
                    <Typography
                      className="poppins font-semibold text-sm"
                      style={{ color: "#1a1a2e", lineHeight: 1.3 }}
                    >
                      {user?.name}
                    </Typography>
                    <Typography
                      className="poppins text-xs"
                      style={{ color: "#888", lineHeight: 1.4 }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Menu items */}
                <Box className="py-1">
                  <Link
                    to="/user/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      className="flex items-center gap-x-3 px-4 py-3 cursor-pointer transition-colors duration-150"
                      sx={{
                        "&:hover": { backgroundColor: "#f0f4fa" },
                      }}
                    >
                      <DashboardIcon
                        sx={{ fontSize: 18, color: "#2858A3" }}
                      />
                      <Typography
                        className="poppins font-semibold text-sm"
                        style={{ color: "#1a1a2e" }}
                      >
                        {t("header.dashboard")}
                      </Typography>
                    </Box>
                  </Link>

                  <Link
                    to="/user/profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      className="flex items-center gap-x-3 px-4 py-3 cursor-pointer transition-colors duration-150"
                      sx={{
                        "&:hover": { backgroundColor: "#f0f4fa" },
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 18, color: "#2858A3" }} />
                      <Typography
                        className="poppins font-semibold text-sm"
                        style={{ color: "#1a1a2e" }}
                      >
                        {t("header.profile", "Profile")}
                      </Typography>
                    </Box>
                  </Link>

                  {/* Divider */}
                  <Box
                    style={{
                      height: "1px",
                      background: "#f0f4fa",
                      margin: "4px 0",
                    }}
                  />

                  <Box
                    className="flex items-center gap-x-3 px-4 py-3 cursor-pointer transition-colors duration-150"
                    onClick={handleLogout}
                    sx={{
                      "&:hover": { backgroundColor: "#fff0f0" },
                    }}
                  >
                    <PowerSettingsNewIcon
                      sx={{ fontSize: 18, color: "#e10000" }}
                    />
                    <Typography
                      className="poppins font-semibold text-sm"
                      style={{ color: "#e10000" }}
                    >
                      {t("header.logout")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NavigationBar;