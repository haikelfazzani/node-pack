import React from 'react';

export default ExternalLink = ({ clx, link, text }) =>
  <a className={clx} href={link} target="_blank" rel="noopener noreferrer">{text}</a>
