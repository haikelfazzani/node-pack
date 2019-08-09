import React from 'react';

const Alert = ({ clx = "primary", text, text2 }) => {

  const [hideAlert, setHideAlert] = React.useState(false);

  return (
    <div className={"alert alert-" + clx + " alert-dismissible fade show"} role="alert"
      style={{ display: hideAlert ? "none" : "block" }}>
      {text}
      <p className="p-0 m-0">{text2}</p>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close"
        onClick={() => setHideAlert(true)}>
        <span aria-hidden="true">&times;</span>
      </button>

    </div>
  );
}

export default Alert;
