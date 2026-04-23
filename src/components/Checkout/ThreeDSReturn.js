import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const ThreeDSReturn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paRes = params.get('PaRes');
    const md = params.get('MD');

    if (paRes && md) {
      axios.post(`${BASE_URL}/api/v1/3ds/complete`, { PaRes: paRes, MD: md })
        .then(response => {
          // Handle success, navigate to the success page
          if (response.data.success) {
            navigate('/thankyou');
          } else {
            navigate('/payment-failed', { state: { message: response.data.message } });
          }
        })
        .catch(error => {
          // Handle error
          console.error(error);
          navigate('/payment-failed', { state: { message: 'An error occurred during the payment process.' } });
        });
    }
  }, [navigate]);

  return <div>Processing payment...</div>;
};

export default ThreeDSReturn;
