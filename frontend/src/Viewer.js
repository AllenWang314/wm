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
const availabilities = [[1583906400000, 1583908200000, 1583910000000, 1583911800000],[1584597600000, 1584599400000, 1584601200000, 1583911800000]]

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      name: "",
      submitted: false,
      userIndex: -1,
      date_array: date_array,
      earliest: earliest,
      latest: latest,
      timezone: timezone,
      name_array: name_array,
      availabilities: availabilities
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateSignIn = this.generateSignIn.bind(this);
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then((response) => {
      this.setState({ data: (response.data[0])});
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
    return(
      <MasterSelector             
            date_array={this.state.date_array} 
            timezone={this.state.timezone}
            earliest={Number(this.state.earliest)}
            latest={Number(this.state.latest)}
            name_array={this.state.name_array}
            availabilities={this.state.availabilities}/>
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
