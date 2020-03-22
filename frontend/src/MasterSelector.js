import React, { Component } from "react";
import TimeSelector from "./TimeSelectorFinal.js";
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
            timezone={"America/New_York"}
            earliest={1}
            latest={4}
            />;
    }

    render() {
        return (
            <div>
                {this.generateContent()}
            </div>

        );
    }
}

export default MasterSelector;