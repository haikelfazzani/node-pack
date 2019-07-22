import React from 'react';

export default function Select({ htmlFor, lablText, options, handleChange }) {
  options = options.sort((i,j) => i.split("")[0] > j.split("")[0])
  console.log(options)
  return (
    <div className="form-group">
      <label htmlFor={htmlFor}>{lablText}</label>
      <select className="form-control" onChange={handleChange} required>
        {options.map((o, idx) => <option key={idx} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
