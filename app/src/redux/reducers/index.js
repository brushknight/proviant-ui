import { combineReducers } from "redux";
import lists from './lists'
import categories from './categories'
import products from './products'
import product from './product'

export default combineReducers({ lists, categories, products, product });