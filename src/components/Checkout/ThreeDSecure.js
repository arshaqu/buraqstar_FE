import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../constants';

const ThreeDSecure = () => {
  const location = useLocation();
  const { acsUrl, acsPaReq, acsMd } = location.state || {};

  useEffect(() => {
    if (acsUrl && acsPaReq && acsMd) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = acsUrl;

      const inputPaReq = document.createElement('input');
      inputPaReq.type = 'hidden';
      inputPaReq.name = 'PaReq';
      inputPaReq.value = acsPaReq;
      form.appendChild(inputPaReq);

      const inputMd = document.createElement('input');
      inputMd.type = 'hidden';
      inputMd.name = 'MD';
      inputMd.value = acsMd;
      form.appendChild(inputMd);

      const inputTermUrl = document.createElement('input');
      inputTermUrl.type = 'hidden';
      inputTermUrl.name = 'TermUrl';
      inputTermUrl.value = `${BASE_URL}/api/v1/3ds/complete`; // URL to handle the return from 3DS
      form.appendChild(inputTermUrl);

      document.body.appendChild(form);
      form.submit();
    } else {
      console.error('Missing 3DS parameters:', { acsUrl, acsPaReq, acsMd });
    }
  }, [acsUrl, acsPaReq, acsMd]);

  return <div>Redirecting to 3D Secure...</div>;
};

export default ThreeDSecure;
