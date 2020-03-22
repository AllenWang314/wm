import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

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

class TimeSelector extends Component {
    constructor(props) {
      super(props);
      this.state = {
        cells: [],
        displayed: [],
        label_cells: [],
        labels: [],
        date_array: [],
        times: [],
        loaded: false,
        selected: []
      }
    }
    async componentDidMount(){
        await this.setState({ date_array: this.props.date_array})
        const difference = this.generateDifference()
        await this.setState({cells:genFalseArray(2*difference + 1 ,this.state.date_array.length ),
            label_cells: genFalseArray(2*difference + 2,1)})
        await this.setState({times: this.props.times})
        await this.generateRows()
        this.setState({loaded: true})
    }

    generateBounds = () =>{
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

    printCell = (e) => {
        new TableDragSelect().handleTouchStartCell(e)
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
                    // const time = JSON.stringify(this.state.times[j][i])
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
        var selected_times = []
        for (var i = 1; i < 2 * difference + 1; ++i){
            for (var j = 0; j < num_days; ++j){
                if (new_cells[i][j]===true){
                    selected_times.push(this.state.times[j][i])
                }
            }
        }
        selected_times = selected_times.map(x => moment(x).valueOf())
        this.setState({selected: selected_times})
    }

    generateContent (){
        return(
                <TableDragSelect className="viewer-table" 
                style={{tableLayout:"fixed"}}
                value={this.state.cells}
                onChange={this.handleDrag}>
                {this.state.displayed}
                </TableDragSelect>
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