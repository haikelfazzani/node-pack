import React from 'react';
import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer className="w-100 d-md-flex flex-sm-row justify-content-md-between p-w pt-0 mt-5">
      <p className="text-muted font-s14">
        CREATED AND MAINTAINED BY <ExternalLink link="https://github.com/haikelfazzani" 
        text="HAIKEL FAZZANI" />
      </p>
      <p className="text-muted font-s14">© 2019 NODEPACK</p>
    </footer>
  )
}
