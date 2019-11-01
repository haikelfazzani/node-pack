import React from 'react';

export default function Badge({ clx = "badge badge-success", val, toolTip, faIcon='' }) {
  return <span className={clx} data-toggle="tooltip" data-placement="top" title={toolTip}>
    <i className={faIcon}></i> {val}
  </span>
}
