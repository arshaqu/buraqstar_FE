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
  Divider
} from '@mui/material'
import {
  Remove,
  Add,
  FilterList as FilterListIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { createSlug, getCategoryName } from '../../utils'

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
    setMobileDrawerOpen
  }) => {
    const { i18n, t } = useTranslation()
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur'

    const getListItemStyles = (isActive) => ({
      [isRTL ? 'borderRight' : 'borderLeft']: isActive ? "5px solid #2858a3" : "inherit",
      borderRadius: isActive ? "0px" : "10px",
      marginTop: isActive ? "5px" : "0px",
      paddingY: isActive ? "0px" : "0px",
      "&:hover": {
        backgroundColor: isActive
          ? "rgb(85 137 218 / 40%)"
          : "rgba(0, 0, 0, 0.04)",
        borderRadius: isActive ? "10px" : "10px",
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
        backgroundColor: isActive
          ? "rgb(85 137 218 / 40%)"
          : "rgba(0, 0, 0, 0.04)",
        borderRadius: isActive ? "10px" : "10px",
      },
    })

    const fadeSlideClasses = (isExpanded) =>
      isExpanded
        ? "opacity-100 translate-y-0 max-h-[1000px] transition-all duration-500 ease-in-out"
        : "opacity-0 -translate-y-4 max-h-0 transition-all duration-500 ease-in-out pointer-events-none"

    const sidebarAnimationClass = sidebarLoading
      ? "translate-x-[-20px]"
      : " translate-x-0 transition-all duration-1000 ease-out"

    const SidebarContent = ({ isMobile = false }) => (
      <Box className={`${isMobile ? "h-full" : "sticky top-5"} ${isRTL ? "rtl" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <Box className={`flex items-center justify-between ${isMobile ? "p-4 border-b" : "pb-10"}`}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            className={`poppins flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}
          >
            {Title}
          </Typography>
          {isMobile && (
            <IconButton
              onClick={() => setMobileDrawerOpen(false)}
              className="text-gray-600"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Grid item xs={12} className={`${isRTL ? 'pr-2.5' : 'px-2.5'} ${isMobile ? 'pb-4 max-h-[calc(100vh-120px)] overflow-y-auto' : 'mb-5 max-h-[calc(100vh-200px)] overflow-y-auto'}`} sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#2858a3',
            borderRadius: '10px',
            '&:hover': {
              background: '#1e4080',
            },
          },
        }}>
          {sidebarLoading ? (
            Array.from(new Array(5)).map((_, index) => (
              <Box key={index} p={2} width={isMobile ? "100%" : 300}>
                <Skeleton variant="text" width={120} height={30} style={{ marginBottom: "10px" }} />
                <Skeleton variant="rectangular" width="100%" height={1} style={{ marginBottom: "20px" }} />
                <Skeleton variant="text" width={80} height={25} style={{ marginBottom: "10px" }} />
                <Box className={isRTL ? 'mr-2' : 'ml-2'}>
                  <Skeleton variant="text" width={60} height={20} style={{ marginBottom: "10px" }} />
                  <Box className={isRTL ? 'mr-2' : 'ml-2'}>
                    {Array.from(new Array(6)).map((_, index) => (
                      <Skeleton key={index} variant="text" width={180} height={20} style={{ marginBottom: "10px" }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <>
              {sideItems.map((item, i) => (
                <Box key={i} className="mb-1">
                  <ListItem
                    disablePadding
                    sx={{
                      ...getListItemStyles(item.active),
                      borderRadius: isMobile ? '12px' : '10px',
                      mb: isMobile ? 1 : 0,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleParentClick(item.id ?? item.slug, item.name)
                        if (isMobile) setMobileDrawerOpen(false)
                      }}
                      sx={{
                        borderRadius: isMobile ? '12px' : '10px',
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                      }}
                    >
                      <ListItemText
                        primary={getCategoryName(item, i18n.language)}
                        primaryTypographyProps={{
                          className: `poppins ${isMobile ? 'text-base' : 'text-lg'} ${isRTL ? 'text-right' : ''}`,
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
                          transform: isRTL ? 'scaleX(-1)' : 'none'
                        }}
                      >
                        {expandedItems[item.id] ? (
                          <Remove sx={getListItemIconStyle(item.active)} />
                        ) : (
                          <Add sx={getListItemIconStyle(item.active)} />
                        )}
                      </IconButton>
                    )}
                  </ListItem>
                  <div
                    className={`overflow-hidden ${fadeSlideClasses(
                      expandedItems[item.id]
                    )}`}
                  >
                    {item.childrens &&
                      item.childrens.length > 0 &&
                      item.childrens.map((val, index) => (
                        <React.Fragment key={index}>
                          <ListItem disablePadding sx={{ [isRTL ? 'pr' : 'pl']: isMobile ? 3 : 4 }}>
                            <Box
                              display={"flex"}
                              className="w-full"
                              sx={{
                                ...getSubListItemStyles(val.active),
                                borderRadius: isMobile ? '10px' : '10px',
                                flexDirection: isRTL ? 'row-reverse' : 'row'
                              }}
                            >
                              <ListItemButton
                                onClick={() => {
                                  const itemSlug = item.slug || createSlug(item.name)
                                  const childSlug = val.slug || createSlug(val.name)
                                  handleChildClick(item.id, val.id, val.name, itemSlug, childSlug)
                                  if (isMobile) setMobileDrawerOpen(false)
                                }}
                                sx={{
                                  borderRadius: isMobile ? '10px' : '10px',
                                  flexDirection: isRTL ? 'row-reverse' : 'row'
                                }}
                              >
                                <ListItemText
                                  primary={getCategoryName(val, i18n.language)}
                                  primaryTypographyProps={{
                                    className: `poppins ${isMobile ? 'text-sm' : 'text-xs'} uppercase ${isRTL ? 'text-right' : ''}`,
                                  }}
                                />
                              </ListItemButton>

                              {val.childrens &&
                                val.childrens.length > 0 && (
                                  <IconButton
                                    onClick={() => toggleExpand(val.id)}
                                    size="small"
                                    sx={{
                                      [isRTL ? 'ml' : 'mr']: isMobile ? 1 : 0,
                                      order: isRTL ? -1 : 'unset',
                                      transform: isRTL ? 'scaleX(-1)' : 'none'
                                    }}
                                  >
                                    {expandedItems[val.id] ? (
                                      <Remove
                                        sx={{
                                          ...getListItemIconStyle(
                                            item.active
                                          ),
                                          fontSize: "15px",
                                        }}
                                      />
                                    ) : (
                                      <Add
                                        sx={{
                                          ...getListItemIconStyle(
                                            item.active
                                          ),
                                          fontSize: "15px",
                                        }}
                                      />
                                    )}
                                  </IconButton>
                                )}
                            </Box>
                          </ListItem>
                          <div
                            className={`overflow-hidden ${fadeSlideClasses(
                              expandedItems[val.id]
                            )}`}
                          >
                            {val.childrens &&
                              val.childrens.length > 0 &&
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
                                        item.id,
                                        val.id,
                                        subItem.id,
                                        subItem.name,
                                        itemSlug,
                                        childSlug,
                                        subChildSlug
                                      )
                                      if (isMobile) setMobileDrawerOpen(false)
                                    }}
                                    sx={{
                                      ...getSubListItemStyles(
                                        subItem.active
                                      ),
                                      borderRadius: isMobile ? '8px' : '10px',
                                      flexDirection: isRTL ? 'row-reverse' : 'row'
                                    }}
                                  >
                                    <ListItemText
                                      primary={getCategoryName(subItem, i18n.language)}
                                      primaryTypographyProps={{
                                        className: `poppins ${isMobile ? 'text-xs' : 'text-xs'} pl-5 uppercase ${isRTL ? 'text-right' : ''}`,
                                      }}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                  {i + 1 !== sideItems.length && (
                    <Divider
                      sx={{
                        backgroundColor: "#d9d9d9",
                        my: 2,
                        [isRTL ? 'mr' : 'ml']: isMobile ? 2 : 3,
                        width: isMobile ? "90%" : "80%",
                      }}
                    />
                  )}
                </Box>
              ))}
            </>
          )}
        </Grid>
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
            '&:hover': {
              backgroundColor: '#1e4080',
            },
            boxShadow: '0 8px 32px rgba(40, 88, 163, 0.3)',
          }}
        >
          <FilterListIcon />
        </Fab>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          anchor={isRTL ? "right" : "left"}
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
            }
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

