import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
// import "./DragTable.css";

function genFalseArray (length) {
    const rows = []
    for (var i = 0; i < length; ++i){
        rows.push([false,false,false,false,false,false,false])
    }
    return (rows)
}

function genInitRows(){
	var rows = []
	for (var j = 0; j < 1; ++j){
			var column = []
			for (var i = 0; i < 7; ++i){
				column.push(<td key={i}>{}</td>)
			}
			rows.push(<tr key={1}>{column}</tr>)
		}
	return(rows)
}

class ByWeek extends Component {
	constructor(props){
		super(props)
		this.state = {boolean_cells: genFalseArray(2),
			selected: [],
			displayed_array: genInitRows()}
	}

	generateRows(){
		var rows = []
		for (var j = 0; j < 1; ++j){
				var column = []
				for (var i = 0; i < 7; ++i){
					column.push(<td key={i}>{ }</td>)
				}
				rows.push(<tr key={1}>{column}</tr>)
			}
		return(rows)
	}

	handleDrag = new_cells => {
		const day_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		this.setState({boolean_cells: new_cells})
		var selected = []
		for (var i = 0; i < 7; ++i){
			if (new_cells[1][i] === true && selected.includes(day_list[i]) === false){
				selected.push(day_list[i])
			}
			else if (new_cells[1][i] === false && selected.includes(day_list[i]) === true){
				selected.splice(selected.indexOf(day_list[i]), 1);
			}
		}
		this.props.onDrag(JSON.stringify(selected))
		this.setState({selected: selected})
	}

	render() {
		return(
			<div>
			<TableDragSelect
			    value={this.state.boolean_cells}
			    onChange={cells => {this.setState({boolean_cells: cells})}}
			>
				<tr>
				    <td disabled >Sun</td>
				    <td disabled >Mon</td>
				    <td disabled >Tue</td>
				    <td disabled >Wed</td>
				    <td disabled >Thu</td>
				    <td disabled >Fri</td>
				    <td disabled >Sat</td>
				</tr>
				{this.state.displayed_array}
			</TableDragSelect>
			</div>
		)
	}
}

export default ByWeek