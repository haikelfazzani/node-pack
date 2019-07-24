import React from 'react';
import axios from 'axios';

import Input from '../components/Input';
import Select from '../components/Select';

import categories from '../data/categories';
import CaptchaVerif from '../containers/CaptchaVerif';


const prodLink = "https://node-pack.herokuapp.com/api/node/add/library";
const devLink = "http://localhost:3001/api/node/add/library";

export default class AddPackage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      libname: "", link: "",
      category: categories[0],
      submitted: false, bntDisbale: false,
      serverResp: "",
      msg: "",
      captchatText: "", rndText: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { captchatText, rndText } = this.state;
    this.setState({ submitted: !this.state.submitted });

    if (captchatText === rndText) {
      let { libname, link, category } = this.state;

      if ((libname.length > 2 && link.length > 20) && category.length > 3) {

        axios.post(prodLink, { libname, link, category })
          .then(res => {
            this.setState({
              bntDisbale: true,
              serverResp: res.data,
              msg: res.data.result || res.data.err
            });
          });
      }
      else {
        this.setState({ msg: "invalid input, please try again!" })
      }
    }
    else { this.setState({ msg: "invalid captcha" }) }

  }

  componentDidMount() {
  }

  handleCaptcha(e, rnd) {
    this.setState({ captchatText: e.target.value, rndText: rnd })
  }

  render() {
    return (
      <div className="container py-5 w-50 mx-auto">

        <div className="text-center">
          <h2>ADD SOMETHING HELPFUL</h2>
          <p className="text-muted m-0">
            Please make sure the submission is not a fake package (or module),
          </p>
          <p>All fields are required *</p>
        </div>

        <form onSubmit={this.handleSubmit} className="mb-3" ref="myCanvas">

          <Input htmlFor="libname"
            lablText="package name"
            type="text"
            placeholder="Package name"
            handleChange={(e) => this.setState({ libname: e.target.value })} />

          <Input htmlFor="link"
            lablText="link"
            type="text"
            placeholder="Link : https://github.com/expressjs/express"
            handleChange={(e) => this.setState({ link: e.target.value })} />

          <Select htmlFor="categories"
            lablText="categories"
            options={categories.slice(1)}
            handleChange={(e) => this.setState({ category: e.target.value })}
          />

          <CaptchaVerif handleCaptcha={this.handleCaptcha} />

          <button type="submit" className="btn btn-primary mt-3 mr-3" disabled={this.state.bntDisbale}>
            Submit
          </button>

          <button type="reset" className="btn btn-danger mt-3">RESET</button>

        </form>


        {this.state.submitted &&
          (<div className="alert alert-dark" role="alert">{this.state.msg}</div>)
        }


      </div>)
  }
}
