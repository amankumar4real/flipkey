import {createStore, combineReducers,applyMiddleware, compose } from 'redux';
import reducerAuth from './Auth/reducerAuth';
// import reducerCommon from './Common/reducerCommon'
// import reducerSearch from './Search/reducerSearch'
// import reducerPropertyDetails from './PropertyDetails/reducerPropertyDetails'
import thunk from "redux-thunk";


const allReducers = combineReducers({
    reducerAuth
  })

let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  }

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducerAuth,enhancer);

export default store