import React, { Component } from "react";
import TableDragSelect from "react-table-drag-select";
import Axios from "axios";

var moment = require('moment-timezone');
moment().utc();

const API_LINK = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8000/api/";

function genFalseArray(length, width) {
    const rows = []
    for (var i = 0; i < length; ++i) {
        const column = []
        for (var j = 0; j < width; ++j) {
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
            cells: [],
            label_cells: [],
            labels: [],
            date_array: [],
            times: [],
            loaded: false,
            selected: []
        }
    }
    async componentDidMount() {
        await this.setState({ date_array: this.props.date_array })
        const difference = this.generateDifference()
        await this.setState({
            cells: genFalseArray(2 * difference + 1, this.state.date_array.length),
            label_cells: genFalseArray(2 * difference + 2, 1)
        })
        await this.setState({ times: this.props.times })
        await this.setState({ loaded: true })
    }

    async componentDidUpdate(prevProps) {
        if (this.props.newUser !== prevProps.newUser && this.props.newUser === 1) {
            // TODO: fix to use sha256
            const values = {snd_hash: (this.props.slug + "_" + this.props.name), times_array : []};
            Axios.post(`${API_LINK}post-times/`, values, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        }
        else if (this.props.newUser !== -1 && this.props.newUser !== prevProps.newUser){
            // TODO: fix to use sha256
            Axios.get(`${API_LINK}times/` + this.props.slug + "_" + this.props.name).then((response) => {
                const prev_times = response.data.times_array;
                const new_cells = this.state.cells;
                for (var i = 0; i < prev_times.length; i++) {
                    const index = this.findIndex(prev_times[i]);
                    new_cells[index[1]][index[0]] = true;
                }
                this.setState({cells: new_cells});
            });
        }
    }

    findIndex = (moment) => {
        const difference = this.generateDifference()
        const num_days = this.state.date_array.length
        const ans = [];
        for (var i = 1; i < 2 * difference + 1; ++i) {
            for (var j = 0; j < num_days; ++j) {
                if (this.state.times[j][i] === moment) {
                    ans.push(j);
                    ans.push(i);
                    return ans;
                }
            }
        }
    }

    generateBounds = () => {
        if (this.props.earliest < this.props.latest) {
            const earliest = new Date(Number(this.props.date_array[0]))
            const latest = new Date(Number(this.props.date_array[0]))
            earliest.setHours(Number(this.props.earliest))
            latest.setHours(Number(this.props.latest))
            return { earliest, latest }
        }
        else {
            const earliest = new Date(Number(this.props.date_array[0]))
            const latest = new Date(Number(this.props.date_array[0]))
            earliest.setHours(this.props.earliest + 24)
            latest.setHours(this.props.latest)
            return { earliest, latest }
        }
    }

    generateDifference = () => {
        const { earliest, latest } = this.generateBounds()
        const difference = moment.duration(moment(latest).diff(moment(earliest))).asHours()
        return (difference)
    }

    printCell = (e) => {
        new TableDragSelect().handleTouchStartCell(e)
    }

    generateRows = () => {
        const difference = this.generateDifference()
        const rows = []
        for (var i = 0; i < 2 * difference + 1; ++i) {
            const column = []
            for (var j = 0; j < this.state.date_array.length; ++j) {
                if (i === 0) {
                    const format = (this.props.repeating) ? 'ddd' : 'ddd MMM D';
                    column.push(<td key={100 * i + j} disabled>{moment(this.state.times[j][1]).format(format)}</td>)
                }
                else {
                    column.push(<td key={100 * i + j}>&nbsp;</td>)
                }
            }
            rows.push(<tr key={i}>{column}</tr>)
        }
        return rows;
    }

    handleDrag = (new_cells) => {
        if (this.props.newUser !== -1) {
            this.setState({ cells: new_cells })
            const difference = this.generateDifference()
            const num_days = this.state.date_array.length
            var selected_times = []
            for (var i = 1; i < 2 * difference + 1; ++i) {
                for (var j = 0; j < num_days; ++j) {
                    if (new_cells[i][j] === true) {
                        selected_times.push(this.state.times[j][i])
                    }
                }
            }
            selected_times = selected_times.map(x => moment(x).valueOf())
            // TODO: fix to use sha256
            Axios.get(`${API_LINK}times/` + this.props.slug + "_" + this.props.name).then((response) => {
                response.data.times_array = selected_times;
                // TODO: fix to use sha256
                Axios.put(`${API_LINK}times/` + this.props.slug + "_" + this.props.name, response.data).then((response) => {
                    this.setState({ selected: selected_times });
                    this.props.handleAvail(selected_times);
                });
            });
        }
    }


    
    generateContent() {
        return (
            <TableDragSelect className="viewer-table"
                style={{ tableLayout: "fixed" }}
                value={this.state.cells}
                onChange={this.handleDrag}>
                {this.generateRows()}
            </TableDragSelect>
        )
    }

    render() {
        return (
            <div>
                {this.state.loaded === true ? this.generateContent() : null}
            </div>
        );
    }

}

export default TimeSelector;