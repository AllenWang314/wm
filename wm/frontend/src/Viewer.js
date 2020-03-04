import React, { Component } from 'react';

class Viewer extends Component {
	constructor(props) {
		super(props);
		this.state = { data: []};
	}

	async componentDidMount() {
		try {
			const slug = this.props.match.params.slug
			const fetching = await fetch("http://localhost:8000/api/" + slug);
			const fetched_json = await fetching.json();
			this.setState({
				data: fetched_json[0]
			})
		} catch (e) {
			console.log(e);
		}
	}


  render() {
    return (
      <div className="App" key={this.state.data.slug}>
      <header className="App-header">
        <h1>
			<form>
			    <div className="col">
			      <input type="text" className="form-control" placeholder={this.state.data.event_name}/>
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