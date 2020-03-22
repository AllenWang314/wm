import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

var moment = require('moment-timezone');
moment().utc();

const date_array = [1583899200000,1584504000000,1584590400000]
// const name_array = ['Michelle', 'Rachel']

// function transpose (m) {
//     return(m[0].map((x,i) => m.map(x => x[i])))
// }

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
        cells: [],
        displayed: [],
        label_cells: [],
        labels: [],
        date_array: date_array,
        times: [],
        loaded: false
      }
    }
    async componentDidMount(){
        const difference = this.generateDifference()
        await moment.tz.setDefault(this.props.timezone);
        await this.setState({cells:genFalseArray(2*difference + 1 ,this.state.date_array.length ),
            label_cells: genFalseArray(2*difference + 2,1)})
        await this.generateTimes()
        await this.generateRows()
        await this.generateLabels()
        this.setState({loaded: true})
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

    generateTimes = () => {
        const difference = this.generateDifference()
        const time_array = []
        for (var j = 0; j < this.state.date_array.length; ++j){
            const current_day = moment(this.state.date_array[j])
            const column = []
            for(var i = 0; i < 2 * difference + 1; ++i){
                if (i === 0){column.push([]);continue}
                const new_moment = moment(current_day).add(30*difference+30*(i-1),'minutes')
                column.push(new_moment)
            }
            time_array.push(column)
        }
        this.setState({times: time_array})
    }
    generateLabels = () => {
        const earliest = this.generateBounds().earliest.getHours()
        const difference = this.generateDifference()
        const current_day = moment(this.state.date_array[0])
        const rows = []
        for(var i = 0; i < 2 * difference + 2; ++i) {
            const column = []
            const time = moment(current_day).add(60*earliest+30*(i-1),'minutes').format('LT')
            column.push(<td key={i} disabled>{i%2===1 ? time : "" }</td>)
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({labels: rows})

    }
    generateRows = () => {
        const difference = this.generateDifference()
        const rows = []
        for(var i = 0; i < 2 * difference + 1; ++i) {
            const column = []
            for (var j = 0; j < this.state.date_array.length ; ++j){
                if (i === 0){
                    column.push(<td key={100 * i + j} disabled>{moment(this.state.times[j][1]).format('LL')}</td>)    
                }
                else {
                    const time = JSON.stringify(this.state.times[j][i])
                    column.push(<td key={100 * i + j}>&nbsp;</td>)
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({displayed: rows})
    }

    handleDrag = (new_cells) => {
        this.setState({cells: new_cells})
        const difference = this.generateDifference()
        const num_days = this.state.date_array.length
        const selected_times = []
        for (var i = 1; i < 2 * difference + 1; ++i){
            for (var j = 0; j < num_days; ++j){
                if (new_cells[i][j]===true){
                    selected_times.push(this.state.times[j][i])
                }
            }
        }
    }

    generateContent (){
        return(
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
                <TableDragSelect className="viewer-table" 
                style={{tableLayout:"fixed"}}
                value={this.state.cells}
                onChange={this.handleDrag}>
                {this.state.displayed}
                </TableDragSelect>
            </td>
            </tr>
            </tbody>
            </table>
            )
    }

    render() {
        return (
            <div>
            {this.state.loaded === true ? this.generateContent(): null}
            </div>                
        );
    }

}

export default TimeSelector;