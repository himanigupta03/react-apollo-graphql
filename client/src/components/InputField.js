import React from 'react';
export const InputField = ({
  label,
  type = 'text',
  name,
  value,
  handleChange,
}) => {
  return (

    <div className='grid grid-cols-3'>
      <label className='self-center'>{label}</label>
      <input
        type={type}
        className='col-span-2 border border-gray-200 border-solid rounded-l'
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>

  );
};
