import React from 'react'

export default function Altert({ dataLength }) {
  return (
    <>
      {dataLength < 1 &&
        (<div className="alert alert-primary alert-nfound" role="alert">
          <h4>Nothing found!</h4>
          <p>No libraries were found. You can Submit one..</p>
        </div>)
      }
    </>
  )
}
