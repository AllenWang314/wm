import React, { Component } from "react";
import Axios from "axios";

const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then(response => {
      this.setState({ data: response.data[0] });
    });
  }

  render() {
    return (
      <div className="App" key={this.state.data.slug}>
        <header className="App-header">
          <h1>
            <form>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.state.data.event_name}
                />
              </div>
            </form>
          </h1>
          <h2>{this.state.data.creator} </h2>
          <h3>{this.state.data.location} </h3>
        </header>
      </div>
    );
  }
}

export default Viewer;