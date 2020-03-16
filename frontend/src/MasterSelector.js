import React, { Component } from "react";
import TimeSelector from "./TimeSelector.js";

class MasterSelector extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const selectorList = this.props.dates.map((val) => {
            return <TimeSelector date = {val}/>;
        });
        return selectorList;
    }
}

export default MasterSelector;