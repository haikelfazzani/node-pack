import React, { Component } from 'react';
import axios from 'axios';

import { npmEndPoints } from '../service/providers';

import { formatDownload } from '../service/ListService';
import { Line } from 'react-chartjs-2';


export default class PackageStat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      packName: this.props.packName,
      dateStart: "2019-07-03",
      dateEnd: "2019-08-03",
      isLoaded: false,
      chart: {},
      totalDownloads: 0
    }
  }

  componentWillReceiveProps(props) {
    if ((props.dateStart && props.dateStart.length > 5) && (props.dateEnd && props.dateEnd.length > 5)) {

      this.setState({ packName: props.packName, dateStart: props.dateStart, dateEnd: props.dateEnd });

      let { packName, dateStart, dateEnd } = props;

      let range = (dateStart && dateStart.length > 5) && (dateEnd && dateEnd.length > 5) ?
        `/${dateStart}:${dateEnd}/` : `/2019-07-03:2019-08-03/`;

      axios.get(npmEndPoints.npmDownloadsFromTo + range + packName)
        .then(res => {

          let days = res.data.downloads.map(r => r.day).map(d => {
            const months = [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
            ];
            let date = new Date(d);
            return (+date.getDate() < 10 ?
              "0" + date.getDate() :
              date.getDate()) + " " + months[date.getMonth()];
          });

          const data = {
            labels: ["", ...days],
            datasets: [
              {
                label: packName + ' downloads',
                data: [0, ...res.data.downloads.map(r => r.downloads)],
                fill: true,
                borderColor: '#007bff'
              }
            ]
          }
          this.setState({
            totalDownloads: res.data.downloads.map(r => r.downloads).reduce((a, c) => a + c),
            chart: data,
            isLoaded: true
          })
        })
        .catch(err => err)
    }

  }

  render() {

    return (
      <>
        {this.state.isLoaded && (
          <>
            <table className="table">
              <thead>
                <tr className="text-uppercase">
                  <th scope="col">Package</th>
                  <th scope="col">from</th>
                  <th scope="col">to</th>
                  <th scope="col">Total downloads</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>{this.state.packName}</td>
                  <td>{this.state.dateStart}</td>
                  <td>{this.state.dateEnd}</td>
                  <td>{formatDownload(this.state.totalDownloads)}</td>
                </tr>

              </tbody>
            </table>

            <Line data={this.state.chart} />
          </>
        )}
      </>
    )
  }
}
