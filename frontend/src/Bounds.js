import React, { Component } from "react";
import { NativeSelect } from '@material-ui/core';

class Bounds extends Component {

	generateOptions (){
		var rows = []
		rows.push(<option value="0" key='0'>Midnight </option>)
		for (var i = 1; i <= 11; ++i){
				rows.push(<option value={i} key={i}>{i} AM </option>)
			}
		rows.push(<option value={12} key='12'>Noon </option>)
		for (var j = 1; j <= 11; ++j){
				rows.push(<option value={j + 12} key={j+12} >{j} PM </option>)
			}
		rows.push(<option value="0" key="24">Midnight </option>)
		return(rows)
		}

	render () {
		return(
			<NativeSelect
			name={this.props.name}
            as={this.props.as}
            className="Bounds"
            defaultValue={this.props.value} 
            onChange={this.props.onChange}
			>
			{this.generateOptions()}
			</NativeSelect>
			)
	}
}

export default Bounds;