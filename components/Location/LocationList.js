import React, { useState } from 'react';
import LocationForm from './LocationForm';
import { createUsersAddress, updateAddressById, deleteAddressById } from '../../services/amplify.service';

const LocationList = ({ locations, setLocations }) => {
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleAddLocation = async (location) => {
    try {
      if (currentLocation) {
        const response = await updateAddressById(currentLocation.id, { ...location, userID: currentLocation.userID });
        if (response.data) {
          setLocations((prevLocations) =>
            prevLocations.map((loc) =>
              loc.id === currentLocation.id ? { ...location, userID: currentLocation.userID, id: currentLocation.id } : loc
            )
          );
          setShowLocationForm(false);
          setCurrentLocation(null);
          setError(null);
        } else {
          setError("Failed to update location. Please try again.");
        }
      } else {
        const response = await createUsersAddress(location);
        if (response.data) {
          setLocations((prevLocations) => [...prevLocations, response?.data?.createAddress]);
          setShowLocationForm(false);
        } else {
          setError("Failed to create location. Please try again.");
        }
      }
    } catch (err) {
      setError("Error processing location: " + err.message);
      console.error(err);
    }
  };

  const handleCheckboxChange = async (e, index) => {
    const updatedLocations = [...locations];
    updatedLocations[index].isActive = e.target.checked;
    setLocations(updatedLocations);
    const locationId = updatedLocations[index].id;

    try {
      await updateAddressById(locationId, updatedLocations[index]);
    } catch (err) {
      setError("Error updating location: " + err.message);
      console.error(err);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      const response = await deleteAddressById(locationId);
      if (response.data) {
        setLocations((prevLocations) => prevLocations.filter((loc) => loc.id !== locationId));
      } else {
        setError("Failed to delete location. Please try again.");
      }
    } catch (err) {
      setError("Error deleting location: " + err.message);
      console.error(err);
    }
  };

  const handleEditLocation = async (location) => {
    setCurrentLocation(location); 
    setShowLocationForm(true);  
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => {
          setShowLocationForm(!showLocationForm)
        }}
        className="flex items-center gap-2 text-sm font-medium mb-4"
      >
        <span className="text-xl">+</span> Add Location
      </button>

      {showLocationForm && <LocationForm onSave={handleAddLocation} location={currentLocation} />}

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-500 p-3 rounded mb-4">
          <strong>Error: </strong> {error}
        </div>
      )}

      {locations.map((location, index) => (
        <div key={index} className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={location.isActive || false}  
              onChange={(e) => handleCheckboxChange(e, index)}  
            />
            <span className="text-gray-500">{location.house}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleEditLocation(location)}
              className="text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out"
            >
              <span className="text-xl">✏️</span> 
            </button>

            <button
              onClick={() => handleDeleteLocation(location.id)}
              className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out"
            >
              <span className="text-xl">&times;</span> 
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationList;
