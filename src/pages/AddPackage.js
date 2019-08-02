import React from 'react';
import AddPackageForm from '../containers/AddPackageForm';
import { Helmet } from "react-helmet";

function AddPackageHeader() {
  return (
    <div className="text-center">
      <h2>ADD SOMETHING HELPFUL</h2>
      <p className="text-muted m-0">
        Please make sure the submission is not a fake package (or module),
      </p>
      <p>All fields are required *</p>
    </div>
  )
}

export default function AddPackage() {

  return (
    <div className="container py-5 w-50 mx-auto">

      <Helmet>
        <meta charSet="utf-8" />
        <title>NodePack - add package</title>
      </Helmet>

      <AddPackageHeader />

      <AddPackageForm />

    </div>)
}
