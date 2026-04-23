// import React, { useEffect, useState, useMemo, useCallback, Link, useContext } from 'react'
// import {
//   Box,
//   Button,
//   ButtonBase,
//   CircularProgress,
//   Divider,
//   Fade,
//   Grid,
//   ListItem,
//   ListItemButton,
//   Typography,
//   IconButton,
//   ListItemText,
//   Skeleton,
//   Drawer,
//   Fab,
//   Backdrop,
//   Card,
//   CardContent,
//   Switch,
//   FormControlLabel,
//   Chip
// } from '@mui/material'
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import {
//   KeyboardArrowUpOutlined as ArrowUpIcon,
//   KeyboardArrowDownOutlined as ArrowDownIcon,
//   ViewColumn as ViewColumnIcon,
//   FormatListBulleted as ListIcon,
//   ExpandMore,
//   ExpandLess,
//   Remove,
//   Add,
//   FilterList as FilterListIcon,
//   Close as CloseIcon,
//   Sort as SortIcon,
//   ViewModule as GridViewIcon,
//   ViewList as ListViewIcon,
//   SwapVert as SwapVertIcon
// } from '@mui/icons-material'
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import bg from '../assets/category_hero.jpg'
// import ajaxService from '../services/ajax-service'
// import { CATEGORIES, ImageURL } from '../constants'
// import { Hero, BrandBanner, NewArrivals, AddToWishlist, AddToCartModal } from '../components'
// import useScrollAnimationProducts from '../hooks/ScrollAnimationProducts';
// import { AuthContext } from '../AuthContext';
// import { useTranslation } from 'react-i18next';
// import defaultImage from "../assets/contactsvg.svg";
// import { createSlug } from '../utils';

// const RenderGridProducts = React.memo(({ sortedProducts, navigate, handleModalClick, t }) => {

//   const [refs, getClass] = useScrollAnimationProducts(
//     sortedProducts.length,
//     "opacity-10 translate-y-10",  // Initial state: low opacity and slight downward translation
//     "opacity-100 translate-y-0 transition-all duration-700 ease-out hover:scale-105 hover:rotate-1"  // Combined transition with hover effects
//   );

//   const { currency, exchangeRate } = useContext(AuthContext);


//   return (
//     <>
//       {sortedProducts.map((prod, i) => (
//         <Grid
//           item
//           xs={12}
//           sm={6}
//           md={4}
//           ref={(el) => refs.current[i] = el}
//           className={`px-2.5 ${getClass(i)}`}
//           // style={{ transitionDelay: `${i * 0.1}s` }}
//           style={{ transition: "transform 0.7s ease-in, opacity 0.7s ease-in" }}

//           key={prod.id || i}
//         >
//           {
//             // Debugging removed for production

//           }
//           <ButtonBase
//             onClick={() => navigate('/product/' + prod.slug)}
//             sx={{ width: '100%' }}
//           >
//             <Box className="w-[41vh] h-96 products-box">
//               <Box className="bg-white relative h-[70%] w-full flex justify-center items-center rounded-2xl border-2 border-[#2858a3] hover:border-[#1e4080] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
//                 <div className="image-div">
//                   <img
//                     className="h-[75%] w-auto hover-image2"
//                     src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
//                     alt={prod.name}
//                   />
//                   <img
//                     className="h-[75%] w-auto object-fit hover-img"
//                     src={
//                       prod.images?.length > 1
//                         ? ImageURL + prod.images[1]
//                         : prod.images?.length === 1
//                           ? ImageURL + prod.images[0]
//                           : defaultImage
//                     }
//                     alt={prod.name}
//                   />
//                 </div>
//                 <Box className="absolute top-2.5 px-2.5 flex w-full h-fit justify-between">
//                   {prod.hot && (
//                     <Box className="bg-[#FF0F0F] px-2 py-1 uppercase poppins text-white text-xs h-[24px]">
//                       Hot
//                     </Box>
//                   )}
//                   <AddToWishlist
//                     product={prod}
//                     products={[]}
//                     setProducts={() => { }}
//                     viaCategory={true}
//                     open={false}
//                     setOpen={() => { }}
//                   />
//                 </Box>

//                 <Box className="absolute bottom-2.5 left-0 px-2.5 flex w-full h-fit justify-end">
//                   {/* <IconButton onClick={(e) => handleModalClick(e, prod)}>
//                     <AddShoppingCartIcon className="text-gray-600 text-xl" />
//                   </IconButton> */}
//                 </Box>
//               </Box>
//               <Box className="text-center py-6 px-3">
//                 <Typography className="poppins uppercase text-xs">
//                   {t(`main_products.${prod.name}`, prod.name)}
//                 </Typography>
//                 <Box className="flex justify-center gap-x-4 pt-1">
//                   {prod.discount_price && (
//                     <Typography className="poppins uppercase text-sm text-[#FF0F0F]">
//                       {currency} {Math.round(prod.discount_price * exchangeRate * 100) / 100}
//                     </Typography>
//                   )}
//                   <Typography
//                     className={`poppins uppercase text-md font-bold ${prod.discount_price && "line-through"}`}
//                   >
//                     {currency}  {Math.round(prod.price * exchangeRate * 100) / 100}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </ButtonBase>
//         </Grid>
//       ))}
//     </>
//   );
// });

// const RenderListProducts = React.memo(({ sortedProducts, navigate, handleModalClick, t }) => {
//   const [refs, getClass] = useScrollAnimationProducts(
//     sortedProducts.length,
//     "opacity-10 translate-y-10",  // Initial state: low opacity and slight downward translation
//     "opacity-100 translate-y-0 transition-transform transition-opacity duration-700 ease-out hover:scale-105  hover:rotate-1"  // Final state with hover effects
//   );
//   const { currency, exchangeRate } = useContext(AuthContext);

//   return (
//     <>
//       {sortedProducts.map((prod, i) => (
//         <Grid
//           item
//           xs={12}
//           ref={(el) => refs.current[i] = el}
//           className={getClass(i)}
//           style={{ transition: "transform 0.7s ease-out, opacity 0.7s ease-out" }}
//           key={prod.id || i}
//         >
//           <ButtonBase
//             onClick={() => navigate('/product/' + prod.slug)}
//             sx={{ width: '100%' }}
//           >
//             <Box className="flex items-center p-4 border-2 border-[#2858a3] hover:border-[#1e4080] rounded-lg justify-between w-full text-left hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01]">
//               <Box className="flex-shrink-0 w-24 h-24">
//                 <div className="relative w-full h-full">
//                   <img
//                     className="w-full h-full object-cover rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105"
//                     src={prod.images?.length > 0 ? ImageURL + prod.images[0] : defaultImage}
//                     alt={prod.name}
//                   />
//                   <img
//                     className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-200 ease-in-out opacity-0 hover:opacity-100"
//                     src={
//                       prod.images?.length > 1
//                         ? ImageURL + prod.images[1]
//                         : prod.images?.length === 1
//                           ? ImageURL + prod.images[0]
//                           : defaultImage
//                     }
//                     alt={prod.name}
//                   />

//                 </div>
//               </Box>
//               <Box className="ml-4 flex-grow ">
//                 <Typography className="poppins font-semibold text-sm sm:text-lg text-gray-800">
//                   {t(`main_products.${prod.name}`, prod.name)}
//                 </Typography>
//                 <Box className="flex justify-between items-center mt-2">
//                   <Box className="flex flex-col">
//                     {prod.discount_price && (
//                       <Typography className="poppins text-sm text-red-600">
//                         {currency} {Math.round(prod.discount_price * exchangeRate * 100) / 100}
//                       </Typography>
//                     )}
//                     <Typography
//                       className={`poppins text-sm ${prod.discount_price ? "line-through text-gray-500" : "text-black"}`}
//                     >
//                       {currency} {Math.round(prod.price * exchangeRate * 100) / 100}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//               <Box className="sm:ml-auto flex flex-col sm:flex-row ml-6  items-center space-x-4">
//                 {prod.hot && (
//                   <Box className="bg-red-600 px-3 py-1 uppercase poppins text-white text-xs rounded-full">
//                     Hot
//                   </Box>
//                 )}
//                 <AddToWishlist
//                   product={prod}
//                   products={[]}
//                   setProducts={() => { }}
//                   viaCategory={true}
//                   open={false}
//                   setOpen={() => { }}
//                 />
//                 {/* <IconButton onClick={(e) => handleModalClick(e, prod)}>
//                   <AddShoppingCartIcon className="text-gray-600 cursor-pointer hover:text-gray-800" />
//                 </IconButton> */}
//               </Box>
//             </Box>
//           </ButtonBase>
//         </Grid>
//       ))}
//     </>
//   );
// });


// const Sidebar = React.memo(
//   ({
//     toggleExpand,
//     expandedItems,
//     sideItems,
//     handleParentClick,
//     handleChildClick,
//     handleSubChildClick,
//     sidebarLoading,
//     Title,
//     t,
//     mobileDrawerOpen,
//     setMobileDrawerOpen,
//     mobileFiltersOpen,
//     setMobileFiltersOpen,
//     sortOption,
//     setSortOption,
//     isGridView,
//     setIsGridView,
//     handleSortOptionChange,
//     setPriceSortText,
//     setAlphaSortText
//   }) => {
//     const { i18n } = useTranslation();
//     const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

//     const getListItemStyles = (isActive) => ({
//       [isRTL ? 'borderRight' : 'borderLeft']: isActive ? "5px solid #2858a3" : "inherit",
//       borderRadius: isActive ? "0px" : "10px",
//       marginTop: isActive ? "5px" : "0px",
//       paddingY: isActive ? "0px" : "0px",
//       "&:hover": {
//         backgroundColor: isActive
//           ? "rgb(85 137 218 / 40%)"
//           : "rgba(0, 0, 0, 0.04)",
//         borderRadius: isActive ? "10px" : "10px",
//       },
//     });

//     const getListItemIconStyle = (isActive) => ({
//       color: isActive ? "#2858a3" : "inherit",
//     });

//     const getSubListItemStyles = (isActive) => ({
//       [isRTL ? 'borderRight' : 'borderLeft']: isActive ? "5px solid #2858a3" : "inherit",
//       borderRadius: isActive ? "0px" : "10px",
//       marginTop: isActive ? "5px" : "2px",
//       "&:hover": {
//         backgroundColor: isActive
//           ? "rgb(85 137 218 / 40%)"
//           : "rgba(0, 0, 0, 0.04)",
//         borderRadius: isActive ? "10px" : "10px",
//       },
//     });

//     const fadeSlideClasses = (isExpanded) =>
//       isExpanded
//         ? "opacity-100 translate-y-0 max-h-[1000px] transition-all duration-500 ease-in-out"
//         : "opacity-0 -translate-y-4 max-h-0 transition-all duration-500 ease-in-out pointer-events-none";

//     const sidebarAnimationClass = sidebarLoading
//       ? "translate-x-[-20px]"
//       : " translate-x-0 transition-all duration-1000 ease-out";

//     const SidebarContent = ({ isMobile = false }) => (
//       <Box className={`${isMobile ? "h-full" : "sticky top-5"} ${isRTL ? 'rtl' : ''}`}>
//         <Box className={`flex items-center justify-between ${isMobile ? 'p-4 border-b' : 'pb-10'} ${isRTL ? 'flex-row-reverse' : ''}`}>
//           <Typography variant={isMobile ? "h5" : "h4"} className={`poppins text-center ${isRTL ? 'text-right' : 'text-center'}`}>
//             {Title}
//           </Typography>
//           {isMobile && (
//             <IconButton
//               onClick={() => setMobileDrawerOpen(false)}
//               className="text-gray-600"
//             >
//               <CloseIcon />
//             </IconButton>
//           )}
//         </Box>

//         <Grid item xs={12} className={`${isRTL ? 'pr-2.5' : 'px-2.5'} ${isMobile ? 'pb-4' : 'mb-5'}`}>
//           {sidebarLoading ? (
//             Array.from(new Array(5)).map((_, index) => (
//               <Box key={index} p={2} width={isMobile ? "100%" : 300}>
//                 {/* View All Items */}
//                 <Skeleton variant="text" width={120} height={30} style={{ marginBottom: "10px" }} />
//                 <Skeleton variant="rectangular" width="100%" height={1} style={{ marginBottom: "20px" }} />

//                 {/* First Category */}
//                 <Skeleton variant="text" width={80} height={25} style={{ marginBottom: "10px" }} />

//                 {/* Subcategory and Items */}
//                 <Box className={isRTL ? 'mr-2' : 'ml-2'}>
//                   <Skeleton variant="text" width={60} height={20} style={{ marginBottom: "10px" }} />

//                   <Box className={isRTL ? 'mr-2' : 'ml-2'}>
//                     {Array.from(new Array(6)).map((_, index) => (
//                       <Skeleton key={index} variant="text" width={180} height={20} style={{ marginBottom: "10px" }} />
//                     ))}
//                   </Box>
//                 </Box>
//               </Box>
//             ))
//           ) : (
//             <>
//               {sideItems.map((item, i) => (
//                 <Box key={i} className="mb-1">
//                   <ListItem
//                     disablePadding
//                     sx={{
//                       ...getListItemStyles(item.active),
//                       borderRadius: isMobile ? '12px' : '10px',
//                       mb: isMobile ? 1 : 0,
//                       flexDirection: isRTL ? 'row-reverse' : 'row'
//                     }}
//                   >
//                     <ListItemButton
//                       onClick={() => {
//                         handleParentClick(item.id ?? item.slug, item.name);
//                         if (isMobile) setMobileDrawerOpen(false);
//                       }}
//                       sx={{ 
//                         borderRadius: isMobile ? '12px' : '10px',
//                         flexDirection: isRTL ? 'row-reverse' : 'row'
//                       }}
//                     >
//                       <ListItemText
//                         primary={t(`main_category.${item.name}`)}
//                         primaryTypographyProps={{
//                           className: `poppins ${isMobile ? 'text-base' : 'text-lg'} ${isRTL ? 'text-right' : ''}`,
//                         }}
//                       />
//                     </ListItemButton>
//                     {item.childrens && item.childrens.length > 0 && (
//                       <IconButton
//                         onClick={() => toggleExpand(item.id)}
//                         size="small"
//                         sx={{ 
//                           [isRTL ? 'ml' : 'mr']: isMobile ? 1 : 0,
//                           order: isRTL ? -1 : 'unset',
//                           transform: isRTL ? 'scaleX(-1)' : 'none'
//                         }}
//                       >
//                         {expandedItems[item.id] ? (
//                           <Remove sx={getListItemIconStyle(item.active)} />
//                         ) : (
//                           <Add sx={getListItemIconStyle(item.active)} />
//                         )}
//                       </IconButton>
//                     )}
//                   </ListItem>
//                   <div
//                     className={`overflow-hidden ${fadeSlideClasses(
//                       expandedItems[item.id]
//                     )}`}
//                   >
//                     {item.childrens &&
//                       item.childrens.length > 0 &&
//                       item.childrens.map((val, index) => (
//                         <React.Fragment key={index}>
//                           <ListItem disablePadding sx={{ [isRTL ? 'pr' : 'pl']: isMobile ? 3 : 4 }}>
//                             <Box
//                               display={"flex"}
//                               className="w-full"
//                               sx={{
//                                 ...getSubListItemStyles(val.active),
//                                 borderRadius: isMobile ? '10px' : '10px',
//                                 flexDirection: isRTL ? 'row-reverse' : 'row'
//                               }}
//                             >
//                               <ListItemButton
//                                 onClick={() => {
//                                   const itemSlug = item.slug || createSlug(item.name);
//                                   const childSlug = val.slug || createSlug(val.name);
//                                   handleChildClick(item.id, val.id, val.name, itemSlug, childSlug);
//                                   if (isMobile) setMobileDrawerOpen(false);
//                                 }}
//                                 sx={{ 
//                                   borderRadius: isMobile ? '10px' : '10px',
//                                   flexDirection: isRTL ? 'row-reverse' : 'row'
//                                 }}
//                               >
//                                 <ListItemText
//                                   primary={t(`main_category.${val.name}`)}
//                                   primaryTypographyProps={{
//                                     className: `poppins ${isMobile ? 'text-sm' : 'text-xs'} uppercase ${isRTL ? 'text-right' : ''}`,
//                                   }}
//                                 />
//                               </ListItemButton>

//                               {val.childrens &&
//                                 val.childrens.length > 0 && (
//                                   <IconButton
//                                     onClick={() => toggleExpand(val.id)}
//                                     size="small"
//                                     sx={{ 
//                                       [isRTL ? 'ml' : 'mr']: isMobile ? 1 : 0,
//                                       order: isRTL ? -1 : 'unset',
//                                       transform: isRTL ? 'scaleX(-1)' : 'none'
//                                     }}
//                                   >
//                                     {expandedItems[val.id] ? (
//                                       <Remove
//                                         sx={{
//                                           ...getListItemIconStyle(
//                                             item.active
//                                           ),
//                                           fontSize: "15px",
//                                         }}
//                                       />
//                                     ) : (
//                                       <Add
//                                         sx={{
//                                           ...getListItemIconStyle(
//                                             item.active
//                                           ),
//                                           fontSize: "15px",
//                                         }}
//                                       />
//                                     )}
//                                   </IconButton>
//                                 )}
//                             </Box>
//                           </ListItem>
//                           <div
//                             className={`overflow-hidden ${fadeSlideClasses(
//                               expandedItems[val.id]
//                             )}`}
//                           >
//                             {val.childrens &&
//                               val.childrens.length > 0 &&
//                               val.childrens.map((subItem, x) => (
//                                 <ListItem
//                                   key={x}
//                                   disablePadding
//                                   sx={{ [isRTL ? 'pr' : 'pl']: isMobile ? 6 : 8 }}
//                                 >
//                                   <ListItemButton
//                                     onClick={() => {
//                                       const itemSlug = item.slug || createSlug(item.name);
//                                       const childSlug = val.slug || createSlug(val.name);
//                                       const subChildSlug = subItem.slug || createSlug(subItem.name);
//                                       handleSubChildClick(
//                                         item.id,
//                                         val.id,
//                                         subItem.id,
//                                         subItem.name,
//                                         itemSlug,
//                                         childSlug,
//                                         subChildSlug
//                                       );
//                                       if (isMobile) setMobileDrawerOpen(false);
//                                     }}
//                                     sx={{
//                                       ...getSubListItemStyles(
//                                         subItem.active
//                                       ),
//                                       borderRadius: isMobile ? '8px' : '10px',
//                                       flexDirection: isRTL ? 'row-reverse' : 'row'
//                                     }}
//                                   >
//                                     <ListItemText
//                                       primary={t(`main_category.${subItem.name}`)}
//                                       primaryTypographyProps={{
//                                         className: `poppins ${isMobile ? 'text-xs' : 'text-xs'} pl-5 uppercase ${isRTL ? 'text-right' : ''}`,
//                                       }}
//                                     />
//                                   </ListItemButton>
//                                 </ListItem>
//                               ))}
//                           </div>
//                         </React.Fragment>
//                       ))}
//                   </div>
//                   {i + 1 !== sideItems.length && (
//                     <Divider
//                       sx={{
//                         backgroundColor: "#d9d9d9",
//                         my: 2,
//                         [isRTL ? 'mr' : 'ml']: isMobile ? 2 : 3,
//                         width: isMobile ? "90%" : "80%",
//                       }}
//                     />
//                   )}
//                 </Box>
//               ))}
//             </>
//           )}
//         </Grid>
//       </Box>
//     );

//     const MobileFiltersContent = () => (
//       <Box className={`h-full bg-white ${isRTL ? 'rtl' : ''}`}>
//         {/* Header */}
//         <Box className={`flex items-center justify-between p-4 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
//           <Typography variant="h6" className={`poppins font-semibold text-gray-800 ${isRTL ? 'text-right' : ''}`}>
//             {t('filters_and_sort')}
//           </Typography>
//           <IconButton
//             onClick={() => setMobileFiltersOpen(false)}
//             className="text-gray-600"
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Content */}
//         <Box className={`p-4 space-y-6 ${isRTL ? 'text-right' : ''}`}>
//           {/* Sort by Price Section */}
//           <Card className="shadow-sm border border-gray-100">
//             <CardContent className="p-4">
//               <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                 <SwapVertIcon className="text-blue-600" />
//                 <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
//                   {t('sort_by_price')}
//                 </Typography>
//               </Box>
//               <Box className="space-y-2">
//                 {[
//                   { id: 3, label: t('low_to_high'), icon: '↑' },
//                   { id: 4, label: t('high_to_low'), icon: '↓' }
//                 ].map((option) => (
//                   <Box
//                     key={option.id}
//                     onClick={() => {
//                       handleSortOptionChange(option.id);
//                       setMobileFiltersOpen(false);
//                     }}
//                     className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${sortOption === option.id
//                       ? 'bg-blue-50 border-2 border-blue-200'
//                       : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
//                       }`}
//                   >
//                     <Box className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
//                       <Typography className={`poppins ${sortOption === option.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
//                         {option.label}
//                       </Typography>
//                       <Typography className={`text-lg ${sortOption === option.id ? 'text-blue-600' : 'text-gray-400'}`}>
//                         {option.icon}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Sort by Alphabet Section */}
//           <Card className="shadow-sm border border-gray-100">
//             <CardContent className="p-4">
//               <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                 <SortIcon className="text-green-600" />
//                 <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
//                   {t('sort_by_alphabet')}
//                 </Typography>
//               </Box>
//               <Box className="space-y-2">
//                 {[
//                   { id: 1, label: t('a_to_z'), icon: 'A→Z' },
//                   { id: 2, label: t('z_to_a'), icon: 'Z→A' }
//                 ].map((option) => (
//                   <Box
//                     key={option.id}
//                     onClick={() => {
//                       handleSortOptionChange(option.id);
//                       setMobileFiltersOpen(false);
//                     }}
//                     className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${sortOption === option.id
//                       ? 'bg-green-50 border-2 border-green-200'
//                       : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
//                       }`}
//                   >
//                     <Box className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
//                       <Typography className={`poppins ${sortOption === option.id ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
//                         {option.label}
//                       </Typography>
//                       <Typography className={`text-sm font-mono ${sortOption === option.id ? 'text-green-600' : 'text-gray-400'}`}>
//                         {option.icon}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>

//           {/* View Toggle Section */}
//           <Card className="shadow-sm border border-gray-100">
//             <CardContent className="p-4">
//               <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                 <ViewColumnIcon className="text-purple-600" />
//                 <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
//                   {t('view_style')}
//                 </Typography>
//               </Box>
//               <Box className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                 <Box
//                   onClick={() => {
//                     setIsGridView(true);
//                     setMobileFiltersOpen(false);
//                   }}
//                   className={`flex-1 p-3 rounded-lg cursor-pointer transition-all duration-200 ${isGridView
//                     ? 'bg-purple-50 border-2 border-purple-200'
//                     : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
//                     }`}
//                 >
//                   <Box className="flex flex-col items-center gap-1">
//                     <GridViewIcon className={`${isGridView ? 'text-purple-600' : 'text-gray-500'}`} />
//                     <Typography className={`poppins text-sm ${isGridView ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
//                       {t('grid')}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Box
//                   onClick={() => {
//                     setIsGridView(false);
//                     setMobileFiltersOpen(false);
//                   }}
//                   className={`flex-1 p-3 rounded-lg cursor-pointer transition-all duration-200 ${!isGridView
//                     ? 'bg-purple-50 border-2 border-purple-200'
//                     : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
//                     }`}
//                 >
//                   <Box className="flex flex-col items-center gap-1">
//                     <ListViewIcon className={`${!isGridView ? 'text-purple-600' : 'text-gray-500'}`} />
//                     <Typography className={`poppins text-sm ${!isGridView ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
//                       {t('list')}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Current Selection Chips */}
//           {sortOption && (
//             <Box>
//               <Typography variant="subtitle2" className="poppins text-gray-600 mb-2">
//                 {t('current_selection')}:
//               </Typography>
//               <Chip
//                 label={
//                   sortOption === 1 ? t('a_to_z') :
//                     sortOption === 2 ? t('z_to_a') :
//                       sortOption === 3 ? t('price_low_to_high') :
//                         sortOption === 4 ? t('price_high_to_low') : ''
//                 }
//                 onDelete={() => {
//                   setSortOption(null);
//                   setPriceSortText('Sort By Price');
//                   setAlphaSortText('Sort By Alphabet');
//                 }}
//                 className="bg-blue-100 text-blue-800"
//                 size="small"
//               />
//             </Box>
//           )}
//         </Box>
//       </Box>
//     );

//     return (
//       <>
//         {/* Desktop Sidebar */}
//         <Grid
//           item
//           xs={12}
//           sm={3}
//           className={`hidden sm:block ${sidebarAnimationClass}`}
//         >
//           <SidebarContent />
//         </Grid>

//         {/* Mobile Category FAB */}
//         <Fab
//           color="primary"
//           aria-label="categories"
//           className={`sm:hidden fixed bottom-20 z-50 ${isRTL ? 'left-4' : 'right-4'}`}
//           onClick={() => setMobileDrawerOpen(true)}
//           sx={{
//             backgroundColor: '#2858a3',
//             '&:hover': {
//               backgroundColor: '#1e4080',
//             },
//             boxShadow: '0 8px 32px rgba(40, 88, 163, 0.3)',
//           }}
//         >
//           <FilterListIcon />
//         </Fab>

//         {/* Mobile Sort & Filters FAB */}
//         <Fab
//           color="secondary"
//           aria-label="sort and filters"
//           className={`sm:hidden fixed bottom-36 z-50 ${isRTL ? 'left-4' : 'right-4'}`}
//           onClick={() => setMobileFiltersOpen(true)}
//           sx={{
//             backgroundColor: '#e91e63',
//             '&:hover': {
//               backgroundColor: '#c2185b',
//             },
//             boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
//           }}
//         >
//           <SortIcon />
//         </Fab>

//         {/* Mobile Sidebar Drawer */}
//         <Drawer
//           anchor={isRTL ? "right" : "left"}
//           open={mobileDrawerOpen}
//           onClose={() => setMobileDrawerOpen(false)}
//           className="sm:hidden"
//           PaperProps={{
//             sx: {
//               width: '85%',
//               maxWidth: '350px',
//               background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
//               backdropFilter: 'blur(10px)',
//               direction: isRTL ? 'rtl' : 'ltr',
//             }
//           }}
//         >
//           <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
//             <SidebarContent isMobile={true} />
//           </Box>
//         </Drawer>

//         {/* Mobile Filters Drawer */}
//         <Drawer
//           anchor="bottom"
//           open={mobileFiltersOpen}
//           onClose={() => setMobileFiltersOpen(false)}
//           className="sm:hidden"
//           PaperProps={{
//             sx: {
//               height: '80vh',
//               borderTopLeftRadius: '20px',
//               borderTopRightRadius: '20px',
//               direction: isRTL ? 'rtl' : 'ltr',
//             }
//           }}
//         >
//           <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
//             <MobileFiltersContent />
//           </Box>
//         </Drawer>

//         {/* Backdrop for mobile drawers */}
//         <Backdrop
//           open={mobileDrawerOpen || mobileFiltersOpen}
//           onClick={() => {
//             setMobileDrawerOpen(false);
//             setMobileFiltersOpen(false);
//           }}
//           className="sm:hidden"
//           sx={{
//             zIndex: 1200,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             backdropFilter: 'blur(2px)',
//           }}
//         />
//       </>
//     );
//   }
// );



// const Products = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { parentSlug, childSlug, subChildSlug, brandSlug, dealSlug } = useParams()
//   const token = localStorage.getItem('token')
//   const user = localStorage.getItem('user') ?? null
//   const { t, i18n } = useTranslation(); // Hook for translations
//   const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

//   // Determine the type based on URL path
//   const isBrandPage = location.pathname.startsWith('/brand')
//   const isDealPage = location.pathname.startsWith('/deals')
//   const isCategoryPage = location.pathname.startsWith('/category')
  
//   // State to store the actual IDs after loading data
//   const [parentID, setParentID] = useState(null)
//   const [childID, setChildID] = useState(null)
//   const [subChildID, setSubChildID] = useState(null)
//   const [brandID, setBrandID] = useState(null)
//   const [Type, setType] = useState(null)

//   const [sortOn, setSortOn] = useState(false)
//   const [sortingOn, setSortingOn] = useState(false)
//   const [productsLoading, setProductsLoading] = useState(true)
//   const [sidebarLoading, setSidebarLoading] = useState(true)
//   const [open, setOpen] = useState(false)

//   const [sideItems, setSideItems] = useState([])
//   const [products, setProducts] = useState([])
//   const [offset, setOffset] = useState(0)
//   const [count, setCount] = useState(0)
//   const [loading, setLoading] = useState(false)
//   const [isGridView, setIsGridView] = useState(true)
//   const [sortOption, setSortOption] = useState(null)

//   const [viewMode, setViewMode] = useState('grid') // Default view mode

//   const [priceSortText, setPriceSortText] = useState('Sort By Price')
//   const [alphaSortText, setAlphaSortText] = useState('Sort By Alphabet')

//   const newArrivals = Type === CATEGORIES.NEW_ARRIVAL
//   const dealsConst = isDealPage && Type && Type !== CATEGORIES.ALL

//   const [cartModal, setCartModal] = useState(false);
//   const [modalProduct, setModalProduct] = useState({});
//   const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   const handleModalClick = (e, product) => {
//     e.stopPropagation();
//     setCartModal(true);
//     setModalProduct(product);
//   }

//   const Title = useMemo(
//     () =>
//       newArrivals
//         ? t('new_arrivals')
//         : brandID
//           ? t('brands_title')
//           : dealsConst
//             ? t('deals_title')
//             : t('categories_title'),
//     [newArrivals, brandID, dealsConst, t]
//   )
//   const [heroTitle, setHeroTitle] = useState('Categories')

//   const [expandedItems, setExpandedItems] = useState({})

//   const toggleExpand = id => {
//     setExpandedItems(prevState => ({
//       ...prevState,
//       [id]: !prevState[id]
//     }))

//     // Debugging removed for production
//   }

//   const handleParentClick = useCallback(
//     (id, title = null, slug = null) => {
//       setHeroTitle(title || 'Categories')
//       const categorySlug = slug || createSlug(title)
      
//       if (isBrandPage) {
//         navigate(`/brand/${categorySlug}`)
//       } else if (isDealPage) {
//         navigate(`/deals/${categorySlug}`)
//       } else {
//         if (id > 0) {
//           navigate(`/category/${categorySlug}`)
//         } else {
//           navigate('/category')
//         }
//       }
//     },
//     [navigate, isBrandPage, isDealPage]
//   )

//   const handleChildClick = useCallback(
//     (parentId, id, title = null, parentSlugValue = null, childSlugValue = null) => {
//       setHeroTitle(title || 'Categories')
//       const parentSlugToUse = parentSlugValue || parentSlug
//       const childSlugToUse = childSlugValue || createSlug(title)
//       navigate(`/category/${parentSlugToUse}/${childSlugToUse}`)
//     },
//     [navigate, parentSlug]
//   )

//   const handleSubChildClick = useCallback(
//     (parentId, childId, id, title = null, parentSlugValue = null, childSlugValue = null, subChildSlugValue = null) => {
//       setHeroTitle(title || 'Categories')
//       const parentSlugToUse = parentSlugValue || parentSlug
//       const childSlugToUse = childSlugValue || childSlug
//       const subChildSlugToUse = subChildSlugValue || createSlug(title)
//       navigate(`/category/${parentSlugToUse}/${childSlugToUse}/${subChildSlugToUse}`)
//     },
//     [navigate, parentSlug, childSlug]
//   )

//   const loadCategories = useCallback(async () => {
//     const response = await ajaxService.get('/all-categories')
//     if (response.success) {
//       let data = response.data
//       const updatedCategories = [{ id: 0, name: 'View All Items', slug: 'all' }, ...data]

//       // Find IDs from slugs
//       let foundParentID = null
//       let foundChildID = null
//       let foundSubChildID = null

//       const categoriesList = updatedCategories.map(i => {
//         const itemSlug = i.slug || createSlug(i.name)
//         const isParentActive = parentSlug ? itemSlug === parentSlug : i.id === 0
//         i.active = isParentActive
        
//         if (isParentActive && i.id > 0) {
//           foundParentID = i.id
//         }

//         if (i.childrens) {
//           i.childrens.map(c => {
//             const childItemSlug = c.slug || createSlug(c.name)
//             c.active = childSlug ? childItemSlug === childSlug : false
            
//             if (c.active) {
//               foundChildID = c.id
//               foundParentID = i.id
//             }

//             if (c.childrens) {
//               c.childrens.map(x => {
//                 const subChildItemSlug = x.slug || createSlug(x.name)
//                 x.active = subChildSlug ? subChildItemSlug === subChildSlug : false
                
//                 if (x.active) {
//                   foundSubChildID = x.id
//                   foundChildID = c.id
//                   foundParentID = i.id
//                 }
//                 return x
//               })
//             }
//             return c
//           })
//         }
//         return i
//       })

//       // Update state with found IDs
//       setParentID(foundParentID)
//       setChildID(foundChildID)
//       setSubChildID(foundSubChildID)
      
//       setSidebarLoading(false)
//       setSideItems(categoriesList)
//     }
//   }, [parentSlug, childSlug, subChildSlug])

//   const loadDeals = useCallback(async () => {
//     const { success, data } = await ajaxService.get('/all-deals')
//     if (success) {
//       let foundType = null
//       data.map(i => {
//         const itemSlug = i.slug || createSlug(i.name)
//         i.active = dealSlug ? itemSlug === dealSlug : false
//         if (i.active) {
//           foundType = i.slug
//         }
//         return i
//       })
//       setType(foundType)
//       setSidebarLoading(false)
//       setSideItems(data)
//     }
//   }, [dealSlug])

//   const loadBrands = useCallback(async () => {
//     const { success, data } = await ajaxService.get('/all-brands')
//     if (success) {
//       let foundBrandID = null
//       data.map(i => {
//         const itemSlug = i.slug || createSlug(i.name)
//         i.active = brandSlug ? itemSlug === brandSlug : false
//         if (i.active) {
//           foundBrandID = i.id
//         }
//         return i
//       })
//       setBrandID(foundBrandID)
//       setSidebarLoading(false)
//       setSideItems(data)
//     }
//   }, [brandSlug])

//   const fetchProducts = useCallback(
//     async (updatedOffset = 0) => {
//       let type = CATEGORIES.ALL
//       let id = 0

//       // For brand pages, always use category_id=0 and type=all
//       if (!isBrandPage && !isDealPage) {
//         if (subChildID) {
//           type = CATEGORIES.SUB_CHILD
//           id = subChildID
//         } else if (childID) {
//           type = CATEGORIES.CHILD
//           id = childID
//         } else if (parentID) {
//           type = CATEGORIES.PARENT
//           id = parentID
//         }
//       }

//       const baseUrl = '/category/products'

//       const queryParams = new URLSearchParams({
//         category_id: id,
//         type: type,
//         offset: updatedOffset,
//         brand_id: brandID ?? 0,
//         new_arrival: newArrivals
//       })

//       if (dealsConst) {
//         queryParams.append('product_type', Type)
//       }

//       if (token && user) {
//         queryParams.append('user_id', JSON.parse(user).id)
//       }

//       const url = `${baseUrl}?${queryParams.toString()}`
//       const response = await ajaxService.get(url)
//       return response ? response : null
//     },
//     [
//       subChildID,
//       childID,
//       parentID,
//       brandID,
//       newArrivals,
//       dealsConst,
//       Type,
//       token,
//       user,
//       isBrandPage,
//       isDealPage
//     ]
//   )

//   const handleLoadMoreClick = useCallback(async () => {
//     const updatedOffset = offset + 15
//     setOffset(updatedOffset)
//     setLoading(true)

//     const response = await fetchProducts(updatedOffset)

//     if (response) {
//       setLoading(false)
//       setProductsLoading(false) // false
//       setProducts(prevProducts => [...prevProducts, ...response.data])

//       // const loadMoreButton = document.getElementById('loadMoreButton')
//       // loadMoreButton.scrollIntoView({ behavior: 'smooth' })
//     }
//   }, [offset, fetchProducts])

//   const loadProducts = useCallback(async () => {
//     setOffset(0)
//     const response = await fetchProducts()

//     if (response) {
//       setCount(response.count)
//       setProductsLoading(false) // false
//       setProducts(response.data)
//     }
//   }, [fetchProducts])

//   const handleSortOptionChange = useCallback(
//     option => {
//       setSortOption(option)
//       setProductsLoading(true)
//       setProducts([])
//       setOffset(0)
//       loadProducts()


//       // Update the button text based on the selected option
//       if (option === 3) {
//         setPriceSortText('Sort By Low to High')
//       } else if (option === 4) {
//         setPriceSortText('Sort By High to Low')
//       } else if (option === 1) {
//         setAlphaSortText('Sort By A to Z')
//       } else if (option === 2) {
//         setAlphaSortText('Sort By Z to A')
//       }
//     },
//     [loadProducts]
//   )

//   useEffect(() => {
//     setOffset(0)
//     setProductsLoading(true)
//     setProducts([])
    
//     // Reset IDs based on page type
//     if (isBrandPage) {
//       setParentID(null)
//       setChildID(null)
//       setSubChildID(null)
//       setType(null)
//       loadBrands()
//     } else if (isDealPage) {
//       setParentID(null)
//       setChildID(null)
//       setSubChildID(null)
//       setBrandID(null)
//       loadDeals()
//     } else {
//       setBrandID(null)
//       setType(null)
//       loadCategories()
//     }
//   }, [
//     parentSlug,
//     childSlug,
//     subChildSlug,
//     brandSlug,
//     dealSlug,
//     location.pathname,
//     sortOption,
//     loadBrands,
//     loadDeals,
//     loadCategories,
//     isBrandPage,
//     isDealPage
//   ])

//   // Separate useEffect for loading products when IDs are available
//   useEffect(() => {
//     if (!sidebarLoading) {
//       // For brand pages, wait for brandID
//       if (isBrandPage && brandID) {
//         loadProducts()
//       }
//       // For deal pages, wait for Type to be set
//       else if (isDealPage && Type) {
//         loadProducts()
//       }
//       // For category pages, parentID can be null (for "all" case)
//       else if (isCategoryPage && parentID !== undefined) {
//         loadProducts()
//       }
//       // For "all" category case when no slug
//       else if (!isBrandPage && !isDealPage && parentID === null) {
//         loadProducts()
//       }
//     }
//   }, [parentID, childID, subChildID, brandID, Type, sidebarLoading, loadProducts, isBrandPage, isDealPage, isCategoryPage])

//   useEffect(() => {
//     // Runs only on initial mount
//     if (parentID) {
//       toggleExpand(parentID);
//     }
//     if (childID) {
//       toggleExpand(childID);
//     }
//     if (subChildID) {
//       toggleExpand(subChildID);
//     }
//   }, []);

//   // Add this useEffect to update title based on URL parameters when page loads
//   useEffect(() => {
//     // Don't update title if sideItems are still loading
//     if (sidebarLoading) return;

//     if (isDealPage && dealSlug) {
//       // For deals, find the deal name from sideItems
//       const deal = sideItems.find(item => {
//         const itemSlug = item.slug || createSlug(item.name)
//         return itemSlug === dealSlug
//       });
//       if (deal) {
//         setHeroTitle(deal.name);
//       }
//     } else if (isBrandPage && brandSlug) {
//       // For brands, find the brand name from sideItems
//       const brand = sideItems.find(item => {
//         const itemSlug = item.slug || createSlug(item.name)
//         return itemSlug === brandSlug
//       });
//       if (brand) {
//         setHeroTitle(brand.name);
//       }
//     } else if (subChildSlug && childSlug && parentSlug) {
//       // Level 3: Sub-child category
//       const parentCategory = sideItems.find(item => {
//         const itemSlug = item.slug || createSlug(item.name)
//         return itemSlug === parentSlug
//       });
//       if (parentCategory) {
//         const childCategory = parentCategory.childrens?.find(child => {
//           const childItemSlug = child.slug || createSlug(child.name)
//           return childItemSlug === childSlug
//         });
//         if (childCategory) {
//           const subChildCategory = childCategory.childrens?.find(subChild => {
//             const subChildItemSlug = subChild.slug || createSlug(subChild.name)
//             return subChildItemSlug === subChildSlug
//           });
//           if (subChildCategory) {
//             setHeroTitle(subChildCategory.name);
//           }
//         }
//       }
//     } else if (childSlug && parentSlug) {
//       // Level 2: Child category
//       const parentCategory = sideItems.find(item => {
//         const itemSlug = item.slug || createSlug(item.name)
//         return itemSlug === parentSlug
//       });
//       if (parentCategory) {
//         const childCategory = parentCategory.childrens?.find(child => {
//           const childItemSlug = child.slug || createSlug(child.name)
//           return childItemSlug === childSlug
//         });
//         if (childCategory) {
//           setHeroTitle(childCategory.name);
//         }
//       }
//     } else if (parentSlug) {
//       // Level 1: Parent category
//       const parentCategory = sideItems.find(item => {
//         const itemSlug = item.slug || createSlug(item.name)
//         return itemSlug === parentSlug
//       });
//       if (parentCategory) {
//         setHeroTitle(parentCategory.name);
//       }
//     } else {
//       setHeroTitle('Categories');
//     }
//   }, [isDealPage, isBrandPage, brandSlug, parentSlug, childSlug, subChildSlug, dealSlug, sideItems, sidebarLoading]);

//   const sortedProducts = useMemo(
//     () =>
//       products.sort((a, b) => {
//         switch (sortOption) {
//           case 1:
//             return a.name.localeCompare(b.name) // Ascending by name
//           case 2:
//             return b.name.localeCompare(a.name) // Descending by name
//           case 3:
//             return a.price - b.price // Low to high price
//           case 4:
//             return b.price - a.price // High to low price
//           default:
//             return 0
//         }
//       }),
//     [products, sortOption]
//   )

//   const handleViewModeChange = useCallback(mode => {
//     setViewMode(mode)
//   }, [])

//   return (
//     <Box className='w-full h-auto m-0 p-0'>
//       <Hero bg={bg} title={heroTitle} />
//       <Grid container className='py-16 px-10 md:px-14 lg:px-36'>
//         {!newArrivals && (
//           <Sidebar
//             expandedItems={expandedItems}
//             toggleExpand={toggleExpand}
//             sideItems={sideItems}
//             handleParentClick={handleParentClick}
//             handleChildClick={handleChildClick}
//             handleSubChildClick={handleSubChildClick}
//             sidebarLoading={sidebarLoading}
//             Title={Title}
//             t={t}
//             mobileDrawerOpen={mobileDrawerOpen}
//             setMobileDrawerOpen={setMobileDrawerOpen}
//             mobileFiltersOpen={mobileFiltersOpen}
//             setMobileFiltersOpen={setMobileFiltersOpen}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             isGridView={isGridView}
//             setIsGridView={setIsGridView}
//             handleSortOptionChange={handleSortOptionChange}
//             setPriceSortText={setPriceSortText}
//             setAlphaSortText={setAlphaSortText}
//           />
//         )}
//         <Grid item xs={12} sm={newArrivals ? 12 : 9}>
//           <Box className='sticky top-0 z-[1] bg-[#f5f5f5] py-2'>
//             {/* Mobile Status Bar */}
//             <Box className='sm:hidden flex justify-between items-center mb-2 px-2'>
//               <Box className='flex items-center gap-2'>
//                 <Typography className='poppins text-sm text-gray-600'>
//                   {products.length} Products
//                 </Typography>
//                 {sortOption && (
//                   <Chip
//                     label={
//                       sortOption === 1 ? 'A-Z' :
//                         sortOption === 2 ? 'Z-A' :
//                           sortOption === 3 ? '↑ Price' :
//                             sortOption === 4 ? '↓ Price' : ''
//                     }
//                     size="small"
//                     className="bg-blue-100 text-blue-800"
//                   />
//                 )}
//               </Box>
//               <Box className='flex items-center gap-1'>
//                 <IconButton
//                   size="small"
//                   onClick={() => setIsGridView(true)}
//                   className={`${isGridView ? 'text-blue-600' : 'text-gray-400'}`}
//                 >
//                   <GridViewIcon fontSize="small" />
//                 </IconButton>
//                 <IconButton
//                   size="small"
//                   onClick={() => setIsGridView(false)}
//                   className={`${!isGridView ? 'text-blue-600' : 'text-gray-400'}`}
//                 >
//                   <ListViewIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             </Box>
//             <Box className='hidden sm:flex justify-between items-center'>
//               <Box className='flex gap-2' >
//                 <Box className='relative min-w-[150px] sm:w-auto h-12 ' onClick={() => setSortOn(!sortOn)}>
//                   <Button
//                     variant='outlined'
//                     onClick={() => setSortOn(!sortOn)}
//                     className='w-fit bg-transparent rounded-none border-black border text-black uppercase text-sm poppins '
//                   >
//                     {priceSortText}
//                     {sortOn ? (
//                       <ArrowUpIcon className='text-base ms-2' />
//                     ) : (
//                       <ArrowDownIcon className='text-base ms-2' />
//                     )}
//                   </Button>
//                   {sortOn && (
//                     <Box className='absolute gap-y-2 p-2.5 z-50 top-12 w-full left-0 bg-white border'>
//                       {[3, 4].map(index => (
//                         <Typography
//                           key={index}
//                           className='text-sm text-black poppins cursor-pointer'

//                           onClick={() => handleSortOptionChange(index)}
//                         >
//                           {index === 3 ? 'Low to High' : 'High to Low'}
//                         </Typography>
//                       ))}
//                     </Box>
//                   )}
//                 </Box>

//                 <Box className='relative min-w-[130px] sm:w-auto h-12' onClick={() => setSortingOn(!sortingOn)}>
//                   <Button
//                     variant='outlined'
//                     onClick={() => setSortingOn(!sortingOn)}
//                     className='w-fit bg-transparent rounded-none border-black border text-black uppercase text-sm poppins '
//                   >
//                     {alphaSortText}
//                     {sortingOn ? (
//                       <ArrowUpIcon className='text-base ms-2' />
//                     ) : (
//                       <ArrowDownIcon className='text-base ms-2' />
//                     )}
//                   </Button>
//                   {sortingOn && (
//                     <Box className='absolute gap-y-3 p-2.5 z-50 top-12 w-full left-0 bg-white border'>
//                       {[1, 2].map(index => (
//                         <Typography
//                           key={index}
//                           className='text-sm text-black poppins cursor-pointer'
//                           onClick={() => handleSortOptionChange(index)}
//                         >
//                           {index === 1 ? 'A to Z' : 'Z to A'}
//                         </Typography>
//                       ))}
//                     </Box>
//                   )}
//                 </Box>
//               </Box>
//               <Box className='w-fit flex flex-col md:flex-row ml-2 gap-x-3'>
//                 <Typography
//                   className='md:text-xs text-md text-black cursor-pointer'
//                   onClick={() => setIsGridView(true)}
//                 >
//                   <ViewColumnIcon />
//                 </Typography>
//                 <Typography
//                   className='md:text-xs text-md text-black cursor-pointer'
//                   onClick={() => setIsGridView(false)}
//                 >
//                   <ListIcon />
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//           <Grid container className="mt-10">
//             {productsLoading ? (
//               <Grid item xs={12} className="px-2.5 mb-5 text-center">
//                 <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
//                   {[...Array(6)].map((_, index) => (
//                     <Box
//                       key={index}
//                       className="flex flex-col items-center"
//                       style={{
//                         width: "calc(100% - 8px)", // Mobile: 2 items per row
//                         borderRadius: "12px",
//                         marginBottom: "16px",
//                       }}
//                       sx={{
//                         '@media (min-width: 600px)': {
//                           width: "calc(50% - 12px)", // Small: 2 items per row
//                         },
//                         '@media (min-width: 960px)': {
//                           width: "calc(33.333% - 16px)", // Medium+: 3 items per row
//                         }
//                       }}
//                     >
//                       {/* Heart Icon Placeholder */}
//                       <Skeleton
//                         variant="circular"
//                         width={20}
//                         height={20}
//                         style={{ 
//                           alignSelf: "flex-start", 
//                           marginBottom: "-24px", 
//                           marginLeft: "8px",
//                           zIndex: 1
//                         }}
//                         sx={{
//                           '@media (min-width: 600px)': {
//                             width: 24,
//                             height: 24,
//                             marginBottom: "-28px",
//                           }
//                         }}
//                       />
//                       {/* Product Image Placeholder */}
//                       <Skeleton
//                         variant="rectangular"
//                         width="100%"
//                         animation="wave"
//                         height={180}
//                         style={{
//                           borderRadius: "8px",
//                           marginBottom: "12px",
//                         }}
//                         sx={{
//                           '@media (min-width: 600px)': {
//                             height: 220,
//                             marginBottom: "16px",
//                           },
//                           '@media (min-width: 960px)': {
//                             height: 240,
//                           }
//                         }}
//                       />
//                       {/* Cart Icon Placeholder */}
//                       <Skeleton
//                         variant="circular"
//                         width={20}
//                         height={20}
//                         style={{ 
//                           alignSelf: "flex-end", 
//                           marginTop: "-35px", 
//                           marginRight: "8px", 
//                           marginBottom: "8px",
//                           zIndex: 1
//                         }}
//                         sx={{
//                           '@media (min-width: 600px)': {
//                             width: 24,
//                             height: 24,
//                             marginTop: "-45px",
//                           }
//                         }}
//                       />
//                       {/* Product Title Placeholder */}
//                       <Skeleton
//                         variant="text"
//                         width="90%"
//                         height={16}
//                         style={{
//                           borderRadius: "4px",
//                           marginBottom: "6px",
//                         }}
//                         sx={{
//                           '@media (min-width: 600px)': {
//                             width: "80%",
//                             height: 20,
//                             marginBottom: "8px",
//                           }
//                         }}
//                       />
//                       {/* Product Price Placeholder */}
//                       <Skeleton
//                         variant="text"
//                         width="50%"
//                         height={16}
//                         style={{
//                           borderRadius: "4px",
//                           marginBottom: "8px",
//                         }}
//                         sx={{
//                           '@media (min-width: 600px)': {
//                             width: "40%",
//                             height: 20,
//                           }
//                         }}
//                       />
//                     </Box>
//                   ))}
//                 </Box>
//               </Grid>
//             ) : (
//               <> {products.length === 0 && !productsLoading ? (
//                 <Grid item xs={12} className="px-2.5 mb-5 text-center">
//                   This Category has no products {':)'}
//                 </Grid>
//               ) : isGridView ? (
//                 <RenderGridProducts
//                   sortedProducts={sortedProducts}
//                   navigate={navigate}
//                   handleModalClick={handleModalClick}
//                   t={t}
//                 />
//               ) : (
//                 <RenderListProducts
//                   sortedProducts={sortedProducts}
//                   navigate={navigate}
//                   handleModalClick={handleModalClick}
//                   t={t}
//                 />
//               )}

//                 {products.length < count && !productsLoading && (
//                   <Grid item xs={12} className="flex justify-center h-fit">
//                     <Button
//                       id="loadMoreButton"
//                       className="bg-black text-white text-xs cursor-pointer poppins uppercase p-4 rounded-none"
//                       onClick={handleLoadMoreClick}
//                       disabled={loading}
//                     >
//                       {loading && <CircularProgress size={18} className="text-white mr-2" />}
//                       Load More
//                     </Button>
//                   </Grid>
//                 )}</>
//             )}
//           </Grid>


//           {Object.keys(modalProduct)?.length > 0 && (
//             <AddToCartModal
//               visible={cartModal}
//               setVisible={setCartModal}
//               product={modalProduct}
//             />
//           )}
//         </Grid>
//       </Grid>
//       <BrandBanner />
//       {/* <NewArrivals /> */}
//     </Box>
//   )
// }

// export default Products
