import React from 'react';

export default function Input({ htmlFor, lablText, name, value, type, placeholder, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{lablText}</label>
      <input type={type}
        className="form-control"
        onChange={handleChange}
        name={name}
        value={value}
        placeholder={placeholder}
        required />
    </div>
  )
}
