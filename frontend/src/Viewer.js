import React, { Component } from "react";
import { Checkbox} from "@material-ui/core";
import { Field, Formik } from "formik";
import Axios from "axios";


const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    const slug = this.props.match.params.slug;
    Axios.get(API_LINK + slug).then(response => {
      this.setState({ data: response.data[0] });
    });
  }

render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          event_name: this.state.data.event_name,
          timezone: this.state.data.timezone,
          earliest: this.state.data.earliest,
          latest: this.state.data.latest,
          repeating: this.state.data.repeating,
          slug: this.state.data.slug,
          creator: this.state.data.creator,
          location: this.state.data.location
        }}
        onSubmit={(values) => {
          Axios.post(API_LINK + this.state.data.slug, values, {
          headers: {
            'Content-Type': 'application/json'
          },
          }) 
          .then(response => {
            alert(JSON.stringify(values, null, 2));
          })
          .catch(error => {
            console.log(error)
            alert('ERROR')
          }) 
        }}>
        { (props) => (
          <div className="App">
            <div className="App-header">
              <form onSubmit = {props.handleSubmit}>
                <label>Stuff you've submitted</label>
                <input
                  id="event_name"
                  name="event_name"
                  type="event_name"
                  className="form-control"
                  value={props.values.event_name || ""}
                  onChange={props.handleChange}
                />
                <input
                  id="creator"
                  name="creator"
                  type="creator"
                  className="form-control"
                  placeholder='Name (Optional)'
                  value={props.values.creator || ""}
                  onChange={props.handleChange}
                />
                <input
                  id="location"
                  name="location"
                  type="location"
                  className="form-control"
                  placeholder='Location (Optional)'
                  value={props.values.location || ""}
                  onChange={props.handleChange}
                />
                <Field
                  name="earliest"
                  as="select"
                  placeholder="At the earliest"
                  className="form-control"
                  value={props.values.earliest}
                  onChange={props.handleChange}
                >
                  <option defaultValue>At the earliest</option>
                  <option value="12">12</option>
                  <option value="2">2</option>
                </Field>
                <Field
                  name="latest"
                  as="select"
                  placeholder="At the latest"
                  className="form-control"
                  value={props.values.latest}
                  onChange={props.handleChange}
                >
                  <option defaultValue>At the latest</option>
                  <option value="12">12</option>
                  <option value="2">2</option>
                </Field>
                <Field
                  name="timezone"
                  as="select"
                  placeholder="Timezone"
                  className="form-control"
                  value={props.values.timezone}
                  onChange={props.handleChange}
                >
                  <option defaultValue>Timezone</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </Field>
                <label><small>Repeating</small></label>
                <Checkbox
                  name="repeating"
                  type="checkbox"
                  checked={props.values.repeating || false}
                  onChange={props.handleChange}
                ></Checkbox>
                <div>
                  <button type="submit" className="form-control">
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    );
  }   
}

export default Viewer;