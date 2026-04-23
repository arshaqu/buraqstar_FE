// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2858a3', // Your custom primary color
    },
    secondary: {
      main: '#ff4081', // Your custom secondary color (optional)
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Custom font family
  },
});

export default theme;
