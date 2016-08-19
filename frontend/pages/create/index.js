import { connect } from 'react-redux';
import React from 'react';
import Layout from '../../components/Layout';
import CreateCustomer from '../../components/Customer/Create'
import s from './styles.css';
import { title } from './index.md';
import { createCustomer } from '../../core/actions';



/**
 *  Create new customer page
 *
 * @class CreateCustomerPage
 * @extends {React.Component}
 */
class CreateCustomerPage extends React.Component {

  createCustomer(data){
    this.props.dispatch(createCustomer(data));
  }

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout className={s.content}>
        <h2>{title}</h2>
        <CreateCustomer className={s.customer} onCreate={this.createCustomer.bind(this)} />
      </Layout>
    );
  }
}

CreateCustomerPage.propTypes = {}

export default connect((state) => {
    return {}
})(CreateCustomerPage);
