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
    <Box className="w-full px-0 sm:px-0 py-6">
      <Typography className="text-lg font-semibold text-gray-800 poppins mb-4">
        {t("product.share", "Share")}:
      </Typography>
      
      <Box className="flex items-center space-x-3">
        {/* Facebook */}
        <IconButton
          onClick={() => handleShare('facebook')}
          className="w-12 h-12 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          sx={{
            '&:hover': {
              backgroundColor: '#1877f2',
              color: 'white'
            }
          }}
        >
          <Facebook sx={{ color: '#1877f2' }} />
        </IconButton>

        {/* X (Twitter) */}
        <IconButton
          onClick={() => handleShare('twitter')}
          className="w-12 h-12 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          sx={{
            '&:hover': {
              backgroundColor: '#000000',
              color: 'white'
            }
          }}
        >
          <XIcon sx={{ color: '#000000' }} />
        </IconButton>

        {/* Pinterest */}
        <IconButton
          onClick={() => handleShare('pinterest')}
          className="w-12 h-12 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          sx={{
            '&:hover': {
              backgroundColor: '#e60023',
              color: 'white'
            }
          }}
        >
          <Pinterest sx={{ color: '#e60023' }} />
        </IconButton>

        {/* WhatsApp */}
        <IconButton
          onClick={() => handleShare('whatsapp')}
          className="w-12 h-12 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          sx={{
            '&:hover': {
              backgroundColor: '#25d366',
              color: 'white'
            }
          }}
        >
          <WhatsApp sx={{ color: '#25d366' }} />
        </IconButton>

        {/* Email */}
        <IconButton
          onClick={() => handleShare('email')}
          className="w-12 h-12 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          sx={{
            '&:hover': {
              backgroundColor: '#ea4335',
              color: 'white'
            }
          }}
        >
          <Email sx={{ color: '#ea4335' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialShare;
