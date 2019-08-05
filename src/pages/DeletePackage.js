import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

import { serverEndPoints } from '../service/providers';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class DeletePackage extends Component {

  constructor(props) {
    super(props);

    this.state = { packageName: "", inputMSG: "", msg: "", disableSubmit: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    confirmAlert({
      title: 'Confirm delete process',
      message: 'Please make sure, the name of package is correct before clicking yes.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

            let { packageName } = this.state;

            if (packageName && packageName.length > 2) {

              this.setState({ disableSubmit: true })

              axios.post(serverEndPoints.deletePackage, { packageName })
                .then(res => {
                  this.setState({ msg: res.data.result })
                })
                .catch(error => error)
            }
            else {
              this.setState({ inputMSG: "invalid input" })
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });

  }

  render() {
    return (
      <div className="container py-5 w-50 mx-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>NodePack - delete package</title>
        </Helmet>

        <div className="alert alert-danger text-uppercase mb-3" role="alert">
          <h3 className="alert-heading">Delete Package</h3>
          <hr />
          <p className="p-0 m-0">Why you need to delete a package already added?</p>
          <p className="p-0 m-0">Is there anything wrong with it!</p>
          <p className="p-0 m-0">if it's, please make sure to enter the correct name.</p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="package-name">Package name</label>

            <input
              type="text"
              className="form-control"
              id="package-name"
              placeholder="Enter package name"
              name="packageName"
              value={this.state.packageName}
              onChange={(e) => this.setState({ packageName: e.target.value })}
              required />

            {this.state.inputMSG &&
              <small id="emailHelp" className="form-text text-muted">
                {this.state.inputMSG}
              </small>
            }
          </div>

          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={this.state.disableSubmit}>
            Confirm
          </button>

          <button type="reset" className="btn btn-danger">RESET</button>
        </form>

        {this.state.msg &&
          <div className="alert alert-primary mt-3" role="alert">
            {this.state.msg}
          </div>
        }

      </div>
    )
  }
}
