import { combineReducers } from 'redux';
import history from './history';
import { TOGGLE_FILTER, CUSTOMER_SELECTED, CUSTOMER_CREATED, CUSTOMER_RECEIVED, REQUEST_IN_PROGRESS, REQUEST_FAILED, CLEAR_ERROR, CUSTOMERS_RECEIVED } from './actions';

// Starting state
const initalState = {
  page: 1,
  customer: {},
  customers: [],
  filters: [],
  customerSelected: false,
  isFetching: false,
  errorMsg: ''
}

// All reducers for this app
function customers(state = initalState, action){
  console.log('Action', action);
  switch(action.type){

    case CUSTOMER_SELECTED:
      return Object.assign({}, state, {customerSelected: true});

    case REQUEST_IN_PROGRESS:
      return Object.assign({}, state, {isFetching: true});

    case REQUEST_FAILED:
      return Object.assign({}, state, {isFetching: false, errorMsg: action.error});

    case CLEAR_ERROR:
      return Object.assign({}, state, {errorMsg: ''});

    case CUSTOMER_RECEIVED:
      return Object.assign({}, state,
        {
          customer: action.customer,
          isFetching: false,
          customerSelected: false
        });

    case CUSTOMERS_RECEIVED:
      return Object.assign({}, state,
        {
          customers: action.customers,
          page: action.page,
          isFetching: false,
        });

    case CUSTOMER_CREATED:
      history.push(`/customer/${action.customer.id}`);
      return Object.assign({},state,
        {
          errorMsg: '',
          isFetching: false,
          customers: [
            action.customer,
            ...state.customers
          ]
        });

    case TOGGLE_FILTER:
      // remove if filter already exists
      var newFilters = state.filters.filter((f)=>{
          return f !== action.filter;
      });
      // add filter if it doesnt
      if (newFilters.length === state.filters.length){
        newFilters.push(action.filter);
      }
      return Object.assign({},state,
      {
        filters: newFilters,
        page: action.page
      });

    default:
      return state;
  }
}

export default customers;