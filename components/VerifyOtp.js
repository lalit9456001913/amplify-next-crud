import { useState } from 'react';
import { confirmSignUp, signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
import { createUsersData } from '../services/amplify.service';
import { fetchAuthSession } from '@aws-amplify/core';

const VerifyOTP = ({ userDetails, setError }) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter the OTP sent to your email.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {otpError && (
          <p className="text-red-500 text-sm text-center mb-4">{otpError}</p>
        )}

        <button
          onClick={handleVerifyOTP}
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
