import React, { useState } from 'react';
import logo from '../images/logo-w-svg.svg';

export default function Header(props) {

  const [searchVal, setSearchVal] = useState("");

  return (
    <div className="jumbotron text-center w-100">
      <h1 className="logo"><img src={logo} alt="logo" /></h1>
      <p className="lead w-75 mx-auto">
        List of NodeJs libraries, frameworks,modules and packages.
      </p>

      <div className="w-25 mx-auto">
        <input type="text"
          className="form-control"
          placeholder="Search.."
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
            props.sendData(e.target.value);
          }}
        />
      </div>

    </div>)
}
