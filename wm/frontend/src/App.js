import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: []};
  }

  async componentDidMount() {
    try {
      const slug = window.location.pathname.slice(1)
      const fetching = await fetch("http://localhost:8000/api/" + slug);
      const fetched_json = await fetching.json();
      this.setState({
        data: fetched_json[0]
      });
      console.log(this.state.data[0])
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    return (
      <div key={this.state.data.slug}>
        <h1>{this.state.data.event_name} </h1>
        <h2>{this.state.data.creator} </h2>
        <h3>{this.state.data.location} </h3>
      </div>
    );
  }
}

export default App;
