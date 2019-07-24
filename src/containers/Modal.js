import React from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { formatDownload } from '../service/ListService';
import ExternalLink from '../components/ExternalLink';


export default class Modal extends React.Component {

  state = { packageDetails: this.props.p, downloads: {}, loading: true }

  componentWillReceiveProps(props) {
    this.setState({ packageDetails: props.p });

    if (props.p.package && props.p.package.length > 0) {
      axios.get(`https://api.npmjs.org/downloads/point/last-week/${props.p.package}`)
        .then((res) => {
          const data = res.data;
          this.setState({ downloads: data, loading: false });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    let { packageDetails, downloads, loading } = this.state;

    return (
      <div className="modal" style={{ display: this.props.isOpen ? "block" : "none", backgroundColor: "#0000009c" }}>

        <div className="modal-dialog" role="document">
          <div className="modal-content">

            {loading ? <Loading /> :
              (<>
                <div className="modal-header">
                  <h5 className="modal-title text-uppercase">
                    {packageDetails.package}
                  </h5>
                  <button type="button" className="close"
                    onClick={() => this.props.handleClose()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">
                  <p className="text-muted">{packageDetails.details.package.description}</p>

                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      latest version
                      <span className="badge badge-primary">{packageDetails.details.package.version}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      weekly downloads
                      <span className="badge badge-primary">{formatDownload(downloads.downloads)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Category
                      <span className="badge badge-primary">{packageDetails.category}</span>
                    </li>
                  </ul>

                  <div>
                    <ExternalLink
                      clx="btn btn-outline-primary btn-sm mt-3"
                      link={packageDetails.details.package.links.homepage}
                      text="WEBSITE"
                    />

                    <ExternalLink
                      clx="btn btn-outline-primary btn-sm mt-3 ml-2"
                      link={packageDetails.details.package.links.repository}
                      text="repository"
                    />
                  </div>

                </div>
              </>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
