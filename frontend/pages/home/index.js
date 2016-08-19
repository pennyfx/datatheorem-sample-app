import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { ReactDataGrid } from 'react-data-grid';
import Layout from '../../components/Layout';
import Grid from '../../components/Customer/Grid'
import Pager from '../../components/Pager/Pager'
import DepartmentFilter from '../../components/DepartmentFilter/DepartmentFilter'
import s from './styles.css';
import { title } from './index.md';
import { fetchCustomers, toggleFilter } from '../../core/actions';


/**
 * Displays customer grid, pager and department filters
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
    this.props.dispatch(fetchCustomers());
  }

  loadPage(page){
    this.props.dispatch(fetchCustomers(page, this.props.filters));
  }

  updateFilter(filter){
    // updates filter and searches
    this.props.dispatch(toggleFilter(filter));
  }

  render() {
    return (
      <Layout className={s.content}>
        <h2>{title}</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Grid
                customers={this.props.customers}
                page={this.props.page}/>
              <Pager
                rows={this.props.customers.length}
                page={this.props.page}
                maxSize={100}
                pageSelected={this.loadPage.bind(this)} />
            </div>
            <div className="col-md-3">
              <DepartmentFilter
                filterChanged={this.updateFilter.bind(this)}
                activeFilters={this.props.filters} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect((state) => {
    return {
      customers: state.customers,
      page: state.page,
      filters: state.filters
    }
})(HomePage);