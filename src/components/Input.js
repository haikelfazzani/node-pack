import React from 'react';

export default function Input({ htmlFor, lablText,name, type, placeholder, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{lablText}</label>
      <input type={type}        
        className="form-control"        
        onChange={handleChange} 
        name={name}
        placeholder={placeholder}
        required/>
    </div>
  )
}
