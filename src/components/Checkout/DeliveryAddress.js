import { Box, Button, Card, CardContent, Typography, Divider, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const DeliveryAddress = ({ addressData, selectedAddress, onSelect, setAddressData, t }) => {
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [countryid, setCountryid] = useState(null);
    const [stateid, setstateid] = useState(null);
    const [formData, setFormData] = useState({
        delivery_address: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        phone: '',
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [editingAddress, setEditingAddress] = useState(null); // State to track which address is being edited
    const [defaultCountry, setDefaultCountry] = useState(null);
    const [defaultState, setDefaultState] = useState(null);
    const [defaultCity, setDefaultCity] = useState(null);
    const [loadingCities, setLoadingCities] = useState(false);

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

    // Helper function to validate phone number length (8-12 digits excluding country code)
    const validatePhoneNumber = (phoneValue) => {
        if (!phoneValue || !phoneValue.trim()) {
            return null; // Phone is optional in address form
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
            return "Please enter a valid phone number";
        }
        
        return null; // No error
    };

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setFormData({
            ...formData,
            phone: value.startsWith('+') ? value : `+${value}`,
        });
        // Clear phone error when user starts typing
        setErrors({
            ...errors,
            phone: "",
        });
    };

    const handlePhoneBlur = () => {
        // Validate phone number when user leaves the field
        const phoneError = validatePhoneNumber(formData.phone);
        if (phoneError) {
            setErrors({
                ...errors,
                phone: phoneError,
            });
        }
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
        // When country changes, reset state and city
        if (name === 'country') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                state: '',
                city: '',
            }));
            setstateid(null);
            setDefaultState(null);
            setDefaultCity(null);
        }
        // When state changes, reset city only
        else if (name === 'state') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                city: '',
            }));
            setDefaultCity(null);
            setLoadingCities(true);
            // Reset loading after a delay to allow cities to load
            setTimeout(() => {
                setLoadingCities(false);
            }, 1500);
        }
        // For city, just update normally
        else if (name === 'city') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
            setLoadingCities(false);
        }
        
        setErrors({
            ...errors,
            [name]: '', // Clear error when user selects location
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.delivery_address) newErrors.delivery_address = 'Delivery address is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';
        
        // Validate phone number if provided (phone is optional but must be valid if entered)
        if (formData.phone) {
            const phoneError = validatePhoneNumber(formData.phone);
            if (phoneError) {
                newErrors.phone = phoneError;
            }
        }

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

            if (editingAddress) {
                // Update existing address
                const response = await axios.put(`${BASE_URL}/api/v1/user/address/update/${editingAddress.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage?.getItem('token')}`
                    }
                });

                if (response.status === 200) {
                    fetchAddresses(); // Refresh addresses
                    setFormData({
                        delivery_address: '',
                        country: '',
                        state: '',
                        city: '',
                        zip_code: '',
                    });
                    setEditingAddress(null);
                    setCountryid(null);
                    setstateid(null);
                    setDefaultCountry(null);
                    setDefaultState(null);
                    setDefaultCity(null);
                    setShowForm(false);
                    setFormLoading(false);
                }
            } else {
                // Create new address
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
                        phone: '',
                    });
                    setCountryid(null);
                    setstateid(null);
                    setDefaultCountry(null);
                    setDefaultState(null);
                    setDefaultCity(null);
                    setShowForm(false); // Hide the form after successful submission
                    setFormLoading(false);
                }
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
                setGeneralError('Failed to connect to the server. Please try again later.');
                setFormLoading(false);

            }
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        // Set country and state IDs for the dropdowns to load options
        if (address.country_id) {
            setCountryid(address.country_id);
        }
        if (address.state_id) {
            setstateid(address.state_id);
        }
        // Set default values for dropdowns (objects with id and name)
        if (address.country_id && address.country) {
            setDefaultCountry({ id: address.country_id, name: address.country });
        }
        if (address.state_id && address.state) {
            setDefaultState({ id: address.state_id, name: address.state });
        }
        if (address.city_id && address.city) {
            setDefaultCity({ id: address.city_id, name: address.city });
        }
        // Set form data - for API submission, we need objects with name property
        setFormData({
            delivery_address: address.address || '',
            country: address.country ? { name: address.country } : '',
            state: address.state ? { name: address.state } : '',
            city: address.city ? { name: address.city } : '',
            zip_code: address.postal_code || '',
            phone: address.phone || '',
        });
        setShowForm(true);
    };

    const handleCancel = () => {
        // Reset the form and hide it
        setFormData({
            delivery_address: '',
            country: '',
            state: '',
            city: '',
            zip_code: '',
            phone: '',
        });
        setErrors({});
        setGeneralError('');
        setEditingAddress(null);
        setCountryid(null);
        setstateid(null);
        setDefaultCountry(null);
        setDefaultState(null);
        setDefaultCity(null);
        setShowForm(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "4px",
                marginBottom: "12px",
                paddingBottom: "15px",
            }}
            role="presentation"
        >
            <Box
                className="p-5 mb-4 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0"
                style={{
                    background: "#fff",
                }}
            >
                <Typography className="poppins font-semibold uppercase text-xl text-black">
                    {t('checkout.delivery_address')}
                </Typography>
                {showForm ? (
                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        className="poppins bg-[#e10909] w-full sm:w-auto"
                        style={{ textTransform: "capitalize" ,borderRadius: '40px' }}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={() => setShowForm(true)}
                        className="poppins bg-[#2858a3] w-full sm:w-auto"
                        style={{ textTransform: "capitalize" , borderRadius: '40px' }}
                    >
                        {t('checkout.add_new_address')}
                    </Button>
                )}
            </Box>

            {loading ? (
                <Card className="px-4">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <Skeleton width="60%" />
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />

                        <Grid container spacing={2}>
                            {[...Array(6)].map((_, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Typography variant="body1" color="textSecondary">
                                        <Skeleton width="40%" />
                                    </Typography>
                                    <Typography variant="body2">
                                        <Skeleton width="100%" />
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
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
                    isEditMode={!!editingAddress}
                    defaultCountry={defaultCountry}
                    defaultState={defaultState}
                    defaultCity={defaultCity}
                    loadingCities={loadingCities}
                    handlePhoneChange={handlePhoneChange}
                    handlePhoneBlur={handlePhoneBlur}
                />
            ) : addressData && addressData.length > 0 ? (
                <>
                    {addressData.map((item, i) => (
                        <AddressCard
                            key={i}
                            index={i}
                            address={item}
                            selectedAddress={selectedAddress}
                            onSelect={onSelect}
                            fetchAddresses={fetchAddresses}
                            onEdit={handleEditAddress}
                        />
                    ))}
                </>
            ) : (
                <Typography variant="body1" className="poppins" color="textSecondary" sx={{ margin: "20px 0" }}>
                    {t('checkout.no_addresses_found')}
                </Typography>
            )}
        </Box>
    );
};

export default DeliveryAddress;
