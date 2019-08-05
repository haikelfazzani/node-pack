import React from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';

const githubLink = "https://github.com/haikelfazzani/node-pack/issues";

export default function About() {
  return (

    <div className="jumbotron jumbotron-fluid text-uppercase mb-0">
      <div className="container w-50">
        <h1 className="text-muted display-4">NodePack</h1>

        <div className="mb-5">
          <p>IS A PLACE WHERE YOU CAN find a collections of the best nodejs packages
            with details could help you to know some additional information
            of adding a npm package to your project
            and to speed up your developement process.
        </p>
        </div>

        <div className="mb-5">
          <h3 className="text-muted">Add and remove package</h3>
          <p>You could help us by adding or removing a package</p>
          <Link to="/add-package" className="btn btn-primary font-s14 mr-2">Add Package</Link>
          <Link className="btn btn-primary font-s14" to="/remove-package">remove package</Link>
        </div>

        <div className="mb-5">
          <h3 className="text-muted">Bugs and suggestions</h3>
          <p>If you find any bugs or have a suggestion, please open an issue on github!</p>
          <ExternalLink clx="btn btn-primary font-s14" link={githubLink} text="issues" />
        </div>


        <div className="mb-5">
          <h3 className="text-muted">External Apis</h3>

          <ul>
            <li><ExternalLink link="https://api.npms.io" text="npmjs download api" /></li>
            <li><ExternalLink link="https://api.npmjs.org" text="npms.io api" /></li>
            <li><ExternalLink link="https://flat.badgen.net/bundlephobia/" text="bundlephobia" /></li>
          </ul>

        </div>


      </div>
    </div>
  )
}
