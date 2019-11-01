import React from 'react';
import AddPackageForm from '../containers/AddPackageForm';
import { Helmet } from "react-helmet";
import Alert from '../components/Alert';

function AddPackageHeader() {
  return <Alert
    clx="dark"
    text="PLEASE MAKE SURE THE SUBMISSION IS A BACKEND PACKAGE."
    text2="ALL FIELDS ARE REQUIRED *"
  />
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
