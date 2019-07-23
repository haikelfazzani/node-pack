import React from 'react';

export default function Select({ clx = "form-group", htmlFor, lablText, options, handleChange }) {

  return (
    <div className={clx}>

      <label htmlFor={htmlFor}>{lablText}</label>

      <select className="form-control" onChange={handleChange} required>
        {options.map((o, idx) => <option key={idx} value={o}>{o}</option>)}
      </select>

    </div>
  )
}
