import React from 'react';
import axios from 'axios';

import Input from '../components/Input';
import Select from '../components/Select';

import categories from '../data/categories';
import CaptchaVerif from '../containers/CaptchaVerif';


const prodLink = "https://node-pack.herokuapp.com/api/node/add/library";
const devLink = "http://localhost:3001/api/node/add/library";

function AddPackageHeader() {
  return (
    <div className="text-center">
      <h2>ADD SOMETHING HELPFUL</h2>
      <p className="text-muted m-0">
        Please make sure the submission is not a fake package (or module),
          </p>
      <p>All fields are required *</p>
    </div>
  )
}

export default class AddPackage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      libname: "", link: "",
      category: "",
      submitted: false, bntDisbale: false,
      serverResp: "",
      msg: "", errorMsg: "",
      captchatText: "", rndText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value }); }

  handleSelect(e) { this.setState({ category: e.target.value }); }

  handleSubmit(e) {
    e.preventDefault();

    const { captchatText, rndText } = this.state;
    this.setState({ submitted: true });

    if (captchatText === rndText) {
      let { libname, link, category } = this.state;

      if (libname.length > 2 && link.length > 20) {

        this.setState({ bntDisbale: true });

        axios.post(prodLink, { libname, link, category })
          .then(res => {
            this.setState({
              serverResp: res.data,
              msg: res.data.result,
              errorMsg: res.data.err,
              libname: "", link: "", captchatText: ""
            });
          })
          .catch(err => err);
      }
      else {
        this.setState({ errorMsg: "invalid input, please try again!" })
      }
    }
    else {
      this.setState({ errorMsg: "invalid captcha" })
    }

  }

  handleCaptcha(e, rnd) {
    this.setState({ captchatText: e.target.value, rndText: rnd })
  }

  render() {
    return (
      <div className="container py-5 w-50 mx-auto">

        <AddPackageHeader />

        <form onSubmit={this.handleSubmit} className="mb-3" ref="myCanvas">

          <Input htmlFor="libname"
            lablText="package name"
            type="text"
            name="libname"
            value={this.state.libname}
            handleChange={this.handleChange}
            placeholder="Package name" />

          <Input htmlFor="link"
            lablText="link"
            type="text"
            name="link"
            value={this.state.link}
            handleChange={this.handleChange}
            placeholder="Link : https://github.com/expressjs/express" />

          <Select htmlFor="categories"
            lablText="categories"
            options={categories.slice(1)}
            name="categories"
            handleChange={this.handleSelect}
          />

          <CaptchaVerif
            value={this.state.captchatText}
            handleCaptcha={this.handleCaptcha}
          />

          <button type="submit" className="btn btn-primary mt-3 mr-3" disabled={this.state.bntDisbale}>
            Submit
          </button>

          <button type="reset" className="btn btn-danger mt-3">RESET</button>

        </form>


        {(this.state.msg.length > 0 || this.state.errorMsg.length < 0) &&
          (<div className="alert alert-dark flipInX" role="alert">
            {this.state.msg || this.state.errorMsg}
          </div>)
        }


      </div>)
  }
}
