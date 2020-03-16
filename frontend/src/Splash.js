import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";
import { Field, Formik } from "formik";
import Axios from "axios";
import { withRouter } from 'react-router-dom'
import Calendar from './ReactTableDrag.js'
import Timezone from './Timezone.js'


const API_LINK = "http://localhost:8000/api/"
const current_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

class Splash extends Component {
  constructor(props) {
      super(props);
      this.state = { future_slug: ''};
    }
  async componentDidMount() {
    Axios.get(API_LINK + "get_slug").then(response => {
      this.setState({future_slug: response.data[0].slug})
    });
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          event_name: "",
          timezone: current_timezone,
          earliest: "",
          latest: "",
          repeating: false,
          slug: this.state.future_slug
        }}
        onSubmit={(values) => {
          Axios.post(API_LINK + "post/", values, {
          headers: {
            'Content-Type': 'application/json'
          },
          }) 
          .then(response => {
            alert(JSON.stringify(values, null, 2));
            this.props.history.push(values.slug)
          })
          .catch(error => {
            alert('ERROR')
          }) 
        }}>
        { (props) => (
          <div className="App">
            <div className="App-header">
              <div className="Splash">
              <form onSubmit = {props.handleSubmit}>
                <input
                  id="event_name"
                  name="event_name"
                  placeholder="Event Name"
                  type="event_name"
                  className="form-control"
                  value={props.values.event_name}
                  onChange={props.handleChange}
                />
                <Calendar/>
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
                <Timezone 
                  handleChange={props.handleChange} 
                  curr_zone={props.values.timezone}/>
                <label><small>Repeating</small></label>
                <Checkbox
                  name="repeating"
                  type="checkbox"
                  checked={props.values.repeating}
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
          </div>
        )}
      </Formik>
    );
  }
}

export default withRouter(Splash);
