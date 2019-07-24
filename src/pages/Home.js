import React from 'react';
import axios from 'axios';
import Header from '../containers/Header';
import Loading from '../components/Loading';
import ListGroup from '../containers/ListGroup';
import categories from '../data/categories';
import Select from '../components/Select';

const prodLink = "https://node-pack.herokuapp.com/api/node/libraries";
const devLink = "http://localhost:3001/api/node/libraries";

export class Home extends React.Component {

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
    axios.get(prodLink).then(res =>
      this.setState({ packages: res.data, loading: false })
    )
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
                options={categories} handleChange={this.handleChange}
              />

              <ul className="list-group font-s14" id="list-categories">
                {categories.map((c, idx) =>
                  <li key={idx} onClick={() => this.setState({ category: c })}
                    className="list-group-item pb-1 pt-0" id="list-packages">{c}
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