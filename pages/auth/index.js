import { useEffect } from 'react';
import AuthPage from '../../components/Auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/router';

const AuthPageWrapper = () => {
  const router = useRouter();
  const checkIfLoggedIn = async () => {
    try {
      const user = await getCurrentUser(); 
      if (user) {
        router.push('/'); 
      }
    } catch (error) {
      console.log("User is not logged in, showing Auth page");
    }
  };

  useEffect(() => {
    checkIfLoggedIn()
  }, []);

  return <AuthPage />;
};

export default AuthPageWrapper;
