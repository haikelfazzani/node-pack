import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo-white-svg.svg';

export default function Nav() {

  const [hideNav, setHideNav] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3 p-w">

      <div className="order-0 w-100">
        <Link to="/" className="navbar-brand text-capitalize logo mx-auto flipInY">
          <img src={logo} height="30" alt="" />
        </Link>

        <button className="navbar-toggler float-right" type="button"
          onClick={() => setHideNav(!hideNav)}>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2"
        style={{ display: !hideNav ? "none" : "block" }}>
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to="/" className="nav-link" >Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">about</Link>
          </li>

          <li className="nav-item">
            <Link to="/scan" className="nav-link">scan</Link>
          </li>

        </ul>
      </div>

    </nav>
  )
}
