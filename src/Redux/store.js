import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reducerAuth from './Auth/reducerAuth';
import reducerPropertyDetails from './PropertyDetails/reducerPropertyDetails';

const reducers= combineReducers(reducerAuth, reducerPropertyDetails)
const store= createStore(reducers)
export default store

