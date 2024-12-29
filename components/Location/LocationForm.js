import React, { useState } from 'react';
import { useEffect } from 'react';
const LocationForm = ({ onSave, location }) => {
  const [locationData, setLocationData] = useState({
    locationName: '',
    house: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });

  const countries = [
    { name: 'Select One', code: '' },
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'India', code: 'IN' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Australia', code: 'AU' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (location) {
      setLocationData({
        house: location?.house || '',  
        street: location?.street || '',
        city: location?.city || '',
        state: location?.state || '',
        country: location?.country || '',
        pincode: location?.pincode || '',
        isActive: location?.isActive !== undefined ? location.isActive : true,  
      });
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(locationData); 
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">House/Apt.</label>
        <input
          type="text"
          name="house"
          value={locationData?.house}
          onChange={handleInputChange}
          placeholder="Please input"
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Street/Colony</label>
        <input
          type="text"
          name="street"
          value={locationData?.street}
          onChange={handleInputChange}
          placeholder="Please input"
          className="w-full p-3 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={locationData?.city}
            onChange={handleInputChange}
            placeholder="Please input"
            className="w-full p-3 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            name="state"
            value={locationData?.state}
            onChange={handleInputChange}
            placeholder="Please input"
            className="w-full p-3 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <select
            name="country"
            value={locationData?.country}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md text-gray-500"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={locationData?.pincode}
            onChange={handleInputChange}
            placeholder="Please input"
            className="w-full p-3 border rounded-md"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default LocationForm;
