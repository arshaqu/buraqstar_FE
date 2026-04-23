import React, { useState } from "react";
import { Box, Button, ButtonBase, Divider, Typography, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../constants";

const Aside = ({ latest }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleSubscription = async () => {
    if (!email.trim()) {
      setShowError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setShowError(true);
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/subscribe`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      // Attempt to parse response, but proceed even if body is empty
      try { await response.json(); } catch (_) {}

      setShowSuccess(true);
      setEmail(""); // Clear email field on success
      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Box className="px-4 w-full h-fit ">
      <Box className="w-full h-fit border-2 relative p-4 pt-10">
        <Box className="absolute -top-4 left-0 w-full flex justify-center">
          <Typography className="text-center w-fit px-4 bg-[#f5f5f5] text-black poppins text-xl ">
            Latest Posts
          </Typography>
        </Box>
        {latest?.map((blog, index) => (
          <ButtonBase onClick={() => navigate('/blog/' + blog.slug)} style={{ textAlign: 'left' }}>
            <Box key={index} className="flex pb-3">
              {/* <img src={blog.banner} className="h-20 w-20 object-cover" alt="blog" /> */}
              <img src={blog.banner} className="h-20" style={{ width: '100px', objectFit: 'cover' }} alt="blog" />
              <Box className="ps-2">
                <Typography className="text-black poppins text-xs capitalize pb-2 font-semibold ">
                  {blog.title}
                </Typography>
                <Typography className="text-black poppins text-xs ">
                  {blog.created_at}
                </Typography>
              </Box>
            </Box>
          </ButtonBase>
        ))}
      </Box>
      <Box className="mt-10 bg-[#F6F6F6] w-full h-fit p-5">
        <Typography className="text-center text-black poppins text-xl ">
          Newsletter
        </Typography>
        <Box className="flex justify-center w-full">
          <Divider className="bg-[#F5AC55] w-10 h-[2px] my-5" />
        </Box>
        <Typography className="text-center w-full px-2 text-black poppins text-sm ">
          Subscribe to our newsletter for exclusive content and all of the
          behind the scenes details.
        </Typography>
        <input
          type="email"
          className="bg-white outline-none p-3 text-black text-xs my-3 w-full"
          placeholder={t("footer.your_email", "Your Email Address")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubscribing}
        />
        <Button 
          className="bg-[#F5AC55] w-full py-3 rounded-none text-xs text-white poppins"
          onClick={handleSubscription}
          disabled={isSubscribing}
        >
          {isSubscribing ? (
            <CircularProgress size={20} className="text-white" />
          ) : (
            t("footer.subscribe", "Subscribe")
          )}
        </Button>
      </Box>

      {/* Success Message - Positioned just below newsletter card */}
      {showSuccess && (
        <Box className="mt-4">
          <Alert
            onClose={() => setShowSuccess(false)}
            severity="success"
            sx={{
              width: '100%',
              backgroundColor: '#2d8659', // Darker green color
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ffffff',
              },
              '& .MuiAlert-message': {
                color: '#ffffff',
                fontWeight: 500,
              },
              '& .MuiAlert-action': {
                color: '#ffffff',
              },
            }}
          >
            {t("footer.subscription_success", "Thank you for subscribing to our newsletter!")}
          </Alert>
        </Box>
      )}

      {/* Error Message - Positioned just below newsletter card */}
      {showError && (
        <Box className="mt-4">
          <Alert
            onClose={() => setShowError(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {t("footer.subscription_error", "Please enter a valid email address.")}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Aside;
