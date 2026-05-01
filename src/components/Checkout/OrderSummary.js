
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, TextField } from "@mui/material";
import { NotificationBar } from "../../components";
import { CircularProgress } from "@mui/material";
import { BASE_URL, FREE_DELIVERY_THRESHOLD } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from "../../AuthContext";

const OrderSummary = ({
  loading,
  setLoading,
  formData,
  paymentType,
  setErrors,
  message,
  setMessage,
  open,
  setOpen,
  shippingCost,
  selectedAddress,
  deliveryType,
  t
}) => {
  const navigate = useNavigate()
  const [type, setType] = useState('error');
  const { cartTotal, items, emptyCart, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponVisible, setIsCouponVisible] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const { isLoggedIn, login, currency, exchangeRate } = useContext(AuthContext)


  useEffect(() => {
    let storedCouponData = localStorage.getItem('use_coupon')
    if (storedCouponData) {
      storedCouponData = JSON.parse(storedCouponData)
      setCouponData(storedCouponData)
      setCouponCode(storedCouponData.code)
    }

  }, []);

  useEffect(() => {
    if (couponData) {
      // Function to run when couponData changes - it returns true if coupon is valid
      const isValid = handleCouponDataChange();
      // Only set appliedCoupon if coupon is valid
      if (isValid) {
        setAppliedCoupon(couponData.code)
      } else {
        // Clear appliedCoupon if coupon becomes invalid
        setAppliedCoupon('');
      }
    } else {
      // Clear appliedCoupon when couponData is null
      setAppliedCoupon('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponData, cartTotal, shippingCost]);


  const handleCouponDataChange = () => {
    const startDate = new Date(couponData.start_date * 1000);
    const endDate = new Date(couponData.end_date * 1000);
    const today = new Date();

    // Validate date range first
    if (today < startDate || today > endDate) {
      setType('error');
      setMessage('This coupon is not currently valid. Please check the validity period and try again');
      setOpen(true);
      removeCoupon(true); // Remove coupon silently since it's invalid
      return false; // Return false to indicate coupon is invalid
    }

    if (couponData.type === "cart_base") {
      return calculateDiscount();
    } else if (couponData.type === "product_base") {
      return calculateProductBaseDiscount();
    } else {
      setType('error');
      setMessage('This coupon cannot be used in cart!');
      setOpen(true);
      removeCoupon(true); // Remove coupon silently since it's invalid
      return false; // Return false to indicate coupon is invalid
    }
  };

  const calculateDiscount = () => {
    const details = JSON.parse(couponData.details);
    const minBuy = parseFloat(details.min_buy);
    const maxDiscount = parseFloat(details.max_discount);

    if (cartTotal < minBuy) {
      setType('error');
      setMessage(`Your cart total must be at least ${minBuy} to use this coupon.`);
      setOpen(true);
      removeCoupon(true); // Remove coupon silently since it's not applicable
      return false; // Return false to indicate coupon is invalid
    }

    let discount = 0;
    if (couponData.discount_type === 'percent') {
      discount = (cartTotal * couponData.discount) / 100;
    } else if (couponData.discount_type === 'amount') {
      discount = couponData.discount;
    }

    if (discount > maxDiscount) {
      discount = maxDiscount;
    }
    if (discount > cartTotal) {
      discount = cartTotal;
    }
    // Store discount with full precision, round only at display time (same as tax)
    setDiscountAmount(discount);

    return true; // Return true to indicate coupon is valid
    // const totalAfterDiscount = cartTotal - discount;
    // Debugging removed for production
  };

  const calculateProductBaseDiscount = () => {
    try {
      const details = JSON.parse(couponData.details);
      const productIds = details.map(item => parseInt(item.product_id));
      
      // Find matching items in cart
      const matchingItems = items.filter(item => productIds.includes(parseInt(item.id)));
      
      if (matchingItems.length === 0) {
        setType('error');
        setMessage('This coupon is not applicable to items in your cart.');
        setOpen(true);
        removeCoupon(true); // Remove coupon silently since it's not applicable
        return false; // Return false to indicate coupon is invalid
      }

      // Calculate total for matching products
      const matchingProductsTotal = matchingItems.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseFloat(item.quantity));
      }, 0);

      // Calculate discount on matching products only
      let discount = 0;
      if (couponData.discount_type === 'percent') {
        discount = (matchingProductsTotal * couponData.discount) / 100;
      } else if (couponData.discount_type === 'amount') {
        discount = couponData.discount;
      }

      // Apply max discount if specified
      if (details[0]?.max_discount) {
        const maxDiscount = parseFloat(details[0].max_discount);
        if (discount > maxDiscount) {
          discount = maxDiscount;
        }
      }
      if (discount > cartTotal) {
        discount = cartTotal;
      }

      // Store discount with full precision, round only at display time (same as tax)
      setDiscountAmount(discount);
      return true; // Return true to indicate coupon is valid
    } catch (error) {
      console.error('Error calculating product base discount:', error);
      setType('error');
      setMessage('Error processing coupon. Please try again.');
      setOpen(true);
      removeCoupon(true); // Remove coupon silently since there's an error processing it
      return false; // Return false to indicate coupon is invalid
    }
  };

  // Function to toggle visibility
  const toggleCouponVisibility = () => {
    setIsCouponVisible(!isCouponVisible);
  };

  const applyCoupon = async (event) => {
    event.preventDefault();

    const newErrors = {};
    // Mocked coupon application logic, replace with your actual logic
    if (!couponCode.trim()) {
      newErrors.couponCode = "Coupon code is required";
      setMessage(newErrors.couponCode);
      setOpen(true);
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setCouponLoading(true)

      axios.post(`${BASE_URL}/api/v1/coupon/g/apply`, {
        coupon_code: couponCode,
      }).then((response) => {
        setCouponLoading(false)
        if (!response?.data?.success) {
          setOpen(true);
          setType('error');
          setMessage(response?.data?.message);
          setOpen(true);
        } else if (response?.data?.success) {
          setCouponData(response?.data.coupon_details);
          localStorage.setItem('use_coupon', JSON.stringify(response?.data.coupon_details))
          setType('success');
          setMessage(response?.data?.message);
          setOpen(true);
        }

      })
        .catch((error) => {
          console.error("Error:", error);
          setCouponLoading(false);
        });

    }


    // if (couponCode === 'SUMMER20') {
    //   setAppliedCoupon(couponCode);
    //   setDiscountAmount(20); // Example: Applying a 20% discount
    //   setMessage('Coupon applied successfully.');
    //   setType('success');
    //   toggleCouponVisibility()
    // } else {
    //   setMessage('Invalid coupon code.');
    //   setType('error');
    // }
  };

  const removeCoupon = (silent = false) => {
    setAppliedCoupon('');
    setDiscountAmount(0);
    setCouponCode('')
    setCouponData(null)
    localStorage.removeItem('use_coupon')
    if (!silent) {
      setMessage('Coupon removed.');
      setType('success');
      setOpen(true);
    }
  };

  // Handle Checkout Data
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      fullName,
      lastName,
      email,
      phone,
      password,
      delivery_address,
      country,
      state,
      city,
      zip_code,
      special_instruction,
    } = formData;

    const newErrors = {};
    const phoneRegex = /^\+?(\d{1,3})?[-.\s●]?(\(?\d{1,4}\)?)?[-.\s●]?(\d{1,4})[-.\s●]?(\d{1,9})$/;

    if (totalItems === 0) {
      showMessage("Your cart is empty! Redirecting to products....", 'error');
      setTimeout(() => navigate('/category?type=all'), 2000);
      return;
    }

    if (!isLoggedIn) {
      validateGuestForm(newErrors, { fullName, lastName, email, phone, password, delivery_address, country, state, city, zip_code }, phoneRegex);
    } else if (!selectedAddress) {
      newErrors.fullName = "Please Select Address";
      showMessage(newErrors.fullName, 'error');
    }

    // if (paymentType === 'network_payment') {
    //   validateCreditCardForm(newErrors, formData);
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOrderLoading(true);
    try {
      const encryptedPassword = btoa(password);
      const checkoutData = prepareCheckoutData(isLoggedIn, {
        fullName,
        email,
        phone,
        password: encryptedPassword,
        delivery_address,
        country,
        state,
        city,
        zip_code,
        special_instruction,
        selectedAddress,
        items,
        couponData,
        paymentType,
      });

      // Debugging removed for production

      const response = await axios.post(`${BASE_URL}/api/v1/order/store`, checkoutData, {
        headers: isLoggedIn ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {},
      });

      handleOrderResponse(response);
    } catch (error) {
      console.error("Error:", error);
      setOrderLoading(false);
    }
  };

  const prepareCheckoutData = (isLoggedIn, formData) => {
    const { fullName, email, phone, delivery_address, password, country, state, city, zip_code, special_instruction, selectedAddress, items, couponData, paymentType } = formData;
    const commonData = {
      delivery_type: deliveryType || 'standard',
      payment_type: paymentType,
      main_cur: currency,
      coupon_id: couponData ? couponData.id : null,
      cart: items.map(item => ({ id: item.id, quantity: item.quantity })), // Ensure no circular references
    };

    // Add special_instruction if not empty
    if (special_instruction && special_instruction.trim() !== '') {
      commonData.special_instruction = special_instruction.trim();
    }

    if (isLoggedIn) {
      return { ...commonData, address_id: selectedAddress };
    } else {
      return {
        ...commonData,
        shipping_address_id: 1,
        billing_address_id: 1,
        transactionId: 1234,
        name: fullName,
        email,
        phone_number: phone,
        delivery_address,
        country_id: country,
        state_id: state,
        city_id: city,
        postal_code: zip_code,
        password,
      };
    }
  };


  // Helper function to validate phone number length (8-12 digits excluding country code)
  const validatePhoneLength = (phoneValue) => {
    if (!phoneValue || !phoneValue.trim()) {
      return { isValid: false, message: "Phone number is required" };
    }
    
    // Extract phone number without country code
    // react-phone-input-2 returns value like "971501234567" where "971" is country code
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
      // Most country codes are 1-3 digits
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
      return { 
        isValid: false, 
        message: "Please enter a valid phone number" 
      };
    }
    
    return { isValid: true };
  };

  const validateGuestForm = (newErrors, formData, phoneRegex) => {
    const { fullName, lastName, email, phone, password, delivery_address, country, state, city, zip_code } = formData;
    if (!fullName.trim()) newErrors.fullName = "Your First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Your Last Name is required";
    if (!email.trim()) newErrors.email = "Email Address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email Address is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else {
      // Validate phone number length (8-12 digits excluding country code)
      const phoneValidation = validatePhoneLength(phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.message;
      }
    }
    if (!delivery_address.trim()) newErrors.delivery_address = "Delivery Address is required";
    if (!country) newErrors.country = "Country is required";
    if (!state) newErrors.state = "State is required";
    if (!city) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) showMessage(Object.values(newErrors)[0], 'error');
  };

  const validateCreditCardForm = (newErrors, formData) => {
    const { cardCvv, cardExpirationDate, cardNumber, cardName } = formData;
    if (!cardCvv.trim() || cardCvv.length !== 3) {
      newErrors.cardCvv = "Please enter a valid 3-digit CVV";
      showMessage(newErrors.cardCvv, 'error');
    }
    if (!cardExpirationDate.trim() || !/^\d{2}\/\d{2}$/.test(cardExpirationDate)) {
      newErrors.cardExpirationDate = "Please enter a valid expiration date in MM/YY format";
      showMessage(newErrors.cardExpirationDate, 'error');
    } else {
      const [month, year] = cardExpirationDate.split('/').map((num) => parseInt(num, 10));
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;
      const isValidExpirationDate = (year > currentYear) || (year === currentYear && month >= currentMonth);
      if (!isValidExpirationDate) {
        newErrors.cardExpirationDate = "Expiration date must be after today";
        showMessage(newErrors.cardExpirationDate, 'error');
      }
    }
    if (!cardName.trim()) {
      newErrors.cardName = "Please enter the cardholder's name";
      showMessage(newErrors.cardName, 'error');
    }
    const cardNumberDigits = cardNumber.replace(/\s/g, '');
    if (!cardNumber.trim() || cardNumberDigits.length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
      showMessage(newErrors.cardNumber, 'error');
    }
  };


  const handleOrderResponse = (response) => {
    setOrderLoading(false);
    if (!response.data.success) {
      showMessage(response.data.message, 'error');
      return;
    }

    if (!isLoggedIn) {
      // Add verified field to user data
      const userWithVerified = {
        ...response.data.user,
        verified: response.data.verified
      };
      // Persist email for Verify page prefill on redirect from dashboard
      if (userWithVerified && userWithVerified.email) {
        localStorage.setItem('registerEmail', userWithVerified.email);
      }
      login(userWithVerified, response.data.access_token, response.data.expires_at);
    }

    if (response.data.payment_method === 'cash_on_delivery') {
      showMessage(response.data.message, 'success');
      emptyCart();
      removeCoupon();
      navigate('/thankyou?order_code=' + response.data.order_code);
    } else if (response.data.payment_method === 'network_payment') {
      emptyCart();
      removeCoupon();
      window.location.href = response.data.orderResponse['_links']['payment']['href'];
    }
  };

  const showMessage = (msg, type) => {
    setType(type);
    setMessage(msg);
    setOpen(true);
  };


  // Handle Checkout Data

  const Header = (
    <>
      <Box className="p-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex' }}>
          <p style={{ fontWeight: 900, fontSize: '16px' }}>{t('checkout.order_summary')}</p>
        </Box>
      </Box>
    </>
  )

  const Footer = (
    <Box className="p-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant='contained'
        className="poppins bg-[#2858a3] w-[100%]"
        style={{ height: "45px", textTransform: "capitalize" }}
        type="submit"
        onClick={handleSubmit}
        sx={{ mt: 3, mb: 2 }}
        disabled={orderLoading}
      >
        {orderLoading && <CircularProgress size={25} className="text-white" />}
        {!orderLoading && t('checkout.complete_order')}
      </Button>
    </Box>
  )

  // Apply discount first, then calculate tax on discounted amount
  const subtotal = parseFloat(cartTotal);
  const discountValue = Math.min(parseFloat(discountAmount || 0), subtotal);
  const subtotalAfterDiscount = subtotal - discountValue;
  
  // Calculate average tax rate from all items to get accurate percentage
  // This handles cases where individual item taxes are rounded
  let averageTaxRate = 0;
  let itemsWithTax = 0;
  
  items.forEach(item => {
    const itemPrice = parseFloat(item.price || 0);
    const itemTax = parseFloat(item.tax || 0);
    if (itemPrice > 0 && itemTax > 0) {
      averageTaxRate += itemTax / itemPrice;
      itemsWithTax++;
    }
  });
  
  if (itemsWithTax > 0) {
    averageTaxRate = averageTaxRate / itemsWithTax;
  }
  
  // If average tax rate is close to a standard percentage (within 0.1%), round to that percentage
  // This fixes rounding errors from summed item taxes
  const standardRates = [0.05, 0.10, 0.15, 0.20]; // 5%, 10%, 15%, 20%
  for (const standardRate of standardRates) {
    if (Math.abs(averageTaxRate - standardRate) < 0.001) {
      averageTaxRate = standardRate;
      break;
    }
  }
  
  // Calculate tax on discounted total using the accurate tax rate
  const taxOnDiscountedTotal = subtotalAfterDiscount * averageTaxRate;
  
  // Calculate total before shipping for free shipping threshold check
  const totalBeforeShipping = subtotalAfterDiscount + taxOnDiscountedTotal;
  const isShippingDiscountApplied = totalBeforeShipping > FREE_DELIVERY_THRESHOLD;
  const effectiveShippingCost = isShippingDiscountApplied ? 0 : parseFloat(shippingCost || 0);

  const content = (
    <>
      <Box style={{ padding: '15px 15px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>{t('checkout.subtotal')}</p>
        <p className="text-[14px]">{currency} {Math.round(cartTotal * exchangeRate * 100) / 100}</p>
      </Box>

      {
        discountAmount !== 0 ?
          <>
            <Box style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>{t('checkout.discount')} {appliedCoupon ? `(${appliedCoupon})` : ''}</p>
              <p className="text-[14px]">{currency} -{Math.round((discountAmount || 0) * exchangeRate * 100) / 100}</p>
            </Box>
            <Divider />
          </>
          : null
      }

      {taxOnDiscountedTotal > 0 && (
        <>
          <Box style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>{t('checkout.tax')}</p>
            <p className="text-[14px]">
              {currency} {Math.round(taxOnDiscountedTotal * exchangeRate * 100) / 100}
            </p>
          </Box>
          <Divider />
        </>
      )}

      <Box style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>{t('checkout.shipping')}</p>
        <Box className="flex flex-col items-end">
          <p className="text-[14px]">
            {currency} {Math.round(effectiveShippingCost * exchangeRate * 100) / 100}
          </p>
          {isShippingDiscountApplied && (
            <span className="text-[12px] text-green-600">
              {t('checkout.free_shipping_applied', { threshold: FREE_DELIVERY_THRESHOLD })}
            </span>
          )}
        </Box>
      </Box>
      <Divider />

      <Box style={{ padding: '15px 15px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-[14px]" style={{ textOverflow: "ellipsis", overflow: "hidden", width: "126.5px", whiteSpace: "nowrap" }}>{t('checkout.total')}</p>
        <p className="text-[16px] font-[600]">
          {(() => {
            // Calculate displayed values (same rounding as individual line items)
            const displayedSubtotal = Math.round(cartTotal * exchangeRate * 100) / 100;
            const displayedDiscount = discountAmount !== 0 ? Math.round((discountAmount || 0) * exchangeRate * 100) / 100 : 0;
            const displayedTax = Math.round(taxOnDiscountedTotal * exchangeRate * 100) / 100;
            const displayedShipping = Math.round(effectiveShippingCost * exchangeRate * 100) / 100;
            // Calculate total: Subtotal - Discount + Tax + Shipping
            const finalTotal = displayedSubtotal - displayedDiscount + displayedTax + displayedShipping;
            return `${currency} ${Math.round(finalTotal * 100) / 100}`;
          })()}
        </p>

      </Box>
    </>
  )


  const CouponHtml = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          background: "#fff",
          borderRadius: "4px",
          marginBottom: "10px",
          padding: "10px 20px", // Adjust padding as needed
          alignItems: "center",
        }}
        role="presentation"
      >

        {/* Apply Coupon text and toggle button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <p variant="h6" style={{ fontWeight: 600, fontSize: "16px" }}>
            {isCouponVisible ? t('checkout.apply_coupon') : t('checkout.coupon_title')}
          </p>
          <Button
            onClick={toggleCouponVisibility}
            variant="text"
            startIcon={isCouponVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          />
        </Box>

        {/* Coupon form */}
        <Box
          sx={{
            display: isCouponVisible ? "flex" : "none",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto", // Push form to the right
          }}
        >
          <TextField
          className="poppins"
            label={t('checkout.coupon_code')}
            placeholder={t('checkout.enter_coupon')}
            variant="outlined"
            size="small"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{ marginRight: "10px" }}
            InputProps={{
              style: {
                direction: 'ltr',
                textAlign: 'left',
                fontFamily: 'monospace'
              }
            }}
            sx={{
              '& .MuiInputBase-input': {
                direction: 'ltr !important',
                textAlign: 'left !important',
                fontFamily: 'monospace'
              },
              '& .MuiInputBase-input::placeholder': {
                direction: 'ltr !important',
                textAlign: 'left !important',
                opacity: 0.6
              }
            }}
          />
          {!appliedCoupon ?
            <Button
              variant="contained"
              onClick={applyCoupon}
              className="poppins bg-[#2858a3] w-[80px]"
              style={{ height: "40px", textTransform: "capitalize" }}
              sx={{ mt: 1, mb: 1 }}
              disabled={couponLoading}
            >
              {couponLoading ? (
                <CircularProgress size={25} className="text-white" />
              ) : (
                t('checkout.apply')
              )}
            </Button>
            : <Button
              variant="contained"
              onClick={removeCoupon}
              className="poppins bg-[#2858a3] w-[80px]"
              style={{ height: "40px", textTransform: "capitalize" }}
              sx={{ mt: 1, mb: 1 }}
              disabled={couponLoading}
            >
              {t('checkout.remove')}
            </Button>
          }
        </Box>
      </Box>
    </>
  )

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          background: "#fff",
          borderRadius: '4px'
        }}
        role="presentation"
      >
        {CouponHtml}

        {Header}
        <Box sx={{ flex: '1 1 auto', overflow: 'auto', paddingX: 1 }}>
          {content}
        </Box>
        {Footer}
      </Box>
      {/* notification */}
      <NotificationBar
        open={open}
        setOpen={setOpen}
        type={type}
        message={message}
      />
    </>
  )
}

export default OrderSummary