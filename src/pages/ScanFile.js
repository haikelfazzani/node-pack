import React from 'react';
import axios from 'axios';
import PackageJson from '../containers/PackageJson';

export default class ScanFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { infoFile: "", fileUrl: "", isLoaded: false, packageJSon: "" };
    this.handleLoadFile = this.handleLoadFile.bind(this);
  }

  handleLoadFile(e) {

    let infoFile = e.target.files[0];

    if (infoFile && infoFile.name === "package.json") {

      let fileUrl = URL.createObjectURL(infoFile);

      this.setState({
        infoFile: infoFile,
        fileUrl: fileUrl,
      })

      axios.get(URL.createObjectURL(e.target.files[0]))
        .then(res => {
          this.setState({ packageJSon: res.data, isLoaded: true })
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "#f3f3f3 !important" }}>
          <div className="container w-50 mx-atuo">
            <div className="custom-file mb-3">

              <input type="file"
                className="custom-file-input"
                id="customFile"
                onChange={this.handleLoadFile}
                required />
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>
          </div>
        </div>
        {this.state.isLoaded && <PackageJson data={this.state.packageJSon} />}
      </>
    )
  }
}
