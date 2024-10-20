import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestPasswordResetApi } from '../../../service/ApiService';


const RequestPasswordReset = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await requestPasswordResetApi(email);
      if (response.errorCode === 0) {
        toast.success(response.message);
      } else
        if(response.errorCode === 2) {
          toast.warning(response.message)
        } else
      {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to send reset link. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-reset-request">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Enter your email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default RequestPasswordReset;
