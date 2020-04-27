import React, { Component } from "react";
import { Checkbox } from "@material-ui/core";
import { Formik } from "formik";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import Calendar from "./ReactTableDrag.js";
import ByWeek from "./ByWeek.js";
import Bounds from "./Bounds.js";
import Timezone from "./Timezone.js";
import { Button } from "@material-ui/core";


const API_LINK = "http://localhost:8000/api/";
const current_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            future_slug: "",
            repeating: false,
            date_array: [],
            day_array: [],
            earliest: 10,
            latest: 14,
        };
    }
    async componentDidMount() {
        Axios.get(API_LINK + "get_slug").then((response) => {
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
                    earliest: this.state.earliest,
                    latest: this.state.latest,
                    repeating: this.state.repeating,
                    slug: this.state.future_slug,
                    date_array: this.state.date_array,
                    day_array: this.state.day_array,
                    name_array: [],
                }}
                onSubmit={(values) => {
                    if (values.repeating) {
                        values.date_array = values.day_array;
                        delete values.day_array;
                    } else {
                        delete values.day_array;
                    }
                    Axios.post(API_LINK + "post/", values, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            alert(JSON.stringify(values, null, 2));
                            this.props.history.push(values.slug);
                        })
                        .catch((error) => {
                            alert("ERROR");
                            alert(error.response);
                        });
                }}
            >
                {(props) => (
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
                        {props.values.repeating === false ? (
                            <Calendar
                                initial_dates={props.values.date_array}
                                onDrag={props.setFieldValue}
                            />
                        ) : (
                            <ByWeek
                                initial_days={props.values.day_array}
                                onDrag={props.setFieldValue}
                            />
                        )}
                        <div style={{"display": "inline-block"}}>
                        <label>
                            <small>At the earliest</small>
                        </label>
                        <br/>
                        <Bounds
                            name="earliest"
                            placeholder="At the earliest"
                            value={props.values.earliest}
                            onChange={(event) =>
                                props.setFieldValue("earliest", event)
                            }
                        />
                        </div>
                        <div style={{"display": "inline-block"}}>
                        <label>
                            <small>At the latest</small>
                        </label>
                        <br/>
                        <Bounds
                            name="latest"
                            value={props.values.latest}
                            placeholder="At the latest"
                            onChange={(event) =>
                                props.setFieldValue("latest", event)
                            }
                        />
                        </div>
                        <br />
                        <Timezone
                            name="timezone"
                            as="select"
                            value={props.values.timezone}
                            onChange={props.handleChange}
                        />
                        <br />
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
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                    </div>
                )}
            </Formik>
        );
    }
}

export default withRouter(Splash);
