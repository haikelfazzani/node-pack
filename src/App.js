import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './pages/Home';
import AddPackage from './pages/AddPackage';
import Nav from './components/Nav';

function App() {
  return (
    <Router>

      <Nav />

      <div className="container-fluid p-0 m-0">
        <Route exact path="/" component={Home} />
        <Route path="/add-package" component={AddPackage} />
      </div>
    </Router>
  );
}

export default App;
