import React, { useState } from 'react';
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
import routes from '../../../utils';
import { useTranslation } from 'react-i18next'; // Import i18next
import SEO from '../../../components/SEO';
import { SITE_URL } from '../../../constants';
import buraqLogo from '../../../assets/buraqlogin.png';
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const defaultTheme = createTheme();

const Registration = () => {
    const { t } = useTranslation(); // Hook for translations
    const navigate = useNavigate();

    // for notification
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [notificationType, setNotificationType] = useState('error');
    // loading
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        cPassword: '',
    });
    const [phoneValue, setPhoneValue] = useState('');
    const [errors, setErrors] = useState({});

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

    // Helper function to validate phone number length (8-12 digits excluding country code)
    const validatePhoneNumber = (phoneValue) => {
        if (!phoneValue || !phoneValue.trim()) {
            return t('phone_number_required') || 'Phone number is required';
        }
        
        // Extract phone number without country code
        const phoneDigitsOnly = phoneValue.toString().replace(/\D/g, '');
        
        // Detect country code length based on common patterns
        let countryCodeLength = 0;
        if (phoneDigitsOnly.startsWith('971')) {
            countryCodeLength = 3; // UAE
        } else if (phoneDigitsOnly.startsWith('1')) {
            countryCodeLength = 1; // US/Canada
        } else if (phoneDigitsOnly.startsWith('44') || phoneDigitsOnly.startsWith('91') || 
                   phoneDigitsOnly.startsWith('86') || phoneDigitsOnly.startsWith('81') ||
                   phoneDigitsOnly.startsWith('49') || phoneDigitsOnly.startsWith('33')) {
            countryCodeLength = 2; // UK, India, China, Japan, Germany, France
        } else if (phoneDigitsOnly.startsWith('7')) {
            countryCodeLength = 1; // Russia
        } else {
            // Default: try to detect based on length
            if (phoneDigitsOnly.length > 12) {
                countryCodeLength = 3;
            } else if (phoneDigitsOnly.length > 10) {
                countryCodeLength = 2;
            } else {
                countryCodeLength = 1;
            }
        }
        
        const phoneNumberOnly = phoneDigitsOnly.substring(countryCodeLength);
        const phoneLength = phoneNumberOnly.length;
        
            if (phoneLength < 8 || phoneLength > 12) {
                const invalidMsg = t('phone_number_invalid');
                return invalidMsg && invalidMsg !== 'phone_number_invalid' 
                    ? invalidMsg 
                    : 'Please enter a valid phone number';
            }
        
        return null; // No error
    };

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setPhoneValue(value);
        setFormData({
            ...formData,
            phone: value,
        });
        // Clear phone error when user starts typing
        setErrors({
            ...errors,
            phone: '',
        });
    };

    const handlePhoneBlur = () => {
        // Validate phone number when user leaves the field
        const phoneError = validatePhoneNumber(phoneValue);
        if (phoneError) {
            setErrors({
                ...errors,
                phone: phoneError,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password, cPassword } = formData;
        const newErrors = {};

        // Validation rules
        if (!name.trim()) {
            newErrors.name = t('full_name_required');
        }
        // Phone validation: 8-12 digits excluding country code
        const phoneError = validatePhoneNumber(phoneValue);
        if (phoneError) {
            newErrors.phone = phoneError;
        }
        if (!email.trim()) {
            newErrors.email = t('email_required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t('email_invalid');
        }
        if (!password.trim()) {
            newErrors.password = t('password_required');
        }
        if (!cPassword.trim()) {
            newErrors.cPassword = t('confirm_password_required');
        } else if (password !== cPassword) {
            newErrors.cPassword = t('passwords_do_not_match');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setLoading(true)
            const data = {
                name: formData.name,
                email: formData.email,
                phone: phoneValue.startsWith('+') ? phoneValue : `+${phoneValue}`, // Ensure phone has + prefix
                password: formData.password,
                confirmPassword: formData.cPassword,
                invalidPhone: false,
                showInvalidPhone: false
            }

            const response = await ajaxService.post('/auth/signup', data);

            setLoading(false)

            if (!response.success) {
                setMessage(response.message);
                setNotificationType('error');
                setOpen(true);
            } else {
                localStorage.setItem('registerEmail', data.email)
                // Show success message
                setMessage(t('thank_you_for_registering') || 'Thank you for registering! Please verify your email.');
                setNotificationType('success');
                setOpen(true);
                // Navigate to verify page after showing success message
                setTimeout(() => {
                    navigate('/user/verify-account')
                }, 2000);
            }
        }
    };

    return (
        <>
            <SEO
                title="Create Account - User Registration | Buraq"
                description="Create your Buraq account to access premium electrical and hardware products. Register now for exclusive deals, order tracking, and personalized shopping experience in the UAE."
                keywords="user registration, create account, Buraq account, electrical products account, hardware products account, UAE registration, sign up"
                url="/user/registration"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "User Registration",
                    "url": `${SITE_URL}/user/registration`,
                    "description": "Create your Buraq account for electrical and hardware products",
                    "potentialAction": {
                        "@type": "RegisterAction",
                        "name": "User Registration",
                        "target": `${SITE_URL}/user/registration`
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
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h6" style={{ color: '#b5b5bf' }}>
                                {t('welcome_to')}
                            </Typography>
                            <Typography component="h1" variant="h4" className='poppins' style={{ color: '#2858a3', fontWeight: 900 }}>
                                {t('buraq_star')}
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label={t('full_name')}
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    <ReactPhoneInput
                                        country={'ae'}
                                        value={phoneValue}
                                        onChange={handlePhoneChange}
                                        onBlur={handlePhoneBlur}
                                        inputClass="poppins"
                                        buttonClass="poppins"
                                        containerClass={errors.phone ? 'phone-input-error' : ''}
                                        inputStyle={{
                                            width: '100%',
                                            height: '56px',
                                            fontSize: '16px',
                                            fontFamily: 'Poppins, sans-serif',
                                            border: errors.phone ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                                            borderRadius: '4px',
                                        }}
                                        buttonStyle={{
                                            border: errors.phone ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                                            borderRight: 'none',
                                            borderRadius: '4px 0 0 4px',
                                        }}
                                    />
                                    {errors.phone && (
                                        <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5, ml: 1.75, display: 'block' }}>
                                            {errors.phone}
                                        </Typography>
                                    )}
                                </Box>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
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
                                    margin="normal"
                                    required
                                    fullWidth
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label={t('confirm_password')}
                                    type="password"
                                    id="cPassword"
                                    name="cPassword"
                                    autoComplete="current-password"
                                    error={!!errors.cPassword}
                                    helperText={errors.cPassword}
                                    value={formData.cPassword}
                                    onChange={handleChange}
                                />
                                <Button
                                    className='poppins bg-[#2858a3] w-full sm:w-[50%]'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={25} className="text-white" />}
                                    {!loading && t('create_account')}
                                </Button>

                                <Grid container className="flex-col sm:flex-row">
                                    <Grid item xs={12} sm className="mb-2 sm:mb-0">
                                        <Link className='cursor-pointer' onClick={() => navigate('/user/login')} variant="body2">
                                            {t('already_have_account')}
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} sm className="text-left sm:text-right">
                                        <Link className='cursor-pointer' onClick={() => navigate(routes.retailer_registration)} variant="body2">
                                            {t('apply_for_retailer_account')}
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
                type={notificationType}
                message={message}
            />
        </>
    );
}

export default Registration;