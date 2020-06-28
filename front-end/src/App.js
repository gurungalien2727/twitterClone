import React from 'react';
import Login from './components/Login.js';
import Home from './components/Home.js';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import axios from 'axios';
import { getFromStorage, setInStorage } from "./components/storage";

import ls from 'local-storage';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isloggedIn:"false"
    }
    this.changeProp=this.changeProp.bind(this);
  }
  

  

  changeProp(s){
    this.setState({
      isloggedIn:s,
    })
  }

render(){
  return (
    <Router>
      <Route path="/" exact render={props=>(
        <Login {...props} isLoggedIn={this.state.isloggedIn} change={this.changeProp}/>
      )}/>
      <Route path="/homepage" exact render={props=>(
        <Home {...props}  isloggedIn={this.state.isloggedIn} change={this.changeProp} />
      )}/>
    </Router>
  );

  }
}

export default App;
