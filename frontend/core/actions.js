import 'whatwg-fetch';

//
// Action constants and async requests
//

// TODO: move to config
const SERVICE_URL = "http://localhost:8080";


export const CUSTOMER_SELECTED = "CUSTOMER_SELECTED";
export const CUSTOMER_CREATED = "CUSTOMER_CREATED";
export const REQUEST_IN_PROGRESS = "REQUEST_IN_PROGRESS";
export const CUSTOMER_RECEIVED = "CUSTOMER_RECEIVED";
export const CUSTOMERS_RECEIVED = "CUSTOMERS_RECEIVED";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const TOGGLE_FILTER = "TOGGLE_FILTER";

export function clearErrorMsg(){
  return { type: CLEAR_ERROR };
}

export function toggleFilter(filter){
  return function(dispatch,getState){
    dispatch({ type: TOGGLE_FILTER, filter: filter, page: 1 });
    dispatch(fetchCustomers(getState().page,getState().filters))
  }
}

export function customerSelected(id){
  return { type: CUSTOMER_SELECTED, id: id};
}

export function startingRequest(){
  return {type:REQUEST_IN_PROGRESS};
}

export function customerReceived(id, data){
  return {type:CUSTOMER_RECEIVED, id:id, customer: data};
}

export function requestFailed(err){
  return {type:REQUEST_FAILED, error:err};
}

export function fetchCustomer(id){
  return function(dispatch){
    // notify we're making a call
    dispatch(startingRequest());
    // make call
    fetch(`${SERVICE_URL}/${id}`)
      .then(handleResponse)
      .then(json =>{
          // return customer
          dispatch(customerReceived(id, json));
      }).catch((err)=>{
        console.log('error', err);
        dispatch(requestFailed(err));
      });
  };
}


export function customersRecevied(page, data){
  return {type:CUSTOMERS_RECEIVED, customers: data, page: page};
}

export function fetchCustomers(page=1, filter=null){
  return function(dispatch){
    // notify we're making a call
    var filterStr = filter ? '&filter='+filter.join(',') :'';
    dispatch(startingRequest());
    var requestStr = `${SERVICE_URL}?page=${page}${filterStr}`;
    console.log('GET:', requestStr);
    // fetch page of customers
    fetch(requestStr)
      .then(handleResponse)
      .then(json =>{
          dispatch(
            customersRecevied(page,
              json.map(parseNames)));
      }).catch((err)=>{
        dispatch(requestFailed(err));
      });
  };
}


export function customerCreated(customer){
  return { type: CUSTOMER_CREATED, customer: customer};
}

export function createCustomer(customer){
  return function(dispatch){
    console.log('createCustomer', customer);
    // notify we're making a call
    dispatch(startingRequest());
    // fetch page of customers
    fetch(SERVICE_URL,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
      .then(handleResponse)
      .then(json =>{
          dispatch(customerCreated(json));
      }).catch((err)=>handleError(err,dispatch));
  };
}

function handleResponse(response){
  if (response.ok){
    return response.json();
  } else {
    var err = new Error("fetch error");
    err.response = response;
    throw err;
  }
}

function handleError(err, dispatch){
  err.response.json().then(msg=>{
    console.log(msg);
    dispatch(requestFailed(msg.error));
  });
}

export function parseNames(item){
  var names = item.name.split(',');
  item.lastName = names[0];
  item.firstName = names[1];
  return item;
}