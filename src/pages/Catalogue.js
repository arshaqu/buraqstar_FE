import React from "react";
import Banner from "../assets/shop2.png"
import {
  Box,
  Grid,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { FaFilePdf } from "react-icons/fa";
import { styled } from "@mui/system";
import contactImage from "../assets/contactsvg.svg";
import { Hero } from "../components";
import { useTranslation } from "react-i18next"; // Import i18next
import SEO from "../components/SEO";
import { SITE_URL } from "../constants";

// 1) Styled Card with glass/frosted effect AND a pseudo-element for the logo
const StyledCard = styled((props) => <div {...props} />)(({ theme }) => ({
  position: "relative",           // allow pseudo-element to be positioned
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.2)", // frosted glass
  backdropFilter: "blur(8px)",
  overflow: "hidden",             // hide any overflow from the pseudo-element
  transition: "transform 0.3s ease, box-shadow 0.3s ease",

  // Pseudo-element for the blurred logo
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // Replace this with your actual logo path:
    background: `url(${contactImage}) center center / 60% no-repeat`,
    // Start invisible:
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 0,   // behind the card's children
    // Removed blur filter
  },

  // Fade in the logo on hover
  "&:hover::before": {
    opacity: 0.7, // Increased opacity to make logo more visible on hover
  },

  // Scale and shadow on hover
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.15)",
  },

  // Ensure card content sits above the pseudo-element
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
}));

// 2) Example catalogue data
const catalogues = [
  {
    name: "Buraq Product Catalogue",
    file: "/catalogue/BURAQ_PRODUCT.pdf",
  },
  {
    name: "Cavil Product Catalogue",
    file: "/catalogue/CAVIL_PRODUCT.pdf",
  },
  {
    name: "Novex Ceramic Product Catalogue",
    file: "/catalogue/NOVEX_CERAMIC_PRODUCT.pdf",
  },
  {
    name: "Novex Electrical Product Catalogue",
    file: "/catalogue/NOVEX_ELECTRICAL_PRODUCT.pdf",
  },
  {
    name: "Novex Torontro Product Catalogue",
    file: "/catalogue/NOVEX_TORONTO_PRODUCT.pdf",
  },
  {
    name: "Novex Fan Product Catalogue",
    file: "/catalogue/NOVEX_FAN_PRODUCT.pdf",
  },
  {
    name: "Novex Lighting Product Catalogue",
    file: "/catalogue/NOVEX_LIGHTING_PRODUCT.pdf",
  },
  {
    name: "Sanitary Faucet Catalogue",
    file: "/catalogue/SANITARY_FAUCET.pdf",
  },
  {
    name: "Zilco Product Catalogue",
    file: "/catalogue/ZILCO_PRODUCT.pdf",
  },
];

const Catalogue = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <Box sx={{ backgroundColor: "#f8f9fa" }}>
      <SEO
        title="Catalogues | Buraq Star Trading | Novex | Cavil | Zilco"
        description="Browse product catalogues at Buraq Star Trading. Explore our complete range of electrical, sanitary, hardware, and tool products."
        keywords="product catalogues, PDF brochures, electrical catalogues, hardware catalogues, sanitary catalogues, lighting catalogues, Buraq catalogues, Cavil, Novex, Zilco"
        url="/catalogue"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Buraq Product Catalogues",
          "description": "Comprehensive product catalogues and PDF brochures for electrical and hardware products",
          "url": `${SITE_URL}/catalogue`,
          "mainEntity": {
            "@type": "ItemList",
            "name": "Product Catalogues",
            "description": "Downloadable PDF catalogues for various product categories",
            "numberOfItems": catalogues.length,
            "itemListElement": catalogues.map((catalogue, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": catalogue.name,
              "url": `${SITE_URL}${catalogue.file}`,
              "description": `Download ${catalogue.name} PDF catalogue`
            }))
          }
        }}
      />
      {/* Header */}
      <Hero  bg={Banner}  title={t("our_catalogues")} color={"#fff"} />

      {/* Catalogue Grid */}
    <Grid container spacing={2} className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 mt-10">
  {catalogues.map((catalogue, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      
      <StyledCard className="bg-gray-200 h-full">
        
        {/* Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 120,
          }}
        >
          <FaFilePdf className="text-6xl sm:text-7xl text-red-600" />
        </Box>

        {/* Title */}
        <CardContent>
          <Typography
            variant="h6"
            className="poppins text-center"
            sx={{
              color: "#333",
              fontWeight: 600,
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.4rem" },
            }}
          >
            {t(catalogue.name)}
          </Typography>
        </CardContent>

        {/* Buttons */}
        <CardActions
          className="flex flex-col sm:flex-row gap-2 justify-center px-4 pb-6"
        >
          <Button
            
            variant="contained"
            sx={{
              width: "40%",
              backgroundColor: "#2858A3",
              color: "#fff",
              borderRadius: "30px",
              py: 1.4,
              "&:hover": { backgroundColor: "#1E4682" },
            }}
            href={catalogue.file}
            target="_blank"
          >
            {t("view")}
          </Button>

          <Button
            
            variant="outlined"
            sx={{
              width: "40%",
              borderColor: "#2858A3",
              color: "#000",
              borderRadius: "30px",
              backgroundColor: "white",
              py: 1.4,
              "&:hover": {
                backgroundColor: "#2858A3",
                color: "#fff",
                borderColor: "#2858A3",
              },
            }}
            href={catalogue.file}
            download
          >
            {t("download")}
          </Button>
        </CardActions>

      </StyledCard>
    </Grid>
  ))}
</Grid>
    </Box>
  );
};

export default Catalogue;