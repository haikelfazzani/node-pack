import React from 'react'

export default function LiBadge({ text, badgeText }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {text}
      <span className="badge badge-primary font-s14">{badgeText}</span>
    </li>
  )
}
