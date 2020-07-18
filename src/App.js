import React from 'react';
import './App.css';
import Uninstallform from './uninstall';
import Loginform from './adminlogin';
import { BrowserRouter,Route } from 'react-router-dom';
import Admin from './admin';
import Navbar from './Navbar';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={Navbar} />
      <Route path='/adminlogin' component={Loginform} />
      <Route exact path='/admin' component={Admin} />
      <Route path='/uninstall/:extension' component={Uninstallform} />
    </div>
    </BrowserRouter>
    
  );
}

export default App;
