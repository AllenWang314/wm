import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
import ReactTooltip from 'react-tooltip'

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

class Availability extends Component {
    constructor(props) {
      super(props);
      this.state = {
        availabilities: [],
        name_array: [],
        times: [],
        cells: [],
        loaded: false
      }
    }
    async componentDidMount(){
        await this.setState({times: this.props.times, cells: genFalseArray(2*this.props.difference + 1 ,this.props.date_array.length)})
        await this.generateRows()
        this.setState({loaded: true})
    }

    handleTouch = (people) =>{
        console.log(JSON.stringify(people))
    }

    generateRows = () => {
        const difference = this.props.difference
        const rows = []
        for(var i = 0; i < 2 * difference + 1; ++i) {
            const column = []
            for (var j = 0; j < this.props.date_array.length ; ++j){
                const day = this.state.times[j][1]
                const time = this.state.times[j][i]
                if (i === 0){
                    column.push(<td key={100 * i + j} 
                        disabled>
                        {moment(day).format('LL')}
                        </td>)    
                }
                else {
                    const people = []
                    const names = this.props.name_array
                    for (var k  = 0; k < names.length; ++k){
                        this.props.availabilities[k].includes(time) ? people.push(names[k]): people.push();
                    }
                    column.push(<td key={100 * i + j} 
                        onTouchStart={() => this.handleTouch(people)}  
                        data-tip={people} 
                        className="cell-enabled-gray">
                        &nbsp;<ReactTooltip effect="solid"/>
                        </td>)
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        return rows;
    }

    generateContent = () => {
        return(
            <TableDragSelect className="viewer-table" 
            style={{tableLayout:"fixed"}}
            value={this.state.cells}
            onChange={this.handleDrag}>
            {this.generateRows()}
            </TableDragSelect>
        )
    }

    render() {
        return (
            <div>
            {this.state.loaded? this.generateContent() : null}
            </div>
        );
    }

}

export default Availability;