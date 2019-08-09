import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

import { serverEndPoints } from '../service/providers';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CaptchaVerif from '../containers/CaptchaVerif';
import Alert from '../components/Alert';

export default class DeletePackage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      packageName: "",
      inputMSG: "",
      msg: "",
      captchatText: "", rndText: "",
      disableSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
  }

  handleCaptcha(e, rnd) {
    this.setState({ captchatText: e, rndText: rnd })
  }

  handleSubmit(e) {
    e.preventDefault();

    let { captchatText, rndText } = this.state;

    if (captchatText === rndText) {
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
                    this.setState({ msg: packageName + " package has been removed successfully" })
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
    else {
      this.setState({ msg: "Invalid captcha code, please try again." })
    }
  }

  render() {
    return (
      <div className="container py-5 w-50 mx-auto">
        <Helmet>
          <meta charSet="utf-8" />
          <title>NodePack - remove package</title>
        </Helmet>

        <h3 className="text-uppercase">Remove package</h3>
        <Alert clx="dark" text="You can delete the unnecessary or deprecated packages" />

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

          <CaptchaVerif
            value={this.state.captchatText}
            handleCaptcha={this.handleCaptcha}
          />

          <button
            type="submit"
            className="btn btn-primary mr-2"
            disabled={this.state.disableSubmit}>
            Confirm
          </button>

          <button type="reset" className="btn btn-danger">RESET</button>
        </form>

        {this.state.msg && <Alert text={this.state.msg} />}

      </div>
    )
  }
}
