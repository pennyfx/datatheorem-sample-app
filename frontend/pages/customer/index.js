import { connect } from 'react-redux';
import React from 'react';
import Layout from '../../components/Layout';
import ViewCustomer from '../../components/Customer/View'
import s from './styles.css';
import { title } from './index.md';
import { fetchCustomer } from '../../core/actions';


/**
 * View Customer page
 *
 * @class CustomerPage
 * @extends {React.Component}
 */
class CustomerPage extends React.Component {

  componentDidMount() {
    document.title = title;
    var match = this.props.route.pattern.exec(location.pathname);
    var id = match[1] ? Number(match[1]) : -1;
    this.props.dispatch(fetchCustomer(id));
  }

  render() {
    return (
      <Layout className={s.content}>
        <h2>{title}</h2>
        <ViewCustomer className={s.customer} {...this.props.customer}  />
      </Layout>
    );
  }
}

CustomerPage.propTypes = {
  customer: React.PropTypes.object
}

export default connect((state) => {
    return {
      customer: state.customer
    }
})(CustomerPage);
