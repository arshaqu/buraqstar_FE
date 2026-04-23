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
} from "../constants"; // Ensure constants are correctly imported
import ajaxService from "../services/ajax-service";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PickupLocationIcon } from "../constants/googlemapstyle";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

const mapStyles = {
  height: "70vh",
  width: "100%",
};

const defaultCenter = {
  lat: 25.276987, // Dubai Default Latitude
  lng: 55.296249, // Dubai Default Longitude
};

const StoreLocator = () => {
  const { t } = useTranslation(); // Hook for translations
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

  // Loading state
  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Skeleton variant="rectangular" width="80%" height={400} />
          <Skeleton
            variant="rectangular"
            width="80%"
            height={60}
            style={{ marginTop: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width="80%"
            height={60}
            style={{ marginTop: "10px" }}
          />
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert severity="error" className="poppins">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f7f9fc", pb: 5, position: "relative", zIndex: 1 }}>
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
      {/* Header Banner with Wave */}
      <Box
        sx={{
          position: "relative",
          color: "white",
          textAlign: "center",
          pb: 8, // Extra space so the wave doesn't overlap the text
          // Keep your gradient background:
          background: "linear-gradient(90deg, #2858a3 0%, #2858a3 100%)",
        }}
        className=""
      >
        <Box sx={{ py: 6, position: "relative", zIndex: 2 }}>
          <Typography
            variant="h4"
            className="poppins font-bold"
            sx={{ color: "#fff", mb: 1 }}
          >
            {t("store_locator")}
          </Typography>
          <Typography variant="body1" className="poppins" sx={{ color: "#fefefe" }}>
            {t("find_nearest_stores")}
          </Typography>
        </Box>

        {/* Wave SVG at the bottom of the header */}
        <Box
          component="svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
          }}
        >
          <path
            d="M0,49.98 C150,150 350,-50 500,49.98 L500,150 L0,150 Z"
            fill="#f7f9fc"
          />
        </Box>
      </Box>

      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          mt={{ xs: -2, md: -10 }} // Overlap wave a bit more on larger screens
        >
          {/* Sidebar: Store List */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              maxHeight: "70vh",
              overflow: "auto",
              p: 2,
              borderRadius: 3,
              // Glass effect styles:
              backgroundColor: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
              // Subtle fade-in:
              animation: "fadeIn 0.7s ease-in-out",
            }}
            className="shadow-lg relative"
          >
            <Typography variant="h6" className="poppins font-semibold" gutterBottom>
              {t("available_stores")}
            </Typography>
            <Divider />
            <List>
              {stores.map((store, index) => {
                const isSelected = selectedStore?.name === store.name;
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <ListItem
                      button
                      onClick={() => handleStoreClick(store)}
                      sx={{
                        transition: "background-color 0.3s, color 0.3s",
                        borderRadius: 2,
                        bgcolor: isSelected ? "#2858A3" : "transparent",
                        color: isSelected ? "#fff" : "#000",
                        "&:hover": {
                          bgcolor: "#2858A3",
                          color: "#fff",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <LocationOnIcon fontSize="small" sx={{ mr: 2 }} />
                        <Box>
                          <Typography className="poppins font-medium">
                            {store.name}
                          </Typography>
                          <Typography className="poppins text-sm">
                            {store.city}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                );
              })}
            </List>
          </Paper>

          {/* Main Content: Google Map */}
          <Box
            flex={2}
            height="70vh"
            sx={{
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              // Optional glass effect behind map controls (if you want):
              // backgroundColor: "rgba(255, 255, 255, 0.25)",
              // backdropFilter: "blur(10px)",
            }}
            className="shadow-lg"
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
                  // styles: GoogleMapStyle,
                  disableDefaultUI: true, // Hide default controls for a cleaner look
                  zoomControl: true,
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
                    icon={{
                      url: PickupLocationIcon,
                    }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>

        {/* Store Details */}
        {selectedStore && (
          <Box
            mt={4}
            p={3}
            borderRadius={2}
            sx={{
              // Glass effect for details box:
              backgroundColor: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
              animation: "fadeIn 0.5s ease-in-out",
              textAlign: "center",
            }}
            className="poppins"
          >
            <Typography variant="h5" className="font-bold text-black">
              {selectedStore.name}
            </Typography>
            <Typography variant="body2" className="mt-1 text-black">
              {selectedStore.city}
            </Typography>

            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                href={`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}`}
                target="_blank"
                sx={{
                  textTransform: "capitalize",
                  bgcolor: "#2858A3",
                  "&:hover": { bgcolor: "#1e477d" },
                }}
                className="poppins"
              >
                {t("view_on_google_maps")}
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      {/* Example simple fade-in keyframe (Tailwind doesn't have built-in for this) */}
      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default StoreLocator;