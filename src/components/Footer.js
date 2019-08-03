import React from 'react';
import ExternalLink from './ExternalLink';

const githubLink = "https://github.com/haikelfazzani/node-pack/issues";

export default function Footer() {
  return (
    <footer className="w-100 p-w pt-0 mt-5">

      <div className="row mt-4">

        <div className="col-md-4">
          <p className="text-muted font-s14">
            CREATED AND MAINTAINED BY <ExternalLink
              link="https://github.com/haikelfazzani"
              text="HAIKEL FAZZANI" />
          </p>
        </div>

        <div className="col-md-4"></div>

        <div className="col-md-4">
          <p className="text-muted font-s14 float-md-right">
            © 2019 NODEPACK - <ExternalLink link={githubLink} text="issues" />
          </p>
        </div>

      </div>

    </footer>
  )
}
