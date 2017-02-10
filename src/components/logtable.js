'use strict'

import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import Dimensions from 'react-dimensions'
import LogParser from '../logparser'
import './styles/fixed-data-table.css';

class LogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logData: [],
      columnWidths: {
        time: 200,
        app: 200,
        pid: 200,
        tid: 200,
        level: 200,
        tag: 200,
        message: props.containerWidth - 200 - 200 - 200
      },
      columnNames: {
        time: 'Time',
        app: 'App',
        pid: 'PID',
        tid: 'TID',
        level: 'Level',
        tag: 'Tag',
        message: 'Message'
      }
    };

    this._onColumnResizeEndCallback =
        this._onColumnResizeEndCallback.bind(this);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth
      }
    }));
  }

  onDrop(ev) {
    console.log(ev.dataTransfer.files[0].path);
    const logParser = new LogParser();
    logParser.parse(ev.dataTransfer.files[0].path, (result) => {
      console.log(result[1]);
      this.setState({
        logData: result
      });
    });
  }

  render() {
    const {logData, columnWidths, columnNames} = this.state;
    return (
      <div id="logtable" style={{float: 'left', height: '100%'}}
          onDrop={this.onDrop.bind(this)}>
        <Table
          rowsCount={logData.length}
          rowHeight={30}
          headerHeight={30}
          width={this.props.containerWidth - 200}
          height={this.props.containerHeight - 70}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          {...this.props}>
          <Column
            columnKey="time"
            header={<Cell>{columnNames.time}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].time}
              </Cell>
            )}
            width={columnWidths.time}
            isResizable={true}
          />
          <Column
            columnKey="pid"
            header={<Cell>{columnNames.pid}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].pid}
              </Cell>
            )}
            width={columnWidths.pid}
            isResizable={true}
          />
          <Column
            columnKey="tid"
            header={<Cell>{columnNames.tid}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].tid}
              </Cell>
            )}
            width={columnWidths.tid}
            isResizable={true}
          />
          <Column
            columnKey="level"
            header={<Cell>{columnNames.level}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].level}
              </Cell>
            )}
            width={columnWidths.level}
            isResizable={true}
          />
          <Column
            columnKey="tag"
            header={<Cell>{columnNames.tag}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].tag}
              </Cell>
            )}
            width={columnWidths.tag}
            isResizable={true}
          />
          <Column
            columnKey="message"
            header={<Cell>{columnNames.message}</Cell>}
            cell={props => (
              <Cell {...props}>
                {logData[props.rowIndex].message}
              </Cell>
            )}
            width={columnWidths.message}
            isResizable={true}
          />
        </Table>
      </div>
    );
  }
}

export default Dimensions()(LogTable);
