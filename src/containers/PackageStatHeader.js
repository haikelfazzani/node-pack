import React from 'react';

export default function PackageStatHeader(props) {

  const [searchVal, setSearchVal] = React.useState("");

  return (
    <div className="jumbotron text-center w-100">
      <p className="lead text-uppercase display-5 w-50 mx-auto m-0">
        Node package Statistics by one click
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


        <input type="date"
          className="form-control"
          placeholder="Enter date : 2014-01-03"
        />

        <input type="date"
          className="form-control"
          placeholder="Enter date : 2014-01-03"
        />


      </div>

    </div>
  )
}
