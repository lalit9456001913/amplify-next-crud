import { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';

const VerifyOTP = ({ username }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOTP = async () => {
    try {
      await confirmSignUp(username, otp); // Verifies the OTP with Cognito
      alert('OTP Verified Successfully');
    } catch (err) {
      console.error('OTP verification error:', err);
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyOTP;
