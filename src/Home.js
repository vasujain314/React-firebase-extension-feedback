import { formatMs } from '@material-ui/core';
import React from 'react';
import './css/index.css';

function Home() {
  return (
      <div>
    <div className='jumbotron'>
        <h3>
            welcome to project
        </h3>
        
    </div>
    <div className='container'>
        <p>docs:</p>
        <h1><strong>For users</strong></h1>
        <h3>Please enter link /uninstall/extensionName</h3>
        <h1><strong>For Admins</strong></h1>
        <p>Please <a href='/adminlogin'>click here</a></p>
        <p>Username:requestly </p><p>password:Adminrequestly</p>
    </div>
    </div>
  );
}

export default Home;
