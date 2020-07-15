import React from 'react';
import './App.css';
import Student from './vasu';
import { BrowserRouter,Route } from 'react-router-dom';
import Navbar from './Navbar';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={Navbar} />
      <Route path='/uninstall/:extension' component={Student} />
    </div>
    </BrowserRouter>
    
  );
}

export default App;
