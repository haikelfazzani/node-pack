import React from 'react';

export default function Select({ htmlFor, lablText, options, handleChange }) {
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{lablText}</label>
      <select className="form-control" onChange={handleChange} required>
        {options.map((o, idx) => <option key={idx} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
