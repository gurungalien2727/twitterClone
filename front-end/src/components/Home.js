import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { getFromStorage, setInStorage } from "./storage";
import Tweet from './Tweet.js';

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
    if (this.props.isloggedIn=== "true") {

      if (!this.state.logout) {
        return (
          <div>
            <button
              style={{float:"right"}}
              type="button"
              onClick={this.onClick}
              class="btn btn-secondary"
            >
              Logout
            </button>
            <h3>{getFromStorage('username')}</h3>
            <Tweet tweets={this.props.tweets} />
          </div>
        );
      } else {
        this.props.change("false");
        localStorage.removeItem("local");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        return <Redirect to="/" />;
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}


export default Home;

