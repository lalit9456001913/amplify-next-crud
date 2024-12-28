import React, { useState, useEffect } from 'react';
import InputField from '../formElements/InputField';
import UploadPhoto from '../formElements/UploadPhoto';
import LocationList from '../Location/LocationList';
import SaveButton from '../formElements/SaveButton';
import { getUserAddresses } from '../../services/amplify.service';

const ProfileForm = ({ userProfile, handleProfile }) => {
    const [firstName, setFirstName] = useState(userProfile.firstName || '');
    const [lastName, setLastName] = useState(userProfile.lastName || '');
    const [profilePhoto, setProfilePhoto] = useState(userProfile.profilePhoto || null);
    const [locations, setLocations] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            profilePhoto,
            locations: locations,
        };
        handleProfile(formData);
    };

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const addresses = await getUserAddresses();
                if (addresses && addresses.length > 0) {
                    setLocations(addresses);
                } else {
                    setLocations([]);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserAddresses();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 pt-20">
            <div className="bg-gray-50 rounded-lg shadow p-6">
                <h1 className="text-2xl font-semibold text-center mb-2">Edit your profile</h1>

                <p className="text-center text-gray-600 text-sm mb-6">
                    Only first name and photo are visible to others
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <InputField
                        label="First Name"
                        placeholder="Type here.."
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Type here.."
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <UploadPhoto setProfilePhoto={setProfilePhoto} profilePhoto={profilePhoto} />

                <LocationList locations={locations} setLocations={setLocations} />

                <SaveButton onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default ProfileForm;
