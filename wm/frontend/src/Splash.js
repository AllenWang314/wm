import React, { Component } from 'react';

class Splash extends Component {
	render() {
		return (
			<div className="App">
			 <header className="App-header">
				<form>
				    <div className="col">
				      <input type="text" className="form-control" placeholder="Event Name"/>
				    </div>
				</form>
				<div> 
				Repeating: <input type="checkbox" data-toggle="toggle" data-size="mini" data-offstyle="info"/>
				</div>
			 </header>
			</div>
		);
	}
}

export default Splash;