import React from 'react';


export default class PackageJson extends React.Component { // data.dependencies

  render() {
    let dep = [];
    for (let d in this.props.data.dependencies) {
      dep.push({ p: d, v: this.props.data.dependencies[d] })
    }

    

    return (
      <ul className="list-group w-50 mx-auto">
        {dep.map((d, i) => <li key={i} className="list-group-item">{d.p} - {d.v}</li>)}
      </ul>
    )
  }
}
