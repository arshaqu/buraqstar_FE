import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getBrandLogo } from "../../utils";
import { useTranslation } from "react-i18next"; // Import i18next

const Description = ({ description, specifications, brand, datasheet }) => {
  const { t } = useTranslation(); // Hook for translations
  // mode: 0 = none (default hidden), 1 = overview, 2 = specifications
  const [mode, setMode] = useState(0);

  // Reset view when product data changes (navigate to a different product)
  useEffect(() => {
    setMode(0);
  }, [description, specifications, brand, datasheet]);

  const handleView = () => {
    if (datasheet) {
      window.open(datasheet, '_blank');
    } else {
      alert(t('product.no_datasheet'));
    }
  };

  return (
    <>
   <Grid item xs={12} className="mt-10">
  <Box className="w-full h-fit">
    {/* Tab Bar */}
    <Box
      className="flex gap-x-0"
      sx={{ borderBottom: '1px solid #e5e7eb' }}
    >
      <Button
        onClick={() => setMode(1)}
        disableRipple
        sx={{
          py: '12px',
          px: '24px',
          fontSize: '14px',
          fontWeight: 600,
          color: mode === 1 ? '#2858a3' : '#6b7280',
          backgroundColor: 'transparent',
          borderBottom: mode === 1 ? '4px solid #2858a3' : '4px solid transparent',
          backgroundColor: mode === 1 ? ' #2858A41A' : '4px solid transparent',
          borderRadius: '10px 10px 0 0',
          textTransform: 'capitalize',
          fontFamily: 'inherit',
          minWidth: 'auto',
          '&:hover': {
            color: '#2858a3',
          },
          mb: '-1px', // overlap the bottom border
        }}
      >
        {t('product.overview')}
      </Button>

      <Button
        onClick={() => setMode(2)}
        disableRipple
        sx={{
          py: '12px',
          px: '24px',
          fontSize: '14px',
          fontWeight: 600,
          color: mode === 2 ? '#2858a3' : '#6b7280',
          backgroundColor: 'transparent',
          borderBottom: mode === 2 ? '4px solid #2858a3' : '4px solid transparent',
          borderRadius: 0,
          backgroundColor: mode === 2 ? ' #2858A41A' : '4px solid transparent',
          textTransform: 'capitalize',
          borderRadius: '10px 10px 0 0',
          fontFamily: 'inherit',
          minWidth: 'auto',
          '&:hover': {
            color: '#2858a3',
          },
          mb: '-1px',
        }}
      >
        {t('product.specifications')}
      </Button>
    </Box>

    {/* Tab Content */}
    <Box className="mt-6">
      {mode === 1 && (
        <Box sx={{ color: '#374151', fontSize: '14px', lineHeight: 1.75 }}>
          {/* your overview content here */}
        </Box>
      )}
      {mode === 2 && (
        <Box sx={{ color: '#374151', fontSize: '14px', lineHeight: 1.75 }}>
          {/* your specifications content here */}
        </Box>
      )}
    </Box>
  </Box>
</Grid>


      {mode === 1 && (
        <Grid item xs={12} sm={7} className="mt-10">
          <Typography 
            className="poppins text-base leading-7 text-[#5D5D5D]"
            style={{ 
              textAlign: 'justify',
              textJustify: 'inter-word',
              wordSpacing: '0.05em',
             
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
          <img className="h-10 w-auto my-6" src={getBrandLogo(brand)} alt={brand} />
          <Box className="flex items-center gap-x-4 mt-10">
            <Typography className="poppins text-base font-semibold text-[#2E2E2E] capitalize py-1.5">
              {t('product.data_sheet_option')}
            </Typography>
            {datasheet ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleView}
                  className="border-[1.5px] font-semibold border-black py-3 px-8 capitalize text-black poppins text-base"
                >
                  {t('product.view')}
                </Button>
              </>
            ) : (
              <Typography className="poppins text-base text-[#FF0000] capitalize py-1.5">
                {t('product.no_datasheet')}
              </Typography>
            )}
          </Box>
        </Grid>
      )}

      {mode === 2 && (
        <Grid item xs={12} sm={5} className="mt-5">
          <Box className="mt-6">
            {specifications.map((feat, i) => (
              <Box className="flex gap-x-6 my-2" key={i}>
                <Typography className="poppins text-xs w-[30%] uppercase">
                  {feat.specification}
                </Typography>
                <Typography className="poppins text-xs text-[#5D5D5D] uppercase">
                  {feat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Description;