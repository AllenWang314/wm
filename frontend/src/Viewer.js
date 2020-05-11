import React, { Component } from "react";
import Axios from "axios";
import MasterSelector from "./MasterSelector.js";
import { withRouter } from "react-router-dom";
import SwitchZone from "./SwitchZone.js";
import ViewerHeader from "./ViewerHeader.js";
import { Button, TextField, Typography, CircularProgress } from "@material-ui/core";

const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 0,
            name: "",
            event_name: "",
            submitted: false,
            date_array: [],
            repeating: false,
            userIndex: -1,
            earliest: -1,
            latest: 24,
            timezone: "",
            name_array: [],
            incorrect_password: <div />,
            password: "",
            newUser: -1, // -1: not submitted yet, 0: not a new user, 1: yes new user
            help: false,
            adv_controls: false,
            availabilities: [],
        };
    }

    async componentDidMount() {
        const slug = this.props.match.params.slug;
        Axios.get(API_LINK + slug).then((response) => {
            this.setState({
                data: response.data[0][0],
                event_name: response.data[0][0].event_name,
                date_array: response.data[0][0].date_array,
                name_array: response.data[0][0].name_array,
                timezone: response.data[0][0].timezone,
                slug: response.data[0][0].slug,
                repeating: response.data[0][0].repeating,
                earliest: response.data[0][0].earliest,
                latest: response.data[0][0].latest,
                availabilities: response.data[1]
            });
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ name: e.target.value });
    };

    handleChangeDos = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name_array.indexOf(this.state.name) === -1) {
            this.setState({ submitted: true }, () => {
                Axios.get(API_LINK + this.props.match.params.slug).then(
                    (response) => {
                        if (
                            !response.data[0][0].name_array.includes(
                                this.state.name
                            )
                        ) {
                            this.setState({ newUser: 1 });
                            response.data[0][0].name_array.push(this.state.name);
                            Axios.put(
                                API_LINK + this.props.match.params.slug,
                                response.data[0][0]
                            ).then(() => {
                                var hash = require("object-hash");
                                const hash_result =
                                    "" + hash(this.state.password);
                                const values = {
                                    snd_hash:
                                        this.props.match.params.slug +
                                        "%" +
                                        this.state.name,
                                    password: hash_result,
                                };
                                Axios.post(
                                    API_LINK + "post-password/",
                                    values,
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                ).then(() => {
                                    this.setState({
                                        userIndex:
                                            response.data[0][0].name_array.length -
                                            1,
                                        submitted: true,
                                        name_array: response.data[0][0].name_array,
                                    });
                                });
                            });
                        }
                    }
                );
            });
        } else {
            Axios.get(
                API_LINK +
                    "password/" +
                    this.props.match.params.slug +
                    "%" +
                    this.state.name
            ).then((rsp) => {
                var hash = require("object-hash");
                const hash_password = hash(this.state.password);
                if (rsp.data.password === hash_password) {
                    this.setState({ submitted: true }, () => {
                        Axios.get(API_LINK + this.props.match.params.slug).then(
                            (response) => {
                                if (
                                    !response.data[0][0].name_array.includes(
                                        this.state.name
                                    )
                                ) {
                                    this.setState({ newUser: 1 });
                                    response.data[0][0].name_array.push(
                                        this.state.name
                                    );
                                    Axios.put(
                                        API_LINK + this.props.match.params.slug,
                                        response.data[0][0]
                                    ).then(() => {
                                        if (this.state.userIndex === -1) {
                                            this.setState({
                                                userIndex:
                                                    response.data[0][0].name_array
                                                        .length - 1,
                                                submitted: true,
                                                name_array:
                                                    response.data[0][0].name_array,
                                            });
                                        }
                                    });
                                } else {
                                    this.setState({ newUser: 0 });
                                    if (this.state.userIndex === -1) {
                                        var i = 0;
                                        let narray =
                                            response.data[0][0].name_array;
                                        while (
                                            i < narray.length &&
                                            narray[i] !== this.state.name
                                        ) {
                                            i++;
                                        }
                                        if (this.state.userIndex === -1) {
                                            this.setState({
                                                userIndex: i,
                                                submitted: true,
                                                name_array: narray,
                                            });
                                        }
                                    }
                                }
                            }
                        );
                    });
                } else {
                    this.setState({
                        incorrect_password: <div> Incorrect password!</div>,
                    });
                }
            });
        }
    };

    handleZoneChange = (option) => {
        this.setState({ timezone: option });
    };

    generateSignIn = () => {
        return (
            <div style={{}}>
                {!this.state.submitted || this.state.newUser === -1 ? (
                    <div
                        style={{
                            display: "inline-block",
                            verticalAlign: "top",
                        }}
                    >
                        <TextField
                            className="Input"
                            style={{ margin: "10px" }}
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <br />
                        <TextField
                            className="Input"
                            type="password"
                            placeholder="Password (Optional)"
                            value={this.state.password}
                            onChange={this.handleChangeDos}
                        />
                        {this.state.incorrect_password}
                        <br />
                        <Button
                            onClick={this.handleSubmit}
                            margin="small"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </div>
                ) : (
                    <div>Welcome {this.state.name}!</div>
                )}
                <div style={{ display: "inline-block", verticalAlign: "top" }}>
                    <SwitchZone
                        value={this.state.timezone}
                        onChange={this.handleZoneChange}
                    />
                </div>
            </div>
        );
    };

    generateContent = () => {
        if (this.state.event_name === "") return "";
        return (
            <MasterSelector
                name={this.state.name}
                date_array={this.state.date_array}
                repeating={this.state.repeating}
                slug={this.state.slug}
                timezone={this.state.timezone}
                earliest={Number(this.state.earliest)}
                latest={Number(this.state.latest)}
                name_array={this.state.name_array}
                newUser={this.state.newUser}
                userIndex={this.state.userIndex}
                availabilities={this.state.availabilities}
            />
        );
    };

    generateEventName = () => {
        return <Typography variant="h3">{this.state.event_name} </Typography>;
    };

    generateNames = () => {
        if (this.state.name_array.length === 0) {
            return (
                <Typography align="center" size="small">
                    No one has signed up yet{" "}
                </Typography>
            );
        } else {
            return (
                <Typography align="center" size="small">
                    People: {this.state.name_array.join(", ")}
                </Typography>
            );
        }
    };

    render() {
        if (this.state.data === 0){
            return(
                <div className = "Loading">
                    <CircularProgress/>
                </div>
            );
        }
        else {
            return (
                <div className="Splash">
                    <ViewerHeader slug={this.state.slug} />
                    {this.generateEventName()}
                    {this.generateSignIn()}
                    {this.generateContent()}
                    {this.generateNames()}
                </div>
            );
        }
    }
}

export default withRouter(Viewer);
