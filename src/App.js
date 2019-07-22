import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Home } from './pages/Home';
import { About } from './pages/About';
import AddLibrary from './pages/AddLibrary';
import Nav from './components/Nav';

function App() {
  return (
    <Router>

      <Nav />

      <div className="container-fluid p-0 m-0">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/add-library" component={AddLibrary} />
      </div>
    </Router>
  );
}

export default App;
