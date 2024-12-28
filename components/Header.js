import { useRouter } from 'next/router';
import { signOut } from 'aws-amplify/auth';

const Header = ({ setError }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth');
    } catch (err) {
      setError("Error logging out");
    }
  };

  return (
    <header className="relative p-8 bg-blue-600 text-white flex justify-between items-center">
      <button
        onClick={handleLogout}
        className="
          absolute top-4 right-4 bg-red-500 text-white 
          py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 
          transition-all duration-300 ease-in-out transform 
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500
        "
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
