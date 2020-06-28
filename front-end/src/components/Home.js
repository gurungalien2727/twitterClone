import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { getFromStorage, setInStorage } from "./storage";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  
  onClick() {
    this.setState({
      logout: true,
    });
  }

  render() {
    if (getFromStorage('local') === "true") {

      if (!this.state.logout) {
        return (
          <div>
              <p>{getFromStorage("local")}</p>
            <button onClick={this.onClick}>Logout</button>
            <h1>{this.props.isloggedIn}</h1>
          </div>
        );
      } else {
        this.props.change("false");
        localStorage.removeItem("local");
        return <Redirect to="/" />;
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}


export default Home;

