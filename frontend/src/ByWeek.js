import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
// import "./DragTable.css";

const day_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class ByWeek extends Component {
	constructor(props){
		super(props)
		this.state = {boolean_cells: [
			[false,false,false,false,false,false,false],
			[false,false,false,false,false,false,false]],
			selected: []}
	}

	handleDrag = (new_cells) => {
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
			<table>
			<tbody>
			<tr>
			<td>
			<TableDragSelect
			    value={this.state.boolean_cells}
			    onChange={this.handleDrag}
			>
				<tr key="0">
				    <td disabled key='dSun'>Sun</td>
				    <td disabled key='dMon'>Mon</td>
				    <td disabled key='dTue'>Tue</td>
				    <td disabled key='dWed'>Wed</td>
				    <td disabled key='dThu'>Thu</td>
				    <td disabled key='dFri'>Fri</td>
				    <td disabled key='dSat'>Sat</td>
				</tr>
				<tr key="1">
				    <td key='Sun'></td>
				    <td key='Mon'></td>
				    <td key='Tue'></td>
				    <td key='Wed'></td>
				    <td key='Thu'></td>
				    <td key='Fri'></td>
				    <td key='Sat'></td>
				</tr>
			</TableDragSelect>
			</td>
			</tr>
			</tbody>
			</table>
			</div>
		)
	}
}

export default ByWeek