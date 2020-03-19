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
    };
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then((response) => {
      this.setState({ data: (response.data[0])});
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

  generateContent(){
    return(
      <MasterSelector             
            date_array={this.state.data.date_array} 
            timezone={this.state.data.timezone}
            earliest={Number(this.state.data.earliest)}
            latest={Number(this.state.data.latest)}/>
      )
  }

  render() {
    return (
    <div className = "App">
      <div className = "App-header"> 
        <div className = "Splash">
          {this.generateContent()}
        </div>
      </div>
    </div>
    );
  }
}

export default withRouter(Viewer);
