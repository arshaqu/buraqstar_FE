import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, TextField, CircularProgress, Paper, Box, Grid, Typography } from '@mui/material';
import ajaxService from '../../../services/ajax-service';
import { routes } from '../../../utils';
import SEO from '../../../components/SEO';
import { SITE_URL } from '../../../constants';
import { NotificationBar } from '../../../components';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email.trim()) {
            setError(t('email_required'));
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError(t('email_invalid'));
            return;
        }
        try {
            setLoading(true);
            const res = await ajaxService.post('/auth/password/create', { email });
            if (!res?.success) {
                setMessage(res?.message || t('something_went_wrong'));
                setOpen(true);
                return;
            }
            navigate(routes.reset_password, { state: { email } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Forgot Password | Buraq"
                description="Reset your Buraq account password. Enter your email to receive a reset code."
                keywords="forgot password, reset password, Buraq"
                url="/user/forgot-password"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Forgot Password",
                    "url": `${SITE_URL}/user/forgot-password`,
                }}
            />
            <Grid className='poppins my-7' container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <Box sx={{ my: 10, mx: 4 }}>
                        <Typography component="h1" variant="h5" className='poppins' style={{ color: '#2858a3', fontWeight: 900 }}>
                            {t('forgot_password')}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                id="email"
                                label={t('email_address')}
                                name="email"
                                autoComplete="email"
                                error={!!error}
                                helperText={error}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                className='poppins bg-[#2858a3] w-[50%]'
                                style={{ height: '50px', textTransform: 'capitalize' }}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading && <CircularProgress size={25} className="text-white" />}
                                {!loading && t('send_code')}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <NotificationBar open={open} setOpen={setOpen} type="error" message={message} />
        </>
    );
};

export default ForgotPassword;


