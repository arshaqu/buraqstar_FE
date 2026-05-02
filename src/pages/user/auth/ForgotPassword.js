import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, TextField, CircularProgress, Paper, Box, Grid, Typography } from '@mui/material';
import ajaxService from '../../../services/ajax-service';
import { routes } from '../../../utils';
import SEO from '../../../components/SEO';
import { SITE_URL } from '../../../constants';
import { NotificationBar } from '../../../components';
import buraqlog from "../../../assets/buraqlog.png";


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
               <Typography className="text-gray-700 leading-relaxed mb-6 ml-10 p-5 poppins text-2xl">
              {t('dashboard_sidebar.home')} &nbsp; &gt; &nbsp; <span className="text-[#2858A3] ">{t('reset_password')}</span>
            </Typography>
            
            <Grid className='poppins my-7'  component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ my: 10, mx: 4 }}>
                        <Typography component="h6" variant="h5" className='poppins max-w-2xl' style={{ color: '#686868', fontWeight: 400 ,fontSize:'1rem', textAlign: 'left' }}>
                            Lost your password? Please enter your email address. You will receive a link to create a new password via email.
                        </Typography>
                           <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-[1px] bg-gray-400"></div>
          <img
            src={buraqlog}
            alt="logo"
            className="w-8 h-8 object-contain"
            loading="lazy"
          />
          <div className="w-20 h-[1px] bg-gray-400"></div>
        </div>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                            className='bg-white border border-gray-300 rounded-2xl  w-full poppins'
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
                                className='poppins bg-[#2858a3] w-full hover:bg-[#02AFF3] '
                                style={{ height: '40px', textTransform: 'capitalize' ,borderRadius:'20px' , backgroundColor:'#2858a3' }}
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

            <NotificationBar open={open} setOpen={setOpen} type="error" message={message} />
        </>
    );
};

export default ForgotPassword;


