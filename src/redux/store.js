import {createStore, combineReducers,applyMiddleware, compose } from 'redux';
import reducerAuth from './Auth/reducerAuth';
import reducerCommon from './Common/reducerCommon';
import reducerSearch from './Search/reducerSearch';
import reducerPropertyDetails from './PropertyDetails/reducerPropertyDetails';
import reducreLanding from './LandingPage/reducerLanding';
import thunk from "redux-thunk";

const allReducers = combineReducers({
    reducerAuth,reducerCommon,reducerSearch,reducerPropertyDetails,reducreLanding
  })

let composeEnhancers = compose;

  if (process.env.NODE_ENV !== "production") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  }

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(allReducers,enhancer);

export default store