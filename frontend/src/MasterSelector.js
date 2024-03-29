import React, { Component } from "react";
import TimeSelector from "./TimeSelectorFinal.js";
import Availability from "./AvailabilityDisplay.js"

var moment = require('moment-timezone');
moment().utc();

function genFalseArray (length, width) {
    const rows = []
    for (var i = 0; i < length; ++i){
        const column = []
        for (var j = 0; j < width; ++j){
            column.push(false)
        }
        rows.push(column)
    }
    return (rows)
}

class MasterSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        availabilities: this.props.availabilities,
        labels: [],
        label_cells: [],
        times: [],
        loaded: false,
        }
    }
    async componentDidMount (){
        await this.generateLabels()
        await this.generateTimes()
        await this.setState({loaded: true})
    }

    async componentDidUpdate(prevProps){
        if (prevProps.name_array.length !== this.props.name_array.length) {
            const old_avail = [...this.state.availabilities];
            old_avail.push([]);
            this.setState({availabilities: old_avail});
        }
        if (prevProps.timezone !== this.props.timezone){
            this.generateLabels()
        }
    }

    generateBounds = () => {
        if (this.props.earliest < this.props.latest){
            const earliest = new Date(Number(this.props.date_array[0]))
            const latest = new Date(Number(this.props.date_array[0]))
            earliest.setHours(Number(this.props.earliest))
            latest.setHours(Number(this.props.latest))
            return {earliest,latest}
        }
        else {
            const earliest = new Date(Number(this.props.date_array[0]))
            const latest = new Date(Number(this.props.date_array[0]))
            earliest.setHours(this.props.earliest + 24)
            latest.setHours(this.props.latest)
            return {earliest,latest}
        }
    }

    generateDifference = () =>{
        const {earliest, latest} = this.generateBounds()
        const difference = moment.duration(moment(latest).diff(moment(earliest))).asHours()
        return(difference)
    }

    generateLabels = () => {
        const earliest = this.generateBounds().earliest.getHours()
        const difference = this.generateDifference()
        const current_day = moment(this.props.date_array[0])
        const rows = []
        for(var i = 0; i < 2 * difference + 2; ++i) {
            const column = []
            const time = moment(current_day).tz(this.props.timezone).add(60*earliest+30*(i-1),'minutes').format('LT')
            if (i%2===1){
                column.push(<td key={i} disabled>{time}</td>)
            }
            else {
                column.push(<td key={i} disabled>&nbsp;</td>)   
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({labels: rows, label_cells: genFalseArray(2*difference + 2,1)})
    }

    generateTimes = () => {
        const difference = this.generateDifference()
        const time_array = []
        for (var j = 0; j < this.props.date_array.length; ++j){
            const current_day = moment(this.props.date_array[j])
            const column = []
            for(var i = 0; i < 2 * difference + 1; ++i){
                if (i === 0){column.push([]);continue}
                const new_moment = moment(current_day).add(30*difference+30*(i-1),'minutes').valueOf()
                column.push(new_moment)
            }
            time_array.push(column)
        }
        this.setState({times: time_array})
    }

    handleAvail = (new_avails) => {
        const updatedAvailabilities = this.state.availabilities;
        updatedAvailabilities[this.props.userIndex] = new_avails;
        this.setState({availabilities: updatedAvailabilities});
    }

    generateContent() {
        return (
            <table style={{align: "center", margin: "0px auto"}}>
            <tbody>
            <tr>
            <td style={{width:"70px"}}>
                <table className="viewer-table" 
                value={this.state.label_cells}>
                <tbody>
                {this.state.labels}
                </tbody>
                </table>
            </td>
            <td>
                <TimeSelector
                newUser = {this.props.newUser} 
                userIndex = {this.props.userIndex}
                repeating={this.props.repeating}
                name = {this.props.name}
                slug = {this.props.slug}
                date_array={this.props.date_array} 
                timezone={this.props.timezone}
                earliest={Number(this.props.earliest)}
                latest={Number(this.props.latest)}
                times={this.state.times}
                handleAvail={this.handleAvail}/>
            </td>
            </tr>
            <tr>
            <td style={{width:"70px"}}>
                <table className="viewer-table" 
                value={this.state.label_cells}>
                <tbody>
                {this.state.labels}
                </tbody>
                </table>
            </td>
            <td>
                <Availability
                date_array={this.props.date_array} 
                repeating={this.props.repeating}
                timezone={this.props.timezone}
                earliest={Number(this.props.earliest)}
                latest={Number(this.props.latest)}
                difference={this.generateDifference()}
                times={this.state.times}
                name_array={this.props.name_array}
                availabilities={this.state.availabilities}/>
            </td>
            </tr>
            </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded ? this.generateContent() : null}
            </div>

        );
    }
}

export default MasterSelector;