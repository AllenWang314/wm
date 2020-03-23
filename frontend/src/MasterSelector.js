import React, { Component } from "react";
import TimeSelector from "./TimeSelectorFinal.js";
import TableDragSelect from "react-table-drag-select";
import Availability from "./AvailabilityDisplay.js"
import "./DragTable.css";
import Axios from "axios";

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
        availabilities: this.props.name_array.map(() => {return []}),
        labels: [],
        label_cells: [],
        times: [],
        loaded: false
        }
    }
    async componentDidMount (){
        await moment.tz.setDefault(this.props.timezone);
        await this.generateLabels()
        await this.generateTimes()
        await this.setState({loaded: true})
        for (var i = 0; i < this.props.name_array.length; i++){
            await Axios.get("http://localhost:8000/api/times/" + this.props.slug + "%" + this.props.name_array[i]).then((response) => {
                const updatedAvailabilities = [... this.state.availabilities];
                updatedAvailabilities[i] = response.data.times_array;
                this.setState({availabilities: updatedAvailabilities});
            }).catch((error) => {
                console.log(error.response);
                console.log("yeetie");
            });
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
            const time = moment(current_day).add(60*earliest+30*(i-1),'minutes').format('LT')
            column.push(<td key={i} disabled>{i%2===1 ? time : "" }</td>)
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
            <td style={{width:"20%"}}>
                <TableDragSelect className="viewer-table" 
                value={this.state.label_cells}>
                {this.state.labels}
                </TableDragSelect>
            </td>
            <td>
                <TimeSelector
                userIndex = {this.props.userIndex} 
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
            <td style={{width:"20%"}}>
                <TableDragSelect className="viewer-table" 
                value={this.state.label_cells}>
                {this.state.labels}
                </TableDragSelect>
            </td>
            <td>
                <Availability
                date_array={this.props.date_array} 
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