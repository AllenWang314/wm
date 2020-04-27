import React, { Component } from "react";
import { AppBar, Toolbar, Button, Tooltip, Dialog, DialogTitle, DialogContent,DialogActions, Snackbar, Link } from '@material-ui/core';
import { Home, Help, Close,Link as LinkIcon } from '@material-ui/icons';
import copy from "copy-to-clipboard";

class ViewerHeader extends Component {
	constructor(props){
		super(props)
		this.state = {"openHelp" : false, "showLink": false}
	}


	handleHelp = () =>{
		this.setState({"openHelp": !this.state.openHelp})
	}

	handleLink = () => {
		copy("localhost:3000/" + this.props.slug)
		this.setState({"showLink": !this.state.showLink})
	}

	render() {
		return (
			<div>
			<AppBar position="static" color="transparent" style={{boxShadow: "none"}}>
				<Toolbar>
					<Tooltip title="Go back to main page">
				<Button >
					<Link href={"localhost:3000/" + this.props.slug} color="inherit">
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
					<DialogContent>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales viverra velit, et accumsan risus tempus sed. Praesent hendrerit ut lorem eu maximus. Mauris quis tellus tristique, consequat erat eu, placerat lectus. Donec luctus lacinia nisi, vitae elementum ex blandit a. Proin congue interdum justo, quis semper lacus tincidunt id. Aliquam sit amet eros ut urna pretium consequat. Praesent vitae risus ante. Phasellus tincidunt consectetur mi commodo congue. Nam ut nisl dui. Curabitur tempus diam ut ex mollis, non maximus enim dapibus. Ut eu leo sed nunc consectetur molestie. Vivamus sodales tempor velit, vitae malesuada odio tristique vel. Mauris iaculis enim porta, ornare sem vitae, placerat libero. Suspendisse dictum enim vitae tellus ultrices, id varius orci rutrum.
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleHelp} >
							<Close colorPrimary/> Close
						</Button>
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