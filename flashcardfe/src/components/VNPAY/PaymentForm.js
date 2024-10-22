import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [amount, setAmount] = useState(10000); // Default amount
  const [bankCode, setBankCode] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://quizonebe.onrender.com/order/create_payment_url', {
              amount,
              bankCode,
          }, {
              withCredentials: true, // Include cookies with the request
          });
          // Handle successful response (e.g., redirect to payment page)
          console.log(response.data);
      } catch (error) {
          console.error('Error creating order:', error);
      }
  };

  return (
      <div>
          <h1>Create Order</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  Amount:
                  <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                  />
              </label>
              <label>
                  Bank Code:
                  <input
                      type="text"
                      value={bankCode}
                      onChange={(e) => setBankCode(e.target.value)}
                  />
              </label>
              <button type="submit">Create Payment URL</button>
          </form>
      </div>
  );
};

export default PaymentForm;
