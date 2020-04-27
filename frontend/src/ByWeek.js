import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";

function genFalseArray (length) {
    const rows = []
    for (var i = 0; i < length; ++i){
        rows.push([false,false,false,false,false,false,false])
    }
    return (rows)
}

const day_list = [
	1240113600000,
	1240200000000,
	1240286400000,
	1240372800000,
	1240459200000,
	1240545600000,
	1240632000000
]

class ByWeek extends Component {
	constructor(props){
		super(props);
		this.state = {boolean_cells: this.initialize(),
			selected: [],
			displayed_array: this.genInitRows()}
	}

	initialize = () => {
		if (!this.props.initial_days) return genFalseArray(2);
		else {
			const rows = [];
			rows.push([false,false,false,false,false,false,false]);
			const row2 = [];
			for (var i = 0; i < 7 ; i++) {
				if (this.props.initial_days.indexOf(day_list[i]) !== -1) row2.push(true);
				else row2.push(false);
			}
			rows.push(row2);
			return rows;
		}
	}

	genInitRows = () => {
		var rows = []
		for (var j = 0; j < 1; ++j){
				var column = []
				for (var i = 0; i < 7; ++i){
					column.push(<td key={i}>&nbsp;</td>)
				}
				rows.push(<tr key={1}>{column}</tr>)
			}
		return(rows)
	}

	handleDrag = new_cells => {
		
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
		this.props.onDrag('day_array',selected)
		this.setState({selected: selected})
	}

	render() {
		return(
			<div>
				<table>
					<tbody>
						<tr>
							<td>
							</td>
							<td>
							<TableDragSelect
			    value={this.state.boolean_cells}
			    onChange={this.handleDrag}
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
							</td>
							<td>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default ByWeek