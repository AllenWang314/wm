import React, { Component } from "react";
import TimeSelector from "./TimeSelector.js";
import { Button } from "@material-ui/core";
import "./DragTable.css";

class MasterSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
        this.nextDate = this.nextDate.bind(this);
        this.prevDate = this.prevDate.bind(this);
    }

    nextDate() {
        if (this.state.index < this.props.dates.length - 1) {
            this.setState({
                index: this.state.index + 1,
            })
        }
    }

    prevDate() {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1,
            });
        }
    }

    generateContent() {
        console.log(this.props.dates);
        return <TimeSelector slug = {this.props.slug} date = {this.props.dates[this.state.index]} />;
    }

    render() {
        console.log(this.props.dates);
        return (
            <table>
                <tbody>
                    <td><Button variant="contained" color="primary" onClick={this.prevDate}>&lt;</Button></td>
                    <td>{this.generateContent()}</td>
                    <td><Button variant="contained" color="primary" onClick={this.nextDate}>&gt;</Button></td>

                </tbody>
            </table>
        );
    }
}

export default MasterSelector;