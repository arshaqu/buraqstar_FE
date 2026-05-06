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
    <Box
      sx={{
        width: "100%",
        bgcolor: "black",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        // Responsive horizontal padding
        px: { md: 2, lg: 5, xl: 10 },
        // Responsive height
        height: { md: 30, lg: 40, xl: 45 },
      }}
    >
      {/* Left links */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          // Responsive gap between nav items
          gap: { md: 1, lg: 1.5, xl: 2 },
        }}
      >
        {/* Home */}
        <Link
          to="/"
          key="home"
          style={{ textDecoration: "none" }}
          className="flex items-center rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
        >
          <Typography
            className="poppins text-white transition-colors duration-300 group-hover:text-white/90"
            sx={{ fontSize: { md: "0.8rem", lg: "0.95rem", xl: "1.1rem" }, px: { md: 0.5, lg: 1 }, py: 0.5 }}
          >
            {t("navigation.home")}
          </Typography>
        </Link>

        <Box sx={{ width: "1px", height: { md: 14, lg: 18, xl: 22 }, bgcolor: "#393939"  , borderRadius:'25px'}} />

        <Categories t={t} />

       <Box sx={{ width: "1px", height: { md: 14, lg: 18, xl: 22 }, bgcolor: "#393939"  , borderRadius:'25px'}} />

        {routes.map((route, i) => {
          if (route.title === "brands")
            return (
              <React.Fragment key={i}>
                <Brands
                  title={t("navigation.brands")}
                  sx={{ fontSize: { md: "0.75rem", lg: "0.9rem", xl: "1rem" } }}
                />
               <Box sx={{ width: "1px", height: { md: 14, lg: 18, xl: 22 }, bgcolor: "#393939"  , borderRadius:'25px'}} />
              </React.Fragment>
            );

          if (route.title === "best_deals") return null;

          return (
            <React.Fragment key={i}>
              <Link
                to={route.link}
                style={{ textDecoration: "none" }}
                className="flex items-center rounded-lg transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 group"
              >
                <Typography
                  className="poppins text-white transition-colors duration-300 group-hover:text-white/90"
                  sx={{
                    fontSize: { md: "0.75rem", lg: "0.875rem", xl: "1rem" },
                    px: { md: 1, lg: 1.5, xl: 2 },
                    py: { md: 0.5, lg: 0.75, xl: 1 },
                  }}
                >
                  {t(
                    `navigation.${route.title.toLowerCase().replace(/\s+/g, "_")}`,
                    route.title
                  )}
                </Typography>
              </Link>
             <Box sx={{ width: "1px", height: { md: 14, lg: 18, xl: 22 }, bgcolor: "#393939"  , borderRadius:'25px'}} />
            </React.Fragment>
          );
        })}
      </Box>

      {/* Right — Login/Signup OR User Avatar Dropdown */}
      <Box>
        {!isLoggedIn ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#2858A3",
              "&:hover": { bgcolor: "#1d4ed8" },
              textTransform: "none",
              // Responsive padding & font size
              px: { md: 1.5, lg: 2, xl: 3 },
              py: { md: 0.5, lg: 0.75, xl: 1 },
              fontSize: { md: "0.75rem", lg: "0.875rem", xl: "1rem" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Link to="/user/login" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <Typography
                  className="poppins font-semibold text-white"
                  sx={{ fontSize: "inherit" }}
                >
                  {t("header.login")}
                </Typography>
              </Link>
              <Typography className="poppins text-white" sx={{ px: 0.5, fontSize: "inherit" }}>
                \
              </Typography>
              <Link to="/user/registration" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <Typography
                  className="poppins font-semibold text-white"
                  sx={{ fontSize: "inherit" }}
                >
                  {t("header.signup")}
                </Typography>
              </Link>
            </Box>
          </Button>
        ) : (
          <Box ref={dropdownRef} sx={{ position: "relative" }}>
            {/* Trigger */}
            <Box
              onClick={() => setDropdownOpen((prev) => !prev)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { md: 0.75, lg: 1 },
                cursor: "pointer",
                px: { md: 1, lg: 1.5 },
                py: { md: 0.5, lg: 0.75 },
                borderRadius: "8px",
                transition: "background 0.2s",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <Avatar
                alt={user?.name}
                src={user?.avatar}
                sx={{
                  // Responsive avatar size
                  width: { md: 28, lg: 34, xl: 40 },
                  height: { md: 28, lg: 34, xl: 40 },
                  border: "2px solid #2858A3",
                  fontSize: { md: "0.75rem", lg: "0.875rem" },
                }}
              >
                {!user?.avatar && user?.name ? user.name.charAt(0).toUpperCase() : null}
              </Avatar>

              <Typography
                className="poppins font-semibold text-white"
                sx={{
                  display: { md: "none", lg: "block" },
                  fontSize: { lg: "0.8rem", xl: "0.9rem" },
                }}
              >
                {user?.name?.split(" ")[0] || t("header.dashboard")}
              </Typography>

              {/* Chevron */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
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
                sx={{
                  position: "absolute",
                  right: 0,
                  mt: 1,
                  zIndex: 50,
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  // Responsive dropdown width
                  minWidth: { md: 180, lg: 210, xl: 240 },
                  overflow: "hidden",
                  border: "1px solid #e8eef6",
                }}
              >
                {/* User info header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { md: 1, lg: 1.5 },
                    px: { md: 2, lg: 3 },
                    py: { md: 2, lg: 2.5 },
                    borderBottom: "1px solid #f0f4fa",
                  }}
                >
                  <Avatar
                    alt={user?.name}
                    src={user?.avatar}
                    sx={{
                      width: { md: 34, lg: 40, xl: 48 },
                      height: { md: 34, lg: 40, xl: 48 },
                      border: "2px solid #2858A3",
                      fontSize: { md: "0.8rem", lg: "1rem" },
                    }}
                  >
                    {!user?.avatar && user?.name ? user.name.charAt(0).toUpperCase() : null}
                  </Avatar>
                  <Box>
                    <Typography
                      className="poppins font-semibold"
                      sx={{ color: "#1a1a2e", lineHeight: 1.3, fontSize: { md: "0.75rem", lg: "0.875rem" } }}
                    >
                      {user?.name}
                    </Typography>
                    <Typography
                      className="poppins"
                      sx={{ color: "#888", lineHeight: 1.4, fontSize: { md: "0.65rem", lg: "0.75rem" } }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Menu items */}
                <Box sx={{ py: 0.5 }}>
                  {/* Dashboard */}
                  <Link to="/user/dashboard" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { md: 1, lg: 1.5 },
                        px: { md: 2, lg: 2.5 },
                        py: { md: 1, lg: 1.5 },
                        cursor: "pointer",
                        transition: "background 0.15s",
                        "&:hover": { bgcolor: "#f0f4fa" },
                      }}
                    >
                      <DashboardIcon sx={{ fontSize: { md: 15, lg: 18 }, color: "#2858A3" }} />
                      <Typography
                        className="poppins font-semibold"
                        sx={{ color: "#1a1a2e", fontSize: { md: "0.75rem", lg: "0.875rem" } }}
                      >
                        {t("header.dashboard")}
                      </Typography>
                    </Box>
                  </Link>

                  {/* Profile */}
                  <Link to="/user/profile" onClick={() => setDropdownOpen(false)} style={{ textDecoration: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { md: 1, lg: 1.5 },
                        px: { md: 2, lg: 2.5 },
                        py: { md: 1, lg: 1.5 },
                        cursor: "pointer",
                        transition: "background 0.15s",
                        "&:hover": { bgcolor: "#f0f4fa" },
                      }}
                    >
                      <PersonIcon sx={{ fontSize: { md: 15, lg: 18 }, color: "#2858A3" }} />
                      <Typography
                        className="poppins font-semibold"
                        sx={{ color: "#1a1a2e", fontSize: { md: "0.75rem", lg: "0.875rem" } }}
                      >
                        {t("header.profile", "Profile")}
                      </Typography>
                    </Box>
                  </Link>

                  {/* Divider */}
                  <Box sx={{ height: "1px", bgcolor: "#f0f4fa", my: 0.5 }} />

                  {/* Logout */}
                  <Box
                    onClick={handleLogout}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { md: 1, lg: 1.5 },
                      px: { md: 2, lg: 2.5 },
                      py: { md: 1, lg: 1.5 },
                      cursor: "pointer",
                      transition: "background 0.15s",
                      "&:hover": { bgcolor: "#fff0f0" },
                    }}
                  >
                    <PowerSettingsNewIcon sx={{ fontSize: { md: 15, lg: 18 }, color: "#e10000" }} />
                    <Typography
                      className="poppins font-semibold"
                      sx={{ color: "#e10000", fontSize: { md: "0.75rem", lg: "0.875rem" } }}
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