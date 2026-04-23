import React, { useContext, useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import ajaxService from '../../services/ajax-service';
import NotificationBar from '../NotificationBar';



const MiniLoginForm = ({ t }) => {
  // State variable to control visibility
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const { login } = useContext(AuthContext);

  const navigate = useNavigate()

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
      newErrors.email = t('checkout.email_required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('checkout.email_invalid');
    }
    if (!password.trim()) {
      newErrors.password = t('checkout.password_required');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true)
      const response = await ajaxService.getAccessToken(formData);
      setLoading(false)

      if (!response.success || (!response.verified && (!response.email_verified || !response.phone_verified))) {
        setMessage(response.message);
        setOpen(true);
      } else {
        login(response.user, response.access_token, response.expires_at);
        setMessage("Welcome back! You are now logged in");
        setOpen(true);
        // navigate(location.pathname);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: "#fff",
        borderRadius: '4px',
        marginBottom: '10px',
        padding: '10px 0px 0px 20px', // Adjust padding as needed
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Example box shadow
      }}
      role="presentation"
    >
      {/* Notification */}
      <NotificationBar
        open={open}
        setOpen={setOpen}
        type="error"
        message={message}
      />

      {/* Already a member? text and toggle button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px', // Adjust spacing between sections
        }}
      >
        <p style={{ fontWeight: 900, fontSize: '16px' }}>{t('checkout.login_to_account')}</p>
        <Button
          onClick={toggleVisibility}
          variant="text"
          startIcon={isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        />
      </Box>

      {/* Login form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '0px 30px 20px 10px', // Adjust padding as needed
        }}
      >
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label={t('checkout.email')}
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
          label={t('checkout.password')}
          type="password"
          id="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password}
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          className='poppins bg-[#2858a3] '
          style={{ height: '50px', textTransform: 'capitalize' }}
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
          disabled={loading}
        >
          {loading && <CircularProgress size={25} className="text-white" />}
          {!loading && t('checkout.login_to_account')}
        </Button>
      </Box>
    </Box>
  );
};

export default MiniLoginForm;
