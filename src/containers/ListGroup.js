import React from 'react';
import NotFoundAlert from '../components/NotFoundAlert';
import Badge from '../components/Badge';

import { sortByPopularity, dataSlice } from '../service/ListService';
import ModalPortal from '../components/ModalPortal';
import Modal from './Modal';

const itemsPerPage = 8;

export default class ListGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        totalItems: this.props.data.length,
        itemsPerPage: 5,
        begin: 0,
        end: itemsPerPage,
        numPage: 1,
      },
      listOfPackages: sortByPopularity(this.props.data),
      category: this.props.category,
      libName: this.props.libName,
      msg: "",
      isOpen: false, package: ""
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(props) {

    if (props.category && props.category.length > 0) {
      this.setState({
        listOfPackages: props.category !== "all" ?
          this.props.data.filter(d => d.category === props.category) :
          this.props.data
      });
    }

    if (props.libName && props.libName.length > 0) {
      this.setState({
        listOfPackages: this.props.data.filter(d => d.package.includes(props.libName))
      });
    }

    this.setState({
      pagination: {
        totalItems: this.state.listOfPackages.length,
        begin: 0,
        end: itemsPerPage,
        numPage: 1
      }
    });
  }

  handleModal(p) {
    this.setState({ isOpen: true, package: p });
  }

  handleClose(isOpen) {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {

    let { listOfPackages, pagination } = this.state;
    let { totalItems, begin, end, numPage } = pagination;

    return (
      <>
        <ModalPortal>
          <Modal
            isOpen={this.state.isOpen}
            p={this.state.package}
            handleClose={this.handleClose}
          />
        </ModalPortal>


        <div className="list-group">
          {dataSlice(listOfPackages, pagination.begin, pagination.end).map((l, idx) => {
            return (
              <div className="list-group-item list-group-item-action" key={idx}>

                <div className="d-flex w-100 justify-content-between">

                  <a href={l.details.package.links.repository} target="_blank" rel="noopener noreferrer">
                    <h5 className="mb-1">
                      {l.package} <small className="text-muted">v{l.details.package.version}</small>
                    </h5>
                  </a>

                  <div>
                    <Badge clx="badge badge-success" toolTip="Popularity"
                      val={"P: " + parseInt(l.details.score.detail.popularity * 100, 10)}
                    />

                    <Badge clx="badge badge-dark ml-2" toolTip="Quality"
                      val={"Q: " + parseInt(l.details.score.detail.quality * 100, 10)}
                    />

                    <Badge clx="badge badge-warning ml-2" toolTip="Maintenance"
                      val={"M: " + parseInt(l.details.score.detail.maintenance * 100, 10)}
                    />

                    <span className="badge badge-primary ml-2" onClick={() => this.handleModal(l)}>
                      more
                    </span>
                  </div>
                </div>

                <div>
                  <small className="text-muted">{l.details.package.description}</small>
                </div>

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
                      pagination: { begin: begin - itemsPerPage, end: end - itemsPerPage, numPage: numPage - 1 }
                    })
                  }>
                  Previous
              </button>
              </li>

              <li className="page-item">
                <button type="button" class="page-link">{numPage}</button>
              </li>

              <li className={end < listOfPackages.length ? "page-item" : "page-item disabled"}>
                <button className="page-link"
                  onClick={() => end < listOfPackages.length &&
                    this.setState({
                      pagination: { begin: begin + itemsPerPage, end: end + itemsPerPage, numPage: numPage + 1 }
                    })
                  }>
                  Next
              </button>
              </li>
            </ul>
          </nav>

          <NotFoundAlert dataLength={listOfPackages.length} />

        </div>
      </>
    )
  }
}
