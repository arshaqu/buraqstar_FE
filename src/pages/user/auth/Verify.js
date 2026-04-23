import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import ajaxService from '../../../services/ajax-service';
import { NotificationBar } from '../../../components';
import { AuthContext } from '../../../AuthContext';
import { useTranslation } from 'react-i18next';

const defaultTheme = createTheme();

const Verify = () => {
    const { t } = useTranslation();
    const { setUser, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const registerEmail = localStorage.getItem('registerEmail');

    const [formData, setFormData] = useState({ email: registerEmail ?? '', code: '' });
    const [errors, setErrors] = useState({});
    // Loading
    const [resendLoading, setResendLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    // for notification
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('error')

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, code } = formData;
        // validation
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email Address is invalid';
        }
        if (!code.trim()) {
            newErrors.code = 'Code is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setVerifyLoading(true);
            const data = {
                code: formData.code,
                email: formData.email,
                invalidPhone: true,
                phone: "",
                showInvalidPhone: false
            }
            const response = await ajaxService.post('/auth/verify', data);
            setVerifyLoading(false)
            if (!response.success) {
                setType('error')
                setMessage(response.message);
                setOpen(true);
            } else {
                localStorage.removeItem('registerEmail')
                
                // Add verified field to user data
                const userWithVerified = {
                    ...response.user,
                    verified: response.verified
                };
                
                // Use login function to properly set isLoggedIn state
                login(userWithVerified, response.access_token, response.expires_at);
                
                // Show success message
                setType('success')
                setMessage(t('account_verified_successfully') || 'Account verified successfully! Redirecting...');
                setOpen(true);
                
                // Navigate after showing success message
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        }
    }

    const handleResendCode = async () => {
        setResendLoading(true);

        const data = {
            email: formData.email,
            invalidPhone: true,
            phone: "",
            showInvalidPhone: false
        }

        const response = await ajaxService.post('/auth/resend-code', data);
        setResendLoading(false)

        if (!response.success) {
            setMessage(response.message);
            setOpen(true);
            setType('error')
        } else {
            setType('success')
            setMessage(response.message);
            setOpen(true);
        }
    }

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Grid className='poppins my-7' container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 5,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography className='poppins' style={{ color: '#2196F3', marginBottom: 10, fontSize: '14px' }}>
                                A verification code has been sent to your email.
                            </Typography>
                            <Typography component="h1" variant="h4" className='poppins' style={{ color: '#2858a3', fontWeight: 900 }}>
                                Verify
                            </Typography>
                            <Typography component="h1" variant="h4" className='poppins' style={{ color: '#424242', fontWeight: 900 }}>
                                ACCOUNT
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="normal"
                                    name="code"
                                    label="Code"
                                    type="number"
                                    id="code"
                                    autoComplete="code"
                                    error={!!errors.code}
                                    helperText={errors.code}
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                                <Button
                                    className='poppins bg-[#2858a3] w-[30%]'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    // fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={verifyLoading}
                                >
                                    {verifyLoading && <CircularProgress size={25} className="text-white" />}
                                    {!verifyLoading && "Verify"}
                                </Button>
                                <Button
                                    className='poppins w-[30%]'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    // fullWidth
                                    type="submit"
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, ml: 2 }}
                                    onClick={handleResendCode}
                                    disabled={resendLoading}
                                >
                                    {resendLoading && <CircularProgress size={25} color="inherit" />}
                                    {!resendLoading && "Resend Code"}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>

            {/* notification */}
            <NotificationBar
                open={open}
                setOpen={setOpen}
                type={type}
                message={message}
            />
        </>
    );
}

export default Verify