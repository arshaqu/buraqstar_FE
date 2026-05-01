  import { Box, Fade, Grid } from "@mui/material";
  import React, { useState, useEffect, useContext } from "react";
  import "../components/Checkout/Checkout.css";
  import CartReview from "../components/Checkout/CartReview";
  import OrderSummary from "../components/Checkout/OrderSummary";
  import CheckoutForm from "../components/Checkout/CheckoutForm";
  // import DrawerContent from '../components/Cart/DrawerContent';
  import PaymentMethods from "../components/Checkout/PaymentMethods";
  import DeliveryOptions from "../components/Checkout/DeliveryOptions";
  import { AuthContext } from "../AuthContext";
  import axios from "axios";
  import { BASE_URL } from "../constants";
  import MiniLoginForm from "../components/Checkout/MiniLoginForm";
  import DeliveryAddress from "../components/Checkout/DeliveryAddress";
  import CreditCardForm from '../components/Checkout/CreditCardForm';
  import SpecialInstructions from "../components/Checkout/SpecialInstructions";
  import { useTranslation } from "react-i18next";

  const Checkout = () => {
    const { t, i18n } = useTranslation(); // Hook for translations
    const { isLoggedIn, currency, exchangeRate } = useContext(AuthContext);

    // Check if current language is RTL
    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
    const [addressData, setAddressData] = useState([]);

    const [formData, setFormData] = useState({
      fullName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      delivery_address: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      special_instruction: "",
      cardName: "",
      cardExpirationDate: "",
      cardCvv: "",
      cardNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelectAddress = async (addressId) => {
      setSelectedAddress(addressId);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/checkout/get-shipping-cost/${addressId}`, 
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage?.getItem('token')}`
            },
          }
        );
        
        // Process delivery options from API response (store only type + cost; labels translated at render so language switch works)
        const options = [];
        if (response.data.standard_delivery_cost !== undefined) {
          options.push({ type: 'standard', cost: response.data.standard_delivery_cost });
        }
        if (response.data.express_delivery_cost !== undefined) {
          options.push({ type: 'express', cost: response.data.express_delivery_cost });
        }
        
        setDeliveryOptions(options);
        if (options.length > 0) {
          setDeliveryType(options[0].type);
          setShippingCost(options[0].cost);
        } else {
          setShippingCost(response.data.standard_delivery_cost || 0);
        }
      } catch (error) {
        console.error("Error fetching shipping cost:", error);
      }
    };
    // for notification
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    // loading
    const [loading, setLoading] = useState(false);
    const [paymentType, setPaymentType] = useState('cash_on_delivery');
    const [deliveryType, setDeliveryType] = useState('standard');
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);

    // Update shipping cost when delivery type changes
    useEffect(() => {
      if (deliveryOptions.length > 0) {
        const selectedOption = deliveryOptions.find(opt => opt.type === deliveryType);
        if (selectedOption) {
          setShippingCost(selectedOption.cost);
        }
      }
    }, [deliveryType, deliveryOptions]);


    return (
      <>
        <Grid
          className="w-full h-fit py-6 px-4 sm:py-10 sm:px-16 flex flex-col lg:flex-row gap-4 lg:gap-[16px]"
          dir={isRTL ? 'rtl' : 'ltr'}
          style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        >
          {/* Mobile Cart Review - Show at top on mobile */}
          <Box className="w-full lg:hidden order-1">
            <CartReview t={t} isMobile={true} />
          </Box>

          {/* Desktop Left Sidebar - Hidden on mobile */}
          <Box className="w-[30%] hidden lg:block order-1 lg:order-1">
            {!isLoggedIn ? <MiniLoginForm t={t} /> : null}
            <CartReview t={t} isMobile={false} />
          </Box>

          {/* Main Content - Delivery/Checkout Form */}
          <Box className="w-full lg:w-[40%] order-2 lg:order-2">
            {isLoggedIn
              ? <DeliveryAddress
                selectedAddress={selectedAddress}
                onSelect={handleSelectAddress}
                addressData={addressData}
                setAddressData={setAddressData}
                t={t} />
              : <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                setShippingCost={setShippingCost}
                setDeliveryOptions={setDeliveryOptions}
                setDeliveryType={setDeliveryType}
                t={t}
              />}
          </Box>

          {/* Right Sidebar - Payment & Order Summary */}
          <Box className="w-full lg:w-[30%] order-3 lg:order-3">
            {/* Mobile Login Form - Show at top of this section on mobile */}
            {!isLoggedIn && (
              <Box className="lg:hidden mb-4">
                <MiniLoginForm t={t} />
              </Box>
            )}
            
            <PaymentMethods paymentType={paymentType} setPaymentType={setPaymentType} t={t} />
            
            {deliveryOptions.length > 0 && (
              <DeliveryOptions 
                deliveryType={deliveryType} 
                setDeliveryType={setDeliveryType}
                deliveryOptions={deliveryOptions}
                currency={currency}
                exchangeRate={exchangeRate}
                t={t}
              />
            )}
            
            <SpecialInstructions
              formData={formData}
              setFormData={setFormData}
              t={t}
            />
            
            {/* {
              paymentType == 'network_payment' ?
                <Fade in={true}>
                  <div>
                    <CreditCardForm formData={formData}  setFormData={setFormData} />
                  </div>
                </Fade>
                :
                null
            } */}
            
            <OrderSummary
              loading={loading}
              setLoading={setLoading}
              formData={formData}
              paymentType={paymentType}
              errors={errors}
              setErrors={setErrors}
              open={open}
              setOpen={setOpen}
              message={message}
              shippingCost={shippingCost}
              setMessage={setMessage}
              selectedAddress={selectedAddress}
              deliveryType={deliveryType}
              t={t}
            />
          </Box>
        </Grid>
      </>
    );
  };

  export default Checkout;
