import React, { Component } from "react";
import TimeSelector from "./TimeSelectorFinal.js";
import TableDragSelect from "react-table-drag-select";
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
        availabilities: {},
        labels: [],
        label_cells: []
        }
    }
    async componentDidMount (){
        await moment.tz.setDefault(this.props.timezone);
        await this.generateLabels()
        Axios.get("some fantastic link").then((response) => {

            //do stuff here
        });
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
                date_array={this.props.date_array} 
                timezone={this.props.timezone}
                earliest={Number(this.props.earliest)}
                latest={Number(this.props.latest)}/>
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
                
            </td>
            </tr>
            </tbody>
            </table>
        )
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