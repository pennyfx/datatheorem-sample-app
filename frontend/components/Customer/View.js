import React from 'react';



/**
 *  Form that displays customer information
 *
 * @class ViewCustomer
 * @extends {React.Component}
 */
class ViewCustomer extends React.Component {
  render() {
      return (
        <section className={this.props.className}>
          <label>Name:<span>{this.props.name}</span></label>
          <label>Department:<span>{this.props.department}</span></label>
          <label>Job Title:<span>{this.props.job_titles}</span></label>
          <label>Salary:<span>${this.props.employee_annual_salary}</span></label>
          <label>ID:<span>{this.props.id}</span></label>
        </section>
      );
  }
}

ViewCustomer.PropTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    job_titles: React.PropTypes.string,
    department: React.PropTypes.string,
    employee_annual_salary: React.PropTypes.number
}

export default ViewCustomer;