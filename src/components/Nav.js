import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo-white-svg.svg'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 p-w">

      <div className="mx-auto order-0">
        <Link to="/" className="navbar-brand text-capitalize logo mx-auto">
          <img src={logo} height="30" alt="" />
        </Link>

        <button className="navbar-toggler" type="button"
          data-toggle="collapse" data-target=".dual-collapse2">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/" className="nav-link" >Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/add-library" className="nav-link">Add Library</Link>
          </li>

        </ul>
      </div>

    </nav>
  )
}
