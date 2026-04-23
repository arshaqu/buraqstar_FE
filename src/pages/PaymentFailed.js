import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Box, Container, Button, CircularProgress, Alert } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { AuthContext } from '../AuthContext';

const PaymentFailedPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const orderCode = searchParams.get('order_code');
    const [retryLoading, setRetryLoading] = useState(false);
    const [error, setError] = useState('');
    const { isLoggedIn } = useContext(AuthContext);

    // If user is not logged in, redirect to login with return URL
    useEffect(() => {
        if (!isLoggedIn) {
            const returnUrl = `/payment-failed?order_code=${orderCode}`;
            localStorage.setItem('returnUrl', returnUrl);
            navigate('/user/login', { replace: true });
        }
    }, [isLoggedIn, orderCode, navigate]);

    const handleRetryPayment = async () => {
        if (!orderCode) return;
        setRetryLoading(true);
        setError('');

        const token = localStorage?.getItem('token');

        // If no token available, redirect to login
        if (!token) {
            const returnUrl = `/payment-failed?order_code=${orderCode}`;
            localStorage.setItem('returnUrl', returnUrl);
            navigate('/user/login', { replace: true });
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/user/order/${orderCode}/retry-payment`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success && response.data.payment_link) {
                window.location.href = response.data.payment_link;
            } else {
                setError(response.data.message || 'Unable to retry payment. Please try again.');
            }
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                // Token expired or invalid — redirect to login
                const returnUrl = `/payment-failed?order_code=${orderCode}`;
                localStorage.setItem('returnUrl', returnUrl);
                navigate('/user/login', { replace: true });
                return;
            }
            const msg = err.response?.data?.message || 'Something went wrong. Please try again later.';
            setError(msg);
        } finally {
            setRetryLoading(false);
        }
    };

    // Don't render the page if not logged in (will redirect)
    if (!isLoggedIn) {
        return null;
    }

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
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: '#DC2626', mb: 2 }} />

                    <Typography variant="h4" gutterBottom>
                        {t('payment_failed.title')}
                    </Typography>

                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {t('payment_failed.description')}
                        </Typography>

                        {orderCode && (
                            <Typography variant="h6" gutterBottom>
                                {t('payment_failed.order_code')} <strong>{orderCode}</strong>
                            </Typography>
                        )}

                        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
                            {t('payment_failed.message')}
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                                {error}
                            </Alert>
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mt: 2 }}>
                            {orderCode && (
                                <Button
                                    variant="contained"
                                    onClick={handleRetryPayment}
                                    disabled={retryLoading}
                                    className="bg-[#1E55AC] w-full sm:w-[60%] py-2.5 text-white poppins capitalize"
                                    startIcon={retryLoading ? <CircularProgress size={20} color="inherit" /> : <ReplayIcon />}
                                >
                                    {retryLoading ? t('payment_failed.processing') : t('payment_failed.retry_payment')}
                                </Button>
                            )}

                            <Button
                                variant="outlined"
                                component={Link}
                                to="/user/my-order"
                                className="w-full sm:w-[60%] py-2.5 poppins capitalize"
                                endIcon={<ArrowForwardIcon />}
                            >
                                {t('payment_failed.go_to_orders')}
                            </Button>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
};

export default PaymentFailedPage;
