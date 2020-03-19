import React, { Component } from "react";
import Axios from "axios";
import MasterSelector from "./MasterSelector.js";
import { withRouter } from 'react-router-dom'
import './index.css';

const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      name: "",
      submitted: false,
      userIndex: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSignIn = this.generateSignIn.bind(this);
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then((response) => {
      this.setState({
        data: (response.data[0]),
        content: <MasterSelector slug={slug} dates={(response.data[0].repeating) ? response.data[0].day_array : response.data[0].date_array} />
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true }, () => {
      Axios.get(API_LINK + this.props.match.params.slug).then((response) => {
        if (!response.data[0].name_array.includes(this.state.name)) {
          response.data[0].name_array.push(this.state.name);
          Axios.put(API_LINK + this.props.match.params.slug, response.data[0])
            .then(res => console.log(res.data));
        }
      });
    var i = 0;
    let name_array;
    Axios.get(API_LINK + this.props.match.params.slug).then((response) => {
      name_array = response.data[0].name_array;
      while (i < name_array.length & name_array[i] !== this.state.name) {
        console.log(typeof name_array[i]);
        i++;
      }
      if (this.state.userIndex == -1) {
        this.setState({ userIndex: i, submitted: true });
      }
    });}
    );
  }

  generateSignIn() {
    if (!this.state.submitted || this.state.userIndex === -1) {
      return (<div>
        <input
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          Sign In
        </button>
      </div>);
    }
    else {
      return (<div>Welcome {this.state.name}! You are index {this.state.userIndex}!</div>)
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"> {this.state.data.event_name}
          <div className="Splash">
            {this.generateSignIn()}
            {this.state.content}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Viewer);
