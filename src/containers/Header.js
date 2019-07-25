import React, { useState } from 'react';

export default function Header(props) {

  const [searchVal, setSearchVal] = useState("");

  return (
    <div className="jumbotron text-center w-100">
      <p className="lead text-uppercase display-5 w-50 mx-auto">
        Collections of NPM packages & modules for Node.js Developers
      </p>

      <div className="w-25 mx-auto">
        <input type="search"
          className="form-control"
          placeholder="Search.."
          value={searchVal}
          onChange={(e) => {
            let val = (e.target.value).toLowerCase();
            setSearchVal(val);
            props.sendData(val);
          }}
        />
      </div>

    </div>)
}
