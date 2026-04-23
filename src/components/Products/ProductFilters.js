import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  Drawer,
  Fab,
  Backdrop
} from '@mui/material'
import {
  Close as CloseIcon,
  Sort as SortIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  SwapVert as SwapVertIcon,
  ViewColumn as ViewColumnIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const ProductFilters = React.memo(({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  sortOption,
  setSortOption,
  isGridView,
  setIsGridView,
  handleSortOptionChange,
  setPriceSortText,
  setAlphaSortText
}) => {
  const { i18n, t } = useTranslation()
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur'

  const MobileFiltersContent = () => (
    <Box className={`h-full bg-white ${isRTL ? 'rtl' : ''}`}>
      {/* Header */}
      <Box className={`flex items-center justify-between p-4 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Typography variant="h6" className={`poppins font-semibold text-gray-800 ${isRTL ? 'text-right' : ''}`}>
          {t('filters_and_sort')}
        </Typography>
        <IconButton
          onClick={() => setMobileFiltersOpen(false)}
          className="text-gray-600"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box className={`p-4 space-y-6 ${isRTL ? 'text-right' : ''}`}>
        {/* Sort by Price Section */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-4">
            <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <SwapVertIcon className="text-blue-600" />
              <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
                {t('sort_by_price')}
              </Typography>
            </Box>
            <Box className="space-y-2">
              {[
                { id: 3, label: t('low_to_high'), icon: '↑' },
                { id: 4, label: t('high_to_low'), icon: '↓' }
              ].map((option) => (
                <Box
                  key={option.id}
                  onClick={() => {
                    handleSortOptionChange(option.id)
                    setMobileFiltersOpen(false)
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${sortOption === option.id
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  <Box className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Typography className={`poppins ${sortOption === option.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                      {option.label}
                    </Typography>
                    <Typography className={`text-lg ${sortOption === option.id ? 'text-blue-600' : 'text-gray-400'}`}>
                      {option.icon}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Sort by Alphabet Section */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-4">
            <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <SortIcon className="text-green-600" />
              <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
                {t('sort_by_alphabet')}
              </Typography>
            </Box>
            <Box className="space-y-2">
              {[
                { id: 1, label: t('a_to_z'), icon: 'A→Z' },
                { id: 2, label: t('z_to_a'), icon: 'Z→A' }
              ].map((option) => (
                <Box
                  key={option.id}
                  onClick={() => {
                    handleSortOptionChange(option.id)
                    setMobileFiltersOpen(false)
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${sortOption === option.id
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  <Box className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Typography className={`poppins ${sortOption === option.id ? 'text-green-700 font-medium' : 'text-gray-700'}`}>
                      {option.label}
                    </Typography>
                    <Typography className={`text-sm font-mono ${sortOption === option.id ? 'text-green-600' : 'text-gray-400'}`}>
                      {option.icon}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* View Toggle Section */}
        <Card className="shadow-sm border border-gray-100">
          <CardContent className="p-4">
            <Box className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <ViewColumnIcon className="text-purple-600" />
              <Typography variant="subtitle1" className="poppins font-medium text-gray-800">
                {t('view_style')}
              </Typography>
            </Box>
            <Box className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Box
                onClick={() => {
                  setIsGridView(true)
                  setMobileFiltersOpen(false)
                }}
                className={`flex-1 p-3 rounded-lg cursor-pointer transition-all duration-200 ${isGridView
                  ? 'bg-purple-50 border-2 border-purple-200'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <Box className="flex flex-col items-center gap-1">
                  <GridViewIcon className={`${isGridView ? 'text-purple-600' : 'text-gray-500'}`} />
                  <Typography className={`poppins text-sm ${isGridView ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
                    {t('grid')}
                  </Typography>
                </Box>
              </Box>
              <Box
                onClick={() => {
                  setIsGridView(false)
                  setMobileFiltersOpen(false)
                }}
                className={`flex-1 p-3 rounded-lg cursor-pointer transition-all duration-200 ${!isGridView
                  ? 'bg-purple-50 border-2 border-purple-200'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <Box className="flex flex-col items-center gap-1">
                  <ListViewIcon className={`${!isGridView ? 'text-purple-600' : 'text-gray-500'}`} />
                  <Typography className={`poppins text-sm ${!isGridView ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
                    {t('list')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Current Selection Chips */}
        {sortOption && (
          <Box>
            <Typography variant="subtitle2" className="poppins text-gray-600 mb-2">
              {t('current_selection')}:
            </Typography>
            <Chip
              label={
                sortOption === 1 ? t('a_to_z') :
                  sortOption === 2 ? t('z_to_a') :
                    sortOption === 3 ? t('price_low_to_high') :
                      sortOption === 4 ? t('price_high_to_low') : ''
              }
              onDelete={() => {
                setSortOption(null)
                setPriceSortText('Sort By Price')
                setAlphaSortText('Sort By Alphabet')
              }}
              className="bg-blue-100 text-blue-800"
              size="small"
            />
          </Box>
        )}
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile Sort & Filters FAB */}
      <Fab
        color="secondary"
        aria-label="sort and filters"
        className={`sm:hidden fixed bottom-36 z-50 ${isRTL ? 'left-4' : 'right-4'}`}
        onClick={() => setMobileFiltersOpen(true)}
        sx={{
          backgroundColor: '#e91e63',
          '&:hover': {
            backgroundColor: '#c2185b',
          },
          boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
        }}
      >
        <SortIcon />
      </Fab>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        className="sm:hidden"
        PaperProps={{
          sx: {
            height: '80vh',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            direction: isRTL ? 'rtl' : 'ltr',
          }
        }}
      >
        <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          <MobileFiltersContent />
        </Box>
      </Drawer>

      {/* Backdrop for mobile filters drawer */}
      <Backdrop
        open={mobileFiltersOpen}
        onClick={() => setMobileFiltersOpen(false)}
        className="sm:hidden"
        sx={{
          zIndex: 1200,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(2px)',
        }}
      />
    </>
  )
})

export default ProductFilters

