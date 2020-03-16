import React, { Component } from "react";
import Axios from "axios";
import MasterSelector from "./MasterSelector.js";

const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then(response => {
      this.setState({ data: (response.data[0])? response.data[0] : [] });
    });
  }

  /*
          event_name: this.state.data.event_name,
          timezone: this.state.data.timezone,
          earliest: this.state.data.earliest,
          latest: this.state.data.latest,
          repeating: this.state.data.repeating,
          slug: this.state.data.slug,
          creator: this.state.data.creator,
          location: this.state.data.location
  */


  render() {
    const testDates = [0,1,2,3];
    return (
    <div>
      <h1>Testing ... event name is {this.state.data.event_name}</h1>
      <MasterSelector 
          // pass dates as an array
         dates = {testDates} />
    </div>
    );
  }
}

export default Viewer;
