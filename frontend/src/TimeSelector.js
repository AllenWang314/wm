import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

var moment = require('moment');
moment().format();

function genFalseArray (length, width) {
    const rows = []
    for (var i = 0; i < length; ++i){
        const column = []
        for (var j = 0; j < 1; ++j){
            column.push(false)
        }
        rows.push(column)
    }
    return (rows)
}

class TimeSelector extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cells: []
      }
    }

    generateBounds = () =>{
        if (this.props.earliest < this.props.latest){
            const earliest = new Date(Number(this.props.date))
            const latest = new Date(Number(this.props.date))
            earliest.setHours(this.props.earliest)
            latest.setHours(this.props.latest)
            return {earliest,latest}
        }
        else {
            const earliest = new Date(Number(this.props.date))
            const latest = new Date(Number(this.props.date))
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

    generateRows = () => {
        const difference = this.generateDifference()
        const rows = []
        for (var i = 0; i < 4 * difference; ++i){
            const column = []
            for (var j = 0; j < 1; ++j){
                column.push(<td key={100*i + j}>&nbsp;</td>)
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        return(rows)
    }
    render() {
        return (
            <div>
                <TableDragSelect
                    value={genFalseArray(4*this.generateDifference(),1)}
                >
                {this.generateRows()}
                </TableDragSelect>
            </div>
        );
    }

}

export default TimeSelector;