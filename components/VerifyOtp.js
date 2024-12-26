import { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import { useRouter } from 'next/router';
const VerifyOTP = ({ username }) => {
  console.log("username------", username)
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleVerifyOTP = async () => {
    try {
      await confirmSignUp({ username, confirmationCode: otp }); // Verifies the OTP with Cognito
      alert('OTP Verified Successfully');
      router.push('/profile')
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
