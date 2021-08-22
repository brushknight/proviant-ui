import { combineReducers } from 'redux'
import categories from './categories'
import createProduct from './createProduct'
import editCategory from './editCategory'
import editList from './editList'
import editProduct from './editProduct'
import lists from './lists'
import login from './login'
import product from './product'
import products from './products'
import register from './register'
import stock from './stock'
import user from './user'
import version from './version'
import shoppingList from './shopping/list'
import shoppingForm from './shopping/form'
import shoppingEdit from './shopping/edit'
import shoppingLists from './shopping/lists'

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
	login,
	register,
	user,
	version,
	shoppingList,
	shoppingForm,
	shoppingEdit,
	shoppingLists
})
