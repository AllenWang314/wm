import React, { Component } from "react";
import Axios from "axios";
import MasterSelector from "./MasterSelector.js";
import { withRouter } from "react-router-dom";
import "./index.css";
import { Box, TextInput, Grommet, Button, Grid, Heading, Text, Nav, Anchor, Header} from "grommet";
import {CircleInformation, Link, SettingsOption, Home, LinkPrevious} from 'grommet-icons';
import Main from "./GrommetTheme.js";
import SwitchZone from "./SwitchZone.js";
import copy from "copy-to-clipboard";

const API_LINK = "http://localhost:8000/api/";

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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
        };
    }

    async componentDidMount() {
        const slug = this.props.match.params.slug;
        Axios.get(API_LINK + slug).then((response) => {
            this.setState({
                data: response.data[0],
                event_name: response.data[0].event_name,
                date_array: response.data[0].date_array,
                name_array: response.data[0].name_array,
                timezone: response.data[0].timezone,
                slug: response.data[0].slug,
                repeating: response.data[0].repeating,
                earliest: response.data[0].earliest,
                latest: response.data[0].latest,
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
                            !response.data[0].name_array.includes(this.state.name)
                        ) {
                            this.setState({ newUser: 1 });
                            response.data[0].name_array.push(this.state.name);
                            Axios.put(
                                API_LINK + this.props.match.params.slug,
                                response.data[0]
                            ).then(() => {
                                var hash = require('object-hash');
                                const hash_result = "" + hash(this.state.password);
                                const values = {snd_hash : (this.props.match.params.slug + "%" + this.state.name), 
                                    password: hash_result};
                                Axios.post(API_LINK + "post-password/", values, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(() => {this.setState({
                                    userIndex:
                                        response.data[0].name_array.length - 1,
                                    submitted: true,
                                    name_array: response.data[0].name_array,
                                });})
                            });
                        }
                    }
                );
            });
        }
        else {
            Axios.get(API_LINK + "password/" + this.props.match.params.slug + "%" + this.state.name).then((rsp) => {
                var hash = require('object-hash');
                const hash_password = hash(this.state.password);
                if (rsp.data.password === hash_password) {
                    this.setState({ submitted: true }, () => {
                        Axios.get(API_LINK + this.props.match.params.slug).then(
                            (response) => {
                                if (
                                    !response.data[0].name_array.includes(this.state.name)
                                ) {
                                    this.setState({ newUser: 1 });
                                    response.data[0].name_array.push(this.state.name);
                                    Axios.put(
                                        API_LINK + this.props.match.params.slug,
                                        response.data[0]
                                    ).then(() => {
                                        if (this.state.userIndex === -1) {
                                            this.setState({
                                                userIndex:
                                                    response.data[0].name_array.length - 1,
                                                submitted: true,
                                                name_array: response.data[0].name_array,
                                            });
                                        }
                                    });
                                } else {
                                    this.setState({ newUser: 0 });
                                    if (this.state.userIndex === -1) {
                                        var i = 0;
                                        let narray = response.data[0].name_array;
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
                }
                else {
                    this.setState({incorrect_password: <div> Incorrect password!</div>})
                }
            });
        }
    };

    handleZoneChange = (option) => {
        this.setState({ timezone: option });
    };

    generateSignIn = () => {
        return (
            <Box>
                <Grid
                    alignSelf="center"
                    rows={["stretch"]}
                    columns={["stretch", "stretch"]}
                    gap="small"
                    areas={[
                        { name: "body_1", start: [0, 0], end: [0, 0] },
                        { name: "body_2", start: [1, 0], end: [1, 0] },
                    ]}
                >
                    <Box
                        gridArea="body_1"
                        justify="center"
                        align="center"
                        pad="small"
                    >
                        <Box justify="center" align="center" pad="small">
                            {!this.state.submitted ||
                                this.state.newUser === -1 ? (
                                    <div>
                                        <TextInput
                                            size="xsmall"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                        <TextInput
                                            type = "password"
                                            size="xsmall"
                                            placeholder="Password (Optional)"
                                            value={this.state.password}
                                            onChange={this.handleChangeDos}
                                        />
                                        {this.state.incorrect_password}
                                        <Button
                                            onClick={this.handleSubmit}
                                            label="Sign In"
                                            primary
                                            margin="small"
                                        />
                                    </div>
                                ) : (
                                    <div>Welcome {this.state.name}!</div>
                                )}
                        </Box>
                    </Box>
                    <Box gridArea="body_2" align="center" pad="small">
                        <Box justify="center" align="center" pad="small">
                            <SwitchZone
                                value={this.state.timezone}
                                onChange={this.handleZoneChange}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Box>
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
            />
        );
    };

    generateEventName = () => {
        return <Heading level="2" margin="none">{this.state.event_name} </Heading>;
    };

    generateNames = () => {
        if (this.state.name_array.length === 0){
            return(<Text align="center" size="small">No one has signed up yet </Text>)
        }
        else{
            return(<Text align="center" size="small">People: {this.state.name_array.join(", ")}</Text>)
        }
    }

    showHelp = () => {
        const curr_state = this.state.help;
        this.setState({help: !curr_state});
    }

    showAdv = () => {
        const curr_state = this.state.adv_controls;
        this.setState({adv_controls: !curr_state});
    }
 
    render() {
        const style_selector = (this.state.help || this.state.adv_controls) ? {display: "none"} : {};
        const style_help = (this.state.help) ? {} : {display: "none"};
        const style_adv = (this.state.adv_controls)? {} : {display: "none"};
        return (
            <div className="App-header">
                <div className="Splash">
                    <div style = {style_help}>
                    <Header pad="medium" 
                        border = {{"size": "medium", "side": "all"}} 
                        margin = "xsmall"
                        pad = "xxsmall">
                            <Box direction="row" align="center" gap="small">
        <Anchor icon={<LinkPrevious/>} onClick = {this.showHelp}>
                            </Anchor>
                            </Box>
                        </Header>

                        - explain sign in
                        - explain adv controls 
                        - explain time zones
                        - explain selector and avail
                        - explain google sign in
                    </div>
                    <div style = {style_adv}>
                        <Button onClick = {this.showAdv} label="Back"
                            primary
                            margin="small"/>
                        - change dates
                        - change times
                        - 
                    </div>
                    <div style = {style_selector}>
                        <Grommet theme={Main} themeMode="dark">
                        <Header fixed = {true} pad="medium" 
                        border = {{"size": "medium", "side": "all"}} 
                        margin = "xsmall"
                        pad = "xxsmall">
                            <Box direction="row" align="center" gap="small">
        <Anchor icon={<Home />} href="http://localhost:3000/">
                            Home
                        </Anchor>
                        </Box>
                        <Nav direction="row" gap = "small">
                            <Anchor icon = {<Link size = "medium"/>} onClick = {() => {copy("localhost:3000/" + this.props.match.params.slug);}}/>
                            <Anchor icon = {<CircleInformation size='medium' />} onClick = {this.showHelp} />
        <Anchor icon = {<SettingsOption size = "medium"/>} onClick = {this.showAdv}/>                            
                        </Nav>
                        </Header>
                            {this.generateEventName()}
                            {this.generateSignIn()}
                            {this.generateContent()}
                            {this.generateNames()}
                        </Grommet>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Viewer);
