import React from 'react';
import axios from 'axios';

import Input from '../components/Input';
import Select from '../components/Select';

import categories from '../data/categories';


const prodLink = "https://node-pack.herokuapp.com/api/node/add/library";
const devLink = "http://localhost:3001/api/node/add/library";

export default class AddPackage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      libname: "", link: "",
      category: categories[0],
      bntDisbale: false,
      serverResp: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let { libname, link, category } = this.state;
    axios.post(prodLink, { libname, link, category })
      .then(res => {

        this.setState({
          libname: "", link: "",
          category: categories[0],
          bntDisbale: true,
          serverResp: res.data
        });
      });

  }

  render() {
    return (
      <div className="container py-5 w-50 mx-auto">

        <div className="text-center">
          <h2>ADD SOMETHING HELPFUL</h2>
          <p className="text-muted m-0">Please make sure the submission is not a fake package (or module), </p>
          <p>All fields are required *</p>
        </div>

        <form onSubmit={this.handleSubmit} className="mb-3">

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
            options={categories}
            handleChange={(e) => this.setState({ category: e.target.value })}
          />

          <button type="submit" className="btn btn-primary mt-3" disabled={this.state.bntDisbale}>
            Submit
          </button>

        </form>


        {this.state.bntDisbale &&
          (<div className="alert alert-primary" role="alert">
            {"Successful submit :) !"}
          </div>)
        }


      </div>)
  }
}
