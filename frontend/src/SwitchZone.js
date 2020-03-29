import React, { Component } from "react";
import {Select} from "grommet"

var moment = require('moment-timezone');
const all_zones = moment.tz.names()

class SwitchZone extends Component {
	constructor(props){
		super(props)
		this.state={
			timezone: moment.tz.guess()
		}
	}
	handleChange = (option) => {
		this.setState({timezone: option})
		this.props.onChange(option);
	}
	render(){
		return(
			<Select 
			size="xsmall"
			options={all_zones}
			placeholder={moment.tz.guess()}
			value={this.state.timezone}
			onChange={({option}) => this.handleChange(option)}
			/>
			)
	}
}

export default SwitchZone