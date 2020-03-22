import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

var moment = require('moment');
moment().format();
const date_array = [1583899200000,1584504000000,1584590400000]
const name_array = ['Michelle', 'Rachel']

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
        date_array: date_array,
        displayed_avails: [],
        sliced: [],
        loaded: false
      }
      this.printCell = this.printCell.bind(this)
    }
    async componentDidMount(){
        const difference = this.generateDifference()
        await this.setState({cells: genFalseArray(49,this.state.date_array.length), label_cells: genFalseArray(2*difference+1,1)})
        await this.generateZips()
        await this.generateSlice()
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
        this.setState({labels: rows})
    }

    generateSlice = () =>{
        const difference = this.generateDifference()
        if (isNaN(difference)){return}
        const startCell = this.generateBounds().earliest.getHours() 
        const endCell = this.generateBounds().latest.getHours()
        const sliced = genFalseArray(1,this.state.date_array.length).concat(circularSlice(2*startCell,2*endCell,this.state.cells))
        this.setState({sliced: sliced})
    }

    generateCols = () => {
        const difference = this.generateDifference()
        if (isNaN(difference)){return}
        const column = []
        for (var i = 0; i < 2 * difference; ++i){
            column.push(<td key={100*i + 1} onMouseOver={this.printCell}>&nbsp;</td>)
        }
        return (column)
    }
    handleDrag = (new_cells) =>{
        const startCell = this.generateBounds().earliest.getHours() 
        const endCell = this.generateBounds().latest.getHours()
        new_cells.shift()
        const current_cells = this.state.cells
        current_cells.shift()
        const new_array = []
        for (var i = 0; i < this.state.date_array.length; ++i){
            new_array.push(circularSplice(2*startCell,2*endCell, transpose(current_cells)[i], transpose(new_cells)[i]))
        }
        this.setState({cells: transpose(new_array)}, ()=> this.generateZips())
        console.log(this.state)
    }

    generateZips = () => {
        const num_days = this.state.date_array.length
        const rows = []
        for (var day_index = 0; day_index < num_days; ++day_index){
            const array = [<td key={-1} disabled>{moment(date_array[day_index]).format('LL')}</td>].concat(this.generateCols())
            rows.push(array)
        }
        this.setState({displayed: transpose(rows).map((x,index) => <tr key={index}>{x}</tr>)}, ()=> this.generateSlice())
    }

    printCell = () => {
        console.log('here')
    }

    generateContent (){
        return(
            <div>
                <TableDragSelect className="viewer-table" 
                value={this.state.sliced} 
                onChange={this.handleDrag}>
                {this.state.displayed}
                </TableDragSelect>
            </div>
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