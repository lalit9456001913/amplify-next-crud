import React from 'react';
import AddressItem from './AddressItem';

const AddressList = ({ addresses }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Addresses</h3>
      {addresses.length > 0 ? (
        <ul className="space-y-4">
          {addresses.map((address, index) => (
            <AddressItem key={index} address={address} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No addresses available.</p>
      )}
    </div>
  );
};

export default AddressList;
