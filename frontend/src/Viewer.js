import React, { Component } from "react";
import Axios from "axios";
import MasterSelector from "./MasterSelector.js";
import { withRouter } from 'react-router-dom'
import './index.css';

const API_LINK = "http://localhost:8000/api/";

const date_array = [1583899200000,1584504000000,1584590400000]
const earliest  = 1
const latest = 4
const timezone = "America/New_York"
const name_array = ['Michelle', 'Rachel']
const availabilities = [[1583906400000, 1583908200000, 1583910000000, 1583911800000],[1584597600000, 1584599400000, 1584601200000]]

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      name: "",
      event_name: "",
      submitted: false,
      userIndex: -1,
      date_array: [],
      repeating: false,
      day_array: [],
      earliest: -1,
      latest: 24,
      timezone: "",
      name_array: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSignIn = this.generateSignIn.bind(this);
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then((response) => {
      this.setState({ data: (response.data[0]), 
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
      if (this.state.userIndex === -1) {
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

  generateContent(){
    console.log(this.state);
    if(this.state.event_name == "") return "";
    return(
      <MasterSelector             
            date_array={(this.state.repeating)? this.state.day_array : this.state.date_array}
            slug={this.state.slug}
            timezone={this.state.timezone}
            earliest={this.state.earliest} 
            latest={this.state.latest}
            name_array={this.state.name_array}
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
