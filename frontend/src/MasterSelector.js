import React, { Component } from "react";
import TimeSelector from "./TimeSelector.js";
import { Button } from "@material-ui/core";
import "./DragTable.css";

class MasterSelector extends Component {
    constructor(props) {
        super(props);
        const selectorList = this.props.dates.map((val) => {
            return <TimeSelector date={val} />;
        });
        this.state = {
            selectorList: selectorList,
            currTimeSelector: selectorList[0],
            index: 0
        };
        this.nextDate = this.nextDate.bind(this);
        this.prevDate = this.prevDate.bind(this);
    }

    nextDate() {
        if (this.state.index < this.state.selectorList.length - 1) {
            this.setState({
                index: this.state.index + 1,
                currTimeSelector: this.state.selectorList[this.state.index + 1]
            })
        }
    }

    prevDate() {
        if (this.state.index > 0) {
            this.setState({
                index: this.state.index - 1,
                currTimeSelector: this.state.selectorList[this.state.index - 1]
            });
        }
    }

    render() {
        return (
            <table>
                <tbody>
                    <td><Button variant="contained" color="primary" onClick={this.prevDate}>&lt;</Button></td>
                    <td>{this.state.currTimeSelector}</td>
                    <td><Button variant="contained" color="primary" onClick={this.nextDate}>&gt;</Button></td>

                </tbody>
            </table>
        );
    }
}

export default MasterSelector;