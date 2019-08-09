import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default class BestPractice extends Component {

  state = { isLoaded: false, data: "" }

  componentDidMount() {
    axios.get("https://github.com/haikelfazzani/node-pack/blob/master/NodeBestPractice.md")
      .then(resp => resp)
      .then(data => {
        this.setState({data, isLoaded:true})
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
         {this.state.isLoaded && <ReactMarkdown source={this.state.data} />}
      </div>
    )
  }
}
