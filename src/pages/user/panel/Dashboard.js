import { Card, CardContent, Typography, Skeleton, Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { BASE_URL } from '../../../constants';
import axios from 'axios';
import { Flag, LocalShipping, LocationOn, Place, PostAdd } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';


const DashboardComponent = () => {
  const { t } = useTranslation();
  const { totalUniqueItems } = useCart();

  const [dataCount, setDataCount] = useState({ recent_purchase_history: 0, wishlist: 0 });
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('token')}`
        },
      });

      const { recent_purchase_history, wishlist, default_address } = response.data;

      setDataCount({
        recent_purchase_history,
        wishlist
      });
      
      
      setAddress(default_address);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addressFields = [
    { label: t('dashboard.address'), value: address?.address, icon: <LocationOn fontSize="small" /> },
    { label: t('dashboard.city'), value: address?.city, icon: <Place fontSize="small" /> },
    { label: t('dashboard.state'), value: address?.state, icon: <PostAdd fontSize="small" /> },
    { label: t('dashboard.country'), value: address?.country, icon: <Flag fontSize="small" /> },
    { label: t('dashboard.postal_code'), value: address?.postal_code, icon: <LocalShipping fontSize="small" /> },
  ];


  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
    <div className="p-6 grid sm:grid-cols-3 sm:gap-6">
      <Card className="shadow-lg rounded-xl bg-white/40 backdrop-blur-md mt-6 sm:mt-0">
        <CardContent>
          <Typography variant="h2" component="div"  sx={{ fontSize: { xs: '2rem', sm: '3.75rem' },  fontWeight: 300, lineHeight: 1.2}}>
            {loading ? <Skeleton width={100} height={50} /> : totalUniqueItems}
          </Typography>
          <Typography variant="h6">
            {loading ? <Skeleton width={150} height={30} /> : t('dashboard.product_in_cart')}
          </Typography>
        </CardContent>
      </Card>
      <Card className="shadow-lg rounded-xl bg-white/40 backdrop-blur-md mt-6 sm:mt-0">
        <CardContent>
          <Typography variant="h2" component="div"  sx={{ fontSize: { xs: '2rem', sm: '3.75rem' },  fontWeight: 300, lineHeight: 1.2}}>
            {loading ? <Skeleton width={50} height={50} /> : dataCount.wishlist}
          </Typography>
          <Typography variant="h6">
            {loading ? <Skeleton width={150} height={30} /> : t('dashboard.product_in_wishlist')}
          </Typography>
        </CardContent>
      </Card>
      <Card className="shadow-lg rounded-xl bg-white/40 backdrop-blur-md mt-6 sm:mt-0">
        <CardContent>
          <Typography variant="h2" component="div"  sx={{ fontSize: { xs: '2rem', sm: '3.75rem' },  fontWeight: 300, lineHeight: 1.2}}>
            {loading ? <Skeleton width={50} height={50} /> : dataCount.recent_purchase_history}
          </Typography>
          <Typography variant="h6">
            {loading ? <Skeleton width={150} height={30} /> : t('dashboard.recent_purchase_history')}
          </Typography>
        </CardContent>
      </Card>
    </div>
      <Card className="shadow-lg rounded-xl bg-white/40 backdrop-blur-md m-6">
        <CardContent>
          <Typography variant='h2' component="div"   sx={{ fontSize: { xs: '2rem', sm: '3.75rem' },  fontWeight: 300, lineHeight: 1.2}}>
            {loading ? <Skeleton width={50} height={50} /> : address?.id ? <>
                <Box sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    {addressFields.map((field, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box display="flex" alignItems="center">
                          {field.icon}
                          <Typography variant="subtitle2" color="textSecondary" sx={{ ml: 1 }}>
                            {field.label}:
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, ml: 3 }}>
                          {field.value}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
            </> : t('dashboard.no_address')}
          </Typography>
          <Typography variant="h6">
            {loading ? <Skeleton width={150} height={30} /> : t('dashboard.default_shipping_address')}
          </Typography>
        </CardContent>
      </Card>
    </>

  );
};

export default DashboardComponent;
