import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const responseCode = queryParams.get('vnp_ResponseCode');

  return (
    <div>
      <h1>Payment Result</h1>
      {responseCode === '00' ? (
        <p>Payment successful!</p>
      ) : (
        <p>Payment failed. Response code: {responseCode}</p>
      )}
    </div>
  );
};

export default PaymentResult;
