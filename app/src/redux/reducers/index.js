import { combineReducers } from "redux";
import lists from './lists'
import categories from './categories'
import products from './products'

export default combineReducers({ lists, categories, products });