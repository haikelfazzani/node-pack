import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ListGroup from '../containers/ListGroup';
import categories from '../data/categories';

const prodLink = "https://node-pack.herokuapp.com/api/node/libraries";
const devLink = "http://localhost:3001/api/node/api/node/libraries";

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      libraries: [],
      categories: [], category: "",
      libName: "",
      loading: true,
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    axios.get(prodLink)
      .then(res => this.setState({ libraries: res.data, loading: false }));
  }

  getData(val) { this.setState({ libName: val }); }

  render() {
    return (
      <>
        <Header sendData={this.getData} />

        <div className="container py-3 mb-5">

          <div className="row">

            <div className="col-md-3 mb-3">
              <ul className="list-group lst-left">
                {categories.map((c, idx) =>
                  <li key={idx}
                    onClick={() => this.setState({ category: c })}
                    className="list-group-item d-flex justify-content-between align-items-center pb-0">
                    {c}
                  </li>
                )}
              </ul>
            </div>


            <div className="col-md-9">

              {this.state.loading ?
                <Loading /> :
                <ListGroup
                  data={this.state.libraries}
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