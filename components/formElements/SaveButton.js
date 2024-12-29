import React from 'react';

const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-32 bg-blue-600 text-white px-4 py-2 rounded-md mx-auto block hover:bg-blue-700"
    >
      Save
    </button>
  );
};

export default SaveButton;
