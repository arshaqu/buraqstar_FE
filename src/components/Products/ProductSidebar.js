import React from 'react'
import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  ListItemText,
  Skeleton,
  Drawer,
  Fab,
  Backdrop,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import {
  Remove,
  Add,
  FilterList as FilterListIcon,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { createSlug, getCategoryName } from '../../utils'
import {
  KeyboardArrowRight,
  KeyboardArrowDown
} from '@mui/icons-material'

const ProductSidebar = React.memo(
  ({
    toggleExpand,
    expandedItems,
    sideItems,
    handleParentClick,
    handleChildClick,
    handleSubChildClick,
    sidebarLoading,
    Title,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    // --- Brands props (new) ---
    brands = [],
    selectedBrands = [],
    handleBrandToggle,
  }) => {
    const { i18n, t } = useTranslation()
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur'

    const getListItemStyles = (isActive) => ({
      [isRTL ? 'borderRight' : 'borderLeft']: isActive ? "1px solid #2858a3" : "inherit",
      backgroundColor: isActive ? "#e4e4e4" : "transparent",
      "&:hover": {
        backgroundColor: isActive ? "rgb(85 137 218 / 40%)" : "rgba(0, 0, 0, 0.04)",
        borderRadius: "10px",
      },
    })

    const getListItemIconStyle = (isActive) => ({
      color: isActive ? "#2858a3" : "inherit",
    })

    const getSubListItemStyles = (isActive) => ({
      [isRTL ? 'borderRight' : 'borderLeft']: isActive ? "5px solid #2858a3" : "inherit",
      borderRadius: isActive ? "0px" : "10px",
      marginTop: isActive ? "5px" : "2px",
      "&:hover": {
        backgroundColor: isActive ? "rgb(85 137 218 / 40%)" : "rgba(0, 0, 0, 0.04)",
        borderRadius: "10px",
      },
    })

    const fadeSlideClasses = (isExpanded) =>
      isExpanded
        ? "opacity-100 translate-y-0 max-h-[1000px] transition-all duration-500 ease-in-out"
        : "opacity-0 -translate-y-4 max-h-0 transition-all duration-500 ease-in-out pointer-events-none"

    const sidebarAnimationClass = sidebarLoading
      ? "translate-x-[-20px]"
      : "translate-x-0 transition-all duration-1000 ease-out"

    const SidebarContent = ({ isMobile = false }) => (
      <Box
        className={`${isMobile ? "h-full" : "sticky top-5"} ${isRTL ? "rtl" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* ── All Categories Card ── */}
        <Grid
          item
          xs={12}
          className={`${
            isMobile
              ? 'pb-4 max-h-[calc(100vh-120px)] overflow-y-auto'
              : 'mb-3 max-h-[calc(100vh-200px)] overflow-y-auto'
          }`}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            overflow: 'hidden',
            margin: '18px',
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
              backgroundColor: '#4e4e4e',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#2858a3',
              borderRadius: '10px',
              backgroundColor: '#727272',
              '&:hover': { background: '#1e4080' },
            },
          }}
        >
          {/* Header: "All Categories" */}
          <Box
            sx={{
              backgroundColor: '#f5f7fa',
              px: 2,
              py: 1.5,
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <Typography
              className="poppins"
              sx={{ fontWeight: 600, fontSize: '14px', color: '#333' }}
            >
              {t('side_categories.all_categories')}
            </Typography>
          </Box>

          {/* Category rows */}
          {sidebarLoading ? (
            Array.from(new Array(5)).map((_, index) => (
              <Box key={index} p={2}>
                <Skeleton variant="text" width={120} height={30} style={{ marginBottom: '10px' }} />
                <Skeleton variant="text" width={80} height={25} style={{ marginBottom: '10px' }} />
              </Box>
            ))
          ) : (
            <>
              {sideItems.map((item, i) => (
                <Box key={i}>
                  <ListItem
                    disablePadding
                    sx={{
                      ...getListItemStyles(item.active),
                      border: 'none',
                      borderBottom: i + 1 !== sideItems.length ? '1px solid #f0f0f0' : 'none',
                      mb: 0,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleParentClick(item.id ?? item.slug, item.name)
                        if (isMobile) setMobileDrawerOpen(false)
                      }}
                      sx={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
                    >
                      <ListItemText
                        primary={getCategoryName(item, i18n.language)}
                        primaryTypographyProps={{
                          className: `poppins ${isMobile ? 'text-base' : 'text-lg'} ${isRTL ? 'text-right' : ''}`,
                          sx: { color: item.active ? '#2858a3' : '#444', fontWeight: item.active ? 600 : 400 },
                        }}
                      />
                    </ListItemButton>

                    {item.childrens && item.childrens.length > 0 && (
                      <IconButton
                        onClick={() => toggleExpand(item.id)}
                        size="small"
                        sx={{
                          [isRTL ? 'ml' : 'mr']: isMobile ? 1 : 0,
                          order: isRTL ? -1 : 'unset',
                          transform: isRTL ? 'scaleX(-1)' : 'none',
                          color: '#aaa',
                        }}
                      >
                        {expandedItems[item.id]
                          ? <KeyboardArrowDown sx={getListItemIconStyle(item.active)} />
                          : <KeyboardArrowRight sx={getListItemIconStyle(item.active)} />}
                      </IconButton>
                    )}

                    {/* Show arrow even without children */}
                    {(!item.childrens || item.childrens.length === 0) && (
                      <KeyboardArrowRight
                        fontSize="small"
                        sx={{ color: '#aaa', mr: isRTL ? 0 : 1, ml: isRTL ? 1 : 0, transform: isRTL ? 'scaleX(-1)' : 'none' }}
                      />
                    )}
                  </ListItem>

                  {/* Level 2 children */}
                  <div className={`overflow-hidden ${fadeSlideClasses(expandedItems[item.id])}`}>
                    {item.childrens && item.childrens.length > 0 &&
                      item.childrens.map((val, index) => (
                        <React.Fragment key={index}>
                          <ListItem disablePadding sx={{ [isRTL ? 'pr' : 'pl']: isMobile ? 3 : 4 }}>
                            <Box
                              display="flex"
                              className="w-full"
                              sx={{
                                ...getSubListItemStyles(val.active),
                                borderRadius: '10px',
                                flexDirection: isRTL ? 'row-reverse' : 'row',
                              }}
                            >
                              <ListItemButton
                                onClick={() => {
                                  const itemSlug = item.slug || createSlug(item.name)
                                  const childSlug = val.slug || createSlug(val.name)
                                  handleChildClick(item.id, val.id, val.name, itemSlug, childSlug)
                                  if (isMobile) setMobileDrawerOpen(false)
                                }}
                                sx={{ borderRadius: '10px', flexDirection: isRTL ? 'row-reverse' : 'row' }}
                              >
                                <ListItemText
                                  primary={getCategoryName(val, i18n.language)}
                                  primaryTypographyProps={{
                                    className: `poppins ${isMobile ? 'text-sm' : 'text-md'} uppercase ${isRTL ? 'text-right' : ''}`,
                                  }}
                                />
                              </ListItemButton>

                              {val.childrens && val.childrens.length > 0 && (
                                <IconButton
                                  onClick={() => toggleExpand(val.id)}
                                  size="small"
                                  sx={{
                                    [isRTL ? 'ml' : 'mr']: isMobile ? 1 : 0,
                                    order: isRTL ? -1 : 'unset',
                                    transform: isRTL ? 'scaleX(-1)' : 'none',
                                  }}
                                >
                                  {expandedItems[val.id]
                                    ? <Remove sx={{ ...getListItemIconStyle(item.active), fontSize: '15px' }} />
                                    : <Add sx={{ ...getListItemIconStyle(item.active), fontSize: '15px' }} />}
                                </IconButton>
                              )}
                            </Box>
                          </ListItem>

                          {/* Level 3 children */}
                          <div className={`overflow-hidden ${fadeSlideClasses(expandedItems[val.id])}`}>
                            {val.childrens && val.childrens.length > 0 &&
                              val.childrens.map((subItem, x) => (
                                <ListItem
                                  key={x}
                                  disablePadding
                                  sx={{ [isRTL ? 'pr' : 'pl']: isMobile ? 6 : 8 }}
                                >
                                  <ListItemButton
                                    onClick={() => {
                                      const itemSlug = item.slug || createSlug(item.name)
                                      const childSlug = val.slug || createSlug(val.name)
                                      const subChildSlug = subItem.slug || createSlug(subItem.name)
                                      handleSubChildClick(
                                        item.id, val.id, subItem.id, subItem.name,
                                        itemSlug, childSlug, subChildSlug
                                      )
                                      if (isMobile) setMobileDrawerOpen(false)
                                    }}
                                    sx={{
                                      ...getSubListItemStyles(subItem.active),
                                      borderRadius: isMobile ? '8px' : '10px',
                                      flexDirection: isRTL ? 'row-reverse' : 'row',
                                    }}
                                  >
                                    <ListItemText
                                      primary={getCategoryName(subItem, i18n.language)}
                                      primaryTypographyProps={{
                                        className: `poppins text-xs pl-5 uppercase ${isRTL ? 'text-right' : ''}`,
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                </Box>
              ))}
            </>
          )}
        </Grid>

        {/* ── Brands Section ── */}
        {brands && brands.length > 0 && (
          <Box sx={{ mx: '18px', mb: 3  , mt:10}}>
            <Typography
              className="poppins"
              sx={{ fontWeight: 700, fontSize: '20px', color: '#222', mb: 1.5 }}
            >
              {t('navigation.brands')}
            </Typography>

            {brands.map((brand, i) => (
              <FormControlLabel
                key={brand.id ?? i}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onChange={() => handleBrandToggle && handleBrandToggle(brand.id)}
                    size="small"
                    sx={{
                      color: '#bbb',
                      '&.Mui-checked': { color: '#2858a3' },
                      p: '16px',
                    }}
                  />
                }
                label={
                  <Typography
                    className="poppins"
                    sx={{ fontSize: '16px', color: '#444' }}
                  >
                    {brand.name}
                  </Typography>
                }
                sx={{
                  display: 'flex',
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  ml: 0,
                  mb: 0.5,
                  width: '100%',
                  justifyContent: isRTL ? 'flex-end' : 'flex-start',
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    )

    return (
      <>
        {/* Desktop Sidebar */}
        <Grid
          item
          xs={12}
          sm={3}
          className={`hidden sm:block ${sidebarAnimationClass}`}
        >
          <SidebarContent />
        </Grid>

        {/* Mobile Category FAB */}
        <Fab
          color="primary"
          aria-label="categories"
          className={`sm:hidden fixed bottom-20 z-50 ${isRTL ? 'left-4' : 'right-4'}`}
          onClick={() => setMobileDrawerOpen(true)}
          sx={{
            backgroundColor: '#2858a3',
            '&:hover': { backgroundColor: '#1e4080' },
            boxShadow: '0 8px 32px rgba(40, 88, 163, 0.3)',
          }}
        >
          <FilterListIcon />
        </Fab>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          anchor={isRTL ? 'right' : 'left'}
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          className="sm:hidden"
          PaperProps={{
            sx: {
              width: '85%',
              maxWidth: '350px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              backdropFilter: 'blur(10px)',
              direction: isRTL ? 'rtl' : 'ltr',
            },
          }}
        >
          <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <SidebarContent isMobile={true} />
          </Box>
        </Drawer>

        {/* Backdrop for mobile drawer */}
        <Backdrop
          open={mobileDrawerOpen}
          onClick={() => setMobileDrawerOpen(false)}
          className="sm:hidden"
          sx={{
            zIndex: 1200,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
          }}
        />
      </>
    )
  }
)

export default ProductSidebar