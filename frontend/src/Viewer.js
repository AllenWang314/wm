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
      event_name: "",
      submitted: false,
      date_array: [],
      repeating: false,
      day_array: [],
      userIndex: -1,
      earliest: -1,
      latest: 24,
      timezone: "",
      name_array: [],
      newUser: -1, // -1: not submitted yet, 0: not a new user, 1: yes new user
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
        event_name: response.data[0].event_name,
        date_array: response.data[0].date_array,
        day_array: response.data[0].day_array,
        name_array: response.data[0].name_array,
        timezone: response.data[0].timezone,
        slug: response.data[0].slug,
        repeating: response.data[0].repeating,
        earliest: response.data[0].earliest,
        latest: response.data[0].latest
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
          this.setState({ newUser: 1 });
          response.data[0].name_array.push(this.state.name);
          Axios.put(API_LINK + this.props.match.params.slug, response.data[0])
            .then(() => {
              if (this.state.userIndex === -1) {
                this.setState({
                  userIndex: response.data[0].name_array.length - 1, submitted: true, name_array: response.data[0].name_array
                });
              }
            });
        }
        else {
          this.setState({ newUser: 0 });
          if (this.state.userIndex === -1) {
            var i = 0;
            let narray = response.data[0].name_array;
            while (i < narray.length && narray[i] !== this.state.name) {
              i++;
            }
            if (this.state.userIndex === -1) {
              console.log(narray);
              this.setState({ userIndex: i, submitted: true, name_array: narray });
            }
          }
        }
      });
    }
    );
  }

  generateSignIn() {
    if (!this.state.submitted || this.state.newUser === -1) {
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
      return (<div>Welcome {this.state.name}! You are at index {this.state.userIndex}!</div>)
    }
  }

  generateContent() {
    if (this.state.event_name == "") return "";
    return (
      <MasterSelector
        name={this.state.name}
        date_array={(this.state.repeating) ? this.state.day_array : this.state.date_array}
        slug={this.state.slug}
        timezone={this.state.timezone}
        earliest={Number(this.state.earliest)}
        latest={Number(this.state.latest)}
        name_array={this.state.name_array}
        newUser={this.state.newUser}
        userIndex={this.state.userIndex}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Splash">
            {this.generateSignIn()}
            {this.generateContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Viewer);
