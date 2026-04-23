import React from 'react'
import {
  Box,
  Button,
  Typography,
  IconButton,
  Chip,
  Divider
} from '@mui/material'
import {
  KeyboardArrowUpOutlined as ArrowUpIcon,
  KeyboardArrowDownOutlined as ArrowDownIcon,
  ViewColumn as ViewColumnIcon,
  FormatListBulleted as ListIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const ProductControls = ({
  sortOn,
  setSortOn,
  sortingOn,
  setSortingOn,
  priceSortText,
  alphaSortText,
  handleSortOptionChange,
  isGridView,
  setIsGridView,
  sortOption,
  products
}) => {
  const { t } = useTranslation()

  return (
    <Box className='sticky top-0 z-[1] bg-[#f5f5f5] py-2'>
      {/* Mobile Status Bar */}
      <Box className='sm:hidden flex justify-between items-center mb-2 px-2'>
        <Box className='flex items-center gap-2'>
          <Typography className='poppins text-sm text-gray-600'>
            {products.length} Products
          </Typography>
          {sortOption && (
            <Chip
              label={
                sortOption === 1 ? 'A-Z' :
                  sortOption === 2 ? 'Z-A' :
                    sortOption === 3 ? '↑ Price' :
                      sortOption === 4 ? '↓ Price' : ''
              }
              size="small"
              className="bg-blue-100 text-blue-800"
            />
          )}
        </Box>
        <Box className='flex items-center gap-1'>
          <IconButton
            size="small"
            onClick={() => setIsGridView(true)}
            className={`${isGridView ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <GridViewIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsGridView(false)}
            className={`${!isGridView ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <ListViewIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Desktop Controls */}
      <Box className='hidden sm:flex justify-between items-center'>
        <Box className='flex gap-2'>
          <Box className='relative min-w-[150px] sm:w-auto' onClick={() => setSortOn(!sortOn)}>
            <Button
              variant='outlined'
              onClick={() => setSortOn(!sortOn)}
              className='w-fit bg-transparent rounded-none border-black border text-black uppercase text-sm poppins h-12'
            >
              {priceSortText}
              {sortOn ? (
                <ArrowUpIcon className='text-base ms-2' />
              ) : (
                <ArrowDownIcon className='text-base ms-2' />
              )}
            </Button>
            {sortOn && (
              <Box className='absolute gap-y-2 p-2.5 z-50 top-full w-full left-0 bg-white border-t-0 border-r border-b border-l'>
                {[3, 4].map((index, i) => (
                  <React.Fragment key={index}>
                    {i > 0 && <Divider className='my-1' />}
                    <Typography
                      className='text-sm text-black poppins cursor-pointer'
                      onClick={() => handleSortOptionChange(index)}
                    >
                      {index === 3 ? 'Low to High' : 'High to Low'}
                    </Typography>
                  </React.Fragment>
                ))}
              </Box>
            )}
          </Box>

          <Box className='relative min-w-[130px] sm:w-auto' onClick={() => setSortingOn(!sortingOn)}>
            <Button
              variant='outlined'
              onClick={() => setSortingOn(!sortingOn)}
              className='w-fit bg-transparent rounded-none border-black border text-black uppercase text-sm poppins h-12'
            >
              {alphaSortText}
              {sortingOn ? (
                <ArrowUpIcon className='text-base ms-2' />
              ) : (
                <ArrowDownIcon className='text-base ms-2' />
              )}
            </Button>
            {sortingOn && (
              <Box className='absolute gap-y-3 p-2.5 z-50 top-full w-full left-0 bg-white border-t-0 border-r border-b border-l'>
                {[1, 2].map((index, i) => (
                  <React.Fragment key={index}>
                    {i > 0 && <Divider className='my-1' />}
                    <Typography
                      className='text-sm text-black poppins cursor-pointer'
                      onClick={() => handleSortOptionChange(index)}
                    >
                      {index === 1 ? 'A to Z' : 'Z to A'}
                    </Typography>
                  </React.Fragment>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box className='w-fit flex flex-col md:flex-row ml-2 gap-x-3'>
          <Typography
            className='md:text-xs text-md text-black cursor-pointer'
            onClick={() => setIsGridView(true)}
          >
            <ViewColumnIcon />
          </Typography>
          <Typography
            className='md:text-xs text-md text-black cursor-pointer'
            onClick={() => setIsGridView(false)}
          >
            <ListIcon />
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductControls

