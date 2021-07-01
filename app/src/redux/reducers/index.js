import { combineReducers } from "redux";
import lists from './lists'
import categories from './categories'
import products from './products'
import product from './product'
import editProduct from './editProduct'
import stock from "./stock";

export default combineReducers({ lists, categories, products, product, editProduct, stock });