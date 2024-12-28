// /components/formElements/InputField.js
import React from 'react';

const InputField = ({ label, placeholder, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input 
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default InputField;
