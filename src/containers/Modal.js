import React from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { formatDownload } from '../service/ListService';
import ExternalLink from '../components/ExternalLink';
import LiBadge from '../components/LiBadge';

function PackageBadges({ badges }) {
  return (<>
    {badges && badges.length > 0 &&
      badges.map((b, indx) => {
        return (<img key={indx} src={b.urls.original || b.urls.shields} alt=".." className="mr-2" />)
      })}
  </>)
}

export default class Modal extends React.Component {

  state = { packageDetails: this.props.p, details: {}, downloads: {}, loading: true }

  componentWillReceiveProps(props) {
    this.setState({ packageDetails: props.p });

    if (props.p.package && props.p.package.length > 0) {

      axios.all([
        axios.get(`https://api.npms.io/v2/package/${props.p.package}`),
        axios.get(`https://api.npmjs.org/downloads/point/last-week/${props.p.package}`)
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
      <div className="modal"
        style={{ display: this.props.isOpen ? "block" : "none", backgroundColor: "#0000009c" }}>

        <div className="modal-dialog" role="document">
          <div className="modal-content overflow-auto">

            {loading ? <Loading /> :
              (<>
                <div className="modal-header">
                  <h5 className="modal-title text-uppercase">
                    {packageDetails.package}
                    <div><p className="text-muted font-s14 m-0 p-0">{details.collected.metadata.description}</p></div>
                  </h5>
                  <button type="button" className="close"
                    onClick={() => this.props.handleClose()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal-body">

                  <div className="mb-3"><PackageBadges badges={details.collected.source.badges} /> </div>

                  <ul className="list-group">
                    <LiBadge
                      text="current version"
                      badgeText={details.collected.metadata.version}
                    />

                    <LiBadge
                      text="weekly downloads"
                      badgeText={formatDownload(downloads.downloads)}
                    />

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
