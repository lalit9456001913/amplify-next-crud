import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Profile from "../components/Profile/Profile";
import Header from "../components/Header";
import { fetchUserData, getUserAddresses, updateUserProfile, deleteUserFromDatabase } from '../services/amplify.service';
import { getCurrentUser, signOut,deleteUser } from 'aws-amplify/auth';

export default function Index() {
  const [userProfileData, setUserProfileData] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleProfile = async (data) => {
    let userData = {
      ...data,
      email: userProfileData.email,
      phone: userProfileData.phone,
      id: userProfileData.id
    };
    const response = await updateUserProfile(userData);

    if (response.data) {
      fetchUserDataAndAddresses();
      setIsEditing(false);
    } else {
      setError('Error updating user profile');
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteUser = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (!confirmation) return;

      await deleteUserFromDatabase(userProfileData.id);  

      await deleteUser(userProfileData.id);

      await signOut();

      router.push('/auth');
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("There was an error deleting your account.");
    }
  };

  const checkIfLoggedIn = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setError("You need to be logged in to view this page.");
        router.push('/auth');
        return null;
      }
      return user;
    } catch (error) {
      console.log("User is not logged in:", error);
      setError("You need to be logged in to view this page.");
      router.push('/auth');
      return null;
    }
  };

  const fetchUserDataAndAddresses = async () => {
    const user = await checkIfLoggedIn();
    if (user) {
      try {
        const userData = await fetchUserData();
        setUserProfileData(userData?.data?.getUser);

        const addresses = await getUserAddresses();
        setUserAddresses(addresses || []);
      } catch (err) {
        setError("Error fetching user data or addresses");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserDataAndAddresses();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <>
      <Header setError={setError} />

      {userProfileData && (
        <Profile
          handleDeleteUser={handleDeleteUser}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          userProfile={userProfileData}
          userAddresses={userAddresses}
          handleProfile={handleProfile}
        />
      )}
    </>
  );
}
