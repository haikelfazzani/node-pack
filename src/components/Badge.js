import React from 'react';

export default function Badge({ clx = "badge badge-success", val, toolTip }) {
  return <span className={clx} data-toggle="tooltip" data-placement="top" title={toolTip}>
    {val}
  </span>
}
