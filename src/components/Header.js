import React from 'react'

export default function Header() {
  return (

    <div className="jumbotron text-center w-100">
      <h1>NodePack</h1>
      <p className="lead w-75 mx-auto">
        List of NodeJs libraries, frameworks,modules and packages.
        </p>

      <form className="w-50 mx-auto">
        <div className="row">
          <div className="col-8">
            <input type="search" className="form-control" placeholder="search.." />
          </div>

          <div className="col-4">
            <button type="submit" className="btn btn-primary btn-block">SEARCH</button>
          </div>
        </div>
      </form>

    </div>

  )
}
