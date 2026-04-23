import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, TextField, CircularProgress, Paper, Box, Grid, Typography, Stack } from '@mui/material';
import ajaxService from '../../../services/ajax-service';
import { routes } from '../../../utils';
import SEO from '../../../components/SEO';
import { SITE_URL } from '../../../constants';
import { NotificationBar } from '../../../components';

const ResetPassword = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [form, setForm] = useState({ code: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const email = state?.email || '';

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleResend = async () => {
        if (!email) return;
        try {
            setResendLoading(true);
            const res = await ajaxService.post('/auth/password/create', { email });
            if (!res?.success) {
                setMessage(res?.message || t('something_went_wrong'));
                setOpen(true);
            }
        } finally {
            setResendLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErr = {};
        if (!form.code.trim()) newErr.code = t('otp_required');
        if (!form.password.trim()) newErr.password = t('password_required');
        if (Object.keys(newErr).length) {
            setErrors(newErr);
            return;
        }
        try {
            setLoading(true);
            const res = await ajaxService.post('/auth/password/reset', {
                email,
                code: form.code,
                password: form.password,
            });
            if (!res?.success) {
                setMessage(res?.message || t('something_went_wrong'));
                setOpen(true);
                return;
            }
            navigate(routes.login);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Reset Password | Buraq"
                description="Enter the code sent to your email and set a new password."
                keywords="reset password, code, Buraq"
                url="/user/reset-password"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Reset Password",
                    "url": `${SITE_URL}/user/reset-password`,
                }}
            />
            <Grid className='poppins my-7' container component="main" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <Box sx={{ my: 10, mx: 4 }}>
                        <Typography component="h1" variant="h5" className='poppins' style={{ color: '#2858a3', fontWeight: 900 }}>
                            {t('reset_password')}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>{email}</Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                id="code"
                                label={t('enter_code')}
                                name="code"
                                error={!!errors.code}
                                helperText={errors.code}
                                value={form.code}
                                onChange={onChange}
                            />
                            <TextField
                                fullWidth
                                sx={{ mt: 2 }}
                                id="password"
                                label={t('password')}
                                name="password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password}
                                value={form.password}
                                onChange={onChange}
                            />
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    className='poppins bg-[#2858a3]'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    {loading && <CircularProgress size={25} className="text-white" />}
                                    {!loading && t('reset_password')}
                                </Button>
                                <Button
                                    className='poppins'
                                    style={{ height: '50px', textTransform: 'capitalize' }}
                                    type="button"
                                    variant="outlined"
                                    onClick={handleResend}
                                    disabled={resendLoading}
                                >
                                    {resendLoading && <CircularProgress size={20} />}
                                    {!resendLoading && t('resend_code')}
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <NotificationBar open={open} setOpen={setOpen} type="error" message={message} />
        </>
    );
};

export default ResetPassword;


