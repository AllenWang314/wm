import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

var moment = require('moment');
moment().format();
const date_array = [1583899200000,1584590400000]
const name_array = ['Michelle', 'Rachel']
const availabilities = [[true,true,false,false,false,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],[true,true,false,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]]

function transpose (m) {
    return(m[0].map((x,i) => m.map(x => x[i])))
}


function circularSlice(start,end,array){
    if (start <= end){
        const final = array.slice(start,end)
        return final
    }
    else{
        const final = array.slice(start).concat(array.slice(0,end))
        return final
    }
}

function circularSplice(start,end,original,spliced){
    if (start <= end){
        const final = original.slice(0,start).concat(spliced).concat(original.slice(end))
        return(final)
    }
    else {
        const final = spliced.slice(0,start).concat(original).concat(spliced.slice(start))
        return(final)
    }
}

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
        displayed: [],
        labels: [],
        label_cells: [],
        name_array: name_array,
        availabilities: availabilities,
        displayed_avails: []
      }
    }
    componentDidMount(){
        const difference = this.generateDifference()
        this.setState({cells: genFalseArray(48,1), label_cells: genFalseArray(2*difference+1,1)})
        this.generateRows()
        this.generateLabels()
        this.genAvail()
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
    generateLabels = () => {
        const difference = this.generateDifference()
        if (isNaN(difference)){
            return 0
        }
        const first = this.generateBounds().earliest.getHours()

        const rows = []
        for (var i = 0; i < 2 * difference+1; ++i){
            const column = []
            const current_time = moment(first).add(30*(i),'minutes')
            if (i%2===0){
                column.push(<td key={100*i + 0} disabled>{current_time.format('LT')}</td>)
            }
            else {
                column.push(<td key={100*i + 0} disabled>&nbsp;</td>)    
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({labels: rows}, ()=> console.log(this.state))
    }

    generateRows = () => {
        const difference = this.generateDifference()
        if (isNaN(difference)){return}
        const rows = []
        for (var i = 0; i < 2 * difference; ++i){
            const column = []
            column.push(<td key={100*i + 1} >&nbsp;</td>)
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({displayed: rows})
    }

    handleDrag = (new_cells) =>{
        const startCell = this.generateBounds().earliest.getHours() 
        const endCell = this.generateBounds().latest.getHours()
        const new_array = circularSplice(2*startCell,2*endCell, this.state.cells, new_cells)
        this.setState({cells: new_array})
    }

    genAvail = () =>{
        const startCell = this.generateBounds().earliest.getHours() 
        const endCell = this.generateBounds().latest.getHours()
        const num_people = this.state.name_array.length
        const difference = 2 * this.generateDifference()
        const rows = []
        var availBools = []
        for (var i = -1; i < difference; ++i){
            const column = []
            for (var indiv_index = 0; indiv_index < num_people; ++indiv_index){
                const current_slice = circularSlice(2*startCell,2*endCell, this.state.availabilities[indiv_index])
                const name = this.state.name_array[indiv_index]
                if (i === -1){
                    availBools.push([false].concat(current_slice))
                    column.push(<td disabled className="cell-disabled-rotated" key={name}><p className="rotated">{name}</p></td>)
                    continue
                }
                if (current_slice[i] === true){
                    column.push(<td key={name + i} disabled className="cell-disabled-green">&nbsp;&nbsp;</td>)
                }
                else {
                    column.push(<td key={name + i} disabled className="cell-disabled-gray">&nbsp;&nbsp;</td>)  
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        this.setState({availabilities: transpose(availBools), displayed_avails: rows})
    }
    render() {
        const startCell = this.generateBounds().earliest.getHours() 
        const endCell = this.generateBounds().latest.getHours()
        const sliced = circularSlice(2*startCell,2*endCell,this.state.cells)
        return (
                <TableDragSelect className="viewer-table"
                value={this.state.label_cells} >
                {this.state.labels}
                </TableDragSelect>
        );
    }

}

export default TimeSelector;