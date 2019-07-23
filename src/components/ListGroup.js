import React from 'react';
import usePrevious from '../hooks/usePrevious';
import Altert from './Altert';
import Badge from './Badge';
import Pagination from './Pagination';

function parseDetails(data) {
  return parseInt(JSON.parse(data.details).popularity * 100, 10);
}

function sortByPopularity(data) {
  return data.sort((i, j) => parseDetails(j) - parseDetails(i));
}

function dataSlice(data, begin, end) {
  return data.slice(begin, end);
}

const itemsPerPage = 5;

export default class ListGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        totalItems: this.props.data.length, itemsPerPage: 5, begin: 0, end: itemsPerPage
      },
      listOfPackages: sortByPopularity(this.props.data),
      category: this.props.category,
      libName: this.props.libName,
    }
  }

  componentWillReceiveProps(props) {

    if (props.category && props.category.length > 0) {
      this.setState({
        listOfPackages: this.props.data
          .filter(d => d.category === props.category)
      });
    }

    if (props.libName && props.libName.length > 0) {
      this.setState({
        listOfPackages: this.props.data
          .filter(d => d.library_name.includes(props.libName))
      });
    }

    this.setState({
      pagination: {
        totalItems: this.state.listOfPackages.length,
        begin: 0,
        end: itemsPerPage
      }
    });
  }

  render() {

    let { listOfPackages, pagination } = this.state;
    let { totalItems, begin, end } = pagination;

    return (
      <div className="list-group">
        {dataSlice(listOfPackages, pagination.begin, pagination.end).map((l, idx) => {
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

        <nav aria-label="Page navigation example" className="mt-3"
          style={{ display: listOfPackages.length < itemsPerPage + 1 ? "none" : "block" }}>
          <ul className="pagination">

            <li className={begin > 0 ? "page-item" : "page-item disabled"}>
              <button className="page-link"
                onClick={() => begin > 0 &&
                  this.setState({
                    pagination:
                      { begin: begin - itemsPerPage, end: end - itemsPerPage }
                  })
                }>
                Previous
            </button>
            </li>

            <li className={end < listOfPackages.length ? "page-item" : "page-item disabled"}>
              <button className="page-link"
                onClick={() => end < listOfPackages.length &&
                  this.setState({
                    pagination:
                      { begin: begin + itemsPerPage, end: end + itemsPerPage }
                  })
                }>
                Next
            </button>
            </li>
          </ul>
        </nav>

        <Altert dataLength={listOfPackages.length} />

      </div>
    )
  }
}
