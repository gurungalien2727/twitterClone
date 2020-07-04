import React, { Component } from "react";
import {Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import{
  getFromStorage,setInStorage
} from './storage.js';
import { set } from "local-storage";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
        email:'',
        password:'',
        userId:'',
        isLoggedIn:false
    }
    this.onChangeUsername=this.onChangeUsername.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
  }

  onChangeUsername(e){
    this.setState({
        email:e.target.value,
    })
  }

  onChangePassword(e){
      this.setState({
           password:e.target.value,
      })
  }

  onsubmit(e){
 e.preventDefault();
 alert(this.state.email+ " "+ this.state.password);
 const data={
     username:this.state.email,
     password:this.state.password
 }
 axios.post("http://localhost:4000/",data)
 .then((r)=>{
       alert(r.data.login);
       if(r.data.login==="sucessful"){
           this.setState({
               isLoggedIn:true,
               userId:r.data.id
           })
      alert(r.data.id);
       }
         
       
 }
 )
}

  render() {
   
    if(this.state.isLoggedIn){

        this.props.change("true");
        setInStorage('local',"true");
        setInStorage('id',this.state.userId);
       return <Redirect to='/homepage'/>
    
  }

  else{

    return (
      <div className="container">
        <div>
          <p>{getFromStorage("id")}</p>
          <p>{this.props.isLoggedIn}</p>
          <h3 style={{ textAlign: "center" }}>Twitter Clone</h3>
          <form onSubmit={this.onsubmit}>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                aria-describedby="emailHelp"
                onChange={this.onChangeUsername}
              />
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </form>
          <br />
          <div>
            <Link to={{ pathname: "/register" }}>Sign Up </Link>
          </div>
        </div>
      </div>
    );
  }
}
}

export default Login;
