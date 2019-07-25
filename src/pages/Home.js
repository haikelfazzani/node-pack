import React from 'react'
import LoadPackages from '../containers/LoadPackages';
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>NodePack - list of npm packages</title>
        <meta name="description" content="list of npm packages and modules for nodejs developers" />
      </Helmet>
      <LoadPackages />
    </>
  )
}
