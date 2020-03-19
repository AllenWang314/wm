import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";
import { Formik } from "formik";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Calendar from "./ReactTableDrag.js";
import ByWeek from "./ByWeek.js";
import Bounds from "./Bounds.js";
import Timezone from "./Timezone.js";


const API_LINK = "http://localhost:8000/api/";
const current_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = { future_slug: "", repeating: false, day_list: "", date_list: "" };
    }
    async componentDidMount() {
        Axios.get(API_LINK + "get_slug").then(response => {
            this.setState({ future_slug: response.data[0].slug });
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
                    repeating: this.state.repeating,
                    slug: this.state.future_slug,
                    date_list: "",
                    day_list: this.state.day_list,
                }}
                onSubmit={values => {
                    console.log(values)
                    // Axios.post(API_LINK + "post/", values, {
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     }
                    // })
                    //     .then(response => {
                    //         alert(JSON.stringify(values, null, 2));
                    //         this.props.history.push(values.slug);
                    //     })
                    //     .catch(error => {
                    //         alert("ERROR");
                    //     });
                }}
            >
                {props => (
                        <div className="App-header">
                            <div className="Splash">
                                <form onSubmit={props.handleSubmit}>
                                    <div className="form__group">
                                    <input
                                        id="event_name"
                                        name="event_name"
                                        placeholder="Event Name"
                                        type="event_name"
                                        className="form__field"
                                        value={props.values.event_name}
                                        onChange={props.handleChange}
                                        required
                                    />
                                    </div>
                                    {props.values.repeating === false ? <Calendar
                                        date_list={props.values.date_list}
                                        onDrag={props.setFieldValue}
                                    /> : 
                                    <ByWeek
                                        day_list={props.values.day_list}
                                        onDrag={props.setFieldValue}
                                    />}
                                    <Bounds
                                        name="earliest"
                                        as="select"
                                        placeholder="At the earliest"
                                        value={props.values.earliest}
                                        onChange={props.handleChange}
                                    />
                                    <Bounds
                                        name="latest"
                                        as="select"
                                        placeholder="At the latest"
                                        value={props.values.latest}
                                        onChange={props.handleChange}
                                    />
                                    <br/>
                                    <Timezone
                                        name="timezone"
                                        as="select"
                                        value={props.values.timezone}
                                        onChange={props.handleChange}
                                    />
                                    <br/>
                                    <label>
                                        <small>By Week</small>
                                    </label>
                                    <Checkbox
                                        name="repeating"
                                        type="checkbox"
                                        checked={props.values.repeating}
                                        onChange={props.handleChange}
                                    ></Checkbox>
                                    <div>
                                        <button
                                            type="submit"
                                            className="bright_button"
                                        >
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

export default withRouter(Splash);
