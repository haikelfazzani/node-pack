import React from 'react';
import PackageStat from '../containers/PackageStat';

export default class PackageDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      packName: "",
      dateStart: "",
      dateEnd: "",
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
  }

  render() {

    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">

            <h3 className="text-uppercase">{this.state.packName || "package"}</h3>

            <form onSubmit={this.handleSubmit}>
              <div className="row">

                <div className="col-md-4">

                  <input type="text"
                    className="form-control"
                    name="packName"
                    value={this.state.packName}
                    onChange={(e) => this.setState({ packName: e.target.value })}
                    placeholder="Enter package name"
                    required />

                </div>

                <div className="col-md-3">

                  <input type="date"
                    className="form-control"
                    placeholder="Enter date start"
                    value={this.state.dateStart}
                    onChange={(e) => this.setState({ dateStart: e.target.value })}
                    required />
                </div>

                <div className="col-md-3">
                  <input type="date"
                    className="form-control"
                    placeholder="Enter date end"
                    value={this.state.dateEnd}
                    onChange={(e) => this.setState({ dateEnd: e.target.value })}
                    required />
                </div>


                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary btn-block">SHOW</button>
                </div>

              </div>
            </form>


          </div>
        </div>

        {this.state.submitted && (
          <div className="container w-75 py-5 mx-auto">

            <PackageStat
              packName={this.state.packName}
              dateStart={this.state.dateStart}
              dateEnd={this.state.dateEnd}

            />
          </div>
        )}
      </>
    )
  }
}
