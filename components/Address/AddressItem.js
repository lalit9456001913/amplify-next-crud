import React from 'react';

const AddressItem = ({ address }) => {
  return (
    <li className="p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-col gap-2">
        <strong className="text-lg text-gray-800">{address.house}</strong>
        <p className="text-gray-600">
          {address.street}, {address.city}, {address.state}, {address.country} - {address.pincode}
        </p>
        <p className={`text-sm ${address.isActive ? 'text-green-500' : 'text-red-500'}`}>
          {address.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>
    </li>
  );
};

export default AddressItem;
