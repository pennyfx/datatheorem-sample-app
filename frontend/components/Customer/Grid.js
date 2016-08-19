import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import Link from '../Link/Link';



/**
 *  Grid that holds customers.  3 columns
 *  Clicking on the name sends you to the detail page
 *
 * @class CustomerGrid
 * @extends {React.Component}
 */
class CustomerGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnWidths: {
        firstName: 150,
        lastName: 180,
        title: 280
      },
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }


  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  render() {
    var {columnWidths} = this.state;
    var customers = this.props.customers || [];
    var totalWidth = Object.keys(this.state.columnWidths)
      .map(i=>this.state.columnWidths[i])
      .reduce((p,c)=>{
      return c + p;
    })
    return (
      <div>
      <div>Page:{this.props.page}</div>
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={customers.length}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={totalWidth}
        height={500}
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <Link to={'/customer/'+customers[rowIndex].id}>{customers[rowIndex].firstName}</Link>
            </Cell>
          )}
          fixed={true}
          width={columnWidths.firstName}
          isResizable={true}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {customers[rowIndex].lastName}
            </Cell>
          )}
          width={columnWidths.lastName}
          isResizable={true}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          columnKey="title"
          header={<Cell>Title</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {customers[rowIndex].job_titles}
            </Cell>
          )}
          width={columnWidths.title}
          isResizable={true}
        />
      </Table>
      </div>
    );
  }
}

CustomerGrid.PropTypes = {
    customers: React.PropTypes.array,
    page: React.PropTypes.number
}


export default CustomerGrid;