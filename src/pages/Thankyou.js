import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Box, Container, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import confetti from 'canvas-confetti';

const ThankYouPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderCode = searchParams.get('order_code');

  useEffect(() => {
    // Confetti animation
    const end = Date.now() + 5 * 1000; // 15 seconds
    const colors = ['#1e55ac', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame(); // Start the animation

    return () => {
      // Cleanup function if needed when component unmounts
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
      }}
    >
      <Card
        sx={{
          padding: 4,
          boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <Typography variant="h4" gutterBottom>
            {t('thankyou.title')}
          </Typography>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t('thankyou.order_placed')}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('thankyou.order_code')} <strong>{orderCode}</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('thankyou.message')}
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/user/my-order"
              className="bg-[#1E55AC] w-full sm:w-[40%] mx-5 mt-5 py-2.5 text-white poppins capitalize"
              endIcon={<ArrowForwardIcon />}
            >
              {t('thankyou.go_to_orders')}
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default ThankYouPage;