import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import {
  Container,
  Box,
  Skeleton,
  Alert,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Paper,
} from "@mui/material";
import {
  GoogleMapStyle,
  REACT_APP_GOOGLE_MAPS_API_KEY,
} from "../constants";
import ajaxService from "../services/ajax-service";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { PickupLocationIcon } from "../constants/googlemapstyle";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";
import buraqlog from "../assets/buraqlog.png";

const mapStyles = {
  height: "100%",
  width: "100%",
};

const defaultCenter = {
  lat: 25.276987,
  lng: 55.296249,
};

const StoreLocator = () => {
  const { t } = useTranslation();
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ajaxService
      .get("/all-stores")
      .then((response) => {
        if (response.data) {
          setStores(response.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(t("error_fetching_store_data"));
        setLoading(false);
      });
  }, [t]);

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
        {/* Breadcrumb skeleton */}
        <Box sx={{ px: 4, py: 2 }}>
          <Skeleton variant="text" width={200} />
        </Box>
        {/* Map area skeleton */}
        <Box sx={{ position: "relative", height: "500px" }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 40,
              width: 300,
              bgcolor: "#fff",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="rectangular" width="100%" height={1} sx={{ my: 1 }} />
            <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        </Box>
        {/* Contact section skeleton */}
        <Box sx={{ px: 4, py: 6, textAlign: "center" }}>
          <Skeleton variant="text" width={200} sx={{ mx: "auto" }} height={40} />
          <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
            <Skeleton variant="rectangular" sx={{ flex: 1, borderRadius: 2 }} height={80} />
            <Skeleton variant="rectangular" sx={{ flex: 1, borderRadius: 2 }} height={80} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert severity="error" className="poppins">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      <SEO
        title="Store Locator | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Find Buraq Star Trading stores near you. Locate outlets to shop for premium electrical, sanitary, hardware, and tool products."
        keywords="store locator, Buraq stores, UAE stores, electrical stores, hardware stores, map, directions, nearest store"
        url="/store-locator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Store Locator",
          url: `${SITE_URL}/store-locator`,
          description:
            "Locate Buraq stores across the UAE with map directions and contact details.",
          mainEntity: {
            "@type": "ItemList",
            name: "Stores",
            numberOfItems: stores.length,
            itemListElement: stores.map((store, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Place",
                name: store.name,
                address: store.city,
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: parseFloat(store.lat),
                  longitude: parseFloat(store.lng),
                },
              },
            })),
          },
        }}
      />

      {/* Breadcrumb */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 1.5, bgcolor: "#fff" }}>
        <Typography
          variant="body2"
          className="poppins"
          sx={{ color: "#666", fontSize: "0.85rem" }}
        >
          <Box
            component="span"
            sx={{ cursor: "pointer", "&:hover": { color: "#2858A3" } }}
          >
            {t("home") || "Home"}
          </Box>
          {" › "}
          <Box component="span" sx={{ color: "#2858A3" }}>
            {t("store_locator") || "Store Locator"}
          </Box>
        </Typography>
      </Box>

      {/* Map Section with Overlapping Sidebar */}
      <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "#fff", py: 2 }}>
      <Box sx={{ position: "relative", height: { xs: "auto", md: "500px" }, width: { xs: "100%", md: "80%" }, borderRadius: 3, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
        {/* Map fills the full container */}
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: { xs: "350px", md: "100%" },
          }}
        >
          <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={selectedStore ? 15 : 11}
              center={
                selectedStore
                  ? {
                      lat: parseFloat(selectedStore.lat),
                      lng: parseFloat(selectedStore.lng),
                    }
                  : defaultCenter
              }
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                clickableIcons: false,
              }}
            >
              {stores.map((store, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: parseFloat(store.lat),
                    lng: parseFloat(store.lng),
                  }}
                  onClick={() => handleMarkerClick(store)}
                  icon={PickupLocationIcon ? { url: PickupLocationIcon } : undefined}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </Box>

        {/* Floating Sidebar over the map */}
        <Paper
          elevation={4}
          sx={{
            position: { xs: "relative", md: "absolute" },
            top: { md: 24 },
            left: { md: 40 },
            width: { xs: "100%", md: 320 },
            maxHeight: { xs: "auto", md: 420 },
            overflow: "auto",
            borderRadius: 3,
            bgcolor: "#fff",
            zIndex: 10,
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            mt: { xs: 0, md: 0 },
          }}
        >
          {/* Sidebar Header */}
          <Box sx={{ px: 3, pt: 3, pb: 1 }}>
            <Typography
              variant="h6"
              className="poppins"
              sx={{ fontWeight: 500, color: "#1a1a1a", }}
            >
              {t("available_stores") || "Available Stores"}
            </Typography>
            {/* Decorative divider with icon */}
           <div className="flex items-center justify-start gap-4 mb-4 ">
            <div className="w-14 h-[1px] bg-gray-500 rounded-3xl"></div>

            <img
              src={buraqlog}
              alt="Buraq Logo"
              className="w-6 h-6 object-contain"
            />

            <div className="w-14 h-[1px] bg-gray-500 rounded-3xl"></div>
          </div>
          </Box>

          <Divider />

          {/* Store List */}
          <List sx={{ py: 0 }}>
            {stores.map((store, index) => {
              const isSelected = selectedStore?.name === store.name;
              return (
                <Box key={index}>
                  <ListItem
                    button
                    onClick={() => handleStoreClick(store)}
                    sx={{
                      px: 3,
                      py: 1.8,
                      transition: "all 0.2s ease",
                      bgcolor: isSelected ? "rgba(40, 88, 163, 0.06)" : "transparent",
                      borderLeft: isSelected ? "3px solid #000000" : "3px solid transparent",
                      "&:hover": {
                        bgcolor: "rgba(40, 88, 163, 0.06)",
                        borderLeft: "3px solid #2882a3",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="flex-start" gap={1.5}>
                      <LocationOnIcon
                        sx={{
                          color: isSelected ? "#000000" : "#999",
                          mt: 0.3,
                          fontSize: 20,
                          flexShrink: 0,
                        }}
                      />
                      <Box>
                        <Typography
                          className="poppins"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            color: "#1a1a1a",
                            lineHeight: 1.3,
                          }}
                        >
                          {store.name}
                        </Typography>
                        <Typography
                          className="poppins"
                          sx={{
                            fontSize: "0.78rem",
                            color: "#777",
                            mt: 0.3,
                            lineHeight: 1.4,
                          }}
                        >
                          {store.city}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  {index < stores.length - 1 && (
                    <Divider sx={{ mx: 3 }} />
                  )}
                </Box>
              );
            })}
          </List>
        </Paper>
      </Box>
      </Box>

      {/* Store Details (shown when a store is selected) */}
      {selectedStore && (
        <Box
          sx={{
            bgcolor: "#f5f8ff",
            borderTop: "1px solid #e8eef7",
            px: { xs: 2, md: 4 },
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            animation: "fadeIn 0.4s ease",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              className="poppins"
              sx={{ fontWeight: 600, color: "#1a1a1a" }}
            >
              {selectedStore.name}
            </Typography>
            <Typography
              variant="body2"
              className="poppins"
              sx={{ color: "#666", mt: 0.5 }}
            >
              {selectedStore.city}
            </Typography>
          </Box>
          <Button
            variant="contained"
            href={`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}`}
            target="_blank"
            startIcon={<LocationOnIcon />}
            className="poppins"
            sx={{
              textTransform: "none",
              bgcolor: "#2858A3",
              borderRadius: 2,
              px: 3,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "0.875rem",
              "&:hover": { bgcolor: "#1e477d" },
            }}
          >
            {t("view_on_google_maps") || "View on Google Maps"}
          </Button>
        </Box>
      )}

      {/* Contact Information Section */}
      <Box
        sx={{
          borderTop: "1px solid #eee",
          px: { xs: 2, md: 4 },
          py: { xs: 5, md: 7 },
          textAlign: "center",
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h5"
          className="poppins text-3xl"
          sx={{ fontWeight: 600, color: "#1a1a1a" }}
        >
          {t("cont_info") || "Contact Information"}
        </Typography>

        {/* Decorative divider */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 4,
          }}
        >
         
          <div className="flex items-center justify-start gap-4 mb-4 ">
            <div className="w-20 h-[1px] bg-gray-500 rounded-3xl"></div>

            <img
              src={buraqlog}
              alt="Buraq Logo"
              className="w-6 h-6 object-contain"
            />

            <div className="w-20 h-[1px] bg-gray-500 rounded-3xl"></div>
          </div>
        
        </Box>

        {/* Contact Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            maxWidth: 1400,
            mx: "auto",
             border: "2px solid #e8eef7",
              borderRadius: 3,
          }}
        >
          {/* Phone Card */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 3,
              borderRadius: 2,
              bgcolor: "#fff",
              textAlign: "left",
              transition: "box-shadow 0.2s",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(40, 88, 163, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                bgcolor: "#02AFF3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PhoneIcon sx={{ color: "#ffffff", fontSize: 24  }} />
            </Box>
            <Box sx={{ cursor: "pointer"}} onClick={() => window.location.href = "tel:80066839"}>
            
              <Typography
                className="poppins"
                sx={{ fontWeight: 600, fontSize: "1.3rem", color: "#1a1a1a" , "&:hover": { color: "#2858A3" } }}
              >
                {t("phone_number") || "Phone Number"}
              </Typography>
              <Typography
                className="poppins"
                sx={{
                  fontSize: "1rem",
                  color: "#2858A3",
                  fontWeight: 600,
                  mt: 0.3,
                }}
              >
                800-NOVEX (66839)
              </Typography>
            </Box>
          </Paper>

          {/* Email Card */}
        <Paper
            component="a"
            href="mailto:ecommerce@buraqstar.com"
            elevation={0}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 3,
              borderRadius: 2,
              bgcolor: "#fff",
              textAlign: "left",
              transition: "box-shadow 0.2s",
              textDecoration: "none",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(40, 88, 163, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                bgcolor: "#02AFF3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <EmailIcon sx={{ color: "#ffffff", fontSize: 24 }} />
            </Box>

            <Box>
              <Typography
                className="poppins"
                sx={{ fontWeight: 600, fontSize: "1.3rem", color: "#1a1a1a" }}
              >
                {t("email") || "Email"}
              </Typography>

              <Typography
                className="poppins"
                sx={{
                  fontSize: "1rem",
                  color: "#2858A3",
                  fontWeight: 600,
                  mt: 0.3,
                }}
              >
                ecommerce@buraqstar.com
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default StoreLocator;