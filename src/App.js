import React from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './pages/Home';
import AddPackage from './pages/AddPackage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import DeletePackage from './pages/DeletePackage';
import About from './pages/About';
import PackageDetails from './pages/PackageDetails';
import BestPractice from './pages/BestPractice';

function App() {
  return (
    <Router>

      <Nav />

      <div className="container-fluid p-0 m-0">
        <Route exact path="/" component={Home} />
        <Route exact path="/package/stat" component={PackageDetails} />
        <Route exact path="/add-package" component={AddPackage} />
        <Route exact path="/remove-package" component={DeletePackage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/best" component={BestPractice} />

      </div>

      <Footer />
    </Router>
  );
}

export default App;
