import React from 'react';

export default function Input({ htmlFor, type, lablText, placeholder, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{lablText}</label>
      <input type={type}
        className="form-control"
        placeholder={placeholder}
        onChange={handleChange} required/>
    </div>
  )
}
