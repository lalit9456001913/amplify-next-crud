import React, { useState } from 'react';
import LocationForm from './LocationForm';
import { createUsersAddress, updateAddressById, deleteAddressById } from '../../services/amplify.service'; // Add your delete function in amplify service

const LocationList = ({ locations, setLocations }) => {
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [error, setError] = useState(null);  // Error state to track any errors

  const handleAddLocation = async (location) => {
    try {
      const response = await createUsersAddress(location);
      if (response.data) {
        setLocations((prevLocations) => [...prevLocations, response?.data?.createAddress]);
        setShowLocationForm(false);
      } else {
        setError("Failed to create location. Please try again.");
      }
    } catch (err) {
      setError("Error crseating location: " + err.message);
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

  return (
    <div className="mb-6">
      {/* Button to toggle showing the LocationForm */}
      <button
        onClick={() => setShowLocationForm(!showLocationForm)}
        className="flex items-center gap-2 text-sm font-medium mb-4"
      >
        <span className="text-xl">+</span> Add Location
      </button>

      {/* Render the LocationForm if showLocationForm is true */}
      {showLocationForm && <LocationForm onSave={handleAddLocation} />}

      {/* Display error message if there's any */}
      {error && (
        <div className="text-red-500 bg-red-100 border border-red-500 p-3 rounded mb-4">
          <strong>Error: </strong> {error}
        </div>
      )}

      {/* List the locations */}
      {locations.map((location, index) => (
        <div key={index} className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={location.isActive || false}  // Check if the location is active or not
              onChange={(e) => handleCheckboxChange(e, index)}  // Handle checkbox state change
            />
            <span className="text-gray-500">{location.house}</span>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteLocation(location.id)}
            className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out"
          >
            <span className="text-xl">&times;</span> {/* The delete icon (×) */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LocationList;
