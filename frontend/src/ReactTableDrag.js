import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
import calendar from "calendar-month-array";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Button } from '@material-ui/core';

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var now = new Date();

function genFalseArray (length) {
    const rows = []
    for (var i = 0; i < length; ++i){
        rows.push([false,false,false,false,false,false,false])
    }
    return (rows)
}


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_month_cells: this.initial_first_month_cells(),
            selected_cells: this.props.initial_dates.map((x) => new Date(x)),
            displayed_array: this.initial_rows(),
            current_month: new Date(now.getFullYear(), now.getMonth(), 1),
            current_array: calendar()
        };
    }

    initial_rows = () => {
        var rows = [];
        var current_month_cells = genFalseArray(7);
        var selected = this.props.initial_dates;
        for (var i = 0; i < 6; ++i) {
            var column = [];
            for (var j = 0; j < 7; ++j) {
                if (i >= calendar().length){
                    column.push(<td disabled key={i+j}></td>);
                }
                else {
                    var date = calendar(now)[i][j];
                    var day = date.getDate();
                    var month = date.getMonth() * 100;
                    var year = date.getFullYear() * 10000;
        
                    if (selected.includes(date.getTime())) {
                        current_month_cells[i + 1][j] = true;
                    }
                    if (date.getMonth() !== now.getMonth()){
                        column.push(<td disabled key={year + month + day}></td>);
                    }
                    else {
                        column.push(<td key={year + month + day}>{day}</td>);    
                    }
                }
            }
            rows.push(<tr key={i}>{column}</tr>);
        }
        return rows;
    }

    initial_first_month_cells = () => {
        var current_month_cells = genFalseArray(7);
        var selected = this.props.initial_dates;
        for (var i = 0; i < 6; ++i) {
            for (var j = 0; j < 7; ++j) {
                if (i < calendar().length){
                    var date = calendar(now)[i][j];
                    if (selected.includes(date.getTime())) {
                        current_month_cells[i + 1][j] = true;
                    }
                }
            }
        }
        return current_month_cells;
    }

    generate_rows = () => {
        var rows = [];
        var current_month_cells = genFalseArray(7);
        var selected = Object.values(this.state.selected_cells).map(x =>
            x.getTime()
        );
        for (var i = 0; i < 6; ++i) {
            var column = [];
            for (var j = 0; j < 7; ++j) {
                if (i >= calendar(this.state.current_month).length){
                    column.push(<td disabled key={i+j}></td>);
                }
                else {
                    var date = calendar(this.state.current_month)[i][j];
                    var day = date.getDate();
                    var month = date.getMonth() * 100;
                    var year = date.getFullYear() * 10000;
    
                    if (selected.includes(date.getTime())) {
                        current_month_cells[i + 1][j] = true;
                    }
                    if (date.getMonth() !== this.state.current_month.getMonth()){
                        column.push(<td disabled key={year + month + day}></td>);
                    }
                    else {
                        column.push(<td key={year + month + day}>{day}</td>);    
                    }
                }
            }
            var row_key =
                this.state.current_month.getMonth() * 100 + 7 * (i + 1);
            rows.push(<tr key={row_key}>{column}</tr>);
        }
        this.setState({
            first_month_cells: current_month_cells,
            displayed_array: rows,
            current_array: calendar(this.state.current_month)
        });
    };

    handleDrag = new_cells => {
        this.setState({ first_month_cells: new_cells });
        var selected = Object.values(this.state.selected_cells).map(x =>
            x.getTime()
        );
        for (var i = 0; i < calendar(this.state.current_month).length; ++i) {
            for (var j = 0; j < 7; ++j) {
                var current_day = this.state.current_array[i][j];
                var current_cell = new_cells[i + 1][j];
                if (
                    current_cell === true &&
                    selected.includes(current_day.getTime()) === false
                ) {
                    selected.push(current_day.getTime());
                } else if (
                    current_cell === false &&
                    selected.includes(current_day.getTime()) === true
                ) {
                    selected.splice(selected.indexOf(current_day.getTime()), 1);
                }
            }
        }
        selected.sort();
        this.props.onDrag('date_array',selected);
        selected = selected.map(x => new Date(x));
        this.setState({ selected_cells: selected });
    };

    handleNext = (e) => {
        e.preventDefault()
        if (this.state.current_month.getMonth() === 11) {
            this.setState(
                {
                    current_month: new Date(
                        this.state.current_month.getFullYear() + 1,
                        0,
                        1
                    )
                },
                () => {
                    this.generate_rows();
                }
            );
        } else {
            this.setState(
                {
                    current_month: new Date(
                        this.state.current_month.getFullYear(),
                        this.state.current_month.getMonth() + 1,
                        1
                    )
                },
                () => {
                    this.generate_rows();
                }
            );
        }
    };

    handlePrev = (e) => {
        e.preventDefault()
        if (this.state.current_month.getMonth() === 0) {
            this.setState(
                {
                    current_month: new Date(
                        this.state.current_month.getFullYear() - 1,
                        11,
                        1
                    )
                },
                () => {
                    this.generate_rows();
                }
            );
        } else {
            this.setState(
                {
                    current_month: new Date(
                        this.state.current_month.getFullYear(),
                        this.state.current_month.getMonth() - 1,
                        1
                    )
                },
                () => {
                    this.generate_rows();
                }
            );
        }
    };

    render() {
        return (
            <div>
                    <div><p>
                    {monthNames[this.state.current_month.getMonth()]}{" "}
                    {this.state.current_month.getFullYear()}</p>
                    </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Button
                                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                                    onClick={this.handlePrev}
                                >
                                <NavigateBeforeIcon/>
                                </Button>
                            </td>
                            <td>
                                <TableDragSelect
                                    value={this.state.first_month_cells}
                                    onChange={this.handleDrag}
                                >
                                    <tr>
                                        <td disabled>Sun</td>
                                        <td disabled>Mon</td>
                                        <td disabled>Tue</td>
                                        <td disabled>Wed</td>
                                        <td disabled>Thu</td>
                                        <td disabled>Fri</td>
                                        <td disabled>Sat</td>
                                    </tr>
                                    {this.state.displayed_array}
                                </TableDragSelect>
                            </td>
                            <td>
                                <Button
                                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                                    onClick={this.handleNext}
                                >
                                    <NavigateNextIcon/>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;