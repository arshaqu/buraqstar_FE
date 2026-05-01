import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { 
  Facebook, 
  X as XIcon, 
  Pinterest, 
  Email,
  WhatsApp 
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ImageURL } from '../../constants';

const SocialShare = ({ product }) => {
  const { t } = useTranslation();
  
  if (!product) return null;

  const productUrl = window.location.href;
  const productTitle = product.name || '';
  const productDescription = product.description ? product.description.substring(0, 160) + '...' : '';
  const productImage = product.images && product.images.length > 0 ? 
    `${ImageURL}${product.images[0]}` : '';

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&media=${encodeURIComponent(productImage || productUrl)}&description=${encodeURIComponent(productTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodeURIComponent(`${productTitle}\n\n${productDescription}\n\n${productUrl}`)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${productTitle}\n\n${productDescription}\n\n${productUrl}`)}`
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Box className="w-full px-0 sm:px-0 py-6 flex ">
      <Typography className="text-lg text-gray-800 poppins mt-2">
        {t("product.share", "Share")}:
      </Typography>
      
      <Box className="flex items-center space-x-1 ml-2">
        {/* Facebook */}
        <IconButton
          onClick={() => handleShare('facebook')}
          sx={{
            '&:hover': {
              backgroundColor: '#e4e4e4',
              color: 'white'
            }
          }}
        >
          <Facebook sx={{ color: '#222222' }} />
        </IconButton>

        {/* X (Twitter) */}
        <IconButton
          onClick={() => handleShare('twitter')}
          sx={{
            '&:hover': {
              backgroundColor: '#e4e4e4',
              color: 'white'
            }
          }}
        >
          <XIcon sx={{ color: '#222222' }} />
        </IconButton>

        {/* Pinterest */}
        <IconButton
          onClick={() => handleShare('pinterest')}
          sx={{
            '&:hover': {
              backgroundColor: '#e4e4e4',
              color: 'white'
            }
          }}
        >
          <Pinterest sx={{ color: '#222222' }} />
        </IconButton>

        {/* WhatsApp */}
        <IconButton
          onClick={() => handleShare('whatsapp')}
          sx={{
            '&:hover': {
              backgroundColor: '#e4e4e4',
              color: 'white'
            }
          }}
        >
          <WhatsApp sx={{ color: '#222222' }} />
        </IconButton>

        {/* Email */}
        <IconButton
          onClick={() => handleShare('email')}
          sx={{
            '&:hover': {
              backgroundColor: '#e4e4e4',
              color: 'white'
            }
          }}
        >
          <Email sx={{ color: '#222222' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialShare;
