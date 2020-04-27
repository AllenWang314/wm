import React, { Component } from "react";
import { NativeSelect } from '@material-ui/core';
var moment = require('moment-timezone');
const all_zones = moment.tz.names()


class Timezone extends Component {
    
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

    render() {
        return (
            <NativeSelect
            name={this.props.name}
            as={this.props.as}
            className="Timezone"
            defaultValue={moment.tz.guess()} 
            onChange={this.props.onChange}
            >
            {this.generateZones()}
            </NativeSelect>
            )
    }
}

export default Timezone;