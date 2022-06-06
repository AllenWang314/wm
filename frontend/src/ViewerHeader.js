import React, { Component } from "react";
import sign_in_demo from './STATIC/sign_in_demo.gif';
import select_times_demo from './STATIC/select_times_demo.gif';
import copy_link_demo from './STATIC/copy_link_demo.gif';
import view_availabilities_demo from './STATIC/view_availabilities_demo.gif';
import { AppBar, Toolbar, Button, Tooltip, Dialog, DialogTitle, DialogContent,DialogActions, Snackbar, Link } from '@material-ui/core';
import { Home, Help, Close, NavigateNext, Link as LinkIcon } from '@material-ui/icons';
import copy from "copy-to-clipboard";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:8000";

class ViewerHeader extends Component {
	constructor(props){
		super(props)
		this.state = {"openHelp" : false, "showLink": false, helpStatus: 0}
	}


	handleHelp = () =>{
		this.setState({"openHelp": !this.state.openHelp, helpStatus: (this.state.openHelp)? 0 : 1})
	}

	handleLink = () => {
		copy(window.location.href)
		this.setState({"showLink": !this.state.showLink})
	}

	handleNext = () => {
		this.setState({helpStatus: this.state.helpStatus + 1})
	}

	helpContent = () => {
		switch (this.state.helpStatus) {
			case (1):
				return (
					<div>
						<div> 1. Sign in with optional password
						</div>
						<br />
						<img src={sign_in_demo} />
					</div>
					);
			case (2):
				return (
				<div>
					<div> 2. Select available times
					</div>
					<br />
					<img src={select_times_demo} />
				</div>
				);
			case (3):
				return (
					<div>
						<div> 3. Copy and send the link to friends and colleagues
						</div>
						<br />
						<img src={copy_link_demo} />
					</div>
				);
			case (4):
				return (
					<div>
						<div> 4. Click to view availabilities
						</div>
						<br />
						<img src={view_availabilities_demo} />
					</div>
				);
			default:
				return (
				<div>
					<div> 1. Sign in with optional password
					</div>
					<br />
					<img src={sign_in_demo} />
				</div>
				);
		}
	}
	render() {
		return (
			<div>
			<AppBar position="static" color="transparent" style={{boxShadow: "none"}}>
				<Toolbar>
					<Tooltip title="Go back to main page">
				<Button >
					<Link href={FRONTEND_URL} color="inherit">
						<Home/>
					</Link>
				</Button>
					</Tooltip>
				<div style={{"marginLeft": "auto"}}>
					<Tooltip title="Copy link to clipboard">
				<Button onClick={this.handleLink}>
					<LinkIcon/>
				</Button>
					</Tooltip>
					<Tooltip title="Help">
				<Button onClick={this.handleHelp}>
					<Help/>
				</Button>
					</Tooltip>
				<Dialog open={this.state.openHelp}
				onClose={this.handleHelp}>
					<DialogTitle>
					Help and Info
					</DialogTitle>
					<DialogContent>
						{this.helpContent()}
					</DialogContent>
					<DialogActions>
						{(this.state.helpStatus === 4)? (<Button onClick={this.handleHelp} >
							<Close/> Close
						</Button>) :
						(<Button onClick ={this.handleNext} >
							<NavigateNext/> Next
						</Button>)}
					</DialogActions>
				</Dialog>
				</div>
				</Toolbar>
			</AppBar>
			<Snackbar
				open={this.state.showLink}
				autoHideDuration={2000}
				onClose={this.handleLink}
				anchorOrigin={{
			          vertical: 'bottom',
			          horizontal: 'left',
				}}
				message="Link copied!"
				/>
			</div>
			)
	}
}

export default ViewerHeader