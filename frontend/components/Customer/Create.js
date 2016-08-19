import { connect } from 'react-redux';
import React from 'react';
import { clearErrorMsg } from '../../core/actions';



/**
 * Create new customer form.
 * ** warning no validation **
 * @class CreateCustomer
 * @extends {React.Component}
 */
class CreateCustomer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      department: '',
      job_titles: '',
      employee_annual_salary: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(clearErrorMsg());
  }

  inputChanged(event){
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(Object.assign({}, this.state, change));
  }

  submitCustomer(){
    // Call the higher level components function
    this.props.onCreate(this.state);
  }

  render() {
      return (
      <section className={this.props.className}>
        <label>Name:<input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.inputChanged.bind(this)}  /></label>
        <label>Department:<input
            type="text"
            name="department"
            value={this.state.department}
            onChange={this.inputChanged.bind(this)} /></label>
        <label>Job Title:<input
            type="text"
            name="job_titles"
            value={this.state.job_titles}
            onChange={this.inputChanged.bind(this)} /></label>
        <label>Salary:<input
            type="text"
            name="employee_annual_salary"
            value={this.state.employee_annual_salary}
            onChange={this.inputChanged.bind(this)} /></label>
        <button
            onClick={this.submitCustomer.bind(this)}>Submit</button>
        <div>{this.props.errorMsg}</div>
      </section>
    );
  }
};

CreateCustomer.PropTypes = {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    job_titles: React.PropTypes.string,
    department: React.PropTypes.string,
    employee_annual_salary: React.PropTypes.number,
    onCreate: React.PropTypes.function,
    errorMsg: React.PropTypes.string
}


export default connect((state) => {
    return {
      errorMsg: state.errorMsg
    }
})(CreateCustomer);