import { useState } from 'react';
import { confirmSignUp, signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { createUsersData } from '../services/amplify.service';
import { fetchAuthSession } from '@aws-amplify/core';

const VerifyOTP = ({ userDetails, setError }) => {
  const [otp, setOtp] = useState('');
  const [error, setOtpError] = useState('');
  const router = useRouter();

  const handleVerifyOTP = async () => {
    try {
      await confirmSignUp({ username: userDetails.email, confirmationCode: otp });

      alert('OTP Verified Successfully');

      await signIn({ username: userDetails.email, password: userDetails.password });

      const session = await fetchAuthSession();
      const authToken = session?.tokens?.idToken?.toString();
      delete userDetails.password;
      await createUsersData(userDetails, authToken);
      
      router.push('/');
    } catch (err) {
      console.error('OTP verification error:', err);
      setOtpError(err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      {error && <p>{otpError}</p>}
    </div>
  );
};

export default VerifyOTP;
