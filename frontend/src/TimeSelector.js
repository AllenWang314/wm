import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

var moment = require('moment');
moment().format();

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

class TimeSelector extends Component {
    constructor(props) {
      super(props);
      this.state = {
        early: "",
        cells: [],
        displayed: []
      }
    }
    componentDidMount(){
        this.generateRows()
    }

    generateBounds = () =>{
        if (this.props.earliest < this.props.latest){
            const earliest = new Date(Number(this.props.date))
            const latest = new Date(Number(this.props.date))
            earliest.setHours(Number(this.props.earliest))
            latest.setHours(Number(this.props.latest))
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
        if (isNaN(difference)){
            return 0
        }
        const first = this.generateBounds().earliest.getHours()
        const last = this.generateBounds().latest.getHours()

        const rows = []
        for (var i = 0; i < 2 * difference; ++i){
            const column = []
            for (var j = 0; j < 2; ++j){
                if (j === 0){
                    const current_time = moment(first).add(30*i,'minutes')
                    column.push(<td key={100*i + j} disabled>{i%2===0 && current_time.format('LT')}</td>)
                }
                else {
                    column.push(<td key={100*i + j}>&nbsp;</td>)                    
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        console.log(rows)
        this.setState({cells: genFalseArray(2*difference,2), displayed: rows}, ()=> console.log(this.state))
    }

    handleDrag = () =>{
    }
    render() {
        return (
            <div>
                <TableDragSelect className="viewer-table"
                value={this.state.cells}> 
                {this.state.displayed}
                    </TableDragSelect>
            </div>
        );
    }

}

export default TimeSelector;