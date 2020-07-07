import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onsubmit = this.onsubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onsubmit(e) {
    e.preventDefault();
    alert(this.state.username + " " + this.state.password);
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post("http://localhost:4000/register", data).then((res) => {
     
    alert(res.data.name);
     
    });
    window.location='/';
  }

  render() {
   
      return (
        <div className="container">
          <div>
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

              <button type="submit" class="btn btn-light">
                Sign Up
              </button>
            </form>
            <br/>
            <Link to={{ pathname: "/" }} style={{ color: "white" }}>

              Already have an account{" "}
            </Link>
          </div>
        </div>
      );
    
  }
}

export default Register;
