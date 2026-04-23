import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";


import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined"; // Partner With Us
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined"; // Contact Us
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"; // FAQs

import XIcon from "@mui/icons-material/X";
import brand1 from "./assets/brand1.png";
import brand2 from "./assets/brand2.png";
import { FaTiktok } from "react-icons/fa";
import { routes as routie } from './utils'
import { LinkedIn, YouTube, YoutubeSearchedForOutlined } from "@mui/icons-material";

export const routes = [
  {
    title: "best_deals",
    icon: <ThumbUpOffAltIcon />,
    mobIcon: <ThumbUpOffAltIcon />,
    link: "/deals",
  },
  {
    title: "brands",
    icon: <TipsAndUpdatesOutlinedIcon />,
    mobIcon: <TipsAndUpdatesOutlinedIcon />,
    link: "/brands",
  },
  {
    title: "customer_support",
    icon: <SupportAgentIcon />,
    mobIcon: <SupportAgentIcon />,
    link: routie.customer_support,
  },
  // {
  //   title: "New Arrivals",
  //   icon: <AutoAwesomeOutlinedIcon />,
  //   mobIcon: <AutoAwesomeOutlinedIcon />,
  //   link: `/category?type=${CATEGORIES.NEW_ARRIVAL}`,
  // },
  // {
  //   title: "Flash Sale",
  //   icon: <LocalFireDepartmentOutlinedIcon />,
  //   mobIcon: <LocalFireDepartmentOutlinedIcon />,
  //   link: `/category?type=${CATEGORIES.FLASH_SALE}`,
  // },

  // {
  //   title: "Blogs",
  //   icon: <ArticleOutlinedIcon />, // Updated icon
  //   mobIcon: <ArticleOutlinedIcon />,
  //   link: "/blogs",
  // },
  {
    title: "about_us",
    icon: <FolderOpenOutlinedIcon />,
    mobIcon: <FolderOpenOutlinedIcon />,
    link: routie.about,
  },
  {
    title: "partner",
    icon: <BusinessCenterOutlinedIcon />,
    mobIcon: <BusinessCenterOutlinedIcon />,
    link: routie.retailer_registration,
  },
  {
    title: "contact_us",
    icon: <ContactSupportOutlinedIcon />,
    mobIcon: <ContactSupportOutlinedIcon />,
    link: "/contact",
  },
  {
    title: "faqs",
    icon: <HelpOutlineOutlinedIcon />,
    mobIcon: <HelpOutlineOutlinedIcon />,
    link: routie.faq,
  },
  {
    title: "catalogue",
    icon: <MenuBookOutlinedIcon />, // Represents a book/catalogue
    mobIcon: <MenuBookOutlinedIcon />,
    link: "/catalogue",
  },

  //  {
  //     title: "Blogs",
  //     icon: <ArticleOutlinedIcon />, // Updated icon
  //     mobIcon: <ArticleOutlinedIcon />,
  //     link: "/blogs",
  //   },


  // {
  //   title: "Login",
  //   icon: <LocalFireDepartmentOutlinedIcon />,
  //   mobIcon: <LocalFireDepartmentOutlinedIcon />,
  //   link: routie.login,
  // },
  // {
  //   title: "Logout",
  //   icon: <LocalFireDepartmentOutlinedIcon />,
  //   mobIcon: <LocalFireDepartmentOutlinedIcon />,
  //   link: routie.login,
  // },
  // {
  //   title: "Dashboard",
  //   icon: <LocalFireDepartmentOutlinedIcon />,
  //   mobIcon: <LocalFireDepartmentOutlinedIcon />,
  //   link: routie.dashboard,
  // },
];

export const footerLinks = [
  {
    title: "Customer Service",
    link: "/contact",
    links: [
      {
        name: "My Account",
        link: "/user/login",
      },
      // {
      //   name: "Payments",
      //   link: "/blogs",
      // },
      {
        name: "Term of Use",
        link: routie.terms,
      },
      // {
      //   name: "Deliveries of Returns",
      //   link: "/policy",
      // },
      // {
      //   name: "Gift Card",
      //   link: "/product",
      // },
      {
        name: "Privacy Policy",
        link: routie.policy,
      },
      {
        name: "Shipping Policy",
        link: routie.shipping_policy,
      },
      {
        name: "Return Policy",
        link: routie.return_policy,
      },
      {
        name: "FAQs",
        link: routie.faq,
      },
    ],
  },
  {
    title: "About Us",
    link: "/about",
    links: [
      // {
      //   name: "Product",
      //   link: "/product",
      // },
      // {
      //   name: "Our Story",
      //   link: "/about",
      // },
      // {
      //   name: "Job Opportunities",
      //   link: "/blogs",
      // },
      {
        name: "Store Locator",
        link: "/store-locator",
      },
      {
        name: "Blog",
        link: "/blogs",
      },
      // {
      //   name: "Reviews",
      //   link: "/product",
      // },
      // {
      //   name: "Trending Search",
      //   link: "/",
      // },
    ],
  },
];

export const footerSocials = [
  { icon: <FacebookOutlinedIcon />, link: "https://www.facebook.com/buraqstartrading" },
  { icon: <InstagramIcon />, link: "https://www.instagram.com/buraqstar/?next=%2F&hl=en" },
  { icon: <YouTube />, link: "https://www.youtube.com/channel/UC7jBbp5U9O2PPa99zjGDXtA" },
  { icon: <LinkedIn />, link: "https://www.linkedin.com/company/buraq-star-trading-co-llc" },
  { icon: <XIcon />, link: "https://x.com/BuraqstarUAE" },
  { icon: <PinterestIcon />, link: "https://www.pinterest.com/buraqstartrading/" }, // Uncomment and add the correct link
  { icon: <FaTiktok className="text-base mb-1" />, link: "https://www.tiktok.com/@buraq.star?lang=en" },
];

export const novexProducts = [
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand1,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
  {
    image: brand2,
    name: "Control DMR Double",
    price: 70,
    discount: 90,
    rating: 3.4,
    reviews: "11.3k",
  },
];

export const features = [
  {
    title: "Size",
    value: ":to be provided",
  },
  {
    title: "Voltage",
    value: ":220V~240V AC 50/60Hz",
  },
  {
    title: "Watts",
    value: ":to be provided",
  },
  {
    title: "RPM",
    value: ":to be provided",
  },
  {
    title: "CFM",
    value: ":to be provided",
  },
];
