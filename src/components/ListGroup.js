import React from 'react';

function KeyWords({ keywords }) { // "["framework","http","api","web"]"
console.log(JSON.parse(keywords))
  let myKeys = JSON.parse(keywords);
  return (
    <>
      {myKeys.map((k, idx) => <span className="badge badge-primary" key={idx}>{k}</span>)}
    </>
  )
}

export default function ListGroup({ data, category, libName }) {

  if (category && category.length > 0) {
    data = data.filter(d => d.category === category);
  }

  if (libName && libName.length > 0) {
    data = data.filter(d => d.library_name.includes(libName));
  }

  return (
    <div className="list-group">
      {data.map((l, idx) => {
        return (
          <a href={JSON.parse(l.links).repository} target="_blank" rel="noopener noreferrer"
            className="list-group-item list-group-item-action" key={idx}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {l.library_name} <small className="text-muted">v{l.version}</small>
              </h5>
              <span className="badge badge-primary">{l.category}</span>
            </div>
            <small className="text-muted">{l.description}</small>
            
          </a>
        )
      })}


      {data.length < 1 &&
        (<div className="alert alert-primary alert-nfound" role="alert">
          <h4>Nothing found!</h4>
          <p>No libraries were found. You can Submit one..</p>
        </div>)
      }

    </div>
  )
}
