import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TableDragSelect from "react-table-drag-select";
import "./DragTable.css";
import calendar from "calendar-month-array";

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
function initial_rows() {
  var rows = [];
  for (var i = 0; i < 5; ++i) {
    var column = [];
    for (var j = 0; j < 7; ++j) {
      column.push(<td key={7 * i + j}>{calendar()[i][j].getDate()}</td>);
    }
    rows.push(<tr key={i}>{column}</tr>);
  }
  return rows;
}

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_month_cells: [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]
      ],
      selected_cells: [],
      displayed_array: initial_rows(),
      current_month: new Date(now.getFullYear(), now.getMonth(), 1),
      current_array: calendar()
    };
  }

  generate_rows = () => {
    var rows = [];
    var current_month_cells = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ];
    var selected = Object.values(this.state.selected_cells).map(x =>
      x.getTime()
    );
    for (var i = 0; i < 5; ++i) {
      var column = [];
      for (var j = 0; j < 7; ++j) {
        var date = calendar(this.state.current_month)[i][j];
        var day = date.getDate();
        var month = date.getMonth() * 100;
        var year = date.getFullYear() * 10000;

        if (selected.includes(date.getTime())) {
          current_month_cells[i+1][j] = true;
        }
        column.push(<td key={year + month + day}>{day}</td>);
      }
      var row_key = this.state.current_month.getMonth()*100+7*(i+1) 
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
    var selected = Object.values(this.state.selected_cells).map(x => x.getTime());
    for (var i = 0; i < 5; ++i) {
      for (var j = 0; j < 7; ++j) {
        var current_day = this.state.current_array[i][j];
        var current_cell = new_cells[i+1][j]
        if (
          current_cell === true &&
          selected.includes(current_day.getTime()) === false
        ) {
          selected.push(current_day.getTime());
        }
        else if (current_cell === false &&
           selected.includes(current_day.getTime()) === true
           ){
          selected.splice(selected.indexOf(current_day.getTime()),1)
        }
      }
    }
    this.props.onDrag(selected)
    selected = selected.map(x => new Date(x))
    this.setState({ selected_cells: selected });
  };

  handleNext = () => {
    if (this.state.current_month.getMonth() === 11) {
      this.setState(
        {
          current_month: new Date(
            this.state.current_month.getFullYear() + 1,
            0,
            1
          ),
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
          ),
        },
        () => {
          this.generate_rows();
        }
      );
    }
  };

  handlePrev = () => {
    if (this.state.current_month.getMonth() === 0) {
      this.setState(
        {
          current_month: new Date(
            this.state.current_month.getFullYear() - 1,
            11,
            1
          ),
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
          ),
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
        <div>
          <label>
            {monthNames[this.state.current_month.getMonth()]}{" "}
            {this.state.current_month.getFullYear()}
          </label>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handlePrev}
                >
                  &lt;
                </Button>
              </td>
              <td>
                <TableDragSelect
                  value={this.state.first_month_cells}
                  onChange={this.handleDrag}
                >
                  <tr>
                    <td disabled>Su</td>
                    <td disabled>Mo</td>
                    <td disabled>Tu</td>
                    <td disabled>We</td>
                    <td disabled>Th</td>
                    <td disabled>Fr</td>
                    <td disabled>Sa</td>
                  </tr>
                  {this.state.displayed_array}
                </TableDragSelect>
              </td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  &gt;
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
