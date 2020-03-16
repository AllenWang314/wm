import React from "react";
import { Field } from "formik";

const Timezone = ({curr_zone, handleChange}) => {
	// var currentTime = new Date();
	var offset = Intl.DateTimeFormat().resolvedOptions().timeZone
	var current_timezone = offset
	return(
		<Field
          name="timezone"
          as="select"
          placeholder="At the latest"
          className="form-control"
          value={curr_zone}
          onChange={handleChange}>
          <option defaultValue>{current_timezone}</option>
          <option value="12">PST</option>
          <option value="2">EST</option>
        </Field>
		)
}

export default Timezone