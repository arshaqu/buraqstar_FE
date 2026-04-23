import React, { useState } from 'react';
import { TextField, Grid, Card, CardContent, Box, InputAdornment, Stack, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import LockIcon from '@mui/icons-material/Lock';

const getCardBrand = (cardNumber) => {
  const number = cardNumber.replace(/\D/g, ''); // Remove any non-digit characters

  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) {
    return 'Visa';
  } else if (/^5[1-5][0-9]{14}$/.test(number) || /^2(22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7([01][0-9]|20))[0-9]{12}$/.test(number)) {
    return 'MasterCard';
  } else if (/^3[47][0-9]{13}$/.test(number)) {
    return 'American Express';
  } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(number)) {
    return 'Discover';
  } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(number)) {
    return 'Diners Club';
  } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(number)) {
    return 'JCB';
  } else {
    return 'Unknown';
  }
};

const VisaIcon = () => (
  <svg fill="#000000" width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" /></svg>
);

const MasterCardIcon = () => (
  <svg width="26" height="26" viewBox="0 -9 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="0.5" y="0.5" width="57" height="39" rx="3.5" fill="white" stroke="#F3F3F3"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2489 30.8906V32.3674V33.8443H20.6016V33.4857C20.3963 33.7517 20.0848 33.9186 19.6614 33.9186C18.8266 33.9186 18.1722 33.27 18.1722 32.3674C18.1722 31.4656 18.8266 30.8163 19.6614 30.8163C20.0848 30.8163 20.3963 30.9832 20.6016 31.2492V30.8906H21.2489ZM19.7419 31.4218C19.1816 31.4218 18.8387 31.8483 18.8387 32.3674C18.8387 32.8866 19.1816 33.3131 19.7419 33.3131C20.2773 33.3131 20.6387 32.905 20.6387 32.3674C20.6387 31.8299 20.2773 31.4218 19.7419 31.4218ZM43.1228 32.3674C43.1228 31.8483 43.4657 31.4218 44.026 31.4218C44.5621 31.4218 44.9228 31.8299 44.9228 32.3674C44.9228 32.905 44.5621 33.3131 44.026 33.3131C43.4657 33.3131 43.1228 32.8866 43.1228 32.3674ZM45.5338 29.7044V32.3674V33.8443H44.8858V33.4857C44.6804 33.7517 44.3689 33.9186 43.9455 33.9186C43.1107 33.9186 42.4563 33.27 42.4563 32.3674C42.4563 31.4656 43.1107 30.8163 43.9455 30.8163C44.3689 30.8163 44.6804 30.9832 44.8858 31.2492V29.7044H45.5338ZM29.2838 31.3914C29.7008 31.3914 29.9688 31.6509 30.0373 32.1079H28.4925C28.5616 31.6814 28.8225 31.3914 29.2838 31.3914ZM27.8138 32.3674C27.8138 31.4465 28.424 30.8163 29.2966 30.8163C30.1307 30.8163 30.7038 31.4465 30.7102 32.3674C30.7102 32.4537 30.7038 32.5344 30.6974 32.6143H28.4868C28.5802 33.1462 28.9601 33.3379 29.3771 33.3379C29.6758 33.3379 29.9938 33.2261 30.2433 33.0288L30.5605 33.5048C30.1991 33.8075 29.7885 33.9186 29.3401 33.9186C28.449 33.9186 27.8138 33.3068 27.8138 32.3674ZM37.1126 32.3674C37.1126 31.8483 37.4555 31.4218 38.0158 31.4218C38.5511 31.4218 38.9126 31.8299 38.9126 32.3674C38.9126 32.905 38.5511 33.3131 38.0158 33.3131C37.4555 33.3131 37.1126 32.8866 37.1126 32.3674ZM39.5228 30.8906V32.3674V33.8443H38.8755V33.4857C38.6695 33.7517 38.3587 33.9186 37.9352 33.9186C37.1004 33.9186 36.446 33.27 36.446 32.3674C36.446 31.4656 37.1004 30.8163 37.9352 30.8163C38.3587 30.8163 38.6695 30.9832 38.8755 31.2492V30.8906H39.5228ZM33.4569 32.3674C33.4569 33.2636 34.0857 33.9186 35.0452 33.9186C35.4936 33.9186 35.7923 33.8196 36.116 33.5663L35.8051 33.0472C35.5621 33.2205 35.3068 33.3131 35.026 33.3131C34.5091 33.3068 34.1292 32.9361 34.1292 32.3674C34.1292 31.7988 34.5091 31.4281 35.026 31.4218C35.3068 31.4218 35.5621 31.5144 35.8051 31.6877L36.116 31.1685C35.7923 30.9153 35.4936 30.8163 35.0452 30.8163C34.0857 30.8163 33.4569 31.4713 33.4569 32.3674ZM41.0177 31.2492C41.1859 30.9896 41.429 30.8163 41.8026 30.8163C41.9337 30.8163 42.1205 30.8411 42.2638 30.8969L42.0642 31.5024C41.9273 31.4465 41.7904 31.4281 41.6593 31.4281C41.2358 31.4281 41.0241 31.6997 41.0241 32.1885V33.8443H40.3761V30.8906H41.0177V31.2492ZM24.4505 31.1254C24.1389 30.9217 23.7098 30.8163 23.2364 30.8163C22.4822 30.8163 21.9967 31.1749 21.9967 31.762C21.9967 32.2437 22.3582 32.5407 23.024 32.6334L23.3298 32.6765C23.6848 32.7261 23.8524 32.8187 23.8524 32.9856C23.8524 33.2141 23.6157 33.3442 23.1737 33.3442C22.7253 33.3442 22.4017 33.2021 22.1835 33.0351L21.8784 33.5352C22.2334 33.7948 22.6818 33.9186 23.1673 33.9186C24.027 33.9186 24.5253 33.5168 24.5253 32.9545C24.5253 32.4353 24.1332 32.1637 23.4852 32.0711L23.1801 32.0272C22.9 31.9904 22.6754 31.9353 22.6754 31.7372C22.6754 31.5208 22.8871 31.3914 23.2421 31.3914C23.6221 31.3914 23.9899 31.5335 24.1703 31.6446L24.4505 31.1254ZM32.0184 31.2492C32.1859 30.9896 32.429 30.8163 32.8025 30.8163C32.9337 30.8163 33.1205 30.8411 33.2637 30.8969L33.0641 31.5024C32.9273 31.4465 32.7904 31.4281 32.6592 31.4281C32.2358 31.4281 32.0241 31.6997 32.0241 32.1885V33.8443H31.3768V30.8906H32.0184V31.2492ZM27.2784 30.8906H26.2198V29.9944H25.5654V30.8906H24.9616V31.4776H25.5654V32.8251C25.5654 33.5105 25.8334 33.9186 26.5991 33.9186C26.8799 33.9186 27.2036 33.8323 27.4089 33.6901L27.2221 33.1398C27.0289 33.2509 26.8172 33.3068 26.649 33.3068C26.3253 33.3068 26.2198 33.1087 26.2198 32.8123V31.4776H27.2784V30.8906ZM17.5997 31.9904V33.8443H16.9453V32.2005C16.9453 31.6997 16.7336 31.4218 16.2916 31.4218C15.8617 31.4218 15.563 31.6941 15.563 32.2069V33.8443H14.9086V32.2005C14.9086 31.6997 14.6912 31.4218 14.2613 31.4218C13.8186 31.4218 13.5321 31.6941 13.5321 32.2069V33.8443H12.8784V30.8906H13.5264V31.2548C13.7695 30.909 14.0803 30.8163 14.3982 30.8163C14.853 30.8163 15.1767 31.0144 15.382 31.3418C15.6564 30.9274 16.0485 30.8099 16.4285 30.8163C17.1513 30.8227 17.5997 31.2923 17.5997 31.9904Z" fill="#231F20"/>
  <path d="M34.0465 25.8715H24.2359V8.3783H34.0465V25.8715Z" fill="#FF5F00"/>
  <path d="M24.8583 17.1253C24.8583 13.5767 26.5328 10.4157 29.1405 8.37867C27.2336 6.88907 24.8269 5.99998 22.2114 5.99998C16.0194 5.99998 11 10.9809 11 17.1253C11 23.2697 16.0194 28.2506 22.2114 28.2506C24.8269 28.2506 27.2336 27.3615 29.1405 25.8719C26.5328 23.8349 24.8583 20.6739 24.8583 17.1253" fill="#EB001B"/>
  <path d="M47.2818 17.1253C47.2818 23.2697 42.2624 28.2506 36.0704 28.2506C33.4548 28.2506 31.0482 27.3615 29.1405 25.8719C31.7489 23.8349 33.4235 20.6739 33.4235 17.1253C33.4235 13.5767 31.7489 10.4157 29.1405 8.37867C31.0482 6.88907 33.4548 5.99998 36.0704 5.99998C42.2624 5.99998 47.2818 10.9809 47.2818 17.1253" fill="#F79E1B"/>
  </svg>
);

const AmericanExpressIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 6H4C2.9 6 2 6.9 2 8v32c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4 10l-1.5 3h-6l-1.5-3h-1.5v6h-2l2 4h3l1.5-3h6l1.5 3h3l2-4h-2v-6h-1.5zm-2.5 3h3l-1.5 3h-3l1.5-3zm-6 0h3l-1.5 3h-3l1.5-3zM15 25h-3v-3H7v-3h3v-3h5v3h3v3h-3v3zm10 0h-3v-3h-5v-3h3v-3h5v3h-3v3h3v3z" />
  </svg>
);

const DiscoverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 6H4C2.9 6 2 6.9 2 8v32c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 18.5L36.2 27l.8 2.5h-3L33 27l-.2.5h-3L33 31H6V17h40v10.5h-10z" />
  </svg>
);

const DinersClubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 6H4C2.9 6 2 6.9 2 8v32c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 30H6V12h36v24zm-21.3-7h-3.4c-.4 0-.7-.3-.7-.7V21c0-.4.3-.7.7-.7h3.4c.4 0 .7.3.7.7v7.3c0 .4-.3.7-.7.7zM27 22.3c.4 0 .7.3.7.7v3.4c0 .4-.3.7-.7.7h-1.3V25c0-.4-.3-.7-.7-.7h-4.6c-.4 0-.7.3-.7.7v2.4H18V23c0-.4.3-.7.7-.7h7.6z" />
  </svg>
);

const JCBIcon = () => (
  <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 6H4C2.9 6 2 6.9 2 8v32c0 1.1.9 2 2 2h40c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 38V10h36v28H6z" />
  </svg>
);

const CardIcon = ({ brand }) => {
  switch (brand) {
    case 'Visa':
      return <VisaIcon />;
    case 'MasterCard':
      return <MasterCardIcon />;
    case 'American Express':
      return <AmericanExpressIcon />;
    case 'Discover':
      return <DiscoverIcon />;
    case 'Diners Club':
      return <DinersClubIcon />;
    case 'JCB':
      return <JCBIcon />;
    default:
      return <CreditCardIcon />;
  }
};

const CreditCardForm = ({ formData, setFormData }) => {
  const [brand, setBrand] = useState('');

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    const detectedBrand = getCardBrand(formattedValue);
    setBrand(detectedBrand);
    setFormData({ ...formData, cardNumber: formattedValue });
  };

  const handleCvvChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/\D/g, '').substring(0, 3);
    setFormData({ ...formData, cardCvv: formattedValue });
  };

  const handleExpirationDateChange = (event) => {
    const { value } = event.target;
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
    setFormData({ ...formData, cardExpirationDate: formattedValue });
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, cardName: formattedValue });
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5' }}>
      <Card sx={{ maxWidth: 500, p: 2, mb: 3, borderRadius: '5px' }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <CreditCardIcon />
            <Box style={{ display: 'flex' }}>
              <Typography variant="h6" style={{ fontWeight: 900 }}>
                Card Information
              </Typography>
            </Box>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card number"
                fullWidth
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{ maxLength: 19 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardIcon brand={brand} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={formData.cardName}
                placeholder="Name"
                onChange={handleNameChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expiration date"
                fullWidth
                placeholder="MM/YY"
                value={formData.cardExpirationDate}
                onChange={handleExpirationDateChange}
                inputProps={{ maxLength: 5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                fullWidth
                placeholder="123"
                value={formData.cardCvv}
                onChange={handleCvvChange}
                inputProps={{ maxLength: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreditCardForm;
