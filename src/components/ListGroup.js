import React, { useState, useEffect } from 'react';
import usePrevious from '../hooks/usePrevious';
import Altert from './Altert';
import Badge from './Badge';
import Pagination from './Pagination';

function parseDetails(data) {
  return parseInt(JSON.parse(data.details).popularity * 100, 10);
}

export default function ListGroup(props) {

  let { data, category, libName } = props;

  const nextInit = 5;
  const prevInit = 0;

  const [lstPackages, setlstPackages] = useState(data)
  const [pagination, setPagination] = useState({ next: nextInit, prev: prevInit });

  //const prevAmount = usePrevious({ data, category, libName });

  useEffect(() => {
    data = data.slice(pagination.prev, pagination.next);
  }, [pagination]);

  useEffect(() => {
    setPagination({ next: nextInit, prev: prevInit });

  }, [data, category, libName]);

  if (category && category.length > 0) {
    data = lstPackages.filter(d => d.category === category);
  }

  if (libName && libName.length > 0) {

    data = lstPackages.filter(d => d.library_name.includes(libName));
  }

  data = data.slice(pagination.prev, pagination.next)
    .sort((i, j) => parseDetails(j) - parseDetails(i))

  return (
    <div className="list-group">
      {data.map((l, idx) => {
        return (
          <div className="list-group-item list-group-item-action" key={idx}>

            <div className="d-flex w-100 justify-content-between">

              <a href={JSON.parse(l.links).repository} target="_blank" rel="noopener noreferrer">
                <h5 className="mb-1">
                  {l.library_name} <small className="text-muted">v{l.version}</small>
                </h5>
              </a>

              <div>
                <Badge clx="badge badge-dark"
                  val={"Q:" + parseInt(JSON.parse(l.details).quality * 100, 10)}
                />

                <Badge clx="badge badge-success ml-2"
                  val={"P:" + parseInt(JSON.parse(l.details).popularity * 100, 10)}
                />

                <Badge clx="badge badge-warning ml-2"
                  val={"M:" + parseInt(JSON.parse(l.details).maintenance * 100, 10)}
                />
              </div>
            </div>

            <small className="text-muted">{l.description}</small>
          </div>
        )
      })}

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        lstPackages={lstPackages}
      />

      <Altert dataLength={data.length} />

    </div>
  )
}
