import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
import ReactTooltip from 'react-tooltip'

var moment = require('moment-timezone');
moment().utc();

function genTrueArray (length, width) {
    const rows = []
    for (var i = 0; i < length; ++i){
        const column = []
        for (var j = 0; j < width; ++j){
            column.push(true)
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
        name_array: [],
        times: [],
        cells: [],
        loaded: false, 
        dispalyed: []
      }
    }
    async componentDidMount(){
        await this.setState({times: this.props.times, cells: genTrueArray(2*this.props.difference + 1 ,this.props.date_array.length), name_array: this.props.name_array});
        this.generateRows();
        this.setState({loaded: true})
    }

    async componentDidUpdate(prevProps){
        if(prevProps.name_array.length != this.props.name_array.length) {
            const old_avail = [...this.props.availabilities];
            old_avail.push([]);
            this.setState({availabilities: old_avail});
        }
    }

    generateRows = () => {
        const availDict = genAvailDict(this.props.availabilities.flat())
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
                    const modified_availabilities = [... this.props.availabilities];
                    if (modified_availabilities.length != this.state.name_array.length) modified_availabilities.push([]);
                    for (var k  = 0; k < names.length-1; ++k){
                        modified_availabilities[k].includes(time) ? people.push(names[k]): people.push();
                    }

                    const color = pickHex([169, 169, 169],[0, 121, 107],1 - (isNaN(availDict[time]) ? 0 : availDict[time])/(names.length))
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
        return rows;
    }


    generateContent = () => {
        return(
            <table className="viewer-table" 
            style={{tableLayout:"fixed"}}
            >
            {this.generateRows()}
            </table>
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