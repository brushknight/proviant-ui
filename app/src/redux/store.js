import rootReducer from "./reducers";
import {applyMiddleware, createStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

console.log(store.getState())

export default store