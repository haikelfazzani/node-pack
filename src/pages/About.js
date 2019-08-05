import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ExternalLink from '../components/ExternalLink';

const githubLink = "https://github.com/haikelfazzani/node-pack/issues";

export default function About() {
  return (

    <div className="jumbotron jumbotron-fluid text-uppercase mb-0">

      <Helmet>
        <meta charSet="utf-8" />
        <title>NodePack - about</title>        
      </Helmet>

      <div className="container">

        <div className="row">

          <div className="col-md-6">
            <h1 className="text-muted display-4">NodePack</h1>

            <div className="mb-5">
              <p>IS A PLACE WHERE YOU CAN find a collections of the best nodejs packages
                with details could help you to know some additional information
                of adding a npm package to your project
                and to speed up your developement process.
              </p>
            </div>

            <div className="mb-5">
              <h3 className="text-muted">Bugs and suggestions</h3>
              <p>all suggestions/feedbacks/pull requests and issues are welcome.</p>
              <ExternalLink
                clx="btn btn-primary font-s14 mr-2"
                link="https://github.com/haikelfazzani/node-pack"
                text="repository"
              />
              <ExternalLink clx="btn btn-primary font-s14" link={githubLink} text="issues" />
            </div>

          </div>

          <div className="col-md-6">

            <div className="mb-5">
              <h3 className="text-muted">Add and remove package</h3>
              <p>You could help us by adding or removing a package.</p>
              <Link to="/add-package" className="btn btn-primary font-s14 mr-2">Add Package</Link>
              <Link className="btn btn-primary font-s14" to="/remove-package">remove package</Link>
            </div>

            <div className="mb-5">
              <h3 className="text-muted">Inspiration</h3>

              <ul>
                <li><ExternalLink link="https://www.npmtrends.com" text="npmtrends" /></li>
                <li><ExternalLink link="https://www.javascripting.com" text="javascripting" /></li>
                <li><ExternalLink link="https://www.bestofjs.org" text="bestofjs" /></li>
                <li><ExternalLink link="https://www.bundlephobia.com" text="bundlephobia" /></li>
              </ul>

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

      </div>
    </div>
  )
}
