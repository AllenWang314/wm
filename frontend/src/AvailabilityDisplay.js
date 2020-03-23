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


function genAvailDict (arr){
    var counts = {};
    for (var i = 0; i < arr.length; i++) {
      var num = arr[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return (counts)
}

function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

class Availability extends Component {
    constructor(props) {
      super(props);
      this.state = {
        availabilities: [],
        name_array: [],
        times: [],
        cells: [],
        loaded: false, 
        dispalyed: []
      }
    }
    async componentDidMount(){
        console.log(this.props)
        await this.setState({times: this.props.times, cells: genFalseArray(2*this.props.difference + 1 ,this.props.date_array.length), availabilities: this.props.availabilities, name_array: this.props.name_array})
        await this.generateRows()
        this.setState({loaded: true})
    }

    componentDidUpdate (prevProps){
        if (this.props.availabilities !== prevProps.availabilities){
            console.log('here')
            this.generateRows()
        }
    }

    generateRows = () => {
        const availDict = genAvailDict(this.props.availabilities.flat())
        console.log(availDict)
        console.log(this.props.name_array)
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

                    const color = pickHex([169, 169, 169],[0, 121, 107],1 - (isNaN(availDict[time]) ? 0 : availDict[time])/names.length)
                    column.push(<td key={100 * i + j}   
                        data-tip={people}
                        style={{backgroundColor: "rgb(" + color + ")"}} 
                        className="cell-enabled-gray">
                        {JSON.stringify(color)}<ReactTooltip effect="solid"/>
                        </td>)
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({displayed: rows})
    }

    generateContent = () => {
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
        console.log("in render they are " + this.props.availabilities);
        return (
            <div>
            {this.state.loaded? this.generateContent() : null}
            </div>
        );
    }

}

export default Availability;