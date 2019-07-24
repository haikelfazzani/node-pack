import React from 'react';

export default function Badge({ clx, val, toolTip }) {
  return <span className={clx} data-toggle="tooltip" data-placement="top" title={toolTip}>
    {val}
  </span>
}
