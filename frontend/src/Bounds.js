import React, { Component } from "react";
import { Select } from "grommet";

const values = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
const labels = ["Midnight","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","Noon","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM", "Midnight "]

class Bounds extends Component {
	render () {
		return(
			<Select
			size="xsmall"
			options={labels}
			placeholder={this.props.placeholder}
			value={labels[values.indexOf(this.props.value)]}
            onChange={(event) => this.props.onChange(values[labels.indexOf(event.value)])}
			/>
			)
	}
}

export default Bounds;