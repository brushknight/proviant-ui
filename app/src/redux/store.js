import rootReducer from "./reducers";
import {applyMiddleware, createStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store