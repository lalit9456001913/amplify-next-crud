import React from 'react';

const ProfileHeader = ({ userProfile }) => {
  return (
    <div className="flex items-center gap-6 mb-8">
      <img
        src={userProfile?.profilePhoto || 'https://via.placeholder.com/150'}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
      />
      <div>
        <h2 className="text-2xl font-medium text-gray-800">
          {userProfile?.firstName} {userProfile?.lastName}
        </h2>
        <p className="text-gray-600">{userProfile?.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
