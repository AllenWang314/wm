import React, { Component } from "react";

class TimeSelector extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div>
                <h2> TimeSelector for date {this.props.date}</h2>
            </div>
        );
    }

}

export default TimeSelector;