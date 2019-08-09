import React from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { serverEndPoints } from '../service/providers';

import Header from '../containers/Header';
import Loading from '../components/Loading';
import ListGroup from './ListGroup';
import categories from '../service/categories';
import Select from '../components/Select';

function delay() { return 3; }

export default class LoadPackages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      categories: [], category: "",
      libName: "",
      loading: true,
    };
    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ category: e.target.value });
  }

  componentDidMount() {

    axiosRetry(axios, { retries: 3, shouldResetTimeout: true, retryDelay: () => { delay() } });

    axios.get(serverEndPoints.getPackages)
      .then(res => {
        const data = res.data
        this.setState({ packages: data, loading: false });
      })
      .catch(err => console.log(err));
  }

  getData(val) { this.setState({ libName: val }); }

  render() {
    return (
      <>
        <Header sendData={this.getData} />

        <div className="container py-3 mb-5">
          <div className="row">

            <div className="col-md-3 mb-3">

              <Select clx="form-group list-categories m-0"
                isLabelHide={true}
                options={categories} handleChange={this.handleChange}
              />

              <ul className="list-group font-s14" id="list-categories"
                style={{ padding: "15px 5px", backgroundColor: "#fff" }}>

                {categories.map((c, idx) =>
                  <li key={idx} onClick={() => this.setState({ category: (c.trim()).toLowerCase() })}
                    className="list-group-item pb-1 pt-0" id="list-packages">
                    <button className="btn btn-link font-s14 w-100 text-left">{c}</button>
                  </li>
                )}

              </ul>
            </div>


            <div className="col-md-9">

              {this.state.loading ?
                <Loading /> :
                <ListGroup
                  data={this.state.packages}
                  category={this.state.category}
                  libName={this.state.libName}
                />
              }
            </div>

          </div>
        </div>
      </>);
  }

}