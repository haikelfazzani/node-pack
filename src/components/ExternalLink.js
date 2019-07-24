import React from 'react';

export default function ExternalLink ({ clx, link, text }) {
  return (
    <a className={clx} href={link} target="_blank" rel="noopener noreferrer">{text}</a>
  )
}
