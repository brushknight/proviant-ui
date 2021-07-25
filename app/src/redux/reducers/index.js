import { combineReducers } from 'redux'
import categories from './categories'
import createProduct from './createProduct'
import editCategory from './editCategory'
import editList from './editList'
import editProduct from './editProduct'
import lists from './lists'
import product from './product'
import products from './products'
import stock from './stock'
import user from './user'

export default combineReducers({
	lists,
	categories,
	products,
	product,
	editProduct,
	createProduct,
	editCategory,
	editList,
	stock,
	user
})
