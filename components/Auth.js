import { useState } from 'react';
import { useRouter } from 'next/router';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { signUp, signIn } from 'aws-amplify/auth';
import { createUsersData } from '../services/amplify.service';
import VerifyOTP from './VerifyOtp';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggling between sign-up and login
  const [isOtp, setIsOtp] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSignUp = async (data) => {
    const { email, phone, password } = data;
    try {
      await signUp({
        username: email,
        password,
        attributes: { email, phone_number: phone }
      });
      const body = { email, phone, firstName: 'lalit', lastName: 'trigunayat', profilePhoto: '' }
      await createUsersData(body);

      alert('Sign up successful! Please verify OTP.');
      setUsername(email)
      setIsOtp(true); // Trigger OTP verification
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message);
    }
  };


  const handleLogin = async (email, password) => {
    try {
      await signIn({ username: email, password });
      router.push('/profile');  // Redirect to profile page after successful login
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isOtp ?
        <>
          <VerifyOTP username={username} />
        </>
        :
        <>
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <h2 className="text-3xl font-bold text-center">
              {isSignUp ? 'User Profile Signup' : 'User Profile Login'}
            </h2>
            {isSignUp ? <SignUpForm handleSignUp={handleSignUp} /> : <LoginForm handleLogin={handleLogin} />}
            <div className="text-center text-sm mt-4">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:underline"
              >
                {isSignUp
                  ? 'Already have an account? Log In'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        </>
      }

    </div>
  );
};

export default AuthPage;
