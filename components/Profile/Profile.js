import React from 'react';
import ProfileHeader from './ProfileHeader';
import AddressList from '../Address/AddressList';
import ProfileForm from './ProfileForm';

const Profile = ({ userProfile, userAddresses, handleProfile, handleEditClick, isEditing }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            {!isEditing ? (
                <>
                    <div className="flex justify-between items-center">
                        <ProfileHeader userProfile={userProfile} />
                        <button
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition-all duration-200"
                        >
                            Edit Profile
                        </button>
                    </div>
                    <AddressList addresses={userAddresses} />
                </>
            ) : (
                <ProfileForm userProfile={userProfile} handleProfile={handleProfile} />
            )}
        </div>
    );
};

export default Profile;
