import React from "react";
import { Field } from "formik";
const zoneList = {}

class Timezone extends React.Component {
    get_current_zone() {
        var offset = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var current_timezone = offset;
        return current_timezone;
    }

    generateZones(current_zone){

    }

    render() {
        return (
            <Field
                name="timezone"
                as="select"
                placeholder="At the latest"
                className="selector"
                value={this.props.curr_zone}
                onChange={this.props.handleChange}
            >
                <option defaultValue>{this.get_current_zone()}</option>
                <option value="12">PST</option>
                <option value="2">EST</option>
            </Field>
        );
    }
}

export default Timezone;
