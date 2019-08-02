import React from 'react';

export default function Select({
  clx = "form-group",
  htmlFor,
  lablText,
  isLabelHide = false,
  name,
  options,
  handleChange }) {

  return (
    <div className={clx}>

      <label htmlFor={htmlFor} style={{ display: isLabelHide ? "none" : "block" }}>
        {lablText}
      </label>

      <select className="form-control" onChange={handleChange} name={name} required>
        {options.map((o, idx) => <option key={idx} value={o}>{o}</option>)}
      </select>

    </div>
  )
}
