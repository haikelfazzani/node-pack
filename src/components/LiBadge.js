import React from 'react'

export default function LiBadge({ text, badgeText, faIcon='' }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center"><span><i className={faIcon}></i> {text}</span>
      <span className="badge badge-primary font-s14">{badgeText}</span>
    </li>
  )
}
