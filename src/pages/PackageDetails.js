import React from 'react';
import axios from 'axios';
import { npmEndPoints } from '../service/providers';

import { Line } from 'react-chartjs-2';
import Loading from '../components/Loading';

export default class PackageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packName: this.props.match.params.package,
      dateStart: "",
      dateEnd: "",
      isLoaded: false, chart: {}
    }
  }

  componentDidMount() {
    const packName = this.props.match.params.package;
    axios.get(npmEndPoints.npmDownloadsFromTo + "/2019-07-03:2019-08-03/" + packName)
      .then(res => {

        let days = res.data.downloads.map(r => r.day).map(d => {
          const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
          ];
          let date = new Date(d);
          return months[date.getMonth()] + " " + date.getDay();
        })

        const data = {
          labels: ["", ...days],
          datasets: [
            {
              label: packName + ' downloads',
              data: [0, ...res.data.downloads.map(r => r.downloads)],
              fill: true,          // Don't fill area under the line
              borderColor: '#007bff'  // Line color
            }
          ]
        }
        this.setState({ chart: data, isLoaded: true })
      })
      .catch(err => console.log(err))
  }

  render() {

    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container w-50 mx-auto">

            <h3 className="text-uppercase">{this.state.packName}</h3>

            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label htmlFor="date-start">Date start</label>
                  <input type="date"
                    className="form-control"
                    id="date-start"
                    placeholder="Enter date start"
                    value={this.state.dateStart}
                    onChange={(e) => this.setState({ dateStart: e.target.value })}
                  />
                </div>


              </div>

              <div className="col-md-5">
                <div className="form-group">
                  <label htmlFor="date-end">date end</label>
                  <input type="date"
                    className="form-control"
                    id="date-end"
                    placeholder="Enter date end"
                    value={this.state.dateEnd}
                    onChange={(e) => this.setState({ dateEnd: e.target.value })}
                  />
                </div>
              </div>


              <div className="col-md-2">
                <button type="button" className="btn btn-primary"
                  style={{ marginTop: "1.9em" }}>SHOW</button>
              </div>

            </div>


          </div>
        </div>

        <div className="container w-50 py-5 mx-auto">
          {this.state.isLoaded ? <Line data={this.state.chart} /> : <Loading />}
        </div>
      </>
    )
  }
}
