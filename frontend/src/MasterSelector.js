import React, { Component } from "react";
import TimeSelector from "./TimeSelector.js";
import { Button } from "@material-ui/core";
import "./DragTable.css";

class MasterSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
        this.nextDate = this.nextDate.bind(this);
        this.prevDate = this.prevDate.bind(this);
    }
    componentDidMount (){
        
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
        return <TimeSelector 
            date={[1583899200000]}
            timezone={this.props.timezone}
            earliest={1}
            latest={4}
            />;
    }

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td><Button variant="contained" color="primary" onClick={this.prevDate}>&lt;</Button></td>
                    <td>
                        {this.generateContent()}
                    </td>
                    <td><Button variant="contained" color="primary" onClick={this.nextDate}>&gt;</Button></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default MasterSelector;