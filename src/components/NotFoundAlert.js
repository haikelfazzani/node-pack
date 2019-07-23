import React from 'react';
import { Link } from "react-router-dom";

export default function NotFoundAlert({ dataLength }) {
  return (
    <>
      {dataLength < 1 &&
        (<div className="alert alert-primary alert-nfound" role="alert">
          <h4>Nothing found!</h4>
          <p>No packages were found. You can 
          <Link to='/add-package' className="btn-link ml-1">Submit</Link> one..
          </p>
        </div>)
      }
    </>
  )
}
