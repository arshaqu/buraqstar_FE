import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Avatar, IconButton, Typography, Box, Divider, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import { NotificationBar } from '../../../components';
import DeliveryAddress from './partials/DeliveryAddress';

const MyProfile = () => {
    const { t } = useTranslation();
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [profilePictureFile, setProfilePictureFile] = useState('');
    const [profilePicture, setProfilePicture] = useState(user.avatar);
    const [password, setPassword] = useState(''); // New password state
    const [showPasswordField, setShowPasswordField] = useState(false); // Toggle for showing password field
    const [phoneError, setPhoneError] = useState(''); // Phone validation error
    const [notificationBar, setNotificationBar] = useState({
        open: false,
        type: '',
        message: ''
    });

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    // Validate phone number
    const validatePhoneNumber = (phoneValue) => {
        if (!phoneValue || !phoneValue.trim()) {
            return t('my_profile.phone_required');
        }

        // Remove all non-digit characters except + for validation
        const phoneDigitsOnly = phoneValue.toString().replace(/\D/g, '');

        // Check if phone starts with + (international format)
        const hasPlus = phoneValue.toString().startsWith('+');

        // Extract country code length
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

        // Validate phone number length (8-12 digits excluding country code)
        if (phoneLength < 8 || phoneLength > 12) {
            return t('my_profile.phone_invalid');
        }

        return null; // No error
    };

    // Format phone number input (allow digits, +, spaces, dashes, parentheses)
    const formatPhoneInput = (value) => {
        // Allow digits, +, spaces, dashes, parentheses
        return value.replace(/[^\d+\s\-()]/g, '');
    };

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
        const formattedValue = formatPhoneInput(inputValue);
        setPhone(formattedValue);
        // Clear error when user starts typing
        if (phoneError) {
            setPhoneError('');
        }
    };

    const handlePhoneBlur = () => {
        // Validate phone number when user leaves the field
        const error = validatePhoneNumber(phone);
        setPhoneError(error || '');
    };

    const handleProfilePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
            setProfilePictureFile(e.target.files[0]);
        }

    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        // Validate phone before submission
        const phoneValidationError = validatePhoneNumber(phone);
        if (phoneValidationError) {
            setPhoneError(phoneValidationError);
            setNotificationBar({
                open: true,
                type: 'error',
                message: phoneValidationError
            });
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            // Format phone: ensure it starts with + if it doesn't already
            const formattedPhone = phone.trim().startsWith('+') ? phone.trim() : `+${phone.trim()}`;
            formData.append('phone', formattedPhone);

            // Add the avatar file to the formData if it's present
            if (profilePictureFile && profilePictureFile instanceof File) {
                formData.append('avatar', profilePictureFile);
            }

            // Add the password to formData only if it's provided
            if (showPasswordField && password) {
                formData.append('password', btoa(password));
            }

            const response = await axios.post(`${BASE_URL}/api/v1/user/info/update`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage?.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                const userData = JSON.stringify(response.data.user);
                localStorage.setItem('user', userData);
                setUser(JSON.parse(userData));

                setNotificationBar({
                    open: true,
                    type: 'success',
                    message: t('my_profile.profile_updated')
                });
            } else {

                setLoading(false);

                setNotificationBar({
                    open: true,
                    type: 'error',
                    message: t('my_profile.unexpected_error')
                });
            }
        } catch (err) {
            console.error(err);
            setNotificationBar({
                open: true,
                type: 'error',
                message: t('my_profile.profile_update_failed')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box className="w-full flex flex-col md:flex-row items-center p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 mb-5">
                <Box className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0 relative">
                    <Avatar
                        alt="Profile Picture"
                        src={profilePicture}
                        sx={{ width: 250, height: 250 }}
                        className="shadow-xl border-2 border-gray-300"
                    />
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                        className="mt-4 bg-white shadow-md absolute bottom-5 right-20"
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleProfilePictureChange}
                        />
                        <PhotoCamera />
                    </IconButton>
                </Box>
                <Box className="flex flex-col w-full md:w-2/3 space-y-6">
                    <Typography variant="h4" className="font-semibold text-gray-600 mb-3">
                        {t('my_profile.edit_profile')}
                        <Divider
                            sx={{
                                backgroundColor: '#bdbdbd',
                                height: '1px'
                            }}
                            className='rounded-xl mt-1'
                        />
                    </Typography>

                    <TextField
                        label={t('my_profile.email')}
                        variant="outlined"
                        fullWidth
                        value={user.email}
                        InputLabelProps={{
                            className: "text-gray-500",
                        }}
                        InputProps={{
                            className: "rounded-lg bg-white/20 backdrop-blur-lg",
                        }}
                        disabled
                    />

                    <TextField
                        label={t('my_profile.name')}
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={handleNameChange}
                        InputLabelProps={{
                            className: "text-gray-500",
                        }}
                        InputProps={{
                            className: "rounded-lg bg-white/20 backdrop-blur-lg",
                        }}
                    />
                    <TextField
                        label={t('my_profile.phone')}
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={handlePhoneBlur}
                        error={!!phoneError}
                        helperText={phoneError}
                        placeholder="+971 50 123 4567"
                        InputLabelProps={{
                            className: "text-gray-500",
                        }}
                        InputProps={{
                            className: "rounded-lg bg-white/20 backdrop-blur-lg",
                        }}
                        FormHelperTextProps={{
                            sx: {
                                color: '#d32f2f',
                                marginLeft: '14px',
                                fontSize: '0.75rem'
                            }
                        }}
                    />

                    {/* Optional Password Field */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPasswordField}
                                onChange={(e) => setShowPasswordField(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={t('my_profile.change_password')}
                    />

                    {showPasswordField && (
                        <TextField
                            label={t('my_profile.new_password')}
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            InputLabelProps={{
                                className: "text-gray-500",
                            }}
                            InputProps={{
                                className: "rounded-lg bg-white/20 backdrop-blur-lg",
                            }}
                        />
                    )}


                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className="w-full py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                        sx={{
                            textTransform: 'capitalize',
                            padding: '6px 16px',
                            fontWeight: 500,
                            borderRadius: 2,
                            minWidth: '120px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#2858a3', // Custom color
                            '&:hover': {
                                backgroundColor: '#1e4691', // Slightly darker shade for hover effect
                            },
                            color: '#ffffff', // Ensure text is white for readability
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : t('my_profile.save_changes')}
                    </Button>
                </Box>
            </Box>

            <Box className="w-full md:flex-row items-center p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/10 mb-5">
                <DeliveryAddress />
            </Box>

            <NotificationBar
                open={notificationBar.open}
                setOpen={(open) => setNotificationBar({ ...notificationBar, open })}
                type={notificationBar.type}
                message={notificationBar.message}
            />
        </>
    );
};

export default MyProfile;
