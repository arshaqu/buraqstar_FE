import { Box, Button, Card, CardContent, Typography, Divider, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { BASE_URL } from "../../../../constants";



const DeliveryAddress = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [addressData, setAddressData] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const [countryid, setCountryid] = useState(null);
    const [stateid, setstateid] = useState(null);
    const [formData, setFormData] = useState({
        delivery_address: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    useEffect(() => {
        fetchAddresses();
    }, [setAddressData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '', // Clear error when user starts typing
        });
    };

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/user/addresses`, {
                headers: {
                    Authorization: `Bearer ${localStorage?.getItem('token')}`
                },
            });
            setAddressData(response.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        } finally {
            setLoading(false);
        }
    };


    const handleChangeLocation = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '', // Clear error when user selects location
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.delivery_address) newErrors.delivery_address = t('delivery_address.delivery_address_required');
        if (!formData.country) newErrors.country = t('delivery_address.country_required');
        if (!formData.state) newErrors.state = t('delivery_address.state_required');
        if (!formData.city) newErrors.city = t('delivery_address.city_required');

        return newErrors;
    };

    const handleAddAddress = async () => {
        const validationErrors = validateForm();
        setFormLoading(true);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setFormLoading(false);
            return;
        }

        try {
            setErrors({});
            setGeneralError('');

            const response = await axios.post(`${BASE_URL}/api/v1/user/address/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage?.getItem('token')}`
                }
            });

            if (response.status === 201) {
                setAddressData(prevData => [...prevData, response.data.address]);
                setFormData({
                    delivery_address: '',
                    country: '',
                    state: '',
                    city: '',
                    zip_code: '',
                });
                setShowForm(false); // Hide the form after successful submission
                setFormLoading(false);

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    // Validation errors
                    setErrors(error.response.data.errors);
                    setFormLoading(false);

                } else if (error.response.status === 404 || error.response.status === 500) {
                    // Not found or server error
                    setGeneralError(error.response.data.error || 'An unexpected error occurred.');
                    setFormLoading(false);

                }
            } else {
                // Network error or other issues
                setGeneralError(t('delivery_address.failed_to_connect'));
                setFormLoading(false);

            }
        }
    };

    const handleCancel = () => {
        // Reset the form and hide it
        setFormData({
            delivery_address: '',
            country: '',
            state: '',
            city: '',
            zip_code: '',
        });
        setErrors({});
        setGeneralError('');
        setShowForm(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "4px",
                marginBottom: "12px",
            }}
            role="presentation"
        >
            <Box
                className="p-5 mb-4 w-full "
                style={{
                    display: "flex", justifyContent: "space-between",
                }}
            >
                <Typography className="poppins font-semibold uppercase text-2xl text-black poppins">
                    {t('delivery_address.title')}
                </Typography>
                {showForm ? (
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        className="poppins bg-[#e10909]"
                        style={{ textTransform: "capitalize" }}
                    >
                        {t('delivery_address.cancel')}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => setShowForm(true)}
                        className="poppins bg-[#2858a3]"
                        style={{ textTransform: "capitalize" }}
                    >
                        {t('delivery_address.add_new_address')}
                    </Button>
                )}
            </Box>

            {loading ? (
                <Box className="px-4 bg-none">
                    <Typography variant="h5" component="div">
                        <Skeleton width="60%" />
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    <Grid container spacing={2}>
                        {[...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Typography  variant="body1" color="textSecondary">
                                    <Skeleton width="40%" />
                                </Typography>
                                <Typography  variant="body2">
                                    <Skeleton width="100%" />
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ) : showForm ? (

                <AddressForm
                    errors={errors}
                    formData={formData}
                    handleChange={handleChange}
                    handleChangeLocation={handleChangeLocation}
                    setCountryid={setCountryid}
                    setstateid={setstateid}
                    countryid={countryid}
                    stateid={stateid}
                    generalError={generalError}
                    handleAddAddress={handleAddAddress}
                    loading={formLoading}
                />
            ) : addressData && addressData.length > 0 ? (
                <>
                    {addressData.map((item, i) => (
                        <AddressCard
                            key={i}
                            index={i}
                            address={item}
                            fetchAddresses={fetchAddresses}
                        />
                    ))}
                </>
            ) : (
                <Typography variant="body1" color="textSecondary poppins" sx={{ margin: "20px 0" }}>
                    {t('delivery_address.no_addresses')}
                </Typography>
            )}
        </Box>
    );
};

export default DeliveryAddress;
