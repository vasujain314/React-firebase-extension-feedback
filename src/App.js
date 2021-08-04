import React from 'react';
import './css/App.css';
import Uninstallform from './uninstall';
import Loginform from './adminlogin';
import { BrowserRouter,Route } from 'react-router-dom';
import Admin from './admin';
import Home from './Home';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={Home} />
      <Route path='/adminlogin' component={Loginform} />
      <Route exact path='/admin' component={Admin} />
      <Route path='/uninstall/:extension' component={Uninstallform} />
    </div>
    </BrowserRouter>
    
  );
}

export default App;
