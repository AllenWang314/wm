import React, { Component } from "react";

class TimeSelector extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div>
                <h1> Yet another test! {this.props.date}</h1>
            </div>
        );
    }

}

export default TimeSelector;