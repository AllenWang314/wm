import React, { Component } from "react";
import { Field } from "formik";

var moment = require('moment-timezone');
class Timezone extends Component {
    
    generateZones (){
        var rows = []
        for (var zone of moment.tz.names()){
            if (zone === moment.tz.guess()){
                rows.push(<option defaultValue key={zone}> {zone} </option>)
            }
            else {
                rows.push(<option value={zone} key={zone}> {zone} </option>)
            }
        }
        return(rows)
    }

    render() {
        return (
            <Field
            name={this.props.name}
            as={this.props.as}
            className="selector"
            value={this.props.value}
            onChange={this.props.onChange}
            >
                {this.generateZones()}
            </Field>
            )
    }
}

export default Timezone;