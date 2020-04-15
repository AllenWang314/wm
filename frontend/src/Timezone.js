import React, { Component } from "react";
import { Select } from "grommet";

var moment = require('moment-timezone');
const all_zones = moment.tz.names()

class Timezone extends Component {
    render() {
        return (
            <Select 
            size="xsmall"
            dropHeight="medium"
            dropAlign={{top: "bottom"}}
            options={all_zones}
            value={this.props.value}
            onChange={this.props.onChange}
            />
            )
    }
}

export default Timezone;