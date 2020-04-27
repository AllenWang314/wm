import React, { Component } from "react";
import { NativeSelect } from '@material-ui/core';

var moment = require('moment-timezone');
const all_zones = moment.tz.names()

class SwitchZone extends Component {
	constructor(props){
		super(props)
		this.state={
			timezone: moment.tz.guess()
		}
	}

	generateZones (){
            var rows = []
            for (var zone of all_zones){
                if (zone === moment.tz.guess()){
                    rows.push(<option defaultValue value={zone}key={zone}> {zone} </option>)
                }
                else {
                    rows.push(<option value={zone} key={zone}> {zone} </option>)
                }
            }
            return(rows)
        }

	handleChange = (e) => {
		this.setState({timezone: e.target.value})
		this.props.onChange(e.target.value);
	}

	render() {
        return (
            <NativeSelect
            name={this.props.name}
            as={this.props.as}
            className="Timezone"
            value={this.state.timezone} 
            onChange={(e) => this.handleChange(e)}
            >
            {this.generateZones()}
            </NativeSelect>
            )
    }
}

export default SwitchZone