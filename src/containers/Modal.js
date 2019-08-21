import React from 'react';
import axios from 'axios';

import Loading from '../components/Loading';
import ExternalLink from '../components/ExternalLink';
import LiBadge from '../components/LiBadge';

import { formatDownload } from '../service/ListService';
import { npmEndPoints } from '../service/providers';

import { formatDate } from '../service/format-date';

export default class Modal extends React.Component {

  state = { packageDetails: this.props.p, details: {}, downloads: {}, loading: true }

  componentWillReceiveProps(props) {
    this.setState({ packageDetails: props.p });

    if (props.p.package && props.p.package.length > 0) {

      axios.all([
        axios.get(`${npmEndPoints.packageDetails}/${props.p.package}`),
        axios.get(`${npmEndPoints.npmDownloads}/${props.p.package}`)
      ])
        .then(axios.spread((acct, perms) => {
          this.setState({
            details: acct.data, downloads: perms.data, loading: false
          });
        }));
    }
  }

  render() {
    let { packageDetails, details, downloads, loading } = this.state;

    return (
      <div className="modal modal-dialog-scrollable"
        style={{ display: this.props.isOpen ? "block" : "none", backgroundColor: "#0000009c" }}>

        <div className="modal-dialog" role="document">
          <div className="modal-content overflow-auto">

            {loading ? <Loading /> :
              (<>
                <div className="modal-header">

                  <h5 className="modal-title text-uppercase">
                    <span className="mr-2">{packageDetails.package} </span>
                    <img src={npmEndPoints.minified + packageDetails.package} alt="package size" />
                    <p className="text-muted font-s14 m-0 p-0">

                      <span className="badge badge-info mr-2">
                        {"v" + details.collected.metadata.version}
                      </span>
                      <span className="badge badge-info mr-2">
                        {"last publish : " + formatDate(details.collected.metadata.date)}
                      </span>

                      <span className="badge badge-danger">
                        N°dependencies : {
                          details.collected.metadata.dependencies
                            ? Object.keys(details.collected.metadata.dependencies).length
                            : 0
                        }
                      </span>


                    </p>
                    <div>
                      <p className="text-muted font-s14 m-0 p-0">
                        {details.collected.metadata.description}
                      </p>
                    </div>
                  </h5>

                  <button type="button" className="close"
                    onClick={() => this.props.handleClose()}>
                    <span aria-hidden="true">&times;</span>
                  </button>

                </div>

                <div className="modal-body">

                  <ul className="list-group">
                    <LiBadge
                      text="weekly downloads"
                      badgeText={formatDownload(downloads.downloads)}
                    />

                    {details.collected.github &&
                      (<>
                        <LiBadge
                          text="stars"
                          badgeText={formatDownload(details.collected.github.starsCount)}
                        />

                        <LiBadge
                          text="forks"
                          badgeText={formatDownload(details.collected.github.forksCount)}
                        />

                        <LiBadge
                          text="issues"
                          badgeText={formatDownload(details.collected.github.issues.count)}
                        />

                        <LiBadge
                          text="open issues"
                          badgeText={formatDownload(details.collected.github.issues.openCount)}
                        />

                        <LiBadge
                          text="license"
                          badgeText={details.collected.metadata.license}
                        />
                      </>)
                    }


                  </ul>

                  <div>
                    <ExternalLink
                      clx="btn btn-outline-primary btn-sm mt-3"
                      link={details.collected.metadata.links.npm}
                      text="npm"
                    />

                    <ExternalLink
                      clx="btn btn-outline-primary btn-sm mt-3 ml-2"
                      link={details.collected.metadata.links.homepage}
                      text="WEBSITE"
                    />

                    <ExternalLink
                      clx="btn btn-outline-primary btn-sm mt-3 ml-2"
                      link={details.collected.metadata.links.repository}
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
