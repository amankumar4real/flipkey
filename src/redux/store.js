import {createStore, combineReducers,applyMiddleware, compose } from 'redux';
import reducerAuth from './Auth/reducerAuth';
import reducerCommon from './Common/reducerCommon';
import reducerSearch from './Search/reducerSearch';
import reducerPropertyDetails from './PropertyDetails/reducerPropertyDetails';
import reducreLanding from './LandingPage/reducerLanding';
import thunk from "redux-thunk";


// function saveToLocalStorage(state){
//   try{
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem("state", serializedState)
//   }
//   catch(e){
//     console.log(e)
//   }
// }

// function loadFromLocalStorage(){
//   try{
//     const serializedState = localStorage.getItem("state")
//     if(serializedState == null) return undefined
//     return JSON.parse(serializedState)
//   }
//   catch(e){
//     console.log(e)
//     return undefined
//   }
// }

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

// const presistedState = loadFromLocalStorage()

// const store = createStore(allReducers,presistedState,enhancer);
const store = createStore(allReducers,enhancer);

// store.subscribe(()=> saveToLocalStorage(store.getState()))

export default store