import { useState } from 'react';
import { useRouter } from 'next/router';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { signUp, signIn } from 'aws-amplify/auth';
import { createUsersData } from '../services/amplify.service';
import VerifyOTP from './VerifyOtp';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggling between sign-up and login
  const [isOtp, setIsOtp] = useState(false);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const router = useRouter();

  const handleSignUp = async (data) => {
    const { email, phone, password } = data;
    try {
      const body = { email, phone, firstName: 'lalit', lastName: 'trigunayat', profilePhoto: '', password }

      await signUp({
        username: email,
        password,
        attributes: { email, phone_number: phone }
      });
      setUserDetails(body)
      setIsOtp(true);
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message);
    }
  };


  const handleLogin = async (email, password) => {
    try {
      await signIn({ username: email, password });
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isOtp ?
        <>
          <VerifyOTP userDetails={userDetails} />
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
