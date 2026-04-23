import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ajaxService from '../../../services/ajax-service';
import { CircularProgress } from '@mui/material';
import { NotificationBar } from '../../../components';
import { AuthContext } from '../../../AuthContext';
import { useTranslation } from 'react-i18next'; // Import i18next
import SEO from '../../../components/SEO';
import { SITE_URL } from '../../../constants';
import buraqLogo from '../../../assets/buraqlogin.png';

const defaultTheme = createTheme();

const Login = () => {
    const { t } = useTranslation(); // Hook for translations
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    // for notification
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    // loading
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear previous error message when user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation rules
        const { email, password } = formData;
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = t('email_required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t('email_invalid');
        }
        if (!password.trim()) {
            newErrors.password = t('password_required');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true);
            const response = await ajaxService.getAccessToken(formData);
            setLoading(false);

            if (!response.success) {
                setMessage(response.message);
                setOpen(true);
            } else if (!response.verified && (!response.email_verified || !response.phone_verified)) {
                // If user is not verified, redirect to verification page
                localStorage.setItem('registerEmail', formData.email);
                navigate('/user/verify-account');
            } else {
                // Add verified field to user data
                const userWithVerified = {
                    ...response.user,
                    verified: response.verified
                };
                login(userWithVerified, response.access_token, response.expires_at);
                const returnUrl = localStorage.getItem('returnUrl');
                if (returnUrl) {
                    localStorage.removeItem('returnUrl');
                    navigate(returnUrl, { replace: true });
                } else {
                    navigate('/');
                }
            }
        }
    };

    return (
        <>
            <SEO
                title="Sign In - User Login | Buraq"
                description="Sign in to your Buraq account to access your orders, wishlist, and exclusive deals on electrical and hardware products. Secure login for UAE customers."
                keywords="user login, sign in, Buraq login, account access, electrical products login, hardware products login, UAE login, secure login"
                url="/user/login"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "User Login",
                    "url": `${SITE_URL}/user/login`,
                    "description": "Sign in to your Buraq account for electrical and hardware products",
                    "potentialAction": {
                        "@type": "LoginAction",
                        "name": "User Login",
                        "target": `${SITE_URL}/user/login`
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Buraq"
                    }
                }}
            />
            <ThemeProvider theme={defaultTheme}>
                <Grid className='poppins my-7' container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={4}
                        sx={{
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                        }}
                    >
                        <Box
                            component="img"
                            src={buraqLogo}
                            alt="Buraq Logo"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 15,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h6" style={{ color: '#b5b5bf' }}>
                                {t('login_with')}
                            </Typography>
                            <Typography component="h1" variant="h4" className='poppins' style={{ color: '#2858a3', fontWeight: 900 }}>
                                {t('buraq_star')}
                            </Typography>
                            <Typography component="h1" variant="h6" style={{ color: '#b5b5bf' }}>
                                {t('account')}
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="normal"
                                    id="email"
                                    label={t('email_address')}
                                    name="email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    label={t('password')}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    className='poppins bg-[#2858a3] w-full sm:w-[30%]'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={25} className="text-white" />}
                                    {!loading && t('login')}
                                </Button>
                                <Grid container className="flex-col sm:flex-row">
                                    <Grid item xs={12} sm className="mb-2 sm:mb-0">
                                        <Link className='cursor-pointer' onClick={() => navigate('/user/forgot-password')} variant="body2">
                                            {t('forgot_password')}
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm className="text-left sm:text-right">
                                        <Link className='cursor-pointer' onClick={() => navigate('/user/registration')} variant="body2">
                                            {t('dont_have_account')}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

            {/* notification */}
            <NotificationBar
                open={open}
                setOpen={setOpen}
                type="error"
                message={message}
            />
        </>
    );
}

export default Login;