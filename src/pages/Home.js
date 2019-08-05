import React from 'react'
import LoadPackages from '../containers/LoadPackages';
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>NodePack - list of the best nodejs npm packages</title>
        <meta name="description" content="a collections of npm packages and modules for Nodejs Developerss" />
      </Helmet>
      <LoadPackages />
    </>
  )
}
